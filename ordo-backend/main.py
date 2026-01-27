"""
Ordo Backend - FastAPI Application Entry Point

This is the main entry point for the Ordo backend API server.
It initializes the FastAPI application with all necessary middleware,
routes, and configurations for AI orchestration, tool execution,
and policy enforcement.
"""

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from contextlib import asynccontextmanager
import logging
from typing import AsyncGenerator

from ordo_backend.config import settings
from ordo_backend.routes import health, query, tools, rag, audit
from ordo_backend.utils.logger import setup_logging

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator:
    """
    Application lifespan manager for startup and shutdown events.
    """
    # Startup
    logger.info("Starting Ordo Backend API...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info(f"Debug mode: {settings.DEBUG}")
    
    # Initialize database
    from ordo_backend.database import init_db, check_db_connection
    
    logger.info("Checking database connection...")
    if await check_db_connection():
        logger.info("Database connection successful")
        logger.info("Initializing database tables...")
        await init_db()
    else:
        logger.error("Database connection failed!")
    
    # TODO: Initialize Redis connection
    # TODO: Initialize MCP clients
    # TODO: Load AI models
    
    yield
    
    # Shutdown
    logger.info("Shutting down Ordo Backend API...")
    
    # Close database connections
    from ordo_backend.database import close_db
    await close_db()
    
    # TODO: Close Redis connections
    # TODO: Cleanup resources


# Initialize FastAPI application
app = FastAPI(
    title="Ordo Backend API",
    description="Privacy-first AI assistant backend for Solana Seeker",
    version="0.1.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    lifespan=lifespan,
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID", "X-RateLimit-Limit", "X-RateLimit-Remaining"],
)

# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    """
    Add security headers to all responses.
    """
    response = await call_next(request)
    
    # Security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    
    # Add request ID for tracing
    if "X-Request-ID" not in response.headers:
        import uuid
        response.headers["X-Request-ID"] = str(uuid.uuid4())
    
    return response


# Trusted Host Middleware (prevent host header attacks)
if not settings.DEBUG:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["api.ordo.app", "*.ordo.app"]
    )


# Exception Handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Handle request validation errors with sanitized error messages.
    """
    logger.warning(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": "Validation Error",
            "message": "Invalid request parameters",
            "details": exc.errors() if settings.DEBUG else None
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """
    Handle unexpected exceptions without exposing sensitive details.
    """
    logger.error(f"Unexpected error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred. Please try again later.",
            "details": str(exc) if settings.DEBUG else None
        }
    )


# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(query.router, prefix="/api/v1", tags=["Query"])
app.include_router(tools.router, prefix="/api/v1", tags=["Tools"])
app.include_router(rag.router, prefix="/api/v1", tags=["RAG"])
app.include_router(audit.router, prefix="/api/v1", tags=["Audit"])


# Root endpoint
@app.get("/")
async def root():
    """
    Root endpoint - API information.
    """
    return {
        "name": "Ordo Backend API",
        "version": "0.1.0",
        "status": "operational",
        "docs": "/docs" if settings.DEBUG else "disabled in production"
    }


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower(),
    )
