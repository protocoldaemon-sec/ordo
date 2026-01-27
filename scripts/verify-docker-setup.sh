#!/bin/bash
# Verification script for Docker Compose setup

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=========================================="
echo "Ordo Docker Setup Verification"
echo "=========================================="
echo ""

# Check Docker is running
echo -n "Checking Docker... "
if docker info > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check Docker Compose is available
echo -n "Checking Docker Compose... "
if docker-compose version > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "Docker Compose is not available."
    exit 1
fi

# Check if services are running
echo -n "Checking if services are running... "
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✓${NC}"
    SERVICES_RUNNING=true
else
    echo -e "${YELLOW}⚠${NC} Services not running"
    SERVICES_RUNNING=false
fi

if [ "$SERVICES_RUNNING" = false ]; then
    echo ""
    echo "Starting services..."
    docker-compose up -d
    echo "Waiting for services to be healthy..."
    sleep 10
fi

# Check PostgreSQL
echo -n "Checking PostgreSQL... "
if docker-compose exec -T postgres pg_isready -U ordo -d ordo_db > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "PostgreSQL is not ready"
    exit 1
fi

# Check pgvector extension
echo -n "Checking pgvector extension... "
if docker-compose exec -T postgres psql -U ordo -d ordo_db -c "SELECT * FROM pg_extension WHERE extname='vector';" | grep -q "vector"; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "pgvector extension is not installed"
    exit 1
fi

# Check tables exist
echo -n "Checking database tables... "
TABLES=$(docker-compose exec -T postgres psql -U ordo -d ordo_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';")
if [ "$TABLES" -gt 5 ]; then
    echo -e "${GREEN}✓${NC} ($TABLES tables)"
else
    echo -e "${RED}✗${NC}"
    echo "Expected tables not found"
    exit 1
fi

# Check Redis
echo -n "Checking Redis... "
if docker-compose exec -T redis redis-cli ping | grep -q "PONG"; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "Redis is not responding"
    exit 1
fi

# Check Redis persistence
echo -n "Checking Redis persistence... "
if docker-compose exec -T redis redis-cli CONFIG GET appendonly | grep -q "yes"; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC} AOF not enabled"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}All checks passed!${NC}"
echo "=========================================="
echo ""
echo "Service Status:"
docker-compose ps
echo ""
echo "Connection Strings:"
echo "  PostgreSQL: postgresql+asyncpg://ordo:ordo_password@localhost:5432/ordo_db"
echo "  Redis: redis://localhost:6379/0"
echo ""
echo "Next Steps:"
echo "  1. Configure backend: cd ordo-backend && cp .env.example .env"
echo "  2. Start backend: cd ordo-backend && python main.py"
echo "  3. Start frontend: cd ordo && npm start"
echo ""
