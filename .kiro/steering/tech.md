# Technology Stack

## Frontend (ordo/)

### Core Technologies
- **Framework**: React Native 0.81.5 + React 19.1.0
- **Platform**: Expo ~54.0.21 with Expo Router ~6.0.10
- **Language**: TypeScript 5.9.3 (strict mode enabled)
- **Blockchain**: Solana Web3.js 1.98.4 + Solana Mobile Stack
- **State Management**: React Query (@tanstack/react-query 5.85.5)
- **Navigation**: Expo Router (file-based routing)

### Key Libraries
- `@solana-mobile/mobile-wallet-adapter-protocol`: MWA integration
- `@solana/spl-token`: Token operations
- `expo-secure-store`: Encrypted storage
- `expo-local-authentication`: Biometric auth
- `expo-notifications`: Push notifications
- `react-native-quick-crypto`: Crypto polyfills

### Code Quality Tools
- **Linter**: ESLint 9.33.0 with expo config
- **Formatter**: Prettier 3.7.4
  - Single quotes, no semicolons, 120 char width, trailing commas
- **Testing**: Jest 30.2.0 + ts-jest 29.4.6

### Build System
- **Development**: Expo CLI
- **Production**: EAS Build
- **Platforms**: iOS, Android, Web

## Backend (ordo-backend/)

### Core Technologies
- **Framework**: FastAPI 0.109.0
- **Server**: Uvicorn 0.27.0 with standard extras
- **Language**: Python 3.11+
- **AI Orchestration**: 
  - LangChain 0.1.4 (core framework)
  - LangGraph 0.0.20 (agent workflows and state management)
  - LangSmith (observability and debugging)
  - Mistral AI 0.1.3 (LLM provider)
- **Database**: PostgreSQL 15+ with pgvector 0.2.4
- **Cache**: Redis 7+ (redis 5.0.1 + hiredis 2.3.2)
- **ORM**: SQLAlchemy 2.0.25 (async) + Alembic 1.13.1

### Key Libraries
- `langchain-mistralai`: Mistral AI integration
- `langchain-mcp-adapters`: Model Context Protocol support
- `supabase`: RAG and vector storage
- `solana`: Blockchain operations
- `slowapi`: Rate limiting
- `python-jose`: JWT authentication
- `httpx`: Async HTTP client

### Code Quality Tools
- **Testing**: pytest 7.4.4 + pytest-asyncio 0.23.3 + hypothesis 6.98.3
- **Coverage**: pytest-cov 4.1.0
- **Validation**: Pydantic 2.5.3

## Infrastructure

### Docker Compose Services
- **PostgreSQL 15**: ankane/pgvector:v0.5.1 (port 5432)
- **Redis 7**: redis:7.2-alpine (port 6379)

### External Services
- **Mistral AI**: LLM and embeddings
- **Helius**: Solana RPC provider
- **Supabase**: Vector database for RAG
- **Brave Search**: Web search API

## Common Commands

### Frontend (ordo/)

```bash
# Development
npm run dev              # Start Expo dev server
npm run android          # Run on Android
npm run ios              # Run on iOS
npm run web              # Run on web

# Code Quality
npm run lint             # Run ESLint with auto-fix
npm run lint:check       # Check without fixing
npm run fmt              # Format with Prettier
npm run fmt:check        # Check formatting
npm run ci               # Run all checks + build

# Testing
npm test                 # Run Jest tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report

# Build
npm run build            # TypeScript check + Android prebuild
npm run android:build    # Build Android APK

# Utilities
npm run verify-setup     # Verify project setup
npm run doctor           # Run Expo doctor
```

### Backend (ordo-backend/)

```bash
# Setup
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Development
python main.py           # Start with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4

# Testing
pytest                   # Run all tests
pytest -v                # Verbose output
pytest --cov=ordo_backend --cov-report=html  # With coverage
pytest -m unit           # Run unit tests only
pytest -m integration    # Run integration tests only

# Database
alembic upgrade head     # Run migrations
alembic revision --autogenerate -m "message"  # Create migration
```

### Docker Services

```bash
# Start services
docker-compose up -d     # Detached mode
docker-compose up        # With logs

# Management
docker-compose ps        # Check status
docker-compose logs -f   # Follow logs
docker-compose restart postgres  # Restart service
docker-compose down      # Stop (keeps data)
docker-compose down -v   # Stop and remove data

# Access services
docker-compose exec postgres psql -U ordo -d ordo_db
docker-compose exec redis redis-cli

# Monitoring
docker-compose stats     # Resource usage
```

## Path Aliases

TypeScript path aliases configured in `tsconfig.json`:

```typescript
// Use @/ for imports from project root
import { PermissionManager } from '@/services/PermissionManager'
import { Button } from '@/components/ui/Button'
```

## Environment Configuration

### Frontend (.env in ordo/)
- `BACKEND_API_URL`: Backend API endpoint
- `API_KEY_FRONTEND`: Frontend API key
- External API keys: Helius, Mistral, Google, X, Telegram, Brave, Supabase

### Backend (.env in ordo-backend/)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `MISTRAL_API_KEY`: Mistral AI API key
- `HELIUS_API_KEY`: Helius RPC API key
- `API_SECRET_KEY`: JWT signing key
- `API_KEY_FRONTEND`: Frontend authentication key

## API Documentation

When backend is running:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health
