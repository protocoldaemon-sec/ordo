"""
Database Models

SQLAlchemy models for audit logs, user permissions, and conversations.
This will be fully implemented in Phase 1.3 (Backend API Foundation).
"""

from sqlalchemy import Column, String, Boolean, DateTime, Integer, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import uuid

Base = declarative_base()


class AuditLog(Base):
    """
    Audit log table for tracking all surface access attempts.
    """
    __tablename__ = "audit_log"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, nullable=False, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    surface = Column(String, nullable=False, index=True)
    action = Column(String, nullable=False)
    success = Column(Boolean, nullable=False)
    details = Column(JSON, nullable=True)
    policy_violation = Column(Boolean, default=False)
    blocked_pattern = Column(String, nullable=True)


class UserPermission(Base):
    """
    User permissions table for tracking granted permissions.
    """
    __tablename__ = "user_permissions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, nullable=False, index=True)
    permission = Column(String, nullable=False)
    granted = Column(Boolean, default=False)
    granted_at = Column(DateTime(timezone=True), nullable=True)
    revoked_at = Column(DateTime(timezone=True), nullable=True)
    metadata = Column(JSON, nullable=True)


class Conversation(Base):
    """
    Conversations table for storing conversation history.
    """
    __tablename__ = "conversations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    messages = Column(JSON, nullable=False, default=list)
    metadata = Column(JSON, nullable=True)


class Document(Base):
    """
    Documents table for RAG system (Supabase pgvector).
    This will be created in Supabase, not in the main database.
    """
    __tablename__ = "documents"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source = Column(String, nullable=False, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    url = Column(String, nullable=True)
    # embedding = Column(Vector(1024))  # pgvector type, will be in Supabase
    metadata = Column(JSON, nullable=True)
    last_updated = Column(DateTime(timezone=True), server_default=func.now())
