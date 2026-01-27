# Ordo

Privacy-first AI assistant for Solana Seeker. Intelligent multi-surface access to Gmail, social media (X/Twitter, Telegram), and Solana wallet functionality with strict privacy controls.

## Overview

Ordo is a native mobile AI assistant built on React Native and Solana Mobile Stack that provides:

- **Multi-Surface Integration**: Gmail, X/Twitter, Telegram, and Solana wallet
- **Privacy-First Design**: Three-tier permission system with automatic sensitive data filtering
- **AI Orchestration**: LangGraph-based intelligent query routing
- **Blockchain Operations**: Secure wallet integration via Seed Vault and MWA
- **RAG System**: Documentation queries powered by pgvector embeddings

## Project Structure

```
ordo/
├── ordo/                    # React Native frontend (Expo)
│   ├── app/                 # Expo Router screens
│   ├── components/          # React components
│   ├── services/            # Business logic (PermissionManager, etc.)
│   └── utils/               # Utilities
├── ordo-backend/            # Python FastAPI backend
│   ├── ordo_backend/        # Backend source code
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   └── utils/           # Utilities
│   └── scripts/             # Database initialization scripts
├── docker-compose.yml       # Local development services
└── README.md                # This file
```

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Docker** and Docker Compose
- **Expo CLI**: `npm install -g expo-cli`

### 1. Start Backend Services

Start PostgreSQL (with pgvector) and Redis using Docker Compose:

```bash
# Start services in detached mode
docker-compose up -d

# Verify services are running
docker-compose ps

# View logs
docker-compose logs -f
```

This will start:
- **PostgreSQL 15** with pgvector extension on port 5432
- **Redis 7** for caching on port 6379

The database will be automatically initialized with the required schema.

**For detailed Docker setup instructions, see [DOCKER_SETUP.md](DOCKER_SETUP.md)**

### 2. Set Up Backend

```bash
cd ordo-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your API keys (Mistral AI, Helius, etc.)

# Start backend server
python main.py
```

Backend will be available at http://localhost:8000

### 3. Set Up Frontend

```bash
cd ordo

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with backend URL

# Start Expo development server
npm start
```

Follow the Expo CLI instructions to run on:
- **Android**: Press `a` or scan QR code with Expo Go
- **iOS**: Press `i` or scan QR code with Expo Go
- **Web**: Press `w`

## Docker Compose Services

### PostgreSQL
- **Port**: 5432
- **Database**: ordo_db
- **User**: ordo
- **Password**: ordo_password
- **Extensions**: pgvector for RAG embeddings

### Redis
- **Port**: 6379
- **Persistence**: AOF enabled

### Useful Commands

```bash
# Stop services (keeps data)
docker-compose down

# Stop and remove all data
docker-compose down -v

# Restart a service
docker-compose restart postgres

# Access PostgreSQL
docker-compose exec postgres psql -U ordo -d ordo_db

# Access Redis CLI
docker-compose exec redis redis-cli

# View resource usage
docker-compose stats
```

## Environment Variables

### Backend (.env in ordo-backend/)

Required API keys:
- `MISTRAL_API_KEY`: Mistral AI for LLM and embeddings
- `HELIUS_API_KEY`: Helius RPC for Solana operations
- `SUPABASE_URL` / `SUPABASE_KEY`: Supabase for RAG (optional, can use local pgvector)
- `BRAVE_SEARCH_API_KEY`: Brave Search for web queries

Database connections (configured for Docker Compose):
- `DATABASE_URL`: postgresql+asyncpg://ordo:ordo_password@localhost:5432/ordo_db
- `REDIS_URL`: redis://localhost:6379/0

### Frontend (.env in ordo/)

- `BACKEND_API_URL`: http://localhost:8000
- `API_KEY_FRONTEND`: Must match backend API_KEY_FRONTEND

## Development Workflow

1. **Start Docker services**: `docker-compose up -d`
2. **Start backend**: `cd ordo-backend && python main.py`
3. **Start frontend**: `cd ordo && npm start`
4. **Make changes** and test
5. **Stop services**: `docker-compose down`

## API Documentation

Once the backend is running, access:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## Architecture

### Frontend (React Native + TypeScript)
- **Solana Mobile Stack**: MWA, Seed Vault
- **Expo**: Cross-platform mobile development
- **Components**: OrchestrationEngine, PermissionManager, ContextAggregator

### Backend (Python + FastAPI)
- **AI**: Mistral AI (mistral-large-latest, mistral-embed)
- **Orchestration**: LangChain + LangGraph
- **Integration**: Model Context Protocol (MCP)
- **Database**: PostgreSQL with pgvector
- **Cache**: Redis

### Security
- **Three-Tier Permissions**: Surface access, policy filtering, user confirmation
- **Sensitive Data Filtering**: Multi-layer content scanning
- **Audit Logging**: Comprehensive access tracking
- **Zero Private Key Access**: All wallet operations via Seed Vault

## Development Roadmap

- ✅ **Phase 1**: Core Infrastructure (Docker, Backend setup)
- ⏳ **Phase 2**: Wallet Integration (Seed Vault, Helius RPC)
- ⏳ **Phase 3**: Gmail Integration (OAuth, Policy Engine)
- ⏳ **Phase 4**: Social Media Integration (X, Telegram)
- ⏳ **Phase 5**: AI Orchestration (LangGraph, MCP)
- ⏳ **Phase 6**: RAG System (pgvector, Mistral embeddings)
- ⏳ **Phase 7**: Security & Privacy (Enhanced filtering)
- ⏳ **Phase 8+**: UI/UX, Testing, Deployment

## Testing

### Backend Tests
```bash
cd ordo-backend
pytest
pytest --cov=ordo_backend --cov-report=html
```

### Frontend Tests
```bash
cd ordo
npm test
npm run test:coverage
```

## Documentation

- **Backend**: See `ordo-backend/README.md`
- **Frontend**: See `ordo/README.md`
- **Spec**: See `.kiro/specs/ordo/`
  - `requirements.md`: Complete requirements (21 requirements)
  - `design.md`: Architecture and design decisions
  - `tasks.md`: Implementation task list (200+ tasks)

## License

Proprietary - Ordo Project

## Support

For issues and questions, please refer to the project documentation in `.kiro/specs/ordo/`.
