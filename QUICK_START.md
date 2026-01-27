# Ordo Quick Start Guide

Get up and running with Ordo development in minutes.

## Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Docker and Docker Compose
- Git

## Initial Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd ordo

# Install frontend dependencies
cd ordo
npm install

# Install backend dependencies
cd ../ordo-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

#### Frontend (.env in ordo/)
```bash
cp .env.example .env
# Edit .env and set:
BACKEND_API_URL=http://localhost:8000
API_KEY_FRONTEND=dev_api_key_12345
```

#### Backend (.env in ordo-backend/)
```bash
cp .env.example .env
# Edit .env and set:
API_KEY_FRONTEND=dev_api_key_12345
DATABASE_URL=postgresql+asyncpg://ordo:ordo_password@localhost:5432/ordo_db
REDIS_URL=redis://localhost:6379/0
MISTRAL_API_KEY=your_mistral_key  # Get from https://console.mistral.ai
```

### 3. Start Services

```bash
# Start Docker services (PostgreSQL + Redis)
docker-compose up -d

# Verify services are running
docker-compose ps
```

### 4. Initialize Database

```bash
cd ordo-backend

# Run migrations
alembic upgrade head

# Or let the app initialize on startup
python main.py
```

## Development Workflow

### Terminal 1: Backend
```bash
cd ordo-backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python main.py

# Backend runs on http://localhost:8000
# API docs: http://localhost:8000/docs
```

### Terminal 2: Frontend
```bash
cd ordo
npm run dev

# Frontend runs on http://localhost:8081
# Expo DevTools: http://localhost:8081
```

### Terminal 3: Tests
```bash
# Frontend tests
cd ordo
npm test

# Backend tests
cd ordo-backend
pytest
pytest --cov=ordo_backend  # With coverage
```

## Common Commands

### Frontend (ordo/)
```bash
npm run dev              # Start Expo dev server
npm run android          # Run on Android
npm run ios              # Run on iOS
npm test                 # Run tests
npm run lint             # Lint code
npm run fmt              # Format code
```

### Backend (ordo-backend/)
```bash
python main.py           # Start server
pytest                   # Run tests
pytest --cov             # Run tests with coverage
alembic upgrade head     # Run migrations
alembic revision --autogenerate -m "message"  # Create migration
```

### Docker
```bash
docker-compose up -d     # Start services
docker-compose down      # Stop services
docker-compose logs -f   # View logs
docker-compose ps        # Check status
```

## Project Structure

```
ordo/
├── ordo/                    # React Native frontend
│   ├── app/                 # Expo Router pages
│   ├── components/          # React components
│   ├── services/            # Business logic
│   ├── __tests__/           # Tests
│   └── package.json
├── ordo-backend/            # Python FastAPI backend
│   ├── ordo_backend/
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   └── utils/           # Utilities
│   ├── tests/               # Tests
│   ├── alembic/             # Database migrations
│   └── requirements.txt
├── docker-compose.yml       # Docker services
└── .kiro/specs/ordo/        # Specifications
```

## Key Features Implemented (Phase 1)

✅ **Permission Management**
- Grant/revoke permissions for Gmail, X, Telegram, Wallet
- Secure token storage with expo-secure-store
- Permission UI with status cards

✅ **Backend API**
- FastAPI with async support
- PostgreSQL with pgvector
- Redis for caching
- API key authentication
- Rate limiting

✅ **Database**
- Async connection pooling
- Alembic migrations
- Models: AuditLog, UserPermission, Conversation

## Testing

### Run All Tests
```bash
# Frontend
cd ordo && npm test

# Backend
cd ordo-backend && pytest
```

### Test Coverage
```bash
# Frontend
cd ordo && npm run test:coverage

# Backend
cd ordo-backend && pytest --cov=ordo_backend --cov-report=html
# Open htmlcov/index.html
```

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Frontend Build Issues
```bash
# Clear cache
cd ordo
rm -rf node_modules
npm install

# Clear Expo cache
npx expo start -c
```

### Backend Import Issues
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # Windows: venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt
```

## Next Steps

1. **Phase 2**: Implement Wallet Integration
   - SeedVaultAdapter with MWA
   - Helius RPC integration
   - Transaction signing

2. **Phase 3**: Gmail Integration
   - OAuth setup
   - Email tools
   - PolicyEngine

3. **Phase 5**: AI Orchestration
   - LangGraph workflow
   - MCP servers
   - Mistral AI integration

## Resources

- **Specifications**: `.kiro/specs/ordo/`
- **API Docs**: http://localhost:8000/docs (when backend is running)
- **Phase 1 Complete**: `PHASE_1_COMPLETE.md`
- **Docker Setup**: `DOCKER_SETUP.md`

## Getting Help

- Check the specifications in `.kiro/specs/ordo/`
- Review test files for usage examples
- Check API documentation at `/docs` endpoint
- Review `PHASE_1_COMPLETE.md` for implementation details

---

**Happy Coding!** 🚀
