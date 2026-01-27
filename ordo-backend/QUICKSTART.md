# Ordo Backend - Quick Start Guide

Get the Ordo backend up and running in 5 minutes.

## Prerequisites

- Python 3.11 or higher
- pip (Python package manager)

## Quick Setup

### 1. Create Virtual Environment

```bash
cd ordo-backend
python -m venv venv
```

### 2. Activate Virtual Environment

**On macOS/Linux:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment

```bash
cp .env.example .env
```

**Edit `.env` and set required values:**
- `API_SECRET_KEY`: Generate a random secret key
- `API_KEY_FRONTEND`: Generate a random API key for frontend
- `MISTRAL_API_KEY`: Your Mistral AI API key (get from https://console.mistral.ai/)
- `HELIUS_API_KEY`: Your Helius API key (get from https://helius.dev/)
- `SUPABASE_URL` and `SUPABASE_KEY`: Your Supabase credentials (get from https://supabase.com/)
- `DATABASE_URL`: PostgreSQL connection string (will be set up in task 1.1.3)

**For development, you can use placeholder values for services not yet implemented.**

### 5. Verify Setup

```bash
python scripts/verify_setup.py
```

This will check:
- ✅ Python version
- ✅ Installed dependencies
- ✅ Environment configuration
- ✅ Project structure

### 6. Run the Server

```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 7. Test the API

Open your browser and visit:
- **Health Check**: http://localhost:8000/health
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

Or use curl:
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "0.1.0",
  "python_version": "3.11.0"
}
```

## Running Tests

```bash
pytest
```

Run with coverage:
```bash
pytest --cov=ordo_backend --cov-report=html
```

View coverage report:
```bash
open htmlcov/index.html  # macOS
xdg-open htmlcov/index.html  # Linux
start htmlcov/index.html  # Windows
```

## Development Workflow

1. **Make changes** to code
2. **Run tests**: `pytest`
3. **Check code**: The server auto-reloads in development mode
4. **Test endpoints**: Use the Swagger UI at http://localhost:8000/docs

## Next Steps

- **Task 1.1.3**: Set up Docker Compose for PostgreSQL and Redis
- **Task 1.3**: Implement database connection and API routes
- **Phase 2**: Implement wallet integration
- **Phase 3**: Implement Gmail integration
- **Phase 5**: Implement AI orchestration with LangGraph

## Troubleshooting

### Import Errors

If you see import errors, make sure:
1. Virtual environment is activated
2. All dependencies are installed: `pip install -r requirements.txt`
3. You're running from the `ordo-backend` directory

### Configuration Errors

If you see configuration errors:
1. Check that `.env` file exists
2. Verify all required environment variables are set
3. Check for typos in variable names

### Port Already in Use

If port 8000 is already in use:
```bash
# Use a different port
uvicorn main:app --reload --port 8001
```

## Getting Help

- Check the main README.md for detailed documentation
- Review the design document at `.kiro/specs/ordo/design.md`
- Check the tasks list at `.kiro/specs/ordo/tasks.md`

## What's Implemented

✅ **Task 1.1.2 Complete**:
- FastAPI application structure
- Configuration management
- API routes (health, query, tools, rag, audit)
- Security middleware (CORS, rate limiting, headers)
- Logging setup
- Database models (placeholder)
- Service layer (placeholder)
- Testing infrastructure

⏳ **Coming Next**:
- Docker Compose setup (Task 1.1.3)
- Database connection and migrations (Task 1.3.2)
- Rate limiting implementation (Task 1.3.3)
- Wallet integration (Phase 2)
- Gmail integration (Phase 3)
- AI orchestration (Phase 5)
