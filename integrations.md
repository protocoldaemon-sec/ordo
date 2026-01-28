# Ordo Integrations Guide

**Last Updated**: January 28, 2026  
**Project**: Ordo - Privacy-First AI Assistant for Solana Seeker

---

## Overview

This document provides a comprehensive guide to all external service integrations in Ordo. Each integration includes setup instructions, API documentation references, security considerations, and implementation status.

---

## Table of Contents

1. [Blockchain & Wallet](#blockchain--wallet)
2. [AI & LLM Services](#ai--llm-services)
3. [Email Integration](#email-integration)
4. [Social Media](#social-media)
5. [DeFi Protocols](#defi-protocols)
6. [NFT Marketplaces](#nft-marketplaces)
7. [Data & Analytics](#data--analytics)
8. [Infrastructure](#infrastructure)

---

## Blockchain & Wallet

### Solana Mobile Stack (MWA + Seed Vault)

**Status**: ✅ Implemented (Phase 2)  
**Purpose**: Secure wallet integration with zero private key access  
**Documentation**: `resources/solana-mobile-llms.txt`

**Key Features**:
- Mobile Wallet Adapter (MWA) for transaction signing
- Seed Vault for secure key storage with biometric auth
- Support for mainnet-beta, devnet, testnet clusters

**Implementation**:
- **Frontend**: `ordo/services/SeedVaultAdapter.ts`
- **Package**: `@solana-mobile/mobile-wallet-adapter-protocol-web3js`
- **Tests**: `ordo/__tests__/SeedVaultAdapter.test.ts`

**Configuration**:
```typescript
// App identity for MWA
const ORDO_IDENTITY = {
  name: 'Ordo',
  uri: 'https://ordo.app',
  icon: 'favicon.ico'
};
```

**Security**:
- ✅ Zero private key access
- ✅ Biometric authentication required
- ✅ User confirmation for all transactions
- ✅ No key storage or transmission

**Resources**:
- [Solana Mobile Docs](https://docs.solanamobile.com/)
- [MWA Protocol Spec](https://solana-mobile.github.io/mobile-wallet-adapter/)

---

### Helius RPC

**Status**: 🚀 Ready for Implementation (Phase 2)  
**Purpose**: Enhanced Solana RPC with DAS API, transaction history, priority fees  
**Documentation**: `resources/helius-llms.txt`

**Key Features**:
- **DAS API**: Digital Asset Standard for tokens and NFTs
- **Enhanced Transactions**: Parsed transaction history with types
- **Priority Fees**: Dynamic fee estimation
- **Webhooks**: Real-time transaction notifications (future)

**API Endpoints**:
```python
# DAS API
POST https://mainnet.helius-rpc.com/?api-key={API_KEY}
Method: getAssetsByOwner

# Enhanced Transactions
POST https://api.helius.xyz/v0/addresses/{address}/transactions
Query: ?api-key={API_KEY}

# Priority Fees
POST https://mainnet.helius-rpc.com/?api-key={API_KEY}
Method: getPriorityFeeEstimate
```

**Implementation Plan**:
- **Backend**: `ordo-backend/ordo_backend/tools/wallet_tools.py`
- **Functions**: 
  - `get_wallet_portfolio(address)` - DAS API
  - `get_transaction_history(address)` - Enhanced Transactions
  - `get_priority_fee_estimate(accounts)` - Priority Fees
  - `build_transfer_transaction()` - Transaction building

**Environment Variables**:
```bash
HELIUS_API_KEY=your_api_key_here
HELIUS_RPC_URL=https://mainnet.helius-rpc.com
```

**Rate Limits**:
- Free tier: 100 requests/second
- Pro tier: 1000 requests/second
- Implement caching for portfolio data

**Resources**:
- [Helius Docs](https://docs.helius.dev/)
- [DAS API Reference](https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api)

---

## AI & LLM Services

### Mistral AI

**Status**: 🚀 Ready for Implementation (Phase 5)  
**Purpose**: LLM inference and embeddings  
**Documentation**: `resources/langchain-llms.txt`

**Models**:
- **mistral-large-latest**: Main LLM for query processing and response generation
- **mistral-embed**: Text embeddings for RAG system

**API Endpoints**:
```python
# Chat Completions
POST https://api.mistral.ai/v1/chat/completions

# Embeddings
POST https://api.mistral.ai/v1/embeddings
```

**Implementation Plan**:
- **Backend**: `ordo-backend/ordo_backend/services/orchestrator.py`
- **LangChain Integration**: `ChatMistralAI` from `langchain-mistralai`
- **Function Calling**: Tool selection via Mistral function calling

**Configuration**:
```python
from langchain_mistralai import ChatMistralAI

llm = ChatMistralAI(
    model="mistral-large-latest",
    temperature=0.7,
    api_key=os.getenv("MISTRAL_API_KEY")
)
```

**Environment Variables**:
```bash
MISTRAL_API_KEY=your_api_key_here
```

**Cost Optimization**:
- Cache common queries
- Use streaming for long responses
- Implement token counting and limits

**Resources**:
- [Mistral AI Docs](https://docs.mistral.ai/)
- [LangChain Mistral Integration](https://python.langchain.com/docs/integrations/chat/mistralai)

---

## Email Integration

### Gmail API

**Status**: ⏳ Planned (Phase 3)  
**Purpose**: Email search, read, and send capabilities  
**Documentation**: Google Cloud Console

**OAuth 2.0 Setup**:
1. Create Google Cloud Project
2. Enable Gmail API
3. Configure OAuth consent screen
4. Create OAuth 2.0 Client ID (Android/iOS)
5. Add authorized redirect URIs

**Scopes Required**:
```
https://www.googleapis.com/auth/gmail.readonly  # Read emails
https://www.googleapis.com/auth/gmail.send      # Send emails (future)
```

**API Endpoints**:
```
GET https://gmail.googleapis.com/gmail/v1/users/me/messages
GET https://gmail.googleapis.com/gmail/v1/users/me/messages/{id}
GET https://gmail.googleapis.com/gmail/v1/users/me/threads/{id}
POST https://gmail.googleapis.com/gmail/v1/users/me/messages/send
```

**Implementation Plan**:
- **Frontend**: `ordo/services/GmailAdapter.ts`
- **Backend**: `ordo-backend/ordo_backend/tools/email_tools.py`
- **MCP Server**: `ordo-backend/ordo_backend/mcp_servers/email.py`

**Security**:
- OAuth tokens stored in PermissionManager (encrypted)
- PolicyEngine filters sensitive emails (OTP codes, passwords)
- Audit logging for all email access

**Resources**:
- [Gmail API Docs](https://developers.google.com/gmail/api)
- [OAuth 2.0 for Mobile Apps](https://developers.google.com/identity/protocols/oauth2/native-app)

---

## Social Media

### X/Twitter API

**Status**: ⏳ Planned (Phase 4)  
**Purpose**: Read DMs, mentions, and timeline  
**Documentation**: X Developer Portal

**OAuth 2.0 Setup**:
1. Create X Developer Account
2. Create App in Developer Portal
3. Configure OAuth 2.0 settings
4. Request read permissions for DMs and mentions

**Scopes Required**:
```
tweet.read
users.read
dm.read
```

**API Endpoints**:
```
GET https://api.twitter.com/2/dm_conversations
GET https://api.twitter.com/2/users/{id}/mentions
GET https://api.twitter.com/2/users/{id}/tweets
```

**Implementation Plan**:
- **Frontend**: `ordo/services/XAdapter.ts`
- **Backend**: `ordo-backend/ordo_backend/tools/social_tools.py`
- **MCP Server**: `ordo-backend/ordo_backend/mcp_servers/social.py`

**Rate Limits**:
- Free tier: 1,500 tweets/month
- Basic tier: 10,000 tweets/month
- Implement request queuing

**Resources**:
- [X API v2 Docs](https://developer.twitter.com/en/docs/twitter-api)

---

### Telegram Bot API

**Status**: ⏳ Planned (Phase 4)  
**Purpose**: Read and send messages via bot  
**Documentation**: Telegram Bot API

**Setup**:
1. Create bot via [@BotFather](https://t.me/botfather)
2. Obtain bot token
3. Configure bot permissions
4. Users add bot to their chats

**API Endpoints**:
```
GET https://api.telegram.org/bot{token}/getUpdates
POST https://api.telegram.org/bot{token}/sendMessage
GET https://api.telegram.org/bot{token}/getChat
```

**Implementation Plan**:
- **Frontend**: `ordo/services/TelegramAdapter.ts`
- **Backend**: `ordo-backend/ordo_backend/tools/social_tools.py`
- **MCP Server**: `ordo-backend/ordo_backend/mcp_servers/social.py`

**Security**:
- Bot token stored securely in PermissionManager
- PolicyEngine filters sensitive messages
- User confirmation required for sending messages

**Resources**:
- [Telegram Bot API](https://core.telegram.org/bots/api)

---

## DeFi Protocols

### Jupiter Exchange

**Status**: ⏳ Planned (Phase 11)  
**Purpose**: Token swaps with optimal routing  
**Documentation**: `resources/sendai-llms.txt`, `resources/solana-agent-kit/`

**API Endpoints**:
```
GET https://quote-api.jup.ag/v6/quote
POST https://quote-api.jup.ag/v6/swap
```

**Implementation**:
- **Solana Agent Kit**: `trade()` action
- **MCP Server**: `ordo-backend/ordo_backend/mcp_servers/defi.py`

**Resources**:
- [Jupiter API Docs](https://station.jup.ag/docs/apis/swap-api)

---

### Lulo Finance

**Status**: ⏳ Planned (Phase 11)  
**Purpose**: USDC lending with flexible terms  
**Documentation**: `resources/sendai-llms.txt`

**Implementation**:
- **Solana Agent Kit**: `luloLend()`, `luloWithdraw()` actions
- **MCP Server**: `ordo-backend/ordo_backend/mcp_servers/defi.py`

**Resources**:
- [Lulo Docs](https://docs.lulo.fi/)

---

### Sanctum

**Status**: ⏳ Planned (Phase 11)  
**Purpose**: Liquid staking and LST swaps  
**Documentation**: `resources/sendai-llms.txt`

**Implementation**:
- **Solana Agent Kit**: `sanctumSwapLST()`, `sanctumGetLSTAPY()` actions
- **MCP Server**: `ordo-backend/ordo_backend/mcp_servers/defi.py`

**Resources**:
- [Sanctum Docs](https://docs.sanctum.so/)

---

### Drift Protocol

**Status**: ⏳ Planned (Phase 11)  
**Purpose**: Perpetual futures trading  
**Documentation**: `resources/sendai-llms.txt`

**Implementation**:
- **Solana Agent Kit**: `driftPerpTrade()` action
- **MCP Server**: `ordo-backend/ordo_backend/mcp_servers/trading.py`

**Resources**:
- [Drift Docs](https://docs.drift.trade/)

---

## NFT Marketplaces

### Metaplex

**Status**: ⏳ Planned (Phase 11)  
**Purpose**: NFT creation and collection management  
**Documentation**: `resources/sendai-llms.txt`, `resources/solana-agent-kit/`

**Implementation**:
- **Solana Agent Kit**: `deployCollection()`, `mintCollectionNFT()`, `getAsset()` actions
- **MCP Server**: `ordo-backend/ordo_backend/mcp_servers/nft.py`

**Resources**:
- [Metaplex Docs](https://docs.metaplex.com/)

---

### Tensor

**Status**: ⏳ Planned (Phase 11)  
**Purpose**: NFT marketplace for buying and selling  
**Documentation**: `resources/sendai-llms.txt`

**Implementation**:
- **Solana Agent Kit**: `listNFTForSale()`, `cancelListing()` actions
- **MCP Server**: `ordo-backend/ordo_backend/mcp_servers/nft.py`

**Resources**:
- [Tensor Docs](https://docs.tensor.trade/)

---

## Data & Analytics

### Brave Search API

**Status**: ⏳ Planned (Phase 6)  
**Purpose**: Web search for current information  
**Documentation**: Brave Search API

**API Endpoint**:
```
GET https://api.search.brave.com/res/v1/web/search
```

**Implementation Plan**:
- **Backend**: `ordo-backend/ordo_backend/tools/web_tools.py`
- **Function**: `web_search(query)` with fallback from RAG

**Environment Variables**:
```bash
BRAVE_SEARCH_API_KEY=your_api_key_here
```

**Resources**:
- [Brave Search API](https://brave.com/search/api/)

---

### CoinGecko

**Status**: ⏳ Planned (Phase 11)  
**Purpose**: Token prices and market data  
**Documentation**: `resources/sendai-llms.txt`

**Implementation**:
- **Solana Agent Kit**: `getCoingeckoTrendingTokens()` action
- **MCP Server**: `ordo-backend/ordo_backend/mcp_servers/trading.py`

**Resources**:
- [CoinGecko API](https://www.coingecko.com/en/api)

---

## Infrastructure

### Supabase (PostgreSQL + pgvector)

**Status**: ⏳ Planned (Phase 6)  
**Purpose**: Vector database for RAG embeddings  
**Documentation**: Supabase Docs

**Setup**:
1. Create Supabase project
2. Enable pgvector extension
3. Create documents table with vector column
4. Create indexes for vector search

**Schema**:
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  content TEXT,
  embedding VECTOR(1024),  -- Mistral embed dimension
  metadata JSONB,
  created_at TIMESTAMP
);

CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);
```

**Implementation Plan**:
- **Backend**: `ordo-backend/ordo_backend/services/rag_system.py`
- **Client**: `supabase-py` library

**Environment Variables**:
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key_here
```

**Resources**:
- [Supabase Docs](https://supabase.com/docs)
- [pgvector Guide](https://supabase.com/docs/guides/ai/vector-columns)

---

### PostgreSQL (Local)

**Status**: ✅ Implemented (Phase 1)  
**Purpose**: Audit logs, user permissions, conversations  
**Documentation**: Docker Compose setup

**Configuration**:
```yaml
# docker-compose.yml
postgres:
  image: ankane/pgvector:v0.5.1
  ports:
    - "5432:5432"
  environment:
    POSTGRES_DB: ordo_db
    POSTGRES_USER: ordo
    POSTGRES_PASSWORD: ordo_password
```

**Models**:
- `AuditLog`: Access attempts and policy violations
- `UserPermission`: Permission grants and tokens
- `Conversation`: Chat history
- `Document`: RAG document storage (future)

**Resources**:
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

### Redis

**Status**: ✅ Implemented (Phase 1)  
**Purpose**: Caching and session management  
**Documentation**: Docker Compose setup

**Configuration**:
```yaml
# docker-compose.yml
redis:
  image: redis:7.2-alpine
  ports:
    - "6379:6379"
```

**Use Cases**:
- Cache API responses (Helius, Gmail, etc.)
- Rate limiting counters
- Session tokens
- Request queuing

**Resources**:
- [Redis Docs](https://redis.io/docs/)

---

## Integration Checklist

### Before Adding New Integration

- [ ] Review relevant documentation in `resources/llms/`
- [ ] Check reference implementations in `resources/`
- [ ] Define security requirements (OAuth, API keys, etc.)
- [ ] Plan error handling and rate limiting
- [ ] Design MCP server interface (if applicable)
- [ ] Write unit tests with mocked responses
- [ ] Document environment variables
- [ ] Update this integrations.md file

### Security Checklist

- [ ] API keys stored in environment variables (never in code)
- [ ] OAuth tokens encrypted in PermissionManager
- [ ] PolicyEngine filtering for sensitive data
- [ ] Audit logging for all access attempts
- [ ] Rate limiting implemented
- [ ] Error messages don't expose sensitive info
- [ ] User confirmation for write operations

---

## Environment Variables Summary

```bash
# Blockchain
HELIUS_API_KEY=
HELIUS_RPC_URL=https://mainnet.helius-rpc.com

# AI
MISTRAL_API_KEY=

# Email
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Social Media
X_API_KEY=
X_API_SECRET=
TELEGRAM_BOT_TOKEN=

# Search
BRAVE_SEARCH_API_KEY=

# Database
DATABASE_URL=postgresql://ordo:ordo_password@localhost:5432/ordo_db
REDIS_URL=redis://localhost:6379

# RAG
SUPABASE_URL=
SUPABASE_KEY=

# Backend
API_SECRET_KEY=
API_KEY_FRONTEND=
```

---

## Resources

### Documentation
- **Specs**: `.kiro/specs/ordo/`
- **LLM Docs**: `resources/llms/`
- **Reference Code**: `resources/solana-agent-kit/`, `resources/solana-mcp/`

### External Links
- [Solana Docs](https://docs.solana.com/)
- [Solana Mobile Docs](https://docs.solanamobile.com/)
- [Helius Docs](https://docs.helius.dev/)
- [Mistral AI Docs](https://docs.mistral.ai/)
- [LangChain Docs](https://python.langchain.com/)

---

**Document Version**: 1.0  
**Last Updated**: January 28, 2026  
**Maintained By**: Ordo Development Team
