# RAG System & MCP Server Implementation Guide

Detailed guide for implementing Ordo's RAG (Retrieval-Augmented Generation) system and MCP (Model Context Protocol) servers.

## Part 1: RAG System

### Architecture Overview

```
User Query → Mistral Embed → Vector Search (Supabase pgvector) → Top-K Docs → LLM Context
```

### Components

1. **Embedder**: Generates embeddings using Mistral AI
2. **Vector Store**: Stores embeddings in Supabase pgvector
3. **Retriever**: Performs semantic search
4. **Document Ingestion**: Fetches and chunks documentation

---

### 1. Embedder Implementation

```python
# ordo-backend/ordo_backend/rag/embedder.py
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from typing import List
import structlog

logger = structlog.get_logger()

class MistralEmbedder:
    """
    Generate embeddings using Mistral AI mistral-embed model
    """
    
    def __init__(self, api_key: str):
        self.client = MistralClient(api_key=api_key)
        self.model = "mistral-embed"
    
    async def embed_text(self, text: str) -> List[float]:
        """
        Generate embedding for single text
        
        Args:
            text: Text to embed
        
        Returns:
            List of floats (embedding vector)
        """
        try:
            response = await self.client.embeddings(
                model=self.model,
                input=[text]
            )
            
            embedding = response.data[0].embedding
            logger.info("embedding_generated", text_length=len(text), dim=len(embedding))
            
            return embedding
            
        except Exception as e:
            logger.error("embedding_failed", error=str(e))
            raise
    
    async def embed_batch(self, texts: List[str], batch_size: int = 32) -> List[List[float]]:
        """
        Generate embeddings for multiple texts in batches
        
        Args:
            texts: List of texts to embed
            batch_size: Number of texts per batch (default: 32)
        
        Returns:
            List of embedding vectors
        """
        embeddings = []
        
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            
            try:
                response = await self.client.embeddings(
                    model=self.model,
                    input=batch
                )
                
                batch_embeddings = [item.embedding for item in response.data]
                embeddings.extend(batch_embeddings)
                
                logger.info("batch_embedded", batch_num=i//batch_size, batch_size=len(batch))
                
            except Exception as e:
                logger.error("batch_embedding_failed", batch_num=i//batch_size, error=str(e))
                raise
        
        return embeddings
```

---

### 2. Vector Store Implementation

```python
# ordo-backend/ordo_backend/rag/vector_store.py
from supabase import create_client, Client
from typing import List, Dict, Any
import structlog

logger = structlog.get_logger()

class SupabaseVectorStore:
    """
    Store and retrieve document embeddings using Supabase pgvector
    """
    
    def __init__(self, url: str, key: str):
        self.client: Client = create_client(url, key)
        self.table = "documents"
    
    async def add_documents(
        self,
        documents: List[Dict[str, Any]],
        embeddings: List[List[float]]
    ) -> None:
        """
        Add documents with embeddings to vector store
        
        Args:
            documents: List of document dicts with 'id', 'content', 'metadata'
            embeddings: List of embedding vectors (same order as documents)
        """
        if len(documents) != len(embeddings):
            raise ValueError("Documents and embeddings must have same length")
        
        # Prepare rows for insertion
        rows = []
        for doc, embedding in zip(documents, embeddings):
            rows.append({
                'id': doc['id'],
                'content': doc['content'],
                'metadata': doc.get('metadata', {}),
                'embedding': embedding
            })
        
        # Insert into Supabase
        try:
            response = self.client.table(self.table).insert(rows).execute()
            logger.info("documents_added", count=len(rows))
            
        except Exception as e:
            logger.error("document_insertion_failed", error=str(e))
            raise
    
    async def similarity_search(
        self,
        query_embedding: List[float],
        top_k: int = 5,
        filter_metadata: Dict[str, Any] = None
    ) -> List[Dict[str, Any]]:
        """
        Perform semantic similarity search
        
        Args:
            query_embedding: Query embedding vector
            top_k: Number of results to return
            filter_metadata: Optional metadata filters
        
        Returns:
            List of documents with similarity scores
        """
        try:
            # Use pgvector cosine similarity
            query = self.client.rpc(
                'match_documents',
                {
                    'query_embedding': query_embedding,
                    'match_count': top_k,
                    'filter': filter_metadata or {}
                }
            )
            
            response = query.execute()
            results = response.data
            
            logger.info("similarity_search_complete", results_count=len(results))
            
            return results
            
        except Exception as e:
            logger.error("similarity_search_failed", error=str(e))
            raise
    
    async def delete_documents(self, document_ids: List[str]) -> None:
        """Delete documents by IDs"""
        try:
            self.client.table(self.table).delete().in_('id', document_ids).execute()
            logger.info("documents_deleted", count=len(document_ids))
            
        except Exception as e:
            logger.error("document_deletion_failed", error=str(e))
            raise
```

**Supabase SQL Setup**:
```sql
-- Create documents table with pgvector
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    metadata JSONB,
    embedding vector(1024),  -- Mistral embed dimension
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for fast similarity search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create RPC function for similarity search
CREATE OR REPLACE FUNCTION match_documents(
    query_embedding vector(1024),
    match_count INT,
    filter JSONB DEFAULT '{}'::jsonb
)
RETURNS TABLE (
    id TEXT,
    content TEXT,
    metadata JSONB,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        documents.id,
        documents.content,
        documents.metadata,
        1 - (documents.embedding <=> query_embedding) AS similarity
    FROM documents
    WHERE (filter = '{}'::jsonb OR documents.metadata @> filter)
    ORDER BY documents.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;
```

---

### 3. Retriever Implementation

```python
# ordo-backend/ordo_backend/rag/retriever.py
from typing import List, Dict, Any
import structlog

logger = structlog.get_logger()

class RAGRetriever:
    """
    High-level RAG retrieval interface
    """
    
    def __init__(self, embedder: MistralEmbedder, vector_store: SupabaseVectorStore):
        self.embedder = embedder
        self.vector_store = vector_store
    
    async def query(
        self,
        query: str,
        top_k: int = 5,
        filter_source: str = None
    ) -> List[Dict[str, Any]]:
        """
        Retrieve relevant documents for query
        
        Args:
            query: User query string
            top_k: Number of documents to retrieve
            filter_source: Optional source filter (e.g., 'solana-docs', 'seeker-docs')
        
        Returns:
            List of relevant documents with content and metadata
        """
        try:
            # Generate query embedding
            query_embedding = await self.embedder.embed_text(query)
            
            # Search vector store
            filter_metadata = {'source': filter_source} if filter_source else None
            results = await self.vector_store.similarity_search(
                query_embedding,
                top_k=top_k,
                filter_metadata=filter_metadata
            )
            
            logger.info("rag_query_complete", query=query, results=len(results))
            
            return results
            
        except Exception as e:
            logger.error("rag_query_failed", query=query, error=str(e))
            raise
    
    async def add_documents(
        self,
        documents: List[Dict[str, Any]]
    ) -> None:
        """
        Add new documents to RAG system
        
        Args:
            documents: List of documents with 'id', 'content', 'metadata'
        """
        # Extract content for embedding
        contents = [doc['content'] for doc in documents]
        
        # Generate embeddings
        embeddings = await self.embedder.embed_batch(contents)
        
        # Store in vector database
        await self.vector_store.add_documents(documents, embeddings)
        
        logger.info("documents_added_to_rag", count=len(documents))
```

---

### 4. Document Ingestion Script

```python
# ordo-backend/scripts/ingest_docs.py
import asyncio
import httpx
from bs4 import BeautifulSoup
from typing import List, Dict
import hashlib

async def fetch_solana_docs() -> List[Dict]:
    """Fetch Solana documentation"""
    docs = []
    base_url = "https://docs.solana.com"
    
    # Fetch main pages
    pages = [
        "/introduction",
        "/wallet-guide",
        "/developing/programming-model/overview",
        "/developing/clients/javascript-api"
    ]
    
    async with httpx.AsyncClient() as client:
        for page in pages:
            response = await client.get(f"{base_url}{page}")
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract content
            content = soup.get_text()
            
            # Chunk into 500-1000 token pieces
            chunks = chunk_text(content, max_tokens=1000)
            
            for i, chunk in enumerate(chunks):
                doc_id = hashlib.md5(f"{page}_{i}".encode()).hexdigest()
                docs.append({
                    'id': doc_id,
                    'content': chunk,
                    'metadata': {
                        'source': 'solana-docs',
                        'url': f"{base_url}{page}",
                        'chunk_index': i
                    }
                })
    
    return docs

def chunk_text(text: str, max_tokens: int = 1000) -> List[str]:
    """Chunk text into smaller pieces"""
    # Simple chunking by sentences
    sentences = text.split('. ')
    chunks = []
    current_chunk = []
    current_length = 0
    
    for sentence in sentences:
        sentence_length = len(sentence.split())
        
        if current_length + sentence_length > max_tokens:
            chunks.append('. '.join(current_chunk) + '.')
            current_chunk = [sentence]
            current_length = sentence_length
        else:
            current_chunk.append(sentence)
            current_length += sentence_length
    
    if current_chunk:
        chunks.append('. '.join(current_chunk) + '.')
    
    return chunks

async def main():
    # Initialize RAG system
    embedder = MistralEmbedder(api_key=os.getenv('MISTRAL_API_KEY'))
    vector_store = SupabaseVectorStore(
        url=os.getenv('SUPABASE_URL'),
        key=os.getenv('SUPABASE_KEY')
    )
    retriever = RAGRetriever(embedder, vector_store)
    
    # Fetch and ingest documents
    print("Fetching Solana docs...")
    solana_docs = await fetch_solana_docs()
    
    print(f"Ingesting {len(solana_docs)} documents...")
    await retriever.add_documents(solana_docs)
    
    print("✅ Document ingestion complete!")

if __name__ == "__main__":
    asyncio.run(main())
```

---

## Part 2: MCP Servers

### MCP Server Architecture

```
Frontend → Backend API → MCP Client → MCP Servers (Email, Social, Wallet, DeFi, NFT, Trading)
                                           ↓
                                    External APIs (Gmail, X, Helius, Jupiter, etc.)
```

### MCP Interceptors

```python
# ordo-backend/ordo_backend/mcp_servers/interceptors.py
from langchain_mcp_adapters.interceptors import MCPToolCallRequest
from dataclasses import dataclass
from typing import Dict, Optional
import structlog

logger = structlog.get_logger()

@dataclass
class OrdoContext:
    """Runtime context for MCP tool calls"""
    user_id: str
    permissions: Dict[str, bool]
    tokens: Dict[str, str]
    wallet_address: Optional[str]

async def inject_ordo_context(
    request: MCPToolCallRequest,
    handler
):
    """
    Inject user permissions and OAuth tokens into MCP tool calls
    This runs before every tool execution
    """
    runtime = request.runtime
    context: OrdoContext = runtime.context
    
    # Check if user has permission for this tool's surface
    tool_surface = get_surface_from_tool(request.name)
    if tool_surface and not context.permissions.get(tool_surface, False):
        raise PermissionError(f"Missing permission for {tool_surface}")
    
    # Inject OAuth token if needed
    if tool_surface in context.tokens:
        modified_request = request.override(
            args={
                **request.args,
                "token": context.tokens[tool_surface],
                "user_id": context.user_id
            }
        )
        return await handler(modified_request)
    
    return await handler(request)

async def audit_tool_calls(
    request: MCPToolCallRequest,
    handler
):
    """
    Log all tool executions to audit log
    """
    runtime = request.runtime
    context: OrdoContext = runtime.context
    
    # Log tool call start
    logger.info(
        "tool_call_start",
        user_id=context.user_id,
        tool=request.name,
        args=request.args
    )
    
    try:
        result = await handler(request)
        
        # Log success
        logger.info(
            "tool_call_success",
            user_id=context.user_id,
            tool=request.name
        )
        
        return result
    except Exception as e:
        # Log failure
        logger.error(
            "tool_call_failed",
            user_id=context.user_id,
            tool=request.name,
            error=str(e)
        )
        raise

def get_surface_from_tool(tool_name: str) -> Optional[str]:
    """Map tool name to surface"""
    if 'email' in tool_name or 'gmail' in tool_name:
        return 'READ_GMAIL'
    if 'x_' in tool_name or 'twitter' in tool_name:
        return 'READ_SOCIAL_X'
    if 'telegram' in tool_name:
        return 'READ_SOCIAL_TELEGRAM'
    if 'wallet' in tool_name or 'balance' in tool_name:
        return 'READ_WALLET'
    return None
```

---

### Complete MCP Server Example

```python
# ordo-backend/ordo_backend/mcp_servers/wallet.py
from fastmcp import FastMCP
from typing import List, Dict, Any
import httpx
import structlog

logger = structlog.get_logger()
mcp = FastMCP("Ordo Wallet Server")

@mcp.tool()
async def get_wallet_portfolio(
    wallet_address: str,
    token: str,  # Injected by interceptor
    user_id: str,  # Injected by interceptor
) -> Dict[str, Any]:
    """
    Get wallet portfolio using Helius DAS API
    
    Args:
        wallet_address: Solana wallet address
        token: Helius API key (injected)
        user_id: User ID for audit logging
    
    Returns:
        Portfolio with tokens and NFTs
    """
    try:
        logger.info("fetching_portfolio", user_id=user_id, wallet=wallet_address)
        
        # Call Helius DAS API
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"https://mainnet.helius-rpc.com/?api-key={token}",
                json={
                    "jsonrpc": "2.0",
                    "id": "ordo-portfolio",
                    "method": "getAssetsByOwner",
                    "params": {
                        "ownerAddress": wallet_address,
                        "page": 1,
                        "limit": 1000
                    }
                }
            )
            response.raise_for_status()
            data = response.json()
        
        # Parse assets
        assets = data.get('result', {}).get('items', [])
        
        # Separate tokens and NFTs
        tokens = [a for a in assets if a.get('interface') == 'FungibleToken']
        nfts = [a for a in assets if a.get('interface') == 'NFT']
        
        portfolio = {
            'wallet_address': wallet_address,
            'tokens': tokens,
            'nfts': nfts,
            'total_tokens': len(tokens),
            'total_nfts': len(nfts)
        }
        
        logger.info(
            "portfolio_fetched",
            user_id=user_id,
            tokens=len(tokens),
            nfts=len(nfts)
        )
        
        return portfolio
        
    except Exception as e:
        logger.error("portfolio_fetch_failed", error=str(e), user_id=user_id)
        raise

@mcp.resource("wallet://portfolio")
async def get_portfolio_resource(token: str, user_id: str, wallet_address: str) -> str:
    """
    Get portfolio as MCP resource (formatted text for LLM)
    """
    portfolio = await get_wallet_portfolio(wallet_address, token, user_id)
    
    # Format as readable text
    text = f"Wallet: {portfolio['wallet_address']}\n\n"
    text += f"Tokens ({portfolio['total_tokens']}):\n"
    for token in portfolio['tokens'][:10]:  # Top 10
        text += f"- {token.get('content', {}).get('metadata', {}).get('name', 'Unknown')}\n"
    
    text += f"\nNFTs ({portfolio['total_nfts']}):\n"
    for nft in portfolio['nfts'][:10]:  # Top 10
        text += f"- {nft.get('content', {}).get('metadata', {}).get('name', 'Unknown')}\n"
    
    return text

if __name__ == "__main__":
    mcp.run(transport="http", port=8003)
```

---

## Testing RAG & MCP

### RAG Tests

```python
# tests/test_rag.py
import pytest
from ordo_backend.rag.retriever import RAGRetriever

@pytest.mark.asyncio
async def test_rag_semantic_search():
    """Test RAG returns relevant documents"""
    retriever = RAGRetriever(embedder, vector_store)
    
    # Query
    results = await retriever.query("How do I create a Solana wallet?", top_k=5)
    
    # Verify
    assert len(results) > 0
    assert all('content' in r for r in results)
    assert all('similarity' in r for r in results)
    
    # Check relevance (similarity > 0.7)
    assert all(r['similarity'] > 0.7 for r in results)
```

### MCP Tests

```python
# tests/test_mcp.py
import pytest
from langchain_mcp_adapters.client import MultiServerMCPClient

@pytest.mark.asyncio
async def test_mcp_wallet_tool():
    """Test MCP wallet tool execution"""
    client = MultiServerMCPClient({
        "wallet": {"url": "http://localhost:8003/mcp", "transport": "http"}
    })
    
    tools = await client.get_tools()
    wallet_tool = next(t for t in tools if t.name == "get_wallet_portfolio")
    
    # Execute tool
    result = await wallet_tool.invoke({
        "wallet_address": "test_address",
        "token": "test_token",
        "user_id": "test_user"
    })
    
    # Verify
    assert 'tokens' in result
    assert 'nfts' in result
```

---

## Summary

- **RAG System**: Semantic search over Solana/Seeker docs using Mistral embeddings + Supabase pgvector
- **MCP Servers**: Standardized tool interface for Email, Social, Wallet, DeFi, NFT, Trading
- **Interceptors**: Inject permissions, tokens, and audit logging into all tool calls
- **Testing**: Property-based tests for RAG relevance and MCP tool execution

This architecture ensures Ordo can intelligently retrieve documentation and execute tools while maintaining strict security controls.
