"""Initial schema

Revision ID: 001
Revises: 
Create Date: 2025-01-28

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID, JSON

# revision identifiers, used by Alembic.
revision: str = '001'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create audit_log table
    op.create_table(
        'audit_log',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('timestamp', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('surface', sa.String(), nullable=False),
        sa.Column('action', sa.String(), nullable=False),
        sa.Column('success', sa.Boolean(), nullable=False),
        sa.Column('details', JSON, nullable=True),
        sa.Column('policy_violation', sa.Boolean(), default=False),
        sa.Column('blocked_pattern', sa.String(), nullable=True),
    )
    
    # Create indexes for audit_log
    op.create_index('ix_audit_log_user_id', 'audit_log', ['user_id'])
    op.create_index('ix_audit_log_timestamp', 'audit_log', ['timestamp'])
    op.create_index('ix_audit_log_surface', 'audit_log', ['surface'])
    
    # Create user_permissions table
    op.create_table(
        'user_permissions',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('permission', sa.String(), nullable=False),
        sa.Column('granted', sa.Boolean(), default=False),
        sa.Column('granted_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('revoked_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('metadata', JSON, nullable=True),
    )
    
    # Create indexes for user_permissions
    op.create_index('ix_user_permissions_user_id', 'user_permissions', ['user_id'])
    
    # Create conversations table
    op.create_table(
        'conversations',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), onupdate=sa.text('now()')),
        sa.Column('messages', JSON, nullable=False, default=list),
        sa.Column('metadata', JSON, nullable=True),
    )
    
    # Create indexes for conversations
    op.create_index('ix_conversations_user_id', 'conversations', ['user_id'])


def downgrade() -> None:
    # Drop tables in reverse order
    op.drop_table('conversations')
    op.drop_table('user_permissions')
    op.drop_table('audit_log')
