@echo off
REM Docker Compose management script for Ordo development (Windows)

setlocal enabledelayedexpansion

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running. Please start Docker and try again.
    exit /b 1
)

REM Parse command
set COMMAND=%1
if "%COMMAND%"=="" set COMMAND=help

if "%COMMAND%"=="start" goto start
if "%COMMAND%"=="stop" goto stop
if "%COMMAND%"=="restart" goto restart
if "%COMMAND%"=="status" goto status
if "%COMMAND%"=="logs" goto logs
if "%COMMAND%"=="reset" goto reset
if "%COMMAND%"=="psql" goto psql
if "%COMMAND%"=="redis" goto redis
if "%COMMAND%"=="help" goto help
if "%COMMAND%"=="-h" goto help
if "%COMMAND%"=="--help" goto help

echo [ERROR] Unknown command: %COMMAND%
echo.
goto help

:start
echo [INFO] Starting Ordo development services...
docker-compose up -d
if errorlevel 1 (
    echo [ERROR] Failed to start services
    exit /b 1
)
echo [INFO] Waiting for services to be healthy...
timeout /t 5 /nobreak >nul
echo [INFO] Services started successfully!
docker-compose ps
goto end

:stop
echo [INFO] Stopping Ordo development services...
docker-compose down
echo [INFO] Services stopped.
goto end

:restart
echo [INFO] Restarting Ordo development services...
docker-compose restart
echo [INFO] Services restarted.
goto end

:status
echo [INFO] Service status:
docker-compose ps
echo.
echo [INFO] Resource usage:
docker-compose stats --no-stream
goto end

:logs
if "%2"=="" (
    echo [INFO] Showing logs for all services (Ctrl+C to exit^)...
    docker-compose logs -f
) else (
    echo [INFO] Showing logs for %2 (Ctrl+C to exit^)...
    docker-compose logs -f %2
)
goto end

:reset
echo [WARN] This will stop services and DELETE ALL DATA!
set /p CONFIRM="Are you sure? (yes/no): "
if /i "%CONFIRM%"=="yes" (
    echo [INFO] Stopping services and removing volumes...
    docker-compose down -v
    echo [INFO] All data removed. Run 'start' to initialize fresh services.
) else (
    echo [INFO] Reset cancelled.
)
goto end

:psql
echo [INFO] Connecting to PostgreSQL...
docker-compose exec postgres psql -U ordo -d ordo_db
goto end

:redis
echo [INFO] Connecting to Redis...
docker-compose exec redis redis-cli
goto end

:help
echo Ordo Docker Development Helper
echo.
echo Usage: %~nx0 [command]
echo.
echo Commands:
echo     start       Start all services (PostgreSQL, Redis^)
echo     stop        Stop all services (keeps data^)
echo     restart     Restart all services
echo     status      Show service status and resource usage
echo     logs        Show logs for all services
echo     logs ^<svc^>  Show logs for specific service (postgres, redis^)
echo     reset       Stop services and remove all data (WARNING: destructive!^)
echo     psql        Connect to PostgreSQL database
echo     redis       Connect to Redis CLI
echo     help        Show this help message
echo.
echo Examples:
echo     %~nx0 start              # Start all services
echo     %~nx0 logs postgres      # View PostgreSQL logs
echo     %~nx0 psql               # Connect to database
echo     %~nx0 reset              # Reset everything (deletes data!^)
echo.
goto end

:end
endlocal
