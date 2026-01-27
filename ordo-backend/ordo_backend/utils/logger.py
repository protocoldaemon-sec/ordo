"""
Logging Configuration

Sets up structured logging for the application.
"""

import logging
import sys
from pythonjsonlogger import jsonlogger
from ordo_backend.config import settings


def setup_logging():
    """
    Configure application logging.
    
    Sets up structured JSON logging for production or
    human-readable logging for development.
    """
    # Get root logger
    logger = logging.getLogger()
    logger.setLevel(getattr(logging, settings.LOG_LEVEL))
    
    # Remove existing handlers
    logger.handlers = []
    
    # Create console handler
    handler = logging.StreamHandler(sys.stdout)
    
    # Configure formatter based on LOG_FORMAT
    if settings.LOG_FORMAT == "json":
        # JSON formatter for production
        formatter = jsonlogger.JsonFormatter(
            fmt="%(asctime)s %(name)s %(levelname)s %(message)s",
            datefmt="%Y-%m-%dT%H:%M:%S"
        )
    else:
        # Human-readable formatter for development
        formatter = logging.Formatter(
            fmt="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
    
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    
    # Set log levels for third-party libraries
    logging.getLogger("uvicorn").setLevel(logging.INFO)
    logging.getLogger("fastapi").setLevel(logging.INFO)
    logging.getLogger("sqlalchemy").setLevel(logging.WARNING)
    
    logger.info(f"Logging configured: level={settings.LOG_LEVEL}, format={settings.LOG_FORMAT}")
