"""
Pytest configuration and fixtures for testing.

Sets up test environment with mock configuration.
"""

import pytest
import os
from unittest.mock import MagicMock
from pathlib import Path


# Load test environment variables before any imports
def pytest_configure(config):
    """Load test environment variables before tests run."""
    test_env_file = Path(__file__).parent.parent / ".env.test"
    if test_env_file.exists():
        from dotenv import load_dotenv
        load_dotenv(test_env_file)


@pytest.fixture
def mock_llm():
    """Create a mock LLM for testing."""
    llm = MagicMock()
    
    async def mock_ainvoke(messages):
        """Mock async invoke method."""
        response = MagicMock()
        response.content = "Mock LLM response"
        return response
    
    llm.ainvoke = mock_ainvoke
    return llm
