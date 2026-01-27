# Docker Setup Guide for Ordo

This guide explains how to set up and use the Docker Compose environment for Ordo development.

## Overview

The Docker Compose setup provides:
- **PostgreSQL 15** with pgvector extension for RAG embeddings
- **Redis 7** for caching and session management
- Automatic database initialization with schema
- Health checks for service readiness
- Persistent data volumes

## Quick Start

### Start Services

```bash
# Using Docker Compose directly
docker-compose up -d

# Or using the helper script (Linux/Mac)
./scripts/docker-dev.sh start

# Or using the helper script (Windows)
scripts\docker-dev.bat start
```

### Check Status

```bash
# Using Docker Compose
docker-compose ps

# Or using the helper script
./scripts/docker-dev.sh status    # Linux/Mac
scripts\docker-dev.bat status     # Windows
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f postgres
docker-compose logs -f redis

# Or using the helper script
./scripts/docker-dev.sh logs postgres    # Linux/Mac
scripts\docker-dev.bat logs postgres     # Windows
```

### Stop Services

```bash
# Stop but keep data
docker-compose down

# Or using the helper script
./scripts/docker-dev.sh stop    # Linux/Mac
scripts\docker-dev.bat stop     # Windows
```

## Services

### PostgreSQL

**Image**: `ankane/pgvector:v0.5.1`

**Configuration**:
- Port: 5432
- Database: ordo_db
- User: ordo
- Password: ordo_password (⚠️ Change in production!)
- Extensions: pgvector

**Connection String**:
```
postgresql+asyncpg://ordo:ordo_password@localhost:5432/ordo_db
```

**Tables Created**:
- `audit_log`: Access attempt tracking
- `user_permissions`: Permission states and OAuth tokens
- `conversations`: Chat history
- `messages`: Individual messages in conversations
- `documents`: RAG document embeddings (with vector column)
- `policy_violations`: Blocked content tracking

**Accessing PostgreSQL**:
```bash
# Using Docker Compose
docker-compose exec postgres psql -U ordo -d ordo_db

# Or using the helper script
./scripts/docker-dev.sh psql    # Linux/Mac
scripts\docker-dev.bat psql     # Windows
```

**Useful PostgreSQL Commands**:
```sql
-- List all tables
\dt

-- Describe a table
\d audit_log

-- Check pgvector extension
\dx

-- View table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Exit
\q
```

### Redis

**Image**: `redis:7.2-alpine`

**Configuration**:
- Port: 6379
- Password: None (⚠️ Set in production!)
- Persistence: AOF (Append-Only File) enabled

**Connection String**:
```
redis://localhost:6379/0
```

**Accessing Redis**:
```bash
# Using Docker Compose
docker-compose exec redis redis-cli

# Or using the helper script
./scripts/docker-dev.sh redis    # Linux/Mac
scripts\docker-dev.bat redis     # Windows
```

**Useful Redis Commands**:
```bash
# Ping server
PING

# Get all keys
KEYS *

# Get key value
GET key_name

# Set key value
SET key_name value

# Delete key
DEL key_name

# Get database info
INFO

# Clear all data (WARNING: destructive!)
FLUSHALL

# Exit
EXIT
```

## Helper Scripts

### Linux/Mac: `scripts/docker-dev.sh`

```bash
# Make executable (first time only)
chmod +x scripts/docker-dev.sh

# Usage
./scripts/docker-dev.sh [command]

# Commands
./scripts/docker-dev.sh start      # Start services
./scripts/docker-dev.sh stop       # Stop services
./scripts/docker-dev.sh restart    # Restart services
./scripts/docker-dev.sh status     # Show status
./scripts/docker-dev.sh logs       # View all logs
./scripts/docker-dev.sh logs postgres  # View PostgreSQL logs
./scripts/docker-dev.sh psql       # Connect to PostgreSQL
./scripts/docker-dev.sh redis      # Connect to Redis
./scripts/docker-dev.sh reset      # Reset (delete all data!)
./scripts/docker-dev.sh help       # Show help
```

### Windows: `scripts\docker-dev.bat`

```cmd
# Usage
scripts\docker-dev.bat [command]

# Commands
scripts\docker-dev.bat start       # Start services
scripts\docker-dev.bat stop        # Stop services
scripts\docker-dev.bat restart     # Restart services
scripts\docker-dev.bat status      # Show status
scripts\docker-dev.bat logs        # View all logs
scripts\docker-dev.bat logs postgres  # View PostgreSQL logs
scripts\docker-dev.bat psql        # Connect to PostgreSQL
scripts\docker-dev.bat redis       # Connect to Redis
scripts\docker-dev.bat reset       # Reset (delete all data!)
scripts\docker-dev.bat help        # Show help
```

## Data Persistence

Data is stored in Docker volumes:
- `ordo_postgres_data`: PostgreSQL database files
- `ordo_redis_data`: Redis persistence files

**To keep data** when stopping services:
```bash
docker-compose down
```

**To delete all data** (fresh start):
```bash
docker-compose down -v

# Or using helper script
./scripts/docker-dev.sh reset    # Linux/Mac
scripts\docker-dev.bat reset     # Windows
```

## Troubleshooting

### Port Already in Use

**Problem**: Port 5432 or 6379 is already in use.

**Solution**:
```bash
# Check what's using the port
# Linux/Mac
lsof -i :5432
lsof -i :6379

# Windows
netstat -ano | findstr :5432
netstat -ano | findstr :6379

# Option 1: Stop the conflicting service
# Option 2: Change ports in docker-compose.yml
```

### Database Not Initializing

**Problem**: Database tables are not created.

**Solution**:
```bash
# Remove volumes and restart
docker-compose down -v
docker-compose up -d

# Check initialization logs
docker-compose logs postgres
```

### Connection Refused

**Problem**: Cannot connect to PostgreSQL or Redis.

**Solution**:
```bash
# Wait for health checks to pass
docker-compose ps

# Services should show "healthy" status
# If not, check logs
docker-compose logs postgres
docker-compose logs redis
```

### Services Not Starting

**Problem**: Services fail to start.

**Solution**:
```bash
# Check Docker is running
docker info

# Check logs for errors
docker-compose logs

# Try rebuilding
docker-compose down -v
docker-compose up -d
```

### Out of Disk Space

**Problem**: Docker volumes consuming too much space.

**Solution**:
```bash
# Check Docker disk usage
docker system df

# Clean up unused resources
docker system prune -a --volumes

# WARNING: This removes ALL unused Docker data!
```

## Health Checks

Both services have automatic health checks:

**PostgreSQL**:
- Command: `pg_isready -U ordo -d ordo_db`
- Interval: 10 seconds
- Timeout: 5 seconds
- Retries: 5

**Redis**:
- Command: `redis-cli ping`
- Interval: 10 seconds
- Timeout: 5 seconds
- Retries: 5

Check health status:
```bash
docker-compose ps
```

Healthy services will show `(healthy)` in the status column.

## Production Considerations

⚠️ **This setup is for development only!** For production:

1. **Change default passwords**:
   - PostgreSQL: Change `POSTGRES_PASSWORD` in docker-compose.yml
   - Redis: Set `requirepass` in Redis configuration

2. **Use environment variables**:
   - Store secrets in `.env` file (not in docker-compose.yml)
   - Never commit `.env` to version control

3. **Enable SSL/TLS**:
   - Configure PostgreSQL SSL
   - Configure Redis TLS

4. **Set resource limits**:
   - Add memory and CPU limits to services
   - Configure connection pooling

5. **Use managed services**:
   - Consider using managed PostgreSQL (AWS RDS, Supabase, etc.)
   - Consider using managed Redis (AWS ElastiCache, Redis Cloud, etc.)

6. **Backup strategy**:
   - Set up automated backups
   - Test restore procedures

## Next Steps

After starting the Docker services:

1. **Configure backend**: Edit `ordo-backend/.env` with your API keys
2. **Start backend**: `cd ordo-backend && python main.py`
3. **Start frontend**: `cd ordo && npm start`

See the main [README.md](README.md) for complete setup instructions.
