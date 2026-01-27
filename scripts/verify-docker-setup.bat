@echo off
REM Verification script for Docker Compose setup (Windows)

setlocal enabledelayedexpansion

echo ==========================================
echo Ordo Docker Setup Verification
echo ==========================================
echo.

REM Check Docker is running
echo Checking Docker...
docker info >nul 2>&1
if errorlevel 1 (
    echo [X] Docker is not running. Please start Docker and try again.
    exit /b 1
)
echo [OK] Docker is running

REM Check Docker Compose is available
echo Checking Docker Compose...
docker-compose version >nul 2>&1
if errorlevel 1 (
    echo [X] Docker Compose is not available.
    exit /b 1
)
echo [OK] Docker Compose is available

REM Check if services are running
echo Checking if services are running...
docker-compose ps | findstr "Up" >nul 2>&1
if errorlevel 1 (
    echo [!] Services not running
    echo.
    echo Starting services...
    docker-compose up -d
    echo Waiting for services to be healthy...
    timeout /t 10 /nobreak >nul
) else (
    echo [OK] Services are running
)

REM Check PostgreSQL
echo Checking PostgreSQL...
docker-compose exec -T postgres pg_isready -U ordo -d ordo_db >nul 2>&1
if errorlevel 1 (
    echo [X] PostgreSQL is not ready
    exit /b 1
)
echo [OK] PostgreSQL is ready

REM Check pgvector extension
echo Checking pgvector extension...
docker-compose exec -T postgres psql -U ordo -d ordo_db -c "SELECT * FROM pg_extension WHERE extname='vector';" | findstr "vector" >nul 2>&1
if errorlevel 1 (
    echo [X] pgvector extension is not installed
    exit /b 1
)
echo [OK] pgvector extension is installed

REM Check tables exist
echo Checking database tables...
for /f %%i in ('docker-compose exec -T postgres psql -U ordo -d ordo_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';"') do set TABLE_COUNT=%%i
if %TABLE_COUNT% GTR 5 (
    echo [OK] Database tables exist ^(%TABLE_COUNT% tables^)
) else (
    echo [X] Expected tables not found
    exit /b 1
)

REM Check Redis
echo Checking Redis...
docker-compose exec -T redis redis-cli ping | findstr "PONG" >nul 2>&1
if errorlevel 1 (
    echo [X] Redis is not responding
    exit /b 1
)
echo [OK] Redis is responding

REM Check Redis persistence
echo Checking Redis persistence...
docker-compose exec -T redis redis-cli CONFIG GET appendonly | findstr "yes" >nul 2>&1
if errorlevel 1 (
    echo [!] AOF not enabled
) else (
    echo [OK] Redis persistence enabled
)

echo.
echo ==========================================
echo All checks passed!
echo ==========================================
echo.
echo Service Status:
docker-compose ps
echo.
echo Connection Strings:
echo   PostgreSQL: postgresql+asyncpg://ordo:ordo_password@localhost:5432/ordo_db
echo   Redis: redis://localhost:6379/0
echo.
echo Next Steps:
echo   1. Configure backend: cd ordo-backend ^&^& copy .env.example .env
echo   2. Start backend: cd ordo-backend ^&^& python main.py
echo   3. Start frontend: cd ordo ^&^& npm start
echo.

endlocal
