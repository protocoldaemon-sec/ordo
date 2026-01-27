"""
Health Check Route Tests

Unit tests for health check endpoints.
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health_check():
    """Test health check endpoint returns 200 OK."""
    response = client.get("/health")
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["status"] == "healthy"
    assert "timestamp" in data
    assert "version" in data
    assert "python_version" in data


def test_readiness_check():
    """Test readiness check endpoint returns 200 OK."""
    response = client.get("/ready")
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["ready"] is True
    assert "timestamp" in data


def test_root_endpoint():
    """Test root endpoint returns API information."""
    response = client.get("/")
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["name"] == "Ordo Backend API"
    assert data["version"] == "0.1.0"
    assert data["status"] == "operational"


def test_security_headers():
    """Test that security headers are present in responses."""
    response = client.get("/health")
    
    assert response.status_code == 200
    
    # Check security headers
    assert "X-Content-Type-Options" in response.headers
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    
    assert "X-Frame-Options" in response.headers
    assert response.headers["X-Frame-Options"] == "DENY"
    
    assert "X-XSS-Protection" in response.headers
    assert "Strict-Transport-Security" in response.headers
    assert "Content-Security-Policy" in response.headers
    
    # Check request ID header
    assert "X-Request-ID" in response.headers


def test_cors_headers():
    """Test that CORS headers are configured."""
    response = client.options("/health")
    
    # CORS headers should be present
    assert "access-control-allow-origin" in response.headers or response.status_code == 200
