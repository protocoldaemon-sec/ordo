"""
Health Check Routes

Provides health check and status endpoints for monitoring.
"""

from fastapi import APIRouter, status
from pydantic import BaseModel
from datetime import datetime
import sys

router = APIRouter()


class HealthResponse(BaseModel):
    """Health check response model."""
    status: str
    timestamp: datetime
    version: str
    python_version: str


@router.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="Health Check",
    description="Check if the API is operational"
)
async def health_check():
    """
    Health check endpoint for monitoring and load balancers.
    
    Returns:
        HealthResponse: Current health status
    """
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow(),
        version="0.1.0",
        python_version=f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
    )


@router.get(
    "/ready",
    status_code=status.HTTP_200_OK,
    summary="Readiness Check",
    description="Check if the API is ready to accept requests"
)
async def readiness_check():
    """
    Readiness check endpoint for Kubernetes and orchestration systems.
    
    Returns:
        dict: Readiness status
    """
    from ordo_backend.database import check_db_connection
    
    # Check database connection
    db_ready = await check_db_connection()
    
    # TODO: Check Redis connection
    # TODO: Check MCP server connectivity
    
    ready = db_ready  # Add more checks as they're implemented
    
    return {
        "ready": ready,
        "timestamp": datetime.utcnow(),
        "checks": {
            "database": db_ready,
            # "redis": redis_ready,
            # "mcp_servers": mcp_ready,
        }
    }
