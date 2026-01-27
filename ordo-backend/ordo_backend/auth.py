"""
Authentication and Authorization

Provides API key authentication for frontend requests.
"""

from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader
from typing import Optional

from ordo_backend.config import settings

# API Key header scheme
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


async def verify_api_key(api_key: Optional[str] = Security(api_key_header)) -> str:
    """
    Verify API key from request header.
    
    Args:
        api_key: API key from X-API-Key header
        
    Returns:
        str: Verified API key
        
    Raises:
        HTTPException: If API key is missing or invalid
    """
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing API key",
            headers={"WWW-Authenticate": "ApiKey"},
        )
    
    if api_key != settings.API_KEY_FRONTEND:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid API key",
        )
    
    return api_key


async def get_user_id_from_token(token: str) -> str:
    """
    Extract user ID from authentication token.
    
    This is a placeholder for future JWT token implementation.
    For now, we'll use a simple user ID extraction.
    
    Args:
        token: Authentication token
        
    Returns:
        str: User ID
    """
    # TODO: Implement JWT token verification
    # TODO: Extract user ID from JWT claims
    
    # For now, return a placeholder user ID
    return "default_user"


def create_user_context(user_id: str, permissions: list[str], tokens: dict[str, str]) -> dict:
    """
    Create user context for request processing.
    
    Args:
        user_id: User ID
        permissions: List of granted permissions
        tokens: OAuth tokens per surface
        
    Returns:
        dict: User context
    """
    return {
        "user_id": user_id,
        "permissions": {perm: True for perm in permissions},
        "tokens": tokens,
    }
