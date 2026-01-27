"""
Unit tests for database connection and session management.
"""

import pytest
import pytest_asyncio
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from ordo_backend.database import (
    get_db,
    get_db_session,
    check_db_connection,
    init_db,
    close_db,
)
from ordo_backend.models.database import Base, AuditLog, UserPermission, Conversation
import uuid


@pytest.mark.asyncio
class TestDatabaseConnection:
    """Test database connection and initialization."""
    
    async def test_check_db_connection(self):
        """Test database connection check."""
        is_connected = await check_db_connection()
        assert is_connected is True
    
    async def test_init_db(self):
        """Test database initialization creates tables."""
        # Initialize database
        await init_db()
        
        # Verify tables exist by querying them
        async with get_db() as db:
            # Check audit_log table
            result = await db.execute(text("SELECT COUNT(*) FROM audit_log"))
            assert result.scalar() == 0
            
            # Check user_permissions table
            result = await db.execute(text("SELECT COUNT(*) FROM user_permissions"))
            assert result.scalar() == 0
            
            # Check conversations table
            result = await db.execute(text("SELECT COUNT(*) FROM conversations"))
            assert result.scalar() == 0


@pytest.mark.asyncio
class TestDatabaseSession:
    """Test database session management."""
    
    async def test_get_db_context_manager(self):
        """Test get_db context manager."""
        async with get_db() as db:
            assert isinstance(db, AsyncSession)
            
            # Execute a simple query
            result = await db.execute(text("SELECT 1"))
            assert result.scalar() == 1
    
    async def test_get_db_session_generator(self):
        """Test get_db_session generator for FastAPI dependency."""
        async for db in get_db_session():
            assert isinstance(db, AsyncSession)
            
            # Execute a simple query
            result = await db.execute(text("SELECT 1"))
            assert result.scalar() == 1
            break  # Only test first iteration
    
    async def test_session_commit_on_success(self):
        """Test that session commits on successful operation."""
        async with get_db() as db:
            # Create a test audit log entry
            audit_entry = AuditLog(
                id=uuid.uuid4(),
                user_id="test_user",
                surface="TEST",
                action="test_action",
                success=True,
            )
            db.add(audit_entry)
        
        # Verify entry was committed
        async with get_db() as db:
            result = await db.execute(
                select(AuditLog).where(AuditLog.user_id == "test_user")
            )
            entry = result.scalar_one_or_none()
            assert entry is not None
            assert entry.action == "test_action"
            
            # Cleanup
            await db.delete(entry)
    
    async def test_session_rollback_on_error(self):
        """Test that session rolls back on error."""
        try:
            async with get_db() as db:
                # Create a test entry
                audit_entry = AuditLog(
                    id=uuid.uuid4(),
                    user_id="test_user_rollback",
                    surface="TEST",
                    action="test_action",
                    success=True,
                )
                db.add(audit_entry)
                
                # Raise an error before commit
                raise ValueError("Test error")
        except ValueError:
            pass
        
        # Verify entry was NOT committed
        async with get_db() as db:
            result = await db.execute(
                select(AuditLog).where(AuditLog.user_id == "test_user_rollback")
            )
            entry = result.scalar_one_or_none()
            assert entry is None


@pytest.mark.asyncio
class TestDatabaseModels:
    """Test database models can be created and queried."""
    
    async def test_create_audit_log(self):
        """Test creating an audit log entry."""
        async with get_db() as db:
            entry = AuditLog(
                id=uuid.uuid4(),
                user_id="test_user",
                surface="GMAIL",
                action="search_emails",
                success=True,
                details={"query": "test"},
                policy_violation=False,
            )
            db.add(entry)
            await db.flush()
            
            # Query the entry
            result = await db.execute(
                select(AuditLog).where(AuditLog.id == entry.id)
            )
            queried_entry = result.scalar_one()
            
            assert queried_entry.user_id == "test_user"
            assert queried_entry.surface == "GMAIL"
            assert queried_entry.action == "search_emails"
            assert queried_entry.success is True
            assert queried_entry.details == {"query": "test"}
            
            # Cleanup
            await db.delete(entry)
    
    async def test_create_user_permission(self):
        """Test creating a user permission entry."""
        async with get_db() as db:
            permission = UserPermission(
                id=uuid.uuid4(),
                user_id="test_user",
                permission="READ_GMAIL",
                granted=True,
            )
            db.add(permission)
            await db.flush()
            
            # Query the entry
            result = await db.execute(
                select(UserPermission).where(UserPermission.id == permission.id)
            )
            queried_permission = result.scalar_one()
            
            assert queried_permission.user_id == "test_user"
            assert queried_permission.permission == "READ_GMAIL"
            assert queried_permission.granted is True
            
            # Cleanup
            await db.delete(permission)
    
    async def test_create_conversation(self):
        """Test creating a conversation entry."""
        async with get_db() as db:
            conversation = Conversation(
                id=uuid.uuid4(),
                user_id="test_user",
                messages=[
                    {"role": "user", "content": "Hello"},
                    {"role": "assistant", "content": "Hi there!"},
                ],
                metadata={"source": "mobile"},
            )
            db.add(conversation)
            await db.flush()
            
            # Query the entry
            result = await db.execute(
                select(Conversation).where(Conversation.id == conversation.id)
            )
            queried_conversation = result.scalar_one()
            
            assert queried_conversation.user_id == "test_user"
            assert len(queried_conversation.messages) == 2
            assert queried_conversation.messages[0]["role"] == "user"
            assert queried_conversation.metadata == {"source": "mobile"}
            
            # Cleanup
            await db.delete(conversation)
    
    async def test_query_with_filters(self):
        """Test querying with filters."""
        async with get_db() as db:
            # Create multiple entries
            entries = [
                AuditLog(
                    id=uuid.uuid4(),
                    user_id="user1",
                    surface="GMAIL",
                    action="search",
                    success=True,
                ),
                AuditLog(
                    id=uuid.uuid4(),
                    user_id="user1",
                    surface="WALLET",
                    action="get_balance",
                    success=True,
                ),
                AuditLog(
                    id=uuid.uuid4(),
                    user_id="user2",
                    surface="GMAIL",
                    action="search",
                    success=False,
                ),
            ]
            
            for entry in entries:
                db.add(entry)
            await db.flush()
            
            # Query with filters
            result = await db.execute(
                select(AuditLog)
                .where(AuditLog.user_id == "user1")
                .where(AuditLog.success == True)
            )
            user1_entries = result.scalars().all()
            
            assert len(user1_entries) == 2
            assert all(e.user_id == "user1" for e in user1_entries)
            assert all(e.success is True for e in user1_entries)
            
            # Cleanup
            for entry in entries:
                await db.delete(entry)


@pytest.mark.asyncio
class TestDatabaseIndexes:
    """Test that database indexes are working."""
    
    async def test_audit_log_indexes(self):
        """Test audit log indexes exist and work."""
        async with get_db() as db:
            # Create test entries
            entries = [
                AuditLog(
                    id=uuid.uuid4(),
                    user_id=f"user_{i}",
                    surface="GMAIL",
                    action="search",
                    success=True,
                )
                for i in range(10)
            ]
            
            for entry in entries:
                db.add(entry)
            await db.flush()
            
            # Query using indexed column (should be fast)
            result = await db.execute(
                select(AuditLog).where(AuditLog.user_id == "user_5")
            )
            entry = result.scalar_one()
            assert entry.user_id == "user_5"
            
            # Cleanup
            for entry in entries:
                await db.delete(entry)


# Cleanup fixture
@pytest_asyncio.fixture(autouse=True)
async def cleanup_database():
    """Cleanup database after each test."""
    yield
    
    # Clean up any remaining test data
    async with get_db() as db:
        # Delete test audit logs
        await db.execute(
            text("DELETE FROM audit_log WHERE user_id LIKE 'test_%' OR user_id LIKE 'user_%'")
        )
        
        # Delete test permissions
        await db.execute(
            text("DELETE FROM user_permissions WHERE user_id LIKE 'test_%'")
        )
        
        # Delete test conversations
        await db.execute(
            text("DELETE FROM conversations WHERE user_id LIKE 'test_%'")
        )
