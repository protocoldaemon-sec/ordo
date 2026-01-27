# Ordo Backend

Privacy-first AI assistant backend for Solana Seeker. Built with FastAPI, LangChain, LangGraph, and Mistral AI.

## Overview

The Ordo backend provides:
- **AI Orchestration**: LangGraph-based agent for intelligent query routing
- **Tool Execution**: MCP-based tool integration for email, social, wallet, DeFi, NFT, and trading operations.
- **Policy Enforcement**: Multi-layer content filtering to protect sensitive data
- **Audit Logging**: Comprehensive logging for compliance and transparency

## Technology Stack

- **Framework**: FastAPI 0.109.0
- **AI**: Mistral AI (mistral-large-latest, mistral-embed)
- **Orchestration**: LangChain + LangGraph
- **Integration**: Model Context Protocol (MCP)
- **Database**: PostgreSQL with pgvector (via Supabase)
- **Cache**: Redis
- **Blockchain**: Solana (via Helius RPC)

## Project Structure

```
ordo-backend/
├── ordo_backend/
│   ├── __init__.py
│   ├── config.py              # Configuration management
│   ├── routes/                # API route handlers
│   │   ├── health.py          # Health check endpoints
│   │   ├── query.py           # Query processing
│   │   ├── tools.py           # Tool execution
│   │   ├── rag.py             # Documentation queries
│   │   └── audit.py           # Audit log access
│   ├── services/              # Business logic
│   │   ├── orchestrator.py    # LangGraph agent
│   │   └── policy_engine.py   # Content filtering
│   ├── models/                # Database models
│   │   └── database.py        # SQLAlchemy models
│   └── utils/                 # Utilities
│       └── logger.py          # Logging setup
├── main.py                    # Application entry point
├── requirements.txt           # Python dependencies
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## Setup

### Prerequisites

- Python 3.11+
- PostgreSQL 15+ with pgvector extension
- Redis 7+
- Mistral AI API key
- Helius API key

### Installation

1. **Clone the repository** (if not already done)

2. **Create virtual environment**:
   ```bash
   cd ordo-backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Set up database** (using Docker Compose):
   ```bash
   # Start PostgreSQL and Redis services
   docker-compose up -d
   
   # Verify services are running
   docker-compose ps
   
   # View logs
   docker-compose logs -f
   
   # Stop services
   docker-compose down
   
   # Stop services and remove volumes (WARNING: deletes all data)
   docker-compose down -v
   ```
   
   The Docker Compose setup includes:
   - **PostgreSQL 15** with pgvector extension (port 5432)
   - **Redis 7** for caching (port 6379)
   - Automatic database initialization with schema
   - Health checks for both services
   - Persistent data volumes

### Running the Server

**Development mode** (with auto-reload):
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Production mode**:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### API Documentation

Once the server is running, access:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## Environment Variables

See `.env.example` for all required environment variables. Key variables:

- `MISTRAL_API_KEY`: Mistral AI API key for LLM and embeddings
- `HELIUS_API_KEY`: Helius API key for Solana RPC access
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `SUPABASE_URL` / `SUPABASE_KEY`: Supabase credentials for RAG
- `API_SECRET_KEY`: Secret key for JWT signing
- `API_KEY_FRONTEND`: API key for frontend authentication

## Development Roadmap

This backend is being built in phases:

- **Phase 1** (Current): Core Infrastructure
  - ✅ Task 1.1.2: Project setup
  - ✅ Task 1.1.3: Docker Compose setup
  - ⏳ Task 1.3: Backend API foundation

- **Phase 2**: Wallet Integration
- **Phase 3**: Gmail Integration
- **Phase 4**: Social Media Integration
- **Phase 5**: AI Orchestration (LangGraph + MCP)
- **Phase 6**: RAG System
- **Phase 7**: Security & Privacy
- **Phase 8+**: UI/UX, Testing, Deployment

## Docker Compose Services

The project includes a Docker Compose configuration for local development with PostgreSQL and Redis.

### Services

#### PostgreSQL (ankane/pgvector:v0.5.1)
- **Port**: 5432
- **Database**: ordo_db
- **User**: ordo
- **Password**: ordo_password (change in production!)
- **Extensions**: pgvector for RAG embeddings
- **Volume**: postgres_data (persistent storage)
- **Health Check**: Automatic readiness checks

#### Redis (redis:7.2-alpine)
- **Port**: 6379
- **Password**: None (set in production!)
- **Persistence**: AOF (Append-Only File) enabled
- **Volume**: redis_data (persistent storage)
- **Health Check**: Automatic readiness checks

### Docker Compose Commands

```bash
# Start all services in detached mode
docker-compose up -d

# Start services with logs visible
docker-compose up

# View logs for all services
docker-compose logs -f

# View logs for specific service
docker-compose logs -f postgres
docker-compose logs -f redis

# Check service status
docker-compose ps

# Stop all services (keeps data)
docker-compose down

# Stop services and remove volumes (WARNING: deletes all data)
docker-compose down -v

# Restart a specific service
docker-compose restart postgres

# Execute commands in containers
docker-compose exec postgres psql -U ordo -d ordo_db
docker-compose exec redis redis-cli

# View resource usage
docker-compose stats
```

### Database Initialization

The PostgreSQL container automatically runs the initialization script at `ordo-backend/scripts/init-db.sql` on first startup. This script:

1. Enables the pgvector extension
2. Creates all required tables:
   - `audit_log`: Access attempt tracking
   - `user_permissions`: Permission states and OAuth tokens
   - `conversations`: Chat history
   - `messages`: Individual messages
   - `documents`: RAG document embeddings
   - `policy_violations`: Blocked content tracking
3. Creates indexes for efficient querying
4. Sets up triggers for automatic timestamp updates

### Connecting to Services

**PostgreSQL Connection String**:
```
postgresql+asyncpg://ordo:ordo_password@localhost:5432/ordo_db
```

**Redis Connection String**:
```
redis://localhost:6379/0
```

These are already configured in `.env.example`.

### Troubleshooting

**Port already in use**:
```bash
# Check what's using the port
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis

# Stop conflicting services or change ports in docker-compose.yml
```

**Database not initializing**:
```bash
# Remove volumes and restart
docker-compose down -v
docker-compose up -d

# Check initialization logs
docker-compose logs postgres
```

**Connection refused**:
```bash
# Wait for health checks to pass
docker-compose ps

# Verify services are healthy (should show "healthy" status)
```

## Testing

Run tests with pytest:
```bash
pytest
```

Run with coverage:
```bash
pytest --cov=ordo_backend --cov-report=html
```

## Architecture

### Request Flow

1. **Client** sends query to `/api/v1/query`
2. **API Route** validates request and checks rate limits
3. **Orchestrator** (LangGraph agent):
   - Parses query and extracts intent
   - Checks user permissions
   - Selects appropriate tools
   - Executes tools via MCP servers
4. **Policy Engine** filters sensitive content
5. **Context Aggregator** combines multi-surface results
6. **Response Generator** creates natural language response with citations
7. **Client** receives response with sources

### MCP Integration

All external tools are exposed via MCP (Model Context Protocol) servers:
- **Email MCP Server** (port 8001): Gmail operations
- **Social MCP Server** (port 8002): X/Twitter and Telegram
- **Wallet MCP Server** (port 8003): Solana wallet operations
- **DeFi MCP Server** (port 8004): Jupiter, Lulo, Sanctum, Drift
- **NFT MCP Server** (port 8005): Metaplex, Tensor
- **Trading MCP Server** (port 8006): Manifest, Adrena, market analysis

## Security

- **Rate Limiting**: 60 requests/minute per IP (configurable)
- **CORS**: Configured for frontend origins only
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, CSP, HSTS
- **Input Validation**: Pydantic models for all requests
- **Error Sanitization**: No sensitive data in error responses
- **Audit Logging**: All access attempts logged

## License

Proprietary - Ordo Project

## Support

For issues and questions, see the main Ordo repository.
