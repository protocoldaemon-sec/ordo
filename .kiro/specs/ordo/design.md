# Design Document: Ordo

## Overview

Ordo is a privacy-first AI assistant for Solana Seeker that provides intelligent access to multiple data surfaces (Gmail, X/Twitter, Telegram, Solana wallet) while enforcing strict privacy controls. The system architecture follows a client-server model with a React Native frontend and Python FastAPI backend.

### Key Design Principles

1. **Privacy by Default**: All sensitive data is filtered at multiple layers (client, server, AI prompt)
2. **Explicit Consent**: Users must approve all write operations before execution
3. **Zero Private Key Access**: Wallet integration uses Seed Vault and MWA exclusively
4. **Source Attribution**: All responses cite data sources for transparency
5. **Graceful Degradation**: System functions with partial permissions and handles failures elegantly

### Technology Stack

**Frontend (React Native + TypeScript)**
- Solana Mobile Stack (MWA, Seed Vault)
- React Native for cross-platform mobile UI
- Expo for rapid development and OTA updates
- Async storage for encrypted caching
- OAuth libraries for Gmail, X authentication
- **Voice Integration**: Expo Speech for TTS/STT
- **Push Notifications**: Expo Notifications
- **Biometric Auth**: Expo Local Authentication
- **Background Tasks**: Expo Background Fetch
- **Share Extension**: React Native Share
- **Deep Linking**: Expo Linking for assistant integration

**Backend (Python + FastAPI)**
- FastAPI for REST API endpoints
- LangGraph for agent orchestration
- LangChain for tool integration
- **LangChain MCP Adapters** for standardized tool integration
- Supabase pgvector for RAG embeddings
- PostgreSQL for audit logs and state

**External Services**
- Google Gmail API (OAuth 2.0, gmail.readonly scope)
- X/Twitter API (OAuth 2.0, read DMs/mentions)
- Telegram Bot API (bot token authentication)
- Helius RPC (DAS API, Enhanced Transactions, Priority Fees, Sender)
- **Mistral AI API** (mistral-large for LLM inference, mistral-embed for embeddings)
- Brave Search API (web search)

**Model Context Protocol (MCP) Integration**
- MCP standardizes how Ordo provides tools and context to LLMs
- All external tool integrations (DeFi, NFT, Trading) exposed via MCP servers
- MCP interceptors for runtime context injection (user permissions, API keys)
- MCP resources for exposing user data (emails, messages, portfolio)
- MCP prompts for reusable templates
- **Kiro MCP Integration**: Development and testing using Kiro's built-in MCP support

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Native Frontend                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ UI Components│  │Orchestration │  │  Permission  │      │
│  │              │◄─┤   Engine     │◄─┤   Manager    │      │
│  └──────────────┘  └──────┬───────┘  └──────────────┘      │
│                            │                                 │
│  ┌──────────────┐  ┌──────▼───────┐  ┌──────────────┐      │
│  │   Context    │  │   Adapters   │  │   Security   │      │
│  │  Aggregator  │  │ (Gmail, X,   │  │   Filters    │      │
│  │              │  │ Telegram, SW)│  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS/REST
┌─────────────────────────▼───────────────────────────────────┐
│                    FastAPI Backend                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  API Routes  │  │  LangGraph   │  │    Policy    │      │
│  │              │─►│ Orchestrator │◄─┤    Engine    │      │
│  └──────────────┘  └──────┬───────┘  └──────────────┘      │
│                            │                                 │
│  ┌──────────────┐  ┌──────▼───────┐  ┌──────────────┐      │
│  │     RAG      │  │    Tools     │  │    Audit     │      │
│  │  (pgvector)  │  │ (email,      │  │    Logger    │      │
│  │              │  │ social, etc) │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────┬───────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
    │  Gmail  │     │    X    │     │ Helius  │
    │   API   │     │   API   │     │   RPC   │
    └─────────┘     └─────────┘     └─────────┘
```

### Three-Tier Permission Architecture

**Tier 1: Surface Access Control (User-Granted)**
- Managed by PermissionManager in frontend
- Permissions stored in encrypted local storage
- OAuth tokens managed per surface
- Revocation triggers token invalidation and cache deletion

**Tier 2: Policy-Based Filtering (Auto-Enforced)**
- Managed by PolicyEngine in backend
- Content scanning before returning to frontend
- Pattern matching for sensitive data
- Audit logging of blocked attempts

**Tier 3: Action Confirmation (User-in-the-Loop)**
- Managed by OrchestrationEngine in frontend
- Preview dialogs for all write operations
- Explicit user approval required
- Cancellation support with operation abort

### Data Flow

**Read Operation Flow:**
1. User submits query via UI
2. OrchestrationEngine analyzes query and determines required tools
3. PermissionManager checks if required surface permissions are granted
4. Frontend sends API request to backend with user tokens
5. Backend executes tools and retrieves data from external APIs
6. PolicyEngine scans results and filters sensitive data
7. Backend returns filtered results to frontend
8. ContextAggregator combines multi-surface results
9. UI displays response with source citations

**Write Operation Flow:**
1. User submits action request (send email, sign transaction)
2. OrchestrationEngine prepares action payload
3. UI displays preview dialog with action details
4. User confirms or cancels action
5. If confirmed, frontend sends execution request to backend
6. Backend executes action via appropriate API
7. Backend returns execution result
8. UI displays success/failure message

## Components and Interfaces

### Frontend Components

#### OrchestrationEngine

**Responsibilities:**
- Parse user queries and determine required tools
- Route tool requests to appropriate adapters
- Coordinate multi-tool execution (parallel/sequential)
- Handle errors and partial failures
- Manage conversation context

**Interface:**
```typescript
interface OrchestrationEngine {
  // Process user query and return response
  processQuery(query: string, conversationId: string): Promise<QueryResponse>;
  
  // Execute specific tool with parameters
  executeTool(toolName: string, params: ToolParams): Promise<ToolResult>;
  
  // Check if query requires permissions not yet granted
  checkRequiredPermissions(query: string): Promise<Permission[]>;
}

interface QueryResponse {
  text: string;
  sources: Source[];
  suggestedActions?: Action[];
  requiresConfirmation?: ConfirmationRequest;
}

interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
  filteredCount?: number; // Number of items filtered by policy
}
```


#### PermissionManager

**Responsibilities:**
- Store and retrieve permission states
- Manage OAuth tokens and refresh flows
- Handle permission grant/revoke operations
- Validate permission requirements before tool execution

**Interface:**
```typescript
interface PermissionManager {
  // Check if specific permission is granted
  hasPermission(permission: Permission): Promise<boolean>;
  
  // Request permission from user
  requestPermission(permission: Permission): Promise<PermissionResult>;
  
  // Revoke permission and clean up
  revokePermission(permission: Permission): Promise<void>;
  
  // Get OAuth token for surface
  getToken(surface: Surface): Promise<string | null>;
  
  // Refresh expired token
  refreshToken(surface: Surface): Promise<string>;
  
  // Get all granted permissions
  getGrantedPermissions(): Promise<Permission[]>;
}

enum Permission {
  READ_GMAIL = 'READ_GMAIL',
  READ_SOCIAL_X = 'READ_SOCIAL_X',
  READ_SOCIAL_TELEGRAM = 'READ_SOCIAL_TELEGRAM',
  READ_WALLET = 'READ_WALLET',
  SIGN_TRANSACTIONS = 'SIGN_TRANSACTIONS'
}

enum Surface {
  GMAIL = 'GMAIL',
  X = 'X',
  TELEGRAM = 'TELEGRAM',
  WALLET = 'WALLET'
}

interface PermissionResult {
  granted: boolean;
  token?: string;
  error?: string;
}
```

#### ContextAggregator

**Responsibilities:**
- Combine results from multiple surfaces
- Maintain source attribution
- Format combined data for display
- Handle conflicting or duplicate information

**Interface:**
```typescript
interface ContextAggregator {
  // Combine results from multiple tool executions
  aggregateResults(results: ToolResult[]): Promise<AggregatedContext>;
  
  // Format aggregated context for LLM consumption
  formatForLLM(context: AggregatedContext): string;
  
  // Extract source citations from context
  extractSources(context: AggregatedContext): Source[];
}

interface AggregatedContext {
  surfaces: SurfaceData[];
  combinedText: string;
  sources: Source[];
  metadata: ContextMetadata;
}

interface SurfaceData {
  surface: Surface;
  data: any;
  timestamp: Date;
  itemCount: number;
}

interface Source {
  surface: Surface;
  identifier: string; // email ID, tweet ID, etc.
  timestamp: Date;
  preview: string;
}
```


#### Surface Adapters

**GmailAdapter:**
```typescript
interface GmailAdapter {
  // Search email threads
  searchThreads(query: string, maxResults: number): Promise<EmailThread[]>;
  
  // Get specific email by ID
  getEmail(emailId: string): Promise<Email>;
  
  // Get thread by ID
  getThread(threadId: string): Promise<EmailThread>;
}

interface EmailThread {
  id: string;
  subject: string;
  participants: string[];
  messageCount: number;
  lastMessageDate: Date;
  snippet: string;
}

interface Email {
  id: string;
  threadId: string;
  from: string;
  to: string[];
  subject: string;
  body: string;
  date: Date;
  labels: string[];
}
```

**XAdapter:**
```typescript
interface XAdapter {
  // Get recent DMs
  getDMs(limit: number): Promise<DirectMessage[]>;
  
  // Get mentions
  getMentions(limit: number): Promise<Tweet[]>;
  
  // Get specific conversation
  getConversation(conversationId: string): Promise<DirectMessage[]>;
}

interface DirectMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderUsername: string;
  text: string;
  timestamp: Date;
}

interface Tweet {
  id: string;
  authorId: string;
  authorUsername: string;
  text: string;
  timestamp: Date;
  inReplyToId?: string;
}
```

**TelegramAdapter:**
```typescript
interface TelegramAdapter {
  // Get recent messages
  getMessages(limit: number): Promise<TelegramMessage[]>;
  
  // Get messages from specific chat
  getChatMessages(chatId: string, limit: number): Promise<TelegramMessage[]>;
}

interface TelegramMessage {
  id: string;
  chatId: string;
  fromId: string;
  fromUsername?: string;
  text: string;
  timestamp: Date;
}
```

**SeedVaultAdapter:**
```typescript
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { Transaction, VersionedTransaction } from '@solana/web3.js';

interface SeedVaultAdapter {
  // Get wallet address without accessing private key
  getAddress(): Promise<string>;
  
  // Request transaction signature via MWA
  signTransaction(transaction: Transaction | VersionedTransaction): Promise<SignedTransaction>;
  
  // Sign multiple transactions in batch
  signTransactions(transactions: (Transaction | VersionedTransaction)[]): Promise<SignedTransaction[]>;
  
  // Check if Seed Vault is available
  isAvailable(): Promise<boolean>;
  
  // Authorize session with Seed Vault
  authorize(cluster: string): Promise<AuthorizationResult>;
}

interface AuthorizationResult {
  address: string;
  publicKey: PublicKey;
  accountLabel?: string;
  walletUriBase?: string;
}

interface SignedTransaction {
  signature: Uint8Array;
  transaction: Transaction | VersionedTransaction;
}

// Implementation using MWA transact pattern
async function signTransactionWithMWA(
  transaction: Transaction
): Promise<SignedTransaction> {
  return await transact(async (wallet) => {
    // Authorize if needed
    const authResult = await wallet.authorize({
      cluster: 'mainnet-beta',
      identity: {
        name: 'Ordo',
        uri: 'https://ordo.app',
        icon: 'favicon.ico'
      }
    });
    
    // Sign transaction
    const signedTxs = await wallet.signTransactions({
      transactions: [transaction]
    });
    
    return {
      signature: signedTxs[0].signature,
      transaction: signedTxs[0]
    };
  });
}
```


#### Security Components

**PromptIsolation:**
```typescript
interface PromptIsolation {
  // Sanitize user input before sending to LLM
  sanitizeInput(input: string): string;
  
  // Validate LLM response before displaying
  validateResponse(response: string): ValidationResult;
  
  // Check for prompt injection attempts
  detectInjection(input: string): boolean;
}

interface ValidationResult {
  safe: boolean;
  issues: string[];
  sanitizedResponse?: string;
}
```

**SensitiveDataFilter (Client-Side):**
```typescript
interface SensitiveDataFilter {
  // Scan text for sensitive patterns
  scanText(text: string): ScanResult;
  
  // Redact sensitive data from text
  redactSensitiveData(text: string): string;
  
  // Check if text contains only sensitive data
  isOnlySensitiveData(text: string): boolean;
}

interface ScanResult {
  hasSensitiveData: boolean;
  patterns: SensitivePattern[];
  redactedText: string;
}

enum SensitivePattern {
  OTP_CODE = 'OTP_CODE',
  VERIFICATION_CODE = 'VERIFICATION_CODE',
  RECOVERY_PHRASE = 'RECOVERY_PHRASE',
  PASSWORD = 'PASSWORD',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
  SSN = 'SSN'
}
```

### Backend Components

#### API Routes (FastAPI)

**Endpoints:**
```python
# Query endpoint
POST /api/v1/query
Request: {
  "query": str,
  "conversation_id": str,
  "permissions": List[str],
  "tokens": Dict[str, str]  # Surface -> OAuth token
}
Response: {
  "response": str,
  "sources": List[Source],
  "suggested_actions": List[Action],
  "requires_confirmation": Optional[ConfirmationRequest]
}

# Tool execution endpoint
POST /api/v1/tools/{tool_name}
Request: {
  "params": Dict[str, Any],
  "tokens": Dict[str, str]
}
Response: {
  "success": bool,
  "data": Any,
  "error": Optional[str],
  "filtered_count": int
}

# RAG query endpoint
POST /api/v1/rag/query
Request: {
  "query": str,
  "top_k": int
}
Response: {
  "results": List[Document],
  "sources": List[str]
}

# Audit log endpoint
GET /api/v1/audit
Query params: surface, start_date, end_date
Response: {
  "entries": List[AuditEntry]
}
```


#### LangGraph Orchestrator

**Responsibilities:**
- Manage agent workflow state
- Route queries to appropriate tools
- Handle tool execution and result aggregation
- Implement retry logic and error handling
- **Integrate MCP servers for standardized tool access**

**MCP Integration Architecture:**

Ordo uses the Model Context Protocol (MCP) to standardize tool integration. All external tools (DeFi, NFT, Trading, Email, Social) are exposed as MCP servers, providing a consistent interface for the LangGraph orchestrator.

**Benefits of MCP Integration:**
1. **Standardized Tool Interface**: All tools follow the same JSON-RPC protocol
2. **Runtime Context Injection**: MCP interceptors provide access to user permissions, API keys, and state
3. **Multimodal Support**: Tools can return text, images, and structured data
4. **Resource Management**: User data (emails, messages, portfolio) exposed as MCP resources
5. **Prompt Templates**: Reusable prompts for common queries

**MCP Server Architecture:**

```python
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_mcp_adapters.interceptors import MCPToolCallRequest
from langchain_mcp_adapters.callbacks import Callbacks, CallbackContext
from mcp.shared.context import RequestContext
from dataclasses import dataclass

@dataclass
class OrdoContext:
    """Runtime context for MCP tool calls"""
    user_id: str
    permissions: Dict[str, bool]
    tokens: Dict[str, str]  # OAuth tokens per surface
    wallet_address: Optional[str]

# MCP Interceptor for permission checking and token injection
async def inject_ordo_context(
    request: MCPToolCallRequest,
    handler,
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

# MCP Interceptor for audit logging
async def audit_tool_calls(
    request: MCPToolCallRequest,
    handler,
):
    """
    Log all tool executions to audit log
    """
    runtime = request.runtime
    context: OrdoContext = runtime.context
    
    # Log tool call start
    await audit_logger.log_access(
        user_id=context.user_id,
        surface=get_surface_from_tool(request.name),
        action=request.name,
        success=False,  # Will update after execution
        details={"args": request.args}
    )
    
    try:
        result = await handler(request)
        
        # Log success
        await audit_logger.log_access(
            user_id=context.user_id,
            surface=get_surface_from_tool(request.name),
            action=request.name,
            success=True,
            details={"result": result}
        )
        
        return result
    except Exception as e:
        # Log failure
        await audit_logger.log_access(
            user_id=context.user_id,
            surface=get_surface_from_tool(request.name),
            action=request.name,
            success=False,
            details={"error": str(e)}
        )
        raise

# MCP Client Configuration
mcp_client = MultiServerMCPClient(
    {
        # Email MCP Server
        "email": {
            "url": "http://localhost:8001/mcp",
            "transport": "http",
            "headers": {
                "X-Service": "ordo-email"
            }
        },
        # Social MCP Server
        "social": {
            "url": "http://localhost:8002/mcp",
            "transport": "http",
            "headers": {
                "X-Service": "ordo-social"
            }
        },
        # Wallet MCP Server
        "wallet": {
            "url": "http://localhost:8003/mcp",
            "transport": "http",
            "headers": {
                "X-Service": "ordo-wallet"
            }
        },
        # DeFi MCP Server
        "defi": {
            "url": "http://localhost:8004/mcp",
            "transport": "http",
            "headers": {
                "X-Service": "ordo-defi"
            }
        },
        # NFT MCP Server
        "nft": {
            "url": "http://localhost:8005/mcp",
            "transport": "http",
            "headers": {
                "X-Service": "ordo-nft"
            }
        },
        # Trading MCP Server
        "trading": {
            "url": "http://localhost:8006/mcp",
            "transport": "http",
            "headers": {
                "X-Service": "ordo-trading"
            }
        }
    },
    tool_interceptors=[
        inject_ordo_context,
        audit_tool_calls
    ],
    callbacks=Callbacks(
        on_progress=lambda ctx, params, callback_ctx: print(f"Progress: {params.progress}"),
        on_log=lambda ctx, params, callback_ctx: print(f"Log: {params.message}")
    )
)
```

**MCP Server Implementation Example (Email Server):**

```python
from fastmcp import FastMCP
from mcp.types import Tool, TextContent, ImageContent

# Create MCP server for email tools
email_mcp = FastMCP("Ordo Email Server")

@email_mcp.tool()
async def search_email_threads(
    query: str,
    token: str,
    user_id: str,
    max_results: int = 10
) -> list[dict]:
    """
    Search Gmail threads using Gmail API
    
    Args:
        query: Search query string
        token: OAuth token for Gmail API
        user_id: User ID for audit logging
        max_results: Maximum number of results to return
    
    Returns:
        List of email threads with subject, sender, date
    """
    # Implementation from email_tools.py
    threads = await _search_gmail_threads(query, token, max_results)
    
    # Apply policy filtering
    filtered_threads = await policy_engine.filter_emails(threads)
    
    return filtered_threads

@email_mcp.tool()
async def get_email_content(
    email_id: str,
    token: str,
    user_id: str
) -> dict:
    """
    Retrieve specific email content
    
    Args:
        email_id: Gmail message ID
        token: OAuth token for Gmail API
        user_id: User ID for audit logging
    
    Returns:
        Email with subject, sender, body, date
    """
    # Implementation from email_tools.py
    email = await _get_gmail_content(email_id, token)
    
    # Apply policy filtering
    if policy_engine.is_sensitive(email.body):
        await audit_logger.log_policy_violation(
            user_id=user_id,
            surface="GMAIL",
            pattern="SENSITIVE_CONTENT",
            content_preview=email.subject
        )
        raise ValueError("Email contains sensitive data and cannot be displayed")
    
    return email

# MCP Resource for user's email list
@email_mcp.resource("email://inbox")
async def get_inbox(token: str, user_id: str) -> str:
    """
    Get user's inbox as a resource
    Returns formatted list of recent emails
    """
    threads = await search_email_threads("in:inbox", token, user_id, max_results=50)
    return format_threads_as_text(threads)

# MCP Prompt template for email search
@email_mcp.prompt()
async def email_search_prompt(topic: str) -> list:
    """
    Generate prompt for email search
    
    Args:
        topic: Topic to search for
    
    Returns:
        List of messages for the LLM
    """
    return [
        {
            "role": "system",
            "content": "You are helping search emails. Be concise and cite sources."
        },
        {
            "role": "user",
            "content": f"Search my emails for: {topic}"
        }
    ]

# Run MCP server
if __name__ == "__main__":
    email_mcp.run(transport="http", port=8001)
```

**Architecture:**
```python
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolExecutor
from langchain_mistralai import ChatMistralAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from typing import TypedDict, List, Dict, Any, Optional

class AgentState(TypedDict):
    """LangGraph agent state"""
    query: str
    messages: List[Any]
    intent: Optional[str]
    required_tools: List[str]
    required_permissions: List[str]
    tool_results: Dict[str, Any]
    filtered_results: Dict[str, Any]
    response: Optional[str]
    sources: List[Dict[str, Any]]
    errors: List[str]
    user_id: str
    permissions: Dict[str, bool]

class OrdoAgent:
    """LangGraph-based agent orchestrator with MCP integration"""
    
    def __init__(self, llm, policy_engine):
        self.llm = llm
        self.policy_engine = policy_engine
        
        # Initialize MCP client with all tool servers
        self.mcp_client = MultiServerMCPClient(
            {
                "email": {"url": "http://localhost:8001/mcp", "transport": "http"},
                "social": {"url": "http://localhost:8002/mcp", "transport": "http"},
                "wallet": {"url": "http://localhost:8003/mcp", "transport": "http"},
                "defi": {"url": "http://localhost:8004/mcp", "transport": "http"},
                "nft": {"url": "http://localhost:8005/mcp", "transport": "http"},
                "trading": {"url": "http://localhost:8006/mcp", "transport": "http"},
            },
            tool_interceptors=[
                inject_ordo_context,
                audit_tool_calls
            ]
        )
        
        # Load tools from MCP servers
        self.tools = None  # Will be loaded async
        self.graph = None  # Will be built after tools are loaded
    
    async def initialize(self):
        """Initialize MCP tools and build graph"""
        # Load all tools from MCP servers
        self.tools = await self.mcp_client.get_tools()
        
        # Build LangGraph workflow
        self.graph = self._build_graph()
    
    def _build_graph(self) -> StateGraph:
        """Build LangGraph workflow"""
        workflow = StateGraph(AgentState)
        
        # Add nodes
        workflow.add_node("parse_query", self.parse_query_node)
        workflow.add_node("check_permissions", self.check_permissions_node)
        workflow.add_node("select_tools", self.select_tools_node)
        workflow.add_node("execute_tools", self.execute_tools_node)
        workflow.add_node("filter_results", self.filter_results_node)
        workflow.add_node("aggregate_results", self.aggregate_results_node)
        workflow.add_node("generate_response", self.generate_response_node)
        
        # Set entry point
        workflow.set_entry_point("parse_query")
        
        # Add edges
        workflow.add_edge("parse_query", "check_permissions")
        workflow.add_conditional_edges(
            "check_permissions",
            self.should_continue_after_permissions,
            {
                "continue": "select_tools",
                "error": "generate_response"
            }
        )
        workflow.add_edge("select_tools", "execute_tools")
        workflow.add_edge("execute_tools", "filter_results")
        workflow.add_edge("filter_results", "aggregate_results")
        workflow.add_edge("aggregate_results", "generate_response")
        workflow.add_edge("generate_response", END)
        
        return workflow.compile()
    
    async def parse_query_node(self, state: AgentState) -> AgentState:
        """Analyze user query and extract intent"""
        messages = [
            SystemMessage(content=ORDO_SYSTEM_PROMPT),
            HumanMessage(content=f"Analyze this query and determine intent: {state['query']}")
        ]
        
        response = await self.llm.ainvoke(messages)
        
        # Extract intent and required tools from LLM response
        # This would use structured output or function calling
        state["intent"] = response.content
        state["messages"].append(response)
        
        return state
    
    async def check_permissions_node(self, state: AgentState) -> AgentState:
        """Verify required permissions are available"""
        # Determine which surfaces are needed based on intent
        required_surfaces = self._extract_required_surfaces(state["intent"])
        
        missing_permissions = []
        for surface in required_surfaces:
            if not state["permissions"].get(surface, False):
                missing_permissions.append(surface)
        
        if missing_permissions:
            state["errors"].append(
                f"Missing permissions: {', '.join(missing_permissions)}"
            )
        
        state["required_permissions"] = required_surfaces
        return state
    
    def should_continue_after_permissions(self, state: AgentState) -> str:
        """Decide whether to continue or return error"""
        if state["errors"]:
            return "error"
        return "continue"
    
    async def select_tools_node(self, state: AgentState) -> AgentState:
        """Determine which tools to execute"""
        messages = state["messages"] + [
            HumanMessage(content=f"Select tools for: {state['query']}")
        ]
        
        # Use LLM with function calling to select tools
        response = await self.llm.ainvoke(
            messages,
            functions=self._get_tool_schemas()
        )
        
        # Extract tool calls from response
        state["required_tools"] = [
            call["name"] for call in response.additional_kwargs.get("function_calls", [])
        ]
        state["messages"].append(response)
        
        return state
    
    async def execute_tools_node(self, state: AgentState) -> AgentState:
        """Execute selected tools"""
        results = {}
        
        for tool_name in state["required_tools"]:
            try:
                # Execute tool with appropriate parameters
                result = await self.tool_executor.ainvoke({
                    "tool": tool_name,
                    "tool_input": self._extract_tool_params(state, tool_name)
                })
                results[tool_name] = result
            except Exception as e:
                state["errors"].append(f"Tool {tool_name} failed: {str(e)}")
        
        state["tool_results"] = results
        return state
    
    async def filter_results_node(self, state: AgentState) -> AgentState:
        """Apply policy engine to results"""
        filtered = {}
        
        for tool_name, result in state["tool_results"].items():
            # Determine surface from tool name
            surface = self._get_surface_from_tool(tool_name)
            
            # Apply policy filtering
            filtered_result = await self.policy_engine.filter_content(
                result,
                surface,
                state["user_id"]
            )
            
            filtered[tool_name] = filtered_result
        
        state["filtered_results"] = filtered
        return state
    
    async def aggregate_results_node(self, state: AgentState) -> AgentState:
        """Combine multi-surface data"""
        # Combine results from all tools
        combined_data = []
        sources = []
        
        for tool_name, result in state["filtered_results"].items():
            combined_data.append(result)
            sources.extend(self._extract_sources(result, tool_name))
        
        state["sources"] = sources
        return state
    
    async def generate_response_node(self, state: AgentState) -> AgentState:
        """Create natural language response with citations"""
        if state["errors"]:
            # Generate error response
            state["response"] = self._generate_error_response(state["errors"])
        else:
            # Generate success response with citations
            context = self._format_context(state["filtered_results"])
            
            messages = [
                SystemMessage(content=ORDO_SYSTEM_PROMPT),
                HumanMessage(content=f"Context: {context}\n\nQuery: {state['query']}\n\nGenerate response with inline citations.")
            ]
            
            response = await self.llm.ainvoke(messages)
            state["response"] = response.content
        
        return state
    
    async def process_query(self, query: str, context: Dict) -> Dict[str, Any]:
        """Process user query through agent workflow"""
        initial_state = AgentState(
            query=query,
            messages=[],
            intent=None,
            required_tools=[],
            required_permissions=[],
            tool_results={},
            filtered_results={},
            response=None,
            sources=[],
            errors=[],
            user_id=context["user_id"],
            permissions=context["permissions"]
        )
        
        # Run the graph
        final_state = await self.graph.ainvoke(initial_state)
        
        return {
            "response": final_state["response"],
            "sources": final_state["sources"],
            "errors": final_state["errors"]
        }

# Privacy-aware system prompt
ORDO_SYSTEM_PROMPT = """You are Ordo, a privacy-first AI assistant for Solana Seeker users.

CRITICAL RULES:
1. NEVER extract or repeat OTP, verification codes, recovery phrases, or passwords from emails/messages
2. NEVER auto-send emails, DMs, or transactions without explicit user confirmation
3. ALWAYS cite sources when answering from email/social/wallet data
4. Treat all user data (email content, DMs, wallet activity) as confidential
5. If a query requires blocked data (OTP, bank statements), politely refuse and explain

CAPABILITIES:
- Read Gmail (excluding verification/OTP emails)
- Read X/Telegram DMs and mentions
- View Solana wallet portfolio and transaction history
- Build Solana transaction payloads (user must sign via Seed Vault)
- Search web and Solana ecosystem docs

TONE: Helpful, transparent, and security-conscious

When citing sources, use format: [source_type:id] where source_type is gmail, x, telegram, wallet, or web."""
```

**Agent Workflow States:**
1. **parse_query**: Analyze user query and extract intent using LLM
2. **check_permissions**: Verify required permissions are available in user context
3. **select_tools**: Use LLM function calling to determine which tools to execute
4. **execute_tools**: Run tools in parallel/sequential as needed with error handling
5. **filter_results**: Apply PolicyEngine to scan and filter sensitive data
6. **aggregate_results**: Combine multi-surface data with source attribution
7. **generate_response**: Create natural language response with inline citations

#### PolicyEngine

**Responsibilities:**
- Scan content for sensitive data patterns
- Block content matching sensitive patterns
- Log blocked access attempts
- Maintain pattern definitions

**Implementation:**
```python
class PolicyEngine:
    """Content filtering and policy enforcement"""
    
    def __init__(self):
        self.patterns = self._load_patterns()
        self.audit_logger = AuditLogger()
    
    def scan_content(self, content: str, surface: str) -> ScanResult:
        """Scan content for sensitive data"""
        pass
    
    def filter_emails(self, emails: List[Email]) -> List[Email]:
        """Filter email list, removing sensitive emails"""
        pass
    
    def filter_messages(self, messages: List[Message]) -> List[Message]:
        """Filter message list, removing sensitive messages"""
        pass
    
    def is_sensitive(self, text: str) -> Tuple[bool, List[str]]:
        """Check if text contains sensitive data"""
        pass
```

**Sensitive Data Patterns:**
```python
PATTERNS = {
    'OTP_CODE': r'\b\d{4,8}\b.*(?:code|otp|verification)',
    'VERIFICATION_CODE': r'(?:verification|confirm|verify).*code.*\d{4,8}',
    'RECOVERY_PHRASE': r'\b(?:word\s+\d+|seed phrase|recovery phrase)\b',
    'PASSWORD_RESET': r'(?:reset|change).*password',
    'BANK_STATEMENT': r'(?:bank statement|account balance|routing number)',
    'TAX_DOCUMENT': r'(?:tax return|1099|W-2|tax document)',
    'SSN': r'\b\d{3}-\d{2}-\d{4}\b',
    'CREDIT_CARD': r'\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b'
}
```


#### Tool Modules

**email_tools.py:**
```python
async def search_email_threads(
    query: str,
    token: str,
    max_results: int = 10
) -> List[EmailThread]:
    """Search Gmail threads using Gmail API"""
    pass

async def get_email_content(
    email_id: str,
    token: str
) -> Email:
    """Retrieve specific email content"""
    pass

async def send_email(
    to: str,
    subject: str,
    body: str,
    token: str
) -> SendResult:
    """Send email via Gmail API (requires confirmation)"""
    pass
```

**social_tools.py:**
```python
async def get_x_dms(
    token: str,
    limit: int = 20
) -> List[DirectMessage]:
    """Retrieve X/Twitter DMs"""
    pass

async def get_x_mentions(
    token: str,
    limit: int = 20
) -> List[Tweet]:
    """Retrieve X/Twitter mentions"""
    pass

async def get_telegram_messages(
    bot_token: str,
    limit: int = 20
) -> List[TelegramMessage]:
    """Retrieve Telegram messages via Bot API"""
    pass

async def send_telegram_message(
    bot_token: str,
    chat_id: str,
    text: str
) -> SendResult:
    """Send Telegram message (requires confirmation)"""
    pass
```

**wallet_tools.py:**
```python
import httpx
from typing import List, Optional, Dict, Any
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.system_program import transfer, TransferParams

async def get_wallet_portfolio(
    address: str,
    helius_api_key: str
) -> Portfolio:
    """
    Get wallet portfolio using Helius DAS API getAssetsByOwner
    Returns NFTs, compressed NFTs, fungible tokens, and native SOL
    """
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://mainnet.helius-rpc.com/?api-key={helius_api_key}",
            json={
                "jsonrpc": "2.0",
                "id": "ordo-portfolio",
                "method": "getAssetsByOwner",
                "params": {
                    "ownerAddress": address,
                    "page": 1,
                    "limit": 1000,
                    "displayOptions": {
                        "showFungible": True,
                        "showNativeBalance": True
                    }
                }
            }
        )
        data = response.json()
        
        # Parse assets into tokens and NFTs
        assets = data.get("result", {}).get("items", [])
        tokens = []
        nfts = []
        
        for asset in assets:
            if asset.get("interface") == "FungibleToken":
                tokens.append(TokenBalance(
                    mint=asset["id"],
                    symbol=asset.get("content", {}).get("metadata", {}).get("symbol", ""),
                    name=asset.get("content", {}).get("metadata", {}).get("name", ""),
                    balance=float(asset.get("token_info", {}).get("balance", 0)),
                    decimals=asset.get("token_info", {}).get("decimals", 0),
                    value_usd=asset.get("token_info", {}).get("price_info", {}).get("total_price", 0),
                    price_change_24h=0.0  # Would need additional API call
                ))
            elif asset.get("interface") in ["NFT", "ProgrammableNFT"]:
                nfts.append(NFT(
                    mint=asset["id"],
                    name=asset.get("content", {}).get("metadata", {}).get("name", ""),
                    collection=asset.get("grouping", [{}])[0].get("group_value", ""),
                    image_url=asset.get("content", {}).get("links", {}).get("image", ""),
                    floor_price_sol=None  # Would need marketplace API
                ))
        
        return Portfolio(
            address=address,
            total_value_usd=sum(t.value_usd for t in tokens),
            tokens=tokens,
            nfts=nfts,
            last_updated=datetime.now()
        )

async def get_token_balances(
    address: str,
    helius_api_key: str
) -> List[TokenBalance]:
    """Get token balances using Helius DAS API"""
    portfolio = await get_wallet_portfolio(address, helius_api_key)
    return portfolio.tokens

async def build_transfer_transaction(
    from_address: str,
    to_address: str,
    amount: int,
    token_mint: Optional[str] = None
) -> Dict[str, Any]:
    """
    Build transfer transaction (SOL or SPL token)
    Returns serialized transaction for frontend to sign via MWA
    """
    from_pubkey = Pubkey.from_string(from_address)
    to_pubkey = Pubkey.from_string(to_address)
    
    if token_mint is None:
        # SOL transfer
        tx = Transaction().add(
            transfer(
                TransferParams(
                    from_pubkey=from_pubkey,
                    to_pubkey=to_pubkey,
                    lamports=amount
                )
            )
        )
    else:
        # SPL token transfer - would use Token Program
        # Implementation depends on whether using Token or Token-2022
        pass
    
    # Return serialized transaction
    return {
        "transaction": tx.serialize(verify_signatures=False).hex(),
        "from": from_address,
        "to": to_address,
        "amount": amount,
        "token_mint": token_mint
    }

async def get_transaction_history(
    address: str,
    helius_api_key: str,
    limit: int = 50
) -> List[TransactionRecord]:
    """
    Get transaction history using Helius Enhanced Transactions API
    Uses getTransactionsForAddress (Helius-exclusive) which includes token account transactions
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.helius.xyz/v0/addresses/{address}/transactions",
            params={
                "api-key": helius_api_key,
                "limit": limit,
                "type": "TRANSFER"  # Can filter by type: SWAP, NFT_SALE, etc.
            }
        )
        data = response.json()
        
        transactions = []
        for tx in data:
            transactions.append(TransactionRecord(
                signature=tx["signature"],
                timestamp=datetime.fromtimestamp(tx["timestamp"]),
                type=tx["type"],
                source=tx.get("source", "UNKNOWN"),
                fee=tx["fee"],
                native_transfers=tx.get("nativeTransfers", []),
                token_transfers=tx.get("tokenTransfers", []),
                description=tx.get("description", "")
            ))
        
        return transactions

async def get_priority_fee_estimate(
    helius_api_key: str,
    account_keys: Optional[List[str]] = None
) -> Dict[str, int]:
    """
    Get priority fee estimates using Helius Priority Fee API
    Returns recommended fees at different priority levels
    """
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://mainnet.helius-rpc.com/?api-key={helius_api_key}",
            json={
                "jsonrpc": "2.0",
                "id": "ordo-priority-fee",
                "method": "getPriorityFeeEstimate",
                "params": [{
                    "accountKeys": account_keys,
                    "options": {
                        "includeAllPriorityFeeLevels": True
                    }
                }]
            }
        )
        data = response.json()
        result = data.get("result", {})
        
        return {
            "min": result.get("priorityFeeLevels", {}).get("min", 0),
            "low": result.get("priorityFeeLevels", {}).get("low", 0),
            "medium": result.get("priorityFeeLevels", {}).get("medium", 0),
            "high": result.get("priorityFeeLevels", {}).get("high", 0),
            "veryHigh": result.get("priorityFeeLevels", {}).get("veryHigh", 0),
            "unsafeMax": result.get("priorityFeeLevels", {}).get("unsafeMax", 0)
        }
```

**web_tools.py:**
```python
async def web_search(
    query: str,
    search_api_key: str,
    num_results: int = 5
) -> List[SearchResult]:
    """Perform web search using search API"""
    pass

async def fetch_url_content(
    url: str
) -> str:
    """Fetch and extract text content from URL"""
    pass
```


#### RAG System

**Responsibilities:**
- Store and retrieve documentation embeddings
- Perform semantic search over documentation
- Maintain up-to-date documentation corpus
- Provide source attribution for retrieved documents

**Implementation:**
```python
class RAGSystem:
    """Retrieval-Augmented Generation system"""
    
    def __init__(self, supabase_client, embedding_model):
        self.supabase = supabase_client
        self.embedding_model = embedding_model
    
    async def query(
        self,
        query: str,
        top_k: int = 5,
        filter_source: Optional[str] = None
    ) -> List[Document]:
        """Query documentation using semantic search"""
        pass
    
    async def add_documents(
        self,
        documents: List[Document]
    ) -> None:
        """Add documents to vector database"""
        pass
    
    async def update_documentation(
        self,
        source: str
    ) -> None:
        """Update documentation from source"""
        pass
```

**Document Schema:**
```python
class Document:
    id: str
    source: str  # 'solana_docs', 'seeker_docs', 'dapp_docs'
    title: str
    content: str
    url: Optional[str]
    embedding: List[float]
    metadata: Dict[str, Any]
    last_updated: datetime
```

**Supabase Schema:**
```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY,
    source TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    url TEXT,
    embedding vector(1024),  -- Mistral embedding dimension
    metadata JSONB,
    last_updated TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);
```

#### AuditLogger

**Responsibilities:**
- Log all surface access attempts
- Log policy violations and blocked content
- Provide audit trail for compliance
- Support audit log queries and exports

**Implementation:**
```python
class AuditLogger:
    """Audit logging for compliance and transparency"""
    
    def __init__(self, db_connection):
        self.db = db_connection
    
    async def log_access(
        self,
        user_id: str,
        surface: str,
        action: str,
        success: bool,
        details: Optional[Dict] = None
    ) -> None:
        """Log surface access attempt"""
        pass
    
    async def log_policy_violation(
        self,
        user_id: str,
        surface: str,
        pattern: str,
        content_preview: str
    ) -> None:
        """Log blocked content access"""
        pass
    
    async def get_audit_log(
        self,
        user_id: str,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        surface: Optional[str] = None
    ) -> List[AuditEntry]:
        """Retrieve audit log entries"""
        pass
```

**Audit Log Schema:**
```sql
CREATE TABLE audit_log (
    id UUID PRIMARY KEY,
    user_id TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    surface TEXT NOT NULL,
    action TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    details JSONB,
    policy_violation BOOLEAN DEFAULT FALSE,
    blocked_pattern TEXT
);

CREATE INDEX ON audit_log (user_id, timestamp DESC);
CREATE INDEX ON audit_log (surface, timestamp DESC);
```


## Data Models

### Frontend Data Models

**Permission State:**
```typescript
interface PermissionState {
  permission: Permission;
  granted: boolean;
  grantedAt?: Date;
  token?: string;
  tokenExpiry?: Date;
}

interface PermissionStorage {
  permissions: Map<Permission, PermissionState>;
  lastUpdated: Date;
}
```

**Conversation Context:**
```typescript
interface ConversationContext {
  id: string;
  messages: Message[];
  activeSurfaces: Surface[];
  metadata: ConversationMetadata;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Source[];
  toolCalls?: ToolCall[];
}

interface ToolCall {
  toolName: string;
  params: any;
  result: ToolResult;
  timestamp: Date;
}
```

**Confirmation Request:**
```typescript
interface ConfirmationRequest {
  action: Action;
  preview: ActionPreview;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

interface Action {
  type: 'send_email' | 'send_message' | 'sign_transaction';
  surface: Surface;
  description: string;
}

interface ActionPreview {
  title: string;
  details: Map<string, string>;
  warnings?: string[];
}
```

### Backend Data Models

**Agent State:**
```python
class AgentState(TypedDict):
    """LangGraph agent state"""
    query: str
    intent: Optional[str]
    required_tools: List[str]
    tool_results: Dict[str, Any]
    filtered_results: Dict[str, Any]
    response: Optional[str]
    sources: List[Source]
    errors: List[str]
```

**Tool Result:**
```python
class ToolResult:
    success: bool
    data: Any
    error: Optional[str]
    filtered_count: int
    execution_time: float
    
class FilteredToolResult(ToolResult):
    original_count: int
    blocked_patterns: List[str]
```

**Portfolio Data:**
```python
class Portfolio:
    address: str
    total_value_usd: float
    tokens: List[TokenBalance]
    nfts: List[NFT]
    last_updated: datetime

class TokenBalance:
    mint: str
    symbol: str
    name: str
    balance: float
    decimals: int
    value_usd: float
    price_change_24h: float

class NFT:
    mint: str
    name: str
    collection: str
    image_url: str
    floor_price_sol: Optional[float]
```

**Search Result:**
```python
class SearchResult:
    title: str
    url: str
    snippet: str
    published_date: Optional[datetime]
    source_domain: str
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Security and Privacy Properties

**Property 1: Permission state persistence**
*For any* permission grant operation, storing the permission state and obtaining OAuth tokens should result in the permission being retrievable and the token being available for subsequent API calls.
**Validates: Requirements 1.2**

**Property 2: Permission revocation cleanup**
*For any* permission revocation operation, all associated tokens should be invalidated and all cached data from that surface should be deleted, such that subsequent access attempts fail.
**Validates: Requirements 1.3**

**Property 3: Unauthorized access rejection**
*For any* attempt to access a surface without the required permission, the system should return an error indicating that permission is needed, and no data from that surface should be retrieved.
**Validates: Requirements 1.4**

**Property 4: Permission status completeness**
*For any* permission status query, the returned data should include the permission type, grant status, and grant timestamp for all supported permission types.
**Validates: Requirements 1.6**

**Property 5: Universal content scanning**
*For any* content retrieved from any surface, the PolicyEngine should scan the content for sensitive data patterns before the content is returned to the frontend or included in a response.
**Validates: Requirements 2.1**

**Property 6: Sensitive content filtering**
*For any* email, social media message, or other content that contains sensitive data patterns (OTP, verification codes, recovery phrases, passwords, bank statements, tax documents), that content should be excluded from results and an audit log entry should be created.
**Validates: Requirements 2.2, 2.3, 6.3**

**Property 7: Pattern-based blocking**
*For any* content matching defined sensitive patterns (OTP codes 4-8 digits, verification codes, bank keywords, tax keywords, recovery phrase patterns, password reset patterns), the PolicyEngine should block that content from being returned.
**Validates: Requirements 2.4**

**Property 8: All-blocked refusal**
*For any* query where all retrieved content is blocked by the PolicyEngine, the system should return a polite refusal message explaining that the request cannot be fulfilled due to privacy protections.
**Validates: Requirements 2.5**

**Property 9: Blocked access audit logging**
*For any* content blocked by the PolicyEngine, an audit log entry should be created containing timestamp, surface, and the reason for blocking (pattern type).
**Validates: Requirements 2.6**

**Property 10: Write operation confirmation requirement**
*For any* write operation (send email, send message, sign transaction), the system should display a preview and require explicit user confirmation before executing the operation, with no auto-send or auto-execute capability.
**Validates: Requirements 3.1, 3.2, 3.3, 3.5**

**Property 11: Confirmation cancellation**
*For any* confirmation dialog that is cancelled by the user, the associated write operation should be aborted and no action should be taken on the external service.
**Validates: Requirements 3.6**

**Property 12: Private key isolation**
*For any* wallet operation, the system should never request, store, or transmit private keys or recovery phrases, and should only obtain wallet addresses through Seed Vault without accessing private key material.
**Validates: Requirements 5.1, 5.6**

**Property 13: Sensitive data exclusion from responses**
*For any* generated response, the output should never contain OTP codes, verification codes, passwords, recovery phrases, or bank account numbers, even if such data was present in the input.
**Validates: Requirements 10.2**

**Property 14: Sensitive request refusal**
*For any* user request that would require exposing sensitive data to fulfill, the system should politely refuse and explain the privacy concern rather than attempting to fulfill the request.
**Validates: Requirements 10.3**

**Property 15: Cache encryption and deletion**
*For any* cached data, the data should be encrypted at rest, and when the associated permission is revoked, all cached data from that surface should be deleted.
**Validates: Requirements 10.5**


### Data Integrity and Correctness Properties

**Property 16: Policy-filtered search flow**
*For any* email search query, the query should be routed through the backend proxy and the PolicyEngine should filter results before they are returned to the frontend.
**Validates: Requirements 4.2**

**Property 17: Result structure completeness**
*For any* result returned from a surface (email, social media, wallet), the result should include all required fields for that surface type (e.g., emails include subject, sender, date, content; social messages include sender, timestamp, content; portfolio includes token symbols, amounts, USD values).
**Validates: Requirements 4.3, 5.3, 6.4**

**Property 18: Pre-display filtering**
*For any* specific content retrieval (email, message, etc.), sensitive data filtering should be applied before the content is displayed to the user.
**Validates: Requirements 4.4**

**Property 19: Token expiration handling**
*For any* OAuth token that has expired, the system should detect the expiration when an API call fails with an authentication error and should prompt the user to re-authenticate.
**Validates: Requirements 4.6, 12.1**

**Property 20: Valid transaction construction**
*For any* transaction payload built by the system, the transaction should be a valid Solana transaction with proper instructions, accounts, recent blockhash, and fee payer.
**Validates: Requirements 5.4**

**Property 21: Rate limit queuing**
*For any* API call that fails due to rate limiting, the system should queue the request and inform the user of the delay rather than failing the entire operation.
**Validates: Requirements 6.6, 12.5**

**Property 22: Parallel tool execution**
*For any* set of tool calls that have no dependencies on each other, the OrchestrationEngine should execute those tools in parallel rather than sequentially to minimize latency.
**Validates: Requirements 7.2**

**Property 23: Multi-surface result aggregation**
*For any* query requiring multiple tools, the ContextAggregator should combine results from all successful tool executions into a single coherent response.
**Validates: Requirements 7.3**

**Property 24: Source attribution in responses**
*For any* response that includes information from user data (email, social, wallet) or documentation (RAG, web search), the response should include citations indicating which sources the information came from.
**Validates: Requirements 7.5, 8.3, 10.6, 15.2**

**Property 25: Missing permission error messaging**
*For any* query that cannot be fulfilled due to missing permissions, the error message should explicitly list which permissions are needed and should offer to request those permissions.
**Validates: Requirements 7.6**

**Property 26: RAG semantic retrieval**
*For any* documentation query, the RAG system should retrieve document chunks based on semantic similarity to the query, returning the top-k most relevant documents.
**Validates: Requirements 8.2**

**Property 27: RAG fallback to web search**
*For any* query where the RAG system returns no relevant documents (similarity below threshold or empty results), the system should fall back to web search to find current information.
**Validates: Requirements 8.5, 15.1**

**Property 28: Cross-surface permission checking**
*For any* cross-surface task, the OrchestrationEngine should identify all required surfaces and verify that permissions are granted for each surface before executing any tools.
**Validates: Requirements 9.1**

**Property 29: Source-attributed data merging**
*For any* cross-surface task execution, the ContextAggregator should merge data from multiple sources while maintaining source attribution, such that each piece of information can be traced back to its originating surface.
**Validates: Requirements 9.2, 9.4**

**Property 30: Multi-write confirmation separation**
*For any* cross-surface task that requires multiple write operations, each write operation should receive a separate confirmation request, and the user should be able to approve or reject each operation independently.
**Validates: Requirements 9.5**

**Property 31: Partial failure graceful handling**
*For any* multi-tool execution where some tools fail, the system should complete the available portions using successful tool results and should explain which parts could not be completed and why.
**Validates: Requirements 9.6, 12.4**


### Audit and Compliance Properties

**Property 32: Comprehensive access logging**
*For any* surface access attempt, an audit log entry should be created containing timestamp, user ID, surface, action type, and success/failure status.
**Validates: Requirements 11.1**

**Property 33: Policy violation logging**
*For any* content blocked by the PolicyEngine, the audit log entry should include the reason for blocking (pattern type) but should never include the actual sensitive content.
**Validates: Requirements 11.2, 11.6**

**Property 34: Chronological audit log ordering**
*For any* audit log query, the results should be returned in chronological order (most recent first) with support for filtering by surface, date range, and other criteria.
**Validates: Requirements 11.3**

**Property 35: Audit log retention**
*For any* audit log entry older than 90 days, the entry should be automatically deleted to comply with data retention policies.
**Validates: Requirements 11.4**

**Property 36: Audit log export format**
*For any* audit log export request, the system should generate a valid JSON file containing all audit log entries for the requesting user with proper structure and formatting.
**Validates: Requirements 11.5**

### Error Handling and Resilience Properties

**Property 37: API unavailability error messaging**
*For any* backend API call that fails due to service unavailability, the system should display an error message explaining that the service is temporarily unavailable and should suggest retrying later.
**Validates: Requirements 12.2**

**Property 38: Offline state detection**
*For any* network operation that fails due to lack of connectivity, the system should detect the offline state and inform the user that an internet connection is required.
**Validates: Requirements 12.3**

**Property 39: Error message sanitization**
*For any* error that occurs in the system, the error message displayed to the user should not contain technical details such as stack traces, API keys, or internal system information.
**Validates: Requirements 12.6**

**Property 40: Web search API fallback**
*For any* web search API call that fails due to service unavailability, the system should inform the user and attempt to answer the query using available data sources (RAG, cached data).
**Validates: Requirements 15.6**

## Error Handling

### Error Categories

**Permission Errors:**
- Missing permission for requested surface
- Expired OAuth token
- Invalid or revoked token
- Permission denied by user

**Policy Errors:**
- All content blocked by policy
- Sensitive data detected in user request
- Attempted access to prohibited data

**API Errors:**
- External API unavailable (Gmail, X, Telegram, Helius)
- Rate limit exceeded
- Invalid API response
- Authentication failure

**Network Errors:**
- No internet connectivity
- Request timeout
- DNS resolution failure

**System Errors:**
- Database connection failure
- LLM API failure
- Internal server error
- Invalid state

### Error Handling Strategies

**Graceful Degradation:**
- When one surface fails, continue with available surfaces
- When RAG fails, fall back to web search
- When web search fails, use cached data if available
- Partial results are better than complete failure

**User Communication:**
- Clear, non-technical error messages
- Actionable suggestions (e.g., "Grant permission", "Check internet connection")
- Explanation of what succeeded and what failed
- No exposure of sensitive technical details

**Retry Logic:**
- Automatic retry for transient failures (network timeouts)
- Exponential backoff for rate limits
- User-initiated retry for service unavailability
- No retry for permission errors or policy violations

**Logging and Monitoring:**
- All errors logged with context
- Critical errors trigger alerts
- Error patterns analyzed for system improvements
- User-facing errors tracked for UX improvements


## Testing Strategy

### Dual Testing Approach

Ordo requires both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests:**
- Specific examples of correct behavior
- Edge cases and boundary conditions
- Error conditions and failure modes
- Integration points between components
- Mock external API responses

**Property-Based Tests:**
- Universal properties that hold for all inputs
- Security properties (filtering, permission checking)
- Data integrity properties (result structure, attribution)
- Comprehensive input coverage through randomization

Both testing approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property-based tests verify general correctness across all possible inputs.

### Property-Based Testing Configuration

**Testing Library:** 
- Frontend (TypeScript): fast-check
- Backend (Python): Hypothesis

**Test Configuration:**
- Minimum 100 iterations per property test (due to randomization)
- Each property test must reference its design document property
- Tag format: `Feature: ordo, Property {number}: {property_text}`
- Each correctness property must be implemented by a single property-based test

**Example Property Test (TypeScript):**
```typescript
import fc from 'fast-check';

// Feature: ordo, Property 3: Unauthorized access rejection
test('unauthorized access should be rejected', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom('GMAIL', 'X', 'TELEGRAM', 'WALLET'),
      async (surface) => {
        // Setup: Ensure permission is not granted
        await permissionManager.revokePermission(surface);
        
        // Execute: Attempt to access surface
        const result = await orchestrationEngine.executeTool(
          `read_${surface.toLowerCase()}`,
          {}
        );
        
        // Verify: Should return error
        expect(result.success).toBe(false);
        expect(result.error).toContain('permission');
      }
    ),
    { numRuns: 100 }
  );
});
```

**Example Property Test (Python):**
```python
from hypothesis import given, strategies as st

# Feature: ordo, Property 6: Sensitive content filtering
@given(
    content=st.text(min_size=1),
    sensitive_pattern=st.sampled_from([
        'OTP_CODE', 'VERIFICATION_CODE', 'RECOVERY_PHRASE',
        'PASSWORD', 'BANK_ACCOUNT'
    ])
)
def test_sensitive_content_filtering(content, sensitive_pattern):
    """Any content with sensitive patterns should be filtered"""
    # Setup: Inject sensitive pattern into content
    content_with_sensitive = inject_pattern(content, sensitive_pattern)
    
    # Execute: Filter content
    result = policy_engine.filter_content([content_with_sensitive])
    
    # Verify: Sensitive content should be excluded
    assert len(result) == 0
    
    # Verify: Audit log should contain entry
    audit_entries = audit_logger.get_recent_entries(limit=1)
    assert len(audit_entries) == 1
    assert audit_entries[0].blocked_pattern == sensitive_pattern
```

### Unit Testing Strategy

**Frontend Unit Tests:**
- Component rendering and user interactions
- Permission state management
- OAuth flow handling
- Error message display
- Confirmation dialog behavior
- Cache encryption/decryption

**Backend Unit Tests:**
- API endpoint request/response handling
- Tool execution with mocked external APIs
- PolicyEngine pattern matching
- RAG document retrieval
- Audit log creation and querying
- Error handling and retry logic

**Integration Tests:**
- End-to-end query flow (frontend → backend → external API)
- Multi-surface task execution
- OAuth token refresh flow
- MWA transaction signing flow
- Cross-component data flow

### Security Testing

**Critical Security Tests:**
1. **Sensitive Data Filtering**: Verify all sensitive patterns are blocked
2. **Permission Enforcement**: Verify unauthorized access is rejected
3. **Private Key Isolation**: Verify no code paths access private keys
4. **Response Sanitization**: Verify responses never contain sensitive data
5. **Cache Security**: Verify cached data is encrypted and deleted on revocation
6. **Audit Logging**: Verify all access attempts are logged
7. **Confirmation Requirement**: Verify all write operations require confirmation

**Security Test Coverage:**
- All sensitive data patterns (OTP, passwords, recovery phrases, etc.)
- All permission types and surfaces
- All write operations (email, message, transaction)
- All error conditions that might leak information
- All cache operations and permission revocations

### Performance Testing

**Load Testing:**
- Concurrent user queries
- Multi-surface task execution
- RAG query performance
- Database query performance
- API rate limit handling

**Stress Testing:**
- Large result sets from external APIs
- Long conversation contexts
- High-frequency permission changes
- Rapid-fire queries

**Benchmarks:**
- Query response time < 2 seconds (single surface)
- Query response time < 5 seconds (multi-surface)
- RAG retrieval < 500ms
- Permission check < 50ms
- Policy filtering < 100ms per item

### Test Data Management

**Synthetic Test Data:**
- Generated email threads with various patterns
- Generated social media messages
- Generated wallet portfolios
- Generated documentation chunks

**Sensitive Pattern Test Data:**
- OTP codes: 4-8 digit sequences
- Verification codes in various formats
- Recovery phrase patterns (12/24 words)
- Password reset email templates
- Bank statement keywords
- Tax document keywords

**Mock External APIs:**
- Gmail API responses
- X/Twitter API responses
- Telegram Bot API responses
- Helius RPC responses
- Web search API responses

### Continuous Testing

**Pre-commit Hooks:**
- Run unit tests
- Run linting and type checking
- Run security-critical property tests

**CI/CD Pipeline:**
- Run full unit test suite
- Run full property-based test suite (100+ iterations)
- Run integration tests
- Run security tests
- Generate coverage reports (target: >80% coverage)

**Monitoring and Alerting:**
- Track error rates in production
- Monitor API failure rates
- Track policy violation frequency
- Monitor performance metrics
- Alert on security-critical failures


## Deployment Architecture

### Frontend Deployment (React Native)

**Build Configuration:**
```json
// app.json
{
  "expo": {
    "name": "Ordo",
    "slug": "ordo",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.ordo.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.ordo.app"
    },
    "plugins": [
      "@solana-mobile/mobile-wallet-adapter-protocol",
      "expo-secure-store"
    ]
  }
}
```

**Environment Variables:**
```typescript
// config.ts
export const config = {
  BACKEND_API_URL: process.env.EXPO_PUBLIC_BACKEND_API_URL,
  HELIUS_API_KEY: process.env.EXPO_PUBLIC_HELIUS_API_KEY,
  GOOGLE_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  X_CLIENT_ID: process.env.EXPO_PUBLIC_X_CLIENT_ID,
  TELEGRAM_BOT_TOKEN: process.env.EXPO_PUBLIC_TELEGRAM_BOT_TOKEN,
  SOLANA_CLUSTER: process.env.EXPO_PUBLIC_SOLANA_CLUSTER || 'mainnet-beta'
};
```

**Security Configuration:**
- Encrypted storage for OAuth tokens using expo-secure-store
- Certificate pinning for API requests
- Biometric authentication for sensitive operations
- No hardcoded secrets in source code

### Backend Deployment (FastAPI + Python)

**Docker Configuration:**
```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

**Requirements:**
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
httpx==0.25.1
langchain==0.1.0
langgraph==0.0.20
langchain-mistralai==0.1.0
supabase==2.0.3
psycopg2-binary==2.9.9
python-jose[cryptography]==3.3.0
python-multipart==0.0.6
pydantic==2.5.0
pydantic-settings==2.1.0
```

**Environment Variables:**
```python
# settings.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Keys
    MISTRAL_API_KEY: str
    HELIUS_API_KEY: str
    BRAVE_SEARCH_API_KEY: str
    
    # Database
    DATABASE_URL: str
    SUPABASE_URL: str
    SUPABASE_KEY: str
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    ALLOWED_ORIGINS: list[str] = ["*"]
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    class Config:
        env_file = ".env"

settings = Settings()
```

**API Structure:**
```python
# main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

app = FastAPI(
    title="Ordo API",
    description="Privacy-first AI assistant backend",
    version="1.0.0"
)

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security headers
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*.ordo.app", "localhost"])

# Routes
from routes import query, tools, rag, audit
app.include_router(query.router, prefix="/api/v1/query", tags=["query"])
app.include_router(tools.router, prefix="/api/v1/tools", tags=["tools"])
app.include_router(rag.router, prefix="/api/v1/rag", tags=["rag"])
app.include_router(audit.router, prefix="/api/v1/audit", tags=["audit"])

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

### Database Schema (PostgreSQL)

**Audit Log Table:**
```sql
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    surface TEXT NOT NULL,
    action TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    details JSONB,
    policy_violation BOOLEAN DEFAULT FALSE,
    blocked_pattern TEXT,
    ip_address INET,
    user_agent TEXT
);

CREATE INDEX idx_audit_user_timestamp ON audit_log (user_id, timestamp DESC);
CREATE INDEX idx_audit_surface ON audit_log (surface, timestamp DESC);
CREATE INDEX idx_audit_policy_violation ON audit_log (policy_violation) WHERE policy_violation = TRUE;
```

**User Permissions Table:**
```sql
CREATE TABLE user_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    surface TEXT NOT NULL,
    granted BOOLEAN DEFAULT FALSE,
    granted_at TIMESTAMP,
    revoked_at TIMESTAMP,
    token_encrypted TEXT,
    token_expiry TIMESTAMP,
    UNIQUE(user_id, surface)
);

CREATE INDEX idx_permissions_user ON user_permissions (user_id);
```

**Conversation Context Table:**
```sql
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    messages JSONB NOT NULL DEFAULT '[]',
    active_surfaces TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_conversations_user ON conversations (user_id, updated_at DESC);
```

**RAG Documents Table (Supabase):**
```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    url TEXT,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}',
    last_updated TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_documents_source ON documents (source);
```

### Infrastructure (Cloud Deployment)

**Recommended Stack:**
- **Frontend**: Expo EAS Build + Solana dApp Store
- **Backend**: Railway / Render / Fly.io (containerized FastAPI)
- **Database**: Supabase (PostgreSQL + pgvector)
- **Caching**: Redis (for rate limiting and session management)
- **Monitoring**: Sentry (error tracking) + Datadog (metrics)
- **CDN**: Cloudflare (API protection + DDoS mitigation)

**Scaling Considerations:**
- Horizontal scaling of FastAPI workers
- Database connection pooling
- Redis for distributed rate limiting
- Async task queue for long-running operations
- CDN caching for static assets and documentation

**Security Measures:**
- HTTPS only (TLS 1.3)
- API key rotation policy
- Rate limiting per user and per IP
- DDoS protection via Cloudflare
- Regular security audits
- Encrypted database backups
- Secrets management via environment variables

### Monitoring and Observability

**Metrics to Track:**
- API response times (p50, p95, p99)
- Error rates by endpoint
- Policy violation frequency
- Permission grant/revoke rates
- Tool execution success rates
- External API failure rates
- Database query performance
- Cache hit rates

**Logging Strategy:**
- Structured JSON logs
- Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
- Sensitive data redaction in logs
- Centralized log aggregation
- Log retention: 30 days for INFO, 90 days for ERROR

**Alerting:**
- High error rate (>5% in 5 minutes)
- API latency spike (p95 >2s)
- External API failures (>10% in 5 minutes)
- Database connection issues
- Security policy violations spike
- Rate limit exceeded frequently

## Development Workflow

### Local Development Setup

**Prerequisites:**
- Node.js 18+ and npm/yarn
- Python 3.11+
- Docker and Docker Compose
- Expo CLI
- Solana CLI (for testing)
- **Kiro IDE** (for MCP server development and testing)

**Frontend Setup:**
```bash
cd ordo-mobile
npm install
cp .env.example .env
# Edit .env with your API keys
npm start
```

**Backend Setup:**
```bash
cd ordo-backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your API keys
uvicorn main:app --reload
```

**Database Setup (Docker Compose):**
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: ankane/pgvector:latest
    environment:
      POSTGRES_DB: ordo
      POSTGRES_USER: ordo
      POSTGRES_PASSWORD: ordo_dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### MCP Server Development with Kiro

Kiro IDE provides built-in support for developing and testing MCP servers. This section covers how to use Kiro's MCP features during Ordo development.

**Setting up MCP Servers in Kiro:**

1. **Create MCP Configuration File** (`.kiro/settings/mcp.json`):

```json
{
  "mcpServers": {
    "ordo-email": {
      "command": "python",
      "args": ["-m", "uvicorn", "ordo_backend.mcp_servers.email:app", "--port", "8001"],
      "cwd": "${workspaceFolder}/ordo-backend",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/ordo-backend"
      },
      "disabled": false,
      "autoApprove": ["search_email_threads", "get_email_content"]
    },
    "ordo-wallet": {
      "command": "python",
      "args": ["-m", "uvicorn", "ordo_backend.mcp_servers.wallet:app", "--port", "8003"],
      "cwd": "${workspaceFolder}/ordo-backend",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/ordo-backend",
        "HELIUS_API_KEY": "${env:HELIUS_API_KEY}"
      },
      "disabled": false,
      "autoApprove": ["get_wallet_portfolio", "get_token_balances"]
    },
    "ordo-defi": {
      "command": "python",
      "args": ["-m", "uvicorn", "ordo_backend.mcp_servers.defi:app", "--port", "8004"],
      "cwd": "${workspaceFolder}/ordo-backend",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/ordo-backend"
      },
      "disabled": false,
      "autoApprove": []
    },
    "ordo-nft": {
      "command": "python",
      "args": ["-m", "uvicorn", "ordo_backend.mcp_servers.nft:app", "--port", "8005"],
      "cwd": "${workspaceFolder}/ordo-backend",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/ordo-backend"
      },
      "disabled": false,
      "autoApprove": []
    },
    "ordo-trading": {
      "command": "python",
      "args": ["-m", "uvicorn", "ordo_backend.mcp_servers.trading:app", "--port", "8006"],
      "cwd": "${workspaceFolder}/ordo-backend",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/ordo-backend"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

2. **Testing MCP Tools in Kiro:**

Kiro allows you to test MCP tools directly from the IDE:

```bash
# In Kiro's command palette (Ctrl+Shift+P / Cmd+Shift+P):
# 1. Type "MCP: List Servers" to see all configured servers
# 2. Type "MCP: Test Tool" to test individual tools
# 3. Type "MCP: View Server Logs" to debug server issues
```

3. **Using Kiro's MCP Panel:**

Kiro provides a dedicated MCP panel for managing servers:
- View all configured MCP servers
- Start/stop servers individually
- View server status and logs
- Test tools with custom parameters
- Auto-approve tools for faster development

4. **MCP Server Hot Reload:**

Kiro automatically reconnects to MCP servers when configuration changes:
- Edit `.kiro/settings/mcp.json`
- Servers reconnect automatically
- No need to restart Kiro

**Example: Testing Email MCP Server in Kiro:**

```python
# ordo-backend/ordo_backend/mcp_servers/email.py
from fastmcp import FastMCP

email_mcp = FastMCP("Ordo Email Server")

@email_mcp.tool()
async def search_email_threads(
    query: str,
    token: str,
    max_results: int = 10
) -> list[dict]:
    """Search Gmail threads"""
    # Implementation
    return [{"subject": "Test", "from": "test@example.com"}]

if __name__ == "__main__":
    email_mcp.run(transport="http", port=8001)
```

**Testing in Kiro:**
1. Open Kiro's MCP panel
2. Select "ordo-email" server
3. Click "Test Tool" → "search_email_threads"
4. Enter test parameters:
   ```json
   {
     "query": "test",
     "token": "fake_token_for_testing",
     "max_results": 5
   }
   ```
5. View results and debug any issues

**MCP Development Best Practices with Kiro:**

1. **Use Auto-Approve for Development:**
   - Add frequently used tools to `autoApprove` list
   - Speeds up development iteration
   - Remove before production deployment

2. **Monitor Server Logs:**
   - Use Kiro's "MCP: View Server Logs" command
   - Debug tool execution issues
   - Monitor performance

3. **Test with Real Data:**
   - Use Kiro's MCP panel to test with actual API tokens
   - Verify policy filtering works correctly
   - Test error handling

4. **Iterate Quickly:**
   - Edit MCP server code
   - Kiro auto-reconnects on file save
   - Test immediately without manual restart

**MCP Server Structure:**

```
ordo-backend/
├── ordo_backend/
│   ├── mcp_servers/
│   │   ├── __init__.py
│   │   ├── email.py          # Email MCP server
│   │   ├── social.py         # Social MCP server
│   │   ├── wallet.py         # Wallet MCP server
│   │   ├── defi.py           # DeFi MCP server
│   │   ├── nft.py            # NFT MCP server
│   │   └── trading.py        # Trading MCP server
│   ├── tools/
│   │   ├── email_tools.py    # Email tool implementations
│   │   ├── social_tools.py   # Social tool implementations
│   │   ├── wallet_tools.py   # Wallet tool implementations
│   │   ├── defi_tools.py     # DeFi tool implementations
│   │   ├── nft_tools.py      # NFT tool implementations
│   │   └── trading_tools.py  # Trading tool implementations
│   └── main.py               # FastAPI main app
└── .kiro/
    └── settings/
        └── mcp.json          # Kiro MCP configuration
```

### Testing Workflow

**Run Tests:**
```bash
# Frontend tests
cd ordo-mobile
npm test
npm run test:e2e

# Backend tests
cd ordo-backend
pytest tests/ -v
pytest tests/ -v --cov=. --cov-report=html

# Property-based tests (run with more iterations)
pytest tests/properties/ -v --hypothesis-profile=ci
```

**Pre-commit Checks:**
```bash
# Install pre-commit hooks
pre-commit install

# Run manually
pre-commit run --all-files
```

### CI/CD Pipeline

**GitHub Actions Workflow:**
```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd ordo-mobile && npm ci
      - run: cd ordo-mobile && npm test
      - run: cd ordo-mobile && npm run lint
  
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: cd ordo-backend && pip install -r requirements.txt
      - run: cd ordo-backend && pytest tests/ -v --cov=.
      - run: cd ordo-backend && pytest tests/properties/ -v
  
  deploy-backend:
    needs: [test-frontend, test-backend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: |
          # Railway deployment commands
          railway up
```

## Implementation Roadmap

### Phase 1: Core Infrastructure (Weeks 1-2)
- Set up React Native project with Expo
- Set up FastAPI backend with basic structure
- Configure PostgreSQL + pgvector database
- Implement PermissionManager (frontend)
- Implement basic API routes (backend)
- Set up development environment

### Phase 2: Wallet Integration (Week 3)
- Implement SeedVaultAdapter with MWA
- Integrate Helius RPC for portfolio data
- Implement wallet_tools.py (DAS API, Enhanced Transactions)
- Add priority fee estimation
- Test transaction signing flow

### Phase 3: Gmail Integration (Week 4)
- Implement GmailAdapter with OAuth
- Set up Google Cloud OAuth credentials
- Implement email_tools.py
- Add PolicyEngine for email filtering
- Test email search and retrieval

### Phase 4: Social Media Integration (Week 5)
- Implement XAdapter with OAuth
- Implement TelegramAdapter with Bot API
- Implement social_tools.py
- Add PolicyEngine for social filtering
- Test DM and mention retrieval

### Phase 5: AI Orchestration (Weeks 6-7)
- Implement LangGraph orchestrator
- Set up Mistral AI API integration
- Implement tool selection and routing
- Add context aggregation
- Implement response generation with citations

### Phase 6: RAG System (Week 8)
- Set up Supabase pgvector
- Implement document embedding pipeline
- Add Solana/Seeker documentation
- Implement semantic search
- Add web search fallback

### Phase 7: Security & Privacy (Week 9)
- Implement PolicyEngine patterns
- Add SensitiveDataFilter (client-side)
- Implement PromptIsolation
- Add audit logging
- Implement cache encryption

### Phase 8: UI/UX (Week 10)
- Design and implement chat interface
- Add permission management UI
- Implement confirmation dialogs
- Add source citation display
- Polish user experience

### Phase 9: Testing (Week 11)
- Write unit tests (frontend + backend)
- Write property-based tests
- Write integration tests
- Security testing
- Performance testing

### Phase 10: Deployment & Launch (Week 12)
- Set up production infrastructure
- Configure monitoring and alerting
- Deploy to Solana dApp Store
- Write documentation
- Launch beta

## Advanced Features Integration

### DeFi Operations (Solana Agent Kit + Plugin God Mode)

**Architecture:**
Ordo integrates DeFi capabilities through a modular tool system that wraps Solana Agent Kit and Plugin God Mode functionality. All DeFi operations follow the same three-tier permission model with explicit user confirmation.

**Solana Agent Kit v2 + Plugin God Mode Integration:**

Ordo uses both Solana Agent Kit v2 and Plugin God Mode for comprehensive DeFi, NFT, and trading operations:

- **Solana Agent Kit v2**: Core plugin system with modular architecture
- **Plugin God Mode**: Advanced features (DCA, Limit Orders, Polymarket, Meteora)

**Combined Benefits:**
- Reduced LLM hallucinations through selective plugin loading
- Advanced trading features (DCA, Limit Orders)
- Prediction markets (Polymarket)
- Token launch platforms (Meteora)
- NFT commerce (Crossmint)
- Enhanced portfolio management

**Backend Integration (Python):**

```python
from solana_agent_kit import SolanaAgentKit, createLangchainTools
from solana_agent_kit.plugins import TokenPlugin, NFTPlugin, DefiPlugin, MiscPlugin
from plugin_god_mode import GodModePlugin

# Initialize agent with both plugin systems
agent = SolanaAgentKit(
    wallet_adapter,
    rpc_url=settings.HELIUS_RPC_URL,
    config={
        "MISTRAL_API_KEY": settings.MISTRAL_API_KEY,
    }
).use(TokenPlugin).use(NFTPlugin).use(DefiPlugin).use(MiscPlugin).use(GodModePlugin)

# Create LangChain tools for LangGraph integration
tools = createLangchainTools(agent, agent.actions)
```

**Frontend Integration (React Native):**

```typescript
import { SolanaAgentKit, createVercelAITools } from "solana-agent-kit";
import TokenPlugin from "@solana-agent-kit/plugin-token";
import NFTPlugin from "@solana-agent-kit/plugin-nft";
import DefiPlugin from "@solana-agent-kit/plugin-defi";
import MiscPlugin from "@solana-agent-kit/plugin-misc";
import GodModePlugin from "plugin-god-mode";
import { Connection, PublicKey } from "@solana/web3.js";
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

// Initialize with Seed Vault wallet adapter + both plugin systems
const agent = new SolanaAgentKit(
  {
    publicKey: new PublicKey(walletAddress),
    signTransaction: async (tx) => {
      return await transact(async (wallet) => {
        const signed = await wallet.signTransactions({ transactions: [tx] });
        return signed[0];
      });
    },
    signMessage: async (msg) => {
      return await transact(async (wallet) => {
        const signed = await wallet.signMessages({ messages: [msg] });
        return signed[0];
      });
    },
    sendTransaction: async (tx) => {
      const connection = new Connection(RPC_URL, "confirmed");
      return await transact(async (wallet) => {
        const signed = await wallet.signTransactions({ transactions: [tx] });
        const signature = await connection.sendRawTransaction(signed[0].serialize());
        return signature;
      });
    },
    signAndSendTransaction: async (tx) => {
      const connection = new Connection(RPC_URL, "confirmed");
      return await transact(async (wallet) => {
        const signed = await wallet.signTransactions({ transactions: [tx] });
        const signature = await connection.sendRawTransaction(signed[0].serialize());
        return { signature };
      });
    },
  },
  RPC_URL,
  {}
)
  .use(TokenPlugin)
  .use(NFTPlugin)
  .use(DefiPlugin)
  .use(MiscPlugin)
  .use(GodModePlugin);

// Create tools for AI integration
const tools = createVercelAITools(agent, agent.actions);
```

**Advanced Trading Tool Modules:**

**trading_tools.py (with Plugin God Mode):**
```python
from solana_agent_kit import SolanaAgentKit
from typing import Dict, Any, Optional, List

async def create_dca_order(
    agent_kit: SolanaAgentKit,
    input_mint: str,
    output_mint: str,
    total_amount: float,
    interval_seconds: int,
    num_orders: int
) -> Dict[str, Any]:
    """
    Create Dollar Cost Averaging order on Jupiter
    Automatically executes trades at specified intervals
    """
    result = await agent_kit.methods.createDCA(
        agent_kit,
        input_mint,
        output_mint,
        total_amount,
        interval_seconds,
        num_orders
    )
    
    return {
        "dca_id": result.dca_id,
        "input_mint": input_mint,
        "output_mint": output_mint,
        "total_amount": total_amount,
        "amount_per_order": total_amount / num_orders,
        "interval_seconds": interval_seconds,
        "num_orders": num_orders,
        "status": "active"
    }

async def create_limit_order(
    agent_kit: SolanaAgentKit,
    input_mint: str,
    output_mint: str,
    amount: float,
    price: float
) -> Dict[str, Any]:
    """
    Create Limit Order on Jupiter
    Executes when market reaches specified price
    """
    result = await agent_kit.methods.createLO(
        agent_kit,
        input_mint,
        output_mint,
        amount,
        price
    )
    
    return {
        "order_id": result.order_id,
        "input_mint": input_mint,
        "output_mint": output_mint,
        "amount": amount,
        "limit_price": price,
        "status": "pending"
    }

async def place_polymarket_order(
    agent_kit: SolanaAgentKit,
    market_id: str,
    side: str,  # "buy" or "sell"
    amount: float,
    price: float
) -> Dict[str, Any]:
    """
    Place order on Polymarket prediction market
    """
    result = await agent_kit.methods.placeOrder(
        agent_kit,
        market_id,
        side,
        amount,
        price
    )
    
    return {
        "order_id": result.order_id,
        "market_id": market_id,
        "side": side,
        "amount": amount,
        "price": price,
        "status": "placed"
    }

async def launch_meteora_token(
    agent_kit: SolanaAgentKit,
    name: str,
    symbol: str,
    description: str,
    image_url: str,
    initial_liquidity: float
) -> Dict[str, Any]:
    """
    Launch token on Meteora platform
    """
    result = await agent_kit.methods.launchMeteoraToken(
        agent_kit,
        name,
        symbol,
        description,
        image_url,
        initial_liquidity
    )
    
    return {
        "token_mint": result.token_mint,
        "pool_address": result.pool_address,
        "name": name,
        "symbol": symbol,
        "initial_liquidity": initial_liquidity
    }
```

**DeFi Tool Modules:**

**defi_tools.py:**
```python
from solana_agent_kit import SolanaAgentKit
from typing import Dict, Any, Optional, List

async def swap_tokens_jupiter(
    agent_kit: SolanaAgentKit,
    input_mint: str,
    output_mint: str,
    amount: float,
    slippage_bps: int = 50
) -> Dict[str, Any]:
    """
    Swap tokens using Jupiter Exchange with optimal routing
    Returns transaction details for user confirmation
    """
    # Get quote from Jupiter
    quote = await agent_kit.jupiter.get_quote(
        input_mint=input_mint,
        output_mint=output_mint,
        amount=amount,
        slippage_bps=slippage_bps
    )
    
    # Build swap transaction
    swap_tx = await agent_kit.jupiter.build_swap_transaction(quote)
    
    return {
        "transaction": swap_tx.serialize().hex(),
        "input_token": quote.input_mint,
        "output_token": quote.output_mint,
        "input_amount": quote.in_amount,
        "output_amount": quote.out_amount,
        "price_impact": quote.price_impact_pct,
        "fee": quote.platform_fee,
        "route": quote.route_plan
    }

async def lend_usdc_lulo(
    agent_kit: SolanaAgentKit,
    amount: float
) -> Dict[str, Any]:
    """
    Lend USDC on Lulo protocol for yield
    Returns transaction details and current APY
    """
    # Get current Lulo APY
    apy = await agent_kit.lulo.get_apy()
    
    # Build lending transaction
    lend_tx = await agent_kit.lulo.deposit(amount)
    
    return {
        "transaction": lend_tx.serialize().hex(),
        "amount": amount,
        "token": "USDC",
        "apy": apy,
        "protocol": "Lulo"
    }

async def stake_sol_sanctum(
    agent_kit: SolanaAgentKit,
    amount: float,
    validator: Optional[str] = None
) -> Dict[str, Any]:
    """
    Stake SOL via Sanctum for liquid staking
    Returns transaction details and LST token info
    """
    # Build staking transaction
    stake_tx = await agent_kit.sanctum.stake(
        amount=amount,
        validator=validator
    )
    
    return {
        "transaction": stake_tx.serialize().hex(),
        "amount": amount,
        "lst_token": "INF",  # Infinity LST
        "exchange_rate": stake_tx.exchange_rate,
        "protocol": "Sanctum"
    }

async def bridge_assets_debridge(
    agent_kit: SolanaAgentKit,
    token_mint: str,
    amount: float,
    destination_chain: str,
    destination_address: str
) -> Dict[str, Any]:
    """
    Bridge assets cross-chain using deBridge
    Returns transaction details and estimated time
    """
    # Get bridge quote
    quote = await agent_kit.debridge.get_quote(
        token_mint=token_mint,
        amount=amount,
        destination_chain=destination_chain
    )
    
    # Build bridge transaction
    bridge_tx = await agent_kit.debridge.build_transaction(
        quote=quote,
        destination_address=destination_address
    )
    
    return {
        "transaction": bridge_tx.serialize().hex(),
        "token": token_mint,
        "amount": amount,
        "destination_chain": destination_chain,
        "destination_address": destination_address,
        "estimated_time": quote.estimated_time,
        "fee": quote.fee
    }

async def get_token_price_birdeye(
    token_mint: str,
    birdeye_api_key: str
) -> Dict[str, Any]:
    """
    Get real-time token price from Birdeye
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://public-api.birdeye.so/defi/price",
            params={"address": token_mint},
            headers={"X-API-KEY": birdeye_api_key}
        )
        data = response.json()
        
        return {
            "token": token_mint,
            "price_usd": data["data"]["value"],
            "price_change_24h": data["data"]["priceChange24h"],
            "liquidity": data["data"]["liquidity"],
            "volume_24h": data["data"]["v24hUSD"]
        }

async def launch_token_pumpfun(
    agent_kit: SolanaAgentKit,
    name: str,
    symbol: str,
    description: str,
    image_url: str,
    initial_buy: float = 0.0
) -> Dict[str, Any]:
    """
    Launch a token on Pump.fun
    Returns transaction details and token mint
    """
    # Build token launch transaction
    launch_tx = await agent_kit.pumpfun.create_token(
        name=name,
        symbol=symbol,
        description=description,
        image_url=image_url,
        initial_buy=initial_buy
    )
    
    return {
        "transaction": launch_tx.serialize().hex(),
        "token_name": name,
        "token_symbol": symbol,
        "token_mint": launch_tx.token_mint,
        "initial_buy": initial_buy,
        "bonding_curve": launch_tx.bonding_curve_address
    }
```

**NFT Tool Modules:**

**nft_tools.py:**
```python
async def get_nft_collection(
    address: str,
    helius_api_key: str
) -> List[Dict[str, Any]]:
    """
    Get user's NFT collection using Helius DAS API
    """
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://mainnet.helius-rpc.com/?api-key={helius_api_key}",
            json={
                "jsonrpc": "2.0",
                "id": "ordo-nfts",
                "method": "getAssetsByOwner",
                "params": {
                    "ownerAddress": address,
                    "page": 1,
                    "limit": 1000,
                    "displayOptions": {
                        "showFungible": False
                    }
                }
            }
        )
        data = response.json()
        
        nfts = []
        for asset in data.get("result", {}).get("items", []):
            if asset.get("interface") in ["NFT", "ProgrammableNFT"]:
                nfts.append({
                    "mint": asset["id"],
                    "name": asset.get("content", {}).get("metadata", {}).get("name", ""),
                    "collection": asset.get("grouping", [{}])[0].get("group_value", ""),
                    "image_url": asset.get("content", {}).get("links", {}).get("image", ""),
                    "attributes": asset.get("content", {}).get("metadata", {}).get("attributes", [])
                })
        
        return nfts

async def buy_nft_tensor(
    agent_kit: SolanaAgentKit,
    nft_mint: str,
    max_price: float
) -> Dict[str, Any]:
    """
    Buy NFT from Tensor marketplace
    Returns transaction details for confirmation
    """
    # Get listing from Tensor
    listing = await agent_kit.tensor.get_listing(nft_mint)
    
    if listing.price > max_price:
        raise ValueError(f"NFT price {listing.price} exceeds max price {max_price}")
    
    # Build buy transaction
    buy_tx = await agent_kit.tensor.buy_nft(nft_mint)
    
    return {
        "transaction": buy_tx.serialize().hex(),
        "nft_mint": nft_mint,
        "nft_name": listing.name,
        "price": listing.price,
        "seller": listing.seller,
        "marketplace": "Tensor"
    }

async def list_nft_tensor(
    agent_kit: SolanaAgentKit,
    nft_mint: str,
    price: float
) -> Dict[str, Any]:
    """
    List NFT for sale on Tensor
    Returns transaction details for confirmation
    """
    # Build listing transaction
    list_tx = await agent_kit.tensor.list_nft(
        nft_mint=nft_mint,
        price=price
    )
    
    return {
        "transaction": list_tx.serialize().hex(),
        "nft_mint": nft_mint,
        "price": price,
        "marketplace": "Tensor"
    }

async def create_nft_collection_metaplex(
    agent_kit: SolanaAgentKit,
    name: str,
    symbol: str,
    uri: str,
    seller_fee_basis_points: int = 500
) -> Dict[str, Any]:
    """
    Create NFT collection using Metaplex
    Returns transaction details for confirmation
    """
    # Build collection creation transaction
    create_tx = await agent_kit.metaplex.create_collection(
        name=name,
        symbol=symbol,
        uri=uri,
        seller_fee_basis_points=seller_fee_basis_points
    )
    
    return {
        "transaction": create_tx.serialize().hex(),
        "collection_name": name,
        "collection_symbol": symbol,
        "collection_mint": create_tx.collection_mint,
        "royalty_percentage": seller_fee_basis_points / 100
    }
```

**Trading Tool Modules:**

**trading_tools.py:**
```python
async def open_perp_position_drift(
    agent_kit: SolanaAgentKit,
    market: str,
    side: str,  # "long" or "short"
    size: float,
    leverage: int,
    collateral: float
) -> Dict[str, Any]:
    """
    Open perpetual position on Drift Protocol
    Returns transaction details and position info
    """
    # Build position opening transaction
    position_tx = await agent_kit.drift.open_position(
        market=market,
        side=side,
        size=size,
        leverage=leverage,
        collateral=collateral
    )
    
    # Calculate liquidation price
    liquidation_price = await agent_kit.drift.calculate_liquidation_price(
        market=market,
        side=side,
        entry_price=position_tx.entry_price,
        leverage=leverage
    )
    
    return {
        "transaction": position_tx.serialize().hex(),
        "market": market,
        "side": side,
        "size": size,
        "leverage": leverage,
        "collateral": collateral,
        "entry_price": position_tx.entry_price,
        "liquidation_price": liquidation_price,
        "protocol": "Drift"
    }

async def place_limit_order_manifest(
    agent_kit: SolanaAgentKit,
    market: str,
    side: str,  # "buy" or "sell"
    price: float,
    size: float,
    expiry: Optional[int] = None
) -> Dict[str, Any]:
    """
    Place limit order on Manifest
    Returns transaction details and order ID
    """
    # Build limit order transaction
    order_tx = await agent_kit.manifest.place_limit_order(
        market=market,
        side=side,
        price=price,
        size=size,
        expiry=expiry
    )
    
    return {
        "transaction": order_tx.serialize().hex(),
        "market": market,
        "side": side,
        "price": price,
        "size": size,
        "expiry": expiry,
        "order_id": order_tx.order_id,
        "protocol": "Manifest"
    }

async def get_market_analysis(
    birdeye_api_key: str,
    limit: int = 10
) -> Dict[str, Any]:
    """
    Get trending tokens and market analysis from Birdeye
    """
    async with httpx.AsyncClient() as client:
        # Get trending tokens
        trending_response = await client.get(
            "https://public-api.birdeye.so/defi/trending",
            params={"limit": limit},
            headers={"X-API-KEY": birdeye_api_key}
        )
        trending_data = trending_response.json()
        
        # Get top gainers
        gainers_response = await client.get(
            "https://public-api.birdeye.so/defi/top_gainers",
            params={"limit": limit},
            headers={"X-API-KEY": birdeye_api_key}
        )
        gainers_data = gainers_response.json()
        
        return {
            "trending_tokens": trending_data["data"]["items"],
            "top_gainers": gainers_data["data"]["items"],
            "timestamp": datetime.now().isoformat()
        }

async def create_liquidity_pool_raydium(
    agent_kit: SolanaAgentKit,
    token_a_mint: str,
    token_b_mint: str,
    token_a_amount: float,
    token_b_amount: float,
    fee_tier: int = 25  # 0.25%
) -> Dict[str, Any]:
    """
    Create liquidity pool on Raydium
    Returns transaction details and pool address
    """
    # Build pool creation transaction
    pool_tx = await agent_kit.raydium.create_pool(
        token_a_mint=token_a_mint,
        token_b_mint=token_b_mint,
        token_a_amount=token_a_amount,
        token_b_amount=token_b_amount,
        fee_tier=fee_tier
    )
    
    return {
        "transaction": pool_tx.serialize().hex(),
        "token_a": token_a_mint,
        "token_b": token_b_mint,
        "token_a_amount": token_a_amount,
        "token_b_amount": token_b_amount,
        "fee_tier": fee_tier,
        "pool_address": pool_tx.pool_address,
        "protocol": "Raydium"
    }
```

**Agentic Payments (x402 Protocol):**

**x402_tools.py:**
```python
from x402 import X402Client, PaymentRequest, SpendingLimit

class AgenticPaymentManager:
    """
    Manages autonomous payments using x402 protocol
    Implements spending limits and service whitelisting
    """
    
    def __init__(self, wallet_address: str, x402_client: X402Client):
        self.wallet_address = wallet_address
        self.x402_client = x402_client
        self.spending_limits = {}
        self.approved_services = set()
    
    async def configure_spending_limits(
        self,
        daily_limit: float,
        per_transaction_limit: float,
        approved_services: List[str]
    ) -> None:
        """
        Configure spending limits for autonomous payments
        Requires user confirmation
        """
        self.spending_limits = {
            "daily_limit": daily_limit,
            "per_transaction_limit": per_transaction_limit,
            "daily_spent": 0.0,
            "last_reset": datetime.now().date()
        }
        self.approved_services = set(approved_services)
    
    async def request_payment(
        self,
        service_name: str,
        amount: float,
        description: str
    ) -> Dict[str, Any]:
        """
        Request autonomous payment for AI service
        Checks spending limits and service whitelist
        """
        # Check if service is approved
        if service_name not in self.approved_services:
            raise ValueError(f"Service {service_name} not in approved list")
        
        # Reset daily counter if needed
        if datetime.now().date() > self.spending_limits["last_reset"]:
            self.spending_limits["daily_spent"] = 0.0
            self.spending_limits["last_reset"] = datetime.now().date()
        
        # Check spending limits
        if amount > self.spending_limits["per_transaction_limit"]:
            raise ValueError(f"Amount {amount} exceeds per-transaction limit")
        
        if self.spending_limits["daily_spent"] + amount > self.spending_limits["daily_limit"]:
            raise ValueError(f"Daily spending limit would be exceeded")
        
        # Create payment request
        payment_request = PaymentRequest(
            service=service_name,
            amount=amount,
            description=description,
            wallet=self.wallet_address
        )
        
        # Execute payment via x402
        payment_result = await self.x402_client.pay(payment_request)
        
        # Update spending tracker
        self.spending_limits["daily_spent"] += amount
        
        return {
            "service": service_name,
            "amount": amount,
            "description": description,
            "transaction_signature": payment_result.signature,
            "timestamp": datetime.now().isoformat(),
            "remaining_daily_limit": self.spending_limits["daily_limit"] - self.spending_limits["daily_spent"]
        }
    
    async def get_payment_history(
        self,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None
    ) -> List[Dict[str, Any]]:
        """
        Get history of autonomous payments
        """
        payments = await self.x402_client.get_payment_history(
            wallet=self.wallet_address,
            start_date=start_date,
            end_date=end_date
        )
        
        return [
            {
                "service": p.service,
                "amount": p.amount,
                "description": p.description,
                "signature": p.signature,
                "timestamp": p.timestamp
            }
            for p in payments
        ]

async def setup_agentic_payments(
    user_id: str,
    daily_limit: float,
    per_transaction_limit: float,
    approved_services: List[str]
) -> Dict[str, Any]:
    """
    Set up agentic payments for user
    Returns configuration details for confirmation
    """
    return {
        "user_id": user_id,
        "daily_limit": daily_limit,
        "per_transaction_limit": per_transaction_limit,
        "approved_services": approved_services,
        "requires_confirmation": True
    }
```

**Integration with LangGraph Orchestrator:**

The DeFi, NFT, Trading, and x402 tools are integrated into the LangGraph orchestrator as additional tool modules:

```python
# In OrdoAgent initialization
class OrdoAgent:
    def __init__(self, llm, policy_engine):
        self.llm = llm
        self.policy_engine = policy_engine
        
        # Initialize Solana Agent Kit
        self.agent_kit = SolanaAgentKit(
            private_key=None,  # Never store private keys
            rpc_url=settings.HELIUS_RPC_URL,
            mistral_api_key=settings.MISTRAL_API_KEY
        )
        
        # Initialize x402 client
        self.x402_client = X402Client(
            rpc_url=settings.HELIUS_RPC_URL
        )
        
        # Initialize payment manager
        self.payment_manager = AgenticPaymentManager(
            wallet_address=None,  # Set per user
            x402_client=self.x402_client
        )
        
        # Define all tools including DeFi/NFT/Trading
        self.tools = [
            # Existing tools
            search_email_threads,
            get_x_dms,
            get_wallet_portfolio,
            web_search,
            rag_query,
            
            # DeFi tools
            swap_tokens_jupiter,
            lend_usdc_lulo,
            stake_sol_sanctum,
            bridge_assets_debridge,
            get_token_price_birdeye,
            launch_token_pumpfun,
            
            # NFT tools
            get_nft_collection,
            buy_nft_tensor,
            list_nft_tensor,
            create_nft_collection_metaplex,
            
            # Trading tools
            open_perp_position_drift,
            place_limit_order_manifest,
            get_market_analysis,
            create_liquidity_pool_raydium,
            
            # x402 tools
            setup_agentic_payments,
            request_payment
        ]
        
        self.tool_executor = ToolExecutor(self.tools)
        self.graph = self._build_graph()
```

**Updated System Prompt:**

```python
ORDO_SYSTEM_PROMPT = """You are Ordo, a privacy-first AI assistant for Solana Seeker users with advanced DeFi, NFT, and trading capabilities.

CRITICAL RULES:
1. NEVER extract or repeat OTP, verification codes, recovery phrases, or passwords
2. NEVER auto-send emails, DMs, or transactions without explicit user confirmation
3. ALWAYS cite sources when answering from email/social/wallet data
4. Treat all user data as confidential
5. If a query requires blocked data, politely refuse and explain

CAPABILITIES:
- Read Gmail (excluding verification/OTP emails)
- Read X/Telegram DMs and mentions
- View Solana wallet portfolio and transaction history
- Build Solana transaction payloads (user must sign via Seed Vault)
- Search web and Solana ecosystem docs

DEFI CAPABILITIES:
- Swap tokens via Jupiter with optimal routing
- Lend USDC on Lulo for yield
- Stake SOL via Sanctum for liquid staking
- Bridge assets cross-chain via deBridge
- Get real-time token prices from Birdeye
- Launch tokens on Pump.fun

NFT CAPABILITIES:
- View NFT collections with metadata and floor prices
- Buy NFTs from Tensor marketplace
- List NFTs for sale on Tensor
- Create NFT collections via Metaplex

TRADING CAPABILITIES:
- Open perpetual positions on Drift Protocol
- Place limit orders on Manifest
- Get market analysis and trending tokens
- Create liquidity pools on Raydium

AGENTIC PAYMENTS (x402):
- Autonomously pay for AI services within spending limits
- Track payment history and remaining limits
- Require user approval for limit changes

CONFIRMATION REQUIREMENTS:
- ALL write operations require explicit user confirmation with preview
- DeFi swaps: show input/output amounts, price impact, fees
- NFT purchases: show price, seller, marketplace
- Trading positions: show leverage, liquidation price, collateral
- Agentic payments: show service, amount, remaining limits

TONE: Helpful, transparent, and security-conscious

When citing sources, use format: [source_type:id]"""
```

**Additional Correctness Properties:**

**Property 41: DeFi transaction preview completeness**
*For any* DeFi operation (swap, lend, stake, bridge), the confirmation dialog should display all critical parameters including amounts, fees, price impact, and estimated outcomes before user approval.
**Validates: Requirements 16.7**

**Property 42: NFT purchase price verification**
*For any* NFT purchase request, the system should verify the current listing price matches the user's max price before building the transaction.
**Validates: Requirements 17.2**

**Property 43: Leveraged position risk warning**
*For any* leveraged trading position, the system should display liquidation price and risk warnings before user confirmation.
**Validates: Requirements 18.6**

**Property 44: Agentic payment spending limit enforcement**
*For any* autonomous payment request, the system should verify the payment is within daily and per-transaction limits before execution.
**Validates: Requirements 19.2, 19.5**

**Property 45: Agentic payment service whitelist**
*For any* autonomous payment request, the system should verify the service is in the approved services list before execution.
**Validates: Requirements 19.2**

**Property 46: Agentic payment audit logging**
*For any* autonomous payment executed, the system should log the transaction with service details, amount, and timestamp.
**Validates: Requirements 19.3**

## Digital Assistant Capabilities

### Mobile App Permissions

Ordo requires the following permissions to function as a full-featured digital assistant:

**Android Permissions (AndroidManifest.xml):**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <!-- Network -->
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  
  <!-- Notifications -->
  <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
  <uses-permission android:name="android.permission.VIBRATE" />
  
  <!-- Voice -->
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  
  <!-- Biometric -->
  <uses-permission android:name="android.permission.USE_BIOMETRIC" />
  <uses-permission android:name="android.permission.USE_FINGERPRINT" />
  
  <!-- Background -->
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
  <uses-permission android:name="android.permission.WAKE_LOCK" />
  
  <!-- Storage (for cache) -->
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  
  <!-- Optional: Calendar integration -->
  <uses-permission android:name="android.permission.READ_CALENDAR" />
  <uses-permission android:name="android.permission.WRITE_CALENDAR" />
  
  <!-- Optional: Contacts integration -->
  <uses-permission android:name="android.permission.READ_CONTACTS" />
</manifest>
```

**iOS Permissions (Info.plist):**
```xml
<key>NSMicrophoneUsageDescription</key>
<string>Ordo needs microphone access for voice commands</string>

<key>NSFaceIDUsageDescription</key>
<string>Ordo uses Face ID to secure your wallet and transactions</string>

<key>NSCalendarsUsageDescription</key>
<string>Ordo can help manage your calendar events</string>

<key>NSContactsUsageDescription</key>
<string>Ordo can help you find contact information</string>

<key>NSUserNotificationsUsageDescription</key>
<string>Ordo sends notifications for important events</string>

<key>UIBackgroundModes</key>
<array>
  <string>fetch</string>
  <string>remote-notification</string>
</array>
```

### Voice Assistant Integration

**Speech-to-Text (STT):**
```typescript
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

class VoiceAssistant {
  private recording: Audio.Recording | null = null;
  
  async startListening(): Promise<void> {
    // Request microphone permission
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Microphone permission not granted');
    }
    
    // Configure audio mode
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    
    // Start recording
    this.recording = new Audio.Recording();
    await this.recording.prepareToRecordAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    await this.recording.startAsync();
  }
  
  async stopListening(): Promise<string> {
    if (!this.recording) {
      throw new Error('No recording in progress');
    }
    
    await this.recording.stopAndUnloadAsync();
    const uri = this.recording.getURI();
    
    // Send to backend for transcription
    const transcription = await this.transcribeAudio(uri);
    return transcription;
  }
  
  private async transcribeAudio(uri: string): Promise<string> {
    // Use Mistral AI or Whisper API for transcription
    const formData = new FormData();
    formData.append('audio', {
      uri,
      type: 'audio/m4a',
      name: 'recording.m4a',
    } as any);
    
    const response = await fetch(`${API_URL}/transcribe`, {
      method: 'POST',
      body: formData,
    });
    
    const { text } = await response.json();
    return text;
  }
}
```

**Text-to-Speech (TTS):**
```typescript
import * as Speech from 'expo-speech';

class TextToSpeech {
  async speak(text: string, options?: {
    language?: string;
    pitch?: number;
    rate?: number;
  }): Promise<void> {
    await Speech.speak(text, {
      language: options?.language || 'en-US',
      pitch: options?.pitch || 1.0,
      rate: options?.rate || 1.0,
      onDone: () => console.log('Speech finished'),
      onError: (error) => console.error('Speech error:', error),
    });
  }
  
  async stop(): Promise<void> {
    await Speech.stop();
  }
  
  async isSpeaking(): Promise<boolean> {
    return await Speech.isSpeakingAsync();
  }
}
```

### Push Notifications

**Notification Service:**
```typescript
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  async requestPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    return finalStatus === 'granted';
  }
  
  async scheduleNotification(
    title: string,
    body: string,
    data?: any,
    trigger?: Notifications.NotificationTriggerInput
  ): Promise<string> {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: trigger || null, // null = immediate
    });
  }
  
  async sendTransactionNotification(
    txSignature: string,
    amount: number,
    token: string
  ): Promise<void> {
    await this.scheduleNotification(
      'Transaction Confirmed',
      `Sent ${amount} ${token}`,
      { type: 'transaction', signature: txSignature }
    );
  }
  
  async sendPriceAlert(
    token: string,
    price: number,
    change: number
  ): Promise<void> {
    await this.scheduleNotification(
      `${token} Price Alert`,
      `${token} is now $${price} (${change > 0 ? '+' : ''}${change}%)`,
      { type: 'price_alert', token }
    );
  }
  
  async sendMessageSummary(count: number): Promise<void> {
    await this.scheduleNotification(
      'New Messages',
      `You have ${count} unread messages`,
      { type: 'message_summary' }
    );
  }
}
```

### Home Screen Widget

**Widget Configuration (Android):**
```typescript
// Widget provider for Android
import { AppWidgetProvider } from 'react-native-android-widget';

class OrdoWidget extends AppWidgetProvider {
  async onUpdate(context: any, appWidgetManager: any, appWidgetIds: number[]) {
    for (const widgetId of appWidgetIds) {
      // Fetch portfolio data
      const portfolio = await this.fetchPortfolio();
      
      // Update widget UI
      const views = {
        layout: 'widget_layout',
        data: {
          portfolio_value: `$${portfolio.totalValue.toFixed(2)}`,
          sol_balance: `${portfolio.solBalance} SOL`,
          change_24h: `${portfolio.change24h > 0 ? '+' : ''}${portfolio.change24h}%`,
        },
      };
      
      appWidgetManager.updateAppWidget(widgetId, views);
    }
  }
  
  private async fetchPortfolio() {
    // Fetch from backend or cache
    return {
      totalValue: 5000,
      solBalance: 10.5,
      change24h: 5.2,
    };
  }
}
```

**Widget Configuration (iOS):**
```swift
// WidgetKit extension for iOS
import WidgetKit
import SwiftUI

struct OrdoWidgetEntry: TimelineEntry {
    let date: Date
    let portfolioValue: String
    let solBalance: String
    let change24h: String
}

struct OrdoWidgetView: View {
    var entry: OrdoWidgetEntry
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("Ordo Portfolio")
                .font(.headline)
            Text(entry.portfolioValue)
                .font(.title)
            HStack {
                Text(entry.solBalance)
                Spacer()
                Text(entry.change24h)
                    .foregroundColor(entry.change24h.hasPrefix("+") ? .green : .red)
            }
        }
        .padding()
    }
}
```

### Device Assistant Integration

**Siri Shortcuts (iOS):**
```typescript
import { IntentHandler } from 'expo-intent-launcher';

class SiriIntegration {
  registerShortcuts() {
    // Register Siri shortcuts
    const shortcuts = [
      {
        identifier: 'check-portfolio',
        title: 'Check my portfolio',
        suggestedInvocationPhrase: 'Check my Ordo portfolio',
      },
      {
        identifier: 'send-sol',
        title: 'Send SOL',
        suggestedInvocationPhrase: 'Send SOL with Ordo',
      },
      {
        identifier: 'check-messages',
        title: 'Check messages',
        suggestedInvocationPhrase: 'Check my messages in Ordo',
      },
    ];
    
    // Register with iOS
    shortcuts.forEach(shortcut => {
      IntentHandler.registerShortcut(shortcut);
    });
  }
  
  async handleIntent(intent: string, params: any): Promise<string> {
    switch (intent) {
      case 'check-portfolio':
        return await this.handlePortfolioCheck();
      case 'send-sol':
        return await this.handleSendSOL(params);
      case 'check-messages':
        return await this.handleCheckMessages();
      default:
        return 'Unknown command';
    }
  }
  
  private async handlePortfolioCheck(): Promise<string> {
    const portfolio = await fetchPortfolio();
    return `Your portfolio is worth $${portfolio.totalValue}. You have ${portfolio.solBalance} SOL.`;
  }
}
```

**Google Assistant Actions (Android):**
```typescript
class GoogleAssistantIntegration {
  registerActions() {
    // Register app actions for Google Assistant
    const actions = [
      {
        name: 'actions.intent.CHECK_BALANCE',
        handler: this.handleCheckBalance,
      },
      {
        name: 'actions.intent.SEND_MONEY',
        handler: this.handleSendMoney,
      },
    ];
    
    return actions;
  }
  
  async handleCheckBalance(): Promise<string> {
    const portfolio = await fetchPortfolio();
    return `Your Ordo portfolio has ${portfolio.solBalance} SOL worth $${portfolio.totalValue}.`;
  }
  
  async handleSendMoney(params: { amount: number; recipient: string }): Promise<string> {
    // Build transaction and request confirmation
    return `I can send ${params.amount} SOL to ${params.recipient}. Please confirm in the app.`;
  }
}
```

### Share Extension

**Share Intent Handler:**
```typescript
import { Share } from 'react-native';

class ShareHandler {
  async shareWalletAddress(address: string): Promise<void> {
    await Share.share({
      message: `My Solana wallet: ${address}`,
      title: 'Share Wallet Address',
    });
  }
  
  async shareTransaction(signature: string): Promise<void> {
    const url = `https://solscan.io/tx/${signature}`;
    await Share.share({
      message: `Check out my transaction: ${url}`,
      url,
      title: 'Share Transaction',
    });
  }
  
  async handleIncomingShare(data: any): Promise<void> {
    // Handle content shared to Ordo from other apps
    if (data.type === 'text/plain') {
      // Check if it's a wallet address or transaction
      if (this.isWalletAddress(data.text)) {
        // Open send screen with recipient pre-filled
        navigation.navigate('Send', { recipient: data.text });
      } else if (this.isTransactionSignature(data.text)) {
        // Open transaction details
        navigation.navigate('Transaction', { signature: data.text });
      }
    }
  }
  
  private isWalletAddress(text: string): boolean {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(text);
  }
  
  private isTransactionSignature(text: string): boolean {
    return /^[1-9A-HJ-NP-Za-km-z]{87,88}$/.test(text);
  }
}
```

### Background Services

**Background Fetch:**
```typescript
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'ordo-background-fetch';

// Define background task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    // Fetch portfolio updates
    const portfolio = await fetchPortfolio();
    
    // Check for price alerts
    await checkPriceAlerts(portfolio);
    
    // Check for new messages
    await checkNewMessages();
    
    // Update widget
    await updateWidget(portfolio);
    
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Background fetch failed:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Register background fetch
async function registerBackgroundFetch() {
  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 15 * 60, // 15 minutes
    stopOnTerminate: false,
    startOnBoot: true,
  });
}
```

### Biometric Authentication

**Biometric Auth Service:**
```typescript
import * as LocalAuthentication from 'expo-local-authentication';

class BiometricAuth {
  async isAvailable(): Promise<boolean> {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  }
  
  async getSupportedTypes(): Promise<string[]> {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    return types.map(type => {
      switch (type) {
        case LocalAuthentication.AuthenticationType.FINGERPRINT:
          return 'fingerprint';
        case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
          return 'face';
        case LocalAuthentication.AuthenticationType.IRIS:
          return 'iris';
        default:
          return 'unknown';
      }
    });
  }
  
  async authenticate(reason: string): Promise<boolean> {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: reason,
      fallbackLabel: 'Use passcode',
      disableDeviceFallback: false,
    });
    
    return result.success;
  }
  
  async authenticateForTransaction(
    amount: number,
    token: string,
    recipient: string
  ): Promise<boolean> {
    return await this.authenticate(
      `Confirm sending ${amount} ${token} to ${recipient}`
    );
  }
  
  async authenticateForAppAccess(): Promise<boolean> {
    return await this.authenticate('Unlock Ordo');
  }
}
```

### Offline Mode

**Offline Cache Manager:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

class OfflineManager {
  private isOnline: boolean = true;
  
  constructor() {
    // Monitor network status
    NetInfo.addEventListener(state => {
      this.isOnline = state.isConnected ?? false;
    });
  }
  
  async cacheData(key: string, data: any): Promise<void> {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
      version: 1,
    };
    
    await AsyncStorage.setItem(
      `cache:${key}`,
      JSON.stringify(cacheEntry)
    );
  }
  
  async getCachedData(key: string, maxAge: number = 3600000): Promise<any | null> {
    const cached = await AsyncStorage.getItem(`cache:${key}`);
    if (!cached) return null;
    
    const entry = JSON.parse(cached);
    const age = Date.now() - entry.timestamp;
    
    if (age > maxAge) {
      // Cache expired
      return null;
    }
    
    return entry.data;
  }
  
  async getPortfolio(): Promise<any> {
    if (this.isOnline) {
      // Fetch from backend
      const portfolio = await fetchPortfolio();
      await this.cacheData('portfolio', portfolio);
      return portfolio;
    } else {
      // Return cached data
      const cached = await this.getCachedData('portfolio');
      if (!cached) {
        throw new Error('No cached portfolio data available offline');
      }
      return { ...cached, offline: true };
    }
  }
}
```

### Accessibility Features

**Accessibility Configuration:**
```typescript
import { AccessibilityInfo, Platform } from 'react-native';

class AccessibilityManager {
  async isScreenReaderEnabled(): Promise<boolean> {
    return await AccessibilityInfo.isScreenReaderEnabled();
  }
  
  async announceForAccessibility(message: string): Promise<void> {
    AccessibilityInfo.announceForAccessibility(message);
  }
  
  configureAccessibility() {
    // Configure all interactive elements
    return {
      accessible: true,
      accessibilityLabel: 'Descriptive label',
      accessibilityHint: 'What happens when you tap',
      accessibilityRole: 'button',
      accessibilityState: { disabled: false },
    };
  }
  
  // High contrast mode
  async enableHighContrast(): Promise<void> {
    // Apply high contrast theme
    const theme = {
      background: '#000000',
      text: '#FFFFFF',
      primary: '#FFFF00',
      secondary: '#00FFFF',
    };
    
    await AsyncStorage.setItem('theme', JSON.stringify(theme));
  }
  
  // Large text support
  async enableLargeText(): Promise<void> {
    const scale = await AccessibilityInfo.getRecommendedTimeoutMillis(1000);
    await AsyncStorage.setItem('textScale', scale.toString());
  }
}
```

### Mistral AI Integration

Ordo uses Mistral AI as its primary LLM provider, ensuring independence from OpenAI while maintaining high-quality AI capabilities.

**Mistral AI Models Used:**

1. **mistral-large-latest**: Primary model for agent orchestration, query understanding, and response generation
2. **mistral-embed**: Embedding model for RAG system (1024 dimensions)
3. **mistral-small-latest**: Optional lightweight model for simple queries

**LangChain Integration:**

```python
from langchain_mistralai import ChatMistralAI, MistralAIEmbeddings
from langchain_core.messages import HumanMessage, SystemMessage

# Initialize Mistral chat model
llm = ChatMistralAI(
    model="mistral-large-latest",
    temperature=0.7,
    api_key=settings.MISTRAL_API_KEY,
    max_tokens=4096,
    safe_mode=False,  # Allow full capabilities
    random_seed=None  # For reproducibility, set a seed
)

# Initialize Mistral embeddings
embeddings = MistralAIEmbeddings(
    model="mistral-embed",
    api_key=settings.MISTRAL_API_KEY
)

# Function calling with Mistral
tools = [
    {
        "type": "function",
        "function": {
            "name": "search_email_threads",
            "description": "Search Gmail threads using Gmail API",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query string"
                    },
                    "max_results": {
                        "type": "integer",
                        "description": "Maximum number of results"
                    }
                },
                "required": ["query"]
            }
        }
    }
]

# Bind tools to model
llm_with_tools = llm.bind_tools(tools)

# Invoke with function calling
response = await llm_with_tools.ainvoke([
    SystemMessage(content="You are a helpful assistant"),
    HumanMessage(content="Search my emails about hackathons")
])
```

**RAG with Mistral Embeddings:**

```python
from langchain_mistralai import MistralAIEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore
from supabase import create_client

# Initialize Mistral embeddings
embeddings = MistralAIEmbeddings(
    model="mistral-embed",
    api_key=settings.MISTRAL_API_KEY
)

# Create Supabase vector store
supabase_client = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY
)

vector_store = SupabaseVectorStore(
    client=supabase_client,
    embedding=embeddings,
    table_name="documents",
    query_name="match_documents"
)

# Add documents
await vector_store.aadd_documents([
    Document(
        page_content="Solana is a high-performance blockchain...",
        metadata={"source": "solana_docs", "title": "Introduction"}
    )
])

# Semantic search
results = await vector_store.asimilarity_search(
    "What is Solana?",
    k=5
)
```

**Streaming Responses:**

```python
async def stream_response(query: str):
    """Stream Mistral AI responses for real-time feedback"""
    async for chunk in llm.astream([
        SystemMessage(content=ORDO_SYSTEM_PROMPT),
        HumanMessage(content=query)
    ]):
        yield chunk.content
```

**Cost Optimization:**

Mistral AI offers competitive pricing compared to OpenAI:
- **mistral-large-latest**: $2/1M input tokens, $6/1M output tokens
- **mistral-embed**: $0.10/1M tokens
- **mistral-small-latest**: $0.20/1M input tokens, $0.60/1M output tokens

For cost optimization:
1. Use `mistral-small-latest` for simple queries
2. Cache embeddings to avoid regeneration
3. Implement prompt caching for repeated system prompts
4. Use streaming to provide faster perceived response times

**Environment Configuration:**

```bash
# .env file
MISTRAL_API_KEY=your_mistral_api_key_here

# Get API key from: https://console.mistral.ai/
```

**Error Handling:**

```python
from mistralai.exceptions import MistralException

async def safe_llm_call(messages: list):
    """Call Mistral AI with error handling"""
    try:
        response = await llm.ainvoke(messages)
        return response
    except MistralException as e:
        if "rate_limit" in str(e):
            # Implement exponential backoff
            await asyncio.sleep(2)
            return await safe_llm_call(messages)
        elif "invalid_api_key" in str(e):
            raise ValueError("Invalid Mistral API key")
        else:
            raise
```

## Conclusion

This design document provides a comprehensive technical specification for Ordo, a privacy-first AI assistant for Solana Seeker with advanced DeFi, NFT, trading, and agentic payment capabilities. The architecture emphasizes:

1. **Privacy by Default**: Multi-layer filtering and explicit user consent
2. **Zero Private Key Access**: Seed Vault and MWA integration
3. **Modular Design**: Clear separation of concerns and extensibility
4. **DeFi Integration**: Solana Agent Kit + Plugin God Mode for comprehensive DeFi operations
5. **Agentic Payments**: x402 protocol for autonomous AI service payments
6. **Robust Testing**: Dual approach with unit and property-based tests (46 properties)
7. **Production Ready**: Scalable infrastructure and monitoring

The implementation follows industry best practices for security, privacy, and user experience while leveraging the latest technologies in the Solana ecosystem (Helius, MWA, Seed Vault, Jupiter, Tensor, Drift, Metaplex) and AI orchestration (LangGraph, LangChain).
