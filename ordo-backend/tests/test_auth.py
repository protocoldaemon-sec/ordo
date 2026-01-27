"""
Unit tests for authentication and authorization.
"""

import pytest
from fastapi import HTTPException

from ordo_backend.auth import verify_api_key, get_user_id_from_token, create_user_context
from ordo_backend.config import settings


@pytest.mark.asyncio
class TestAPIKeyVerification:
    """Test API key verification."""
    
    async def test_verify_valid_api_key(self):
        """Test verification with valid API key."""
        api_key = await verify_api_key(settings.API_KEY_FRONTEND)
        assert api_key == settings.API_KEY_FRONTEND
    
    async def test_verify_invalid_api_key(self):
        """Test verification with invalid API key."""
        with pytest.raises(HTTPException) as exc_info:
            await verify_api_key("invalid_key")
        
        assert exc_info.value.status_code == 403
        assert "Invalid API key" in exc_info.value.detail
    
    async def test_verify_missing_api_key(self):
        """Test verification with missing API key."""
        with pytest.raises(HTTPException) as exc_info:
            await verify_api_key(None)
        
        assert exc_info.value.status_code == 401
        assert "Missing API key" in exc_info.value.detail


@pytest.mark.asyncio
class TestUserContext:
    """Test user context creation."""
    
    async def test_get_user_id_from_token(self):
        """Test extracting user ID from token."""
        user_id = await get_user_id_from_token("test_token")
        assert user_id == "default_user"  # Placeholder implementation
    
    def test_create_user_context(self):
        """Test creating user context."""
        context = create_user_context(
            user_id="user123",
            permissions=["READ_GMAIL", "READ_WALLET"],
            tokens={"GMAIL": "gmail_token", "WALLET": "wallet_token"}
        )
        
        assert context["user_id"] == "user123"
        assert context["permissions"]["READ_GMAIL"] is True
        assert context["permissions"]["READ_WALLET"] is True
        assert context["tokens"]["GMAIL"] == "gmail_token"
        assert context["tokens"]["WALLET"] == "wallet_token"
    
    def test_create_user_context_empty_permissions(self):
        """Test creating user context with no permissions."""
        context = create_user_context(
            user_id="user123",
            permissions=[],
            tokens={}
        )
        
        assert context["user_id"] == "user123"
        assert context["permissions"] == {}
        assert context["tokens"] == {}
