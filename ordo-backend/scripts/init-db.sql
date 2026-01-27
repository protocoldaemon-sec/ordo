-- Ordo Database Initialization Script
-- This script sets up the PostgreSQL database with pgvector extension
-- and creates the initial schema for the Ordo backend

-- Enable pgvector extension for RAG embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create audit_log table for tracking all access attempts
CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    surface VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    success BOOLEAN NOT NULL,
    details JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Create index on timestamp for efficient querying
CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON audit_log(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_surface ON audit_log(surface);

-- Create user_permissions table for storing permission states
CREATE TABLE IF NOT EXISTS user_permissions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    surface VARCHAR(50) NOT NULL,
    granted BOOLEAN NOT NULL DEFAULT false,
    granted_at TIMESTAMP WITH TIME ZONE,
    revoked_at TIMESTAMP WITH TIME ZONE,
    token_encrypted TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, surface)
);

-- Create index on user_id for efficient permission lookups
CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON user_permissions(user_id);

-- Create conversations table for storing chat history
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    conversation_id VARCHAR(255) NOT NULL UNIQUE,
    user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- Create index on conversation_id and user_id
CREATE INDEX IF NOT EXISTS idx_conversations_conversation_id ON conversations(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);

-- Create messages table for storing individual messages in conversations
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id VARCHAR(255) NOT NULL REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    sources JSONB,
    tool_calls JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on conversation_id for efficient message retrieval
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);

-- Create documents table for RAG system (pgvector)
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    source VARCHAR(255) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    embedding vector(1024),  -- Mistral embed model produces 1024-dimensional vectors
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on source for efficient document filtering
CREATE INDEX IF NOT EXISTS idx_documents_source ON documents(source);

-- Create vector index for efficient similarity search (HNSW algorithm)
CREATE INDEX IF NOT EXISTS idx_documents_embedding ON documents USING hnsw (embedding vector_cosine_ops);

-- Create policy_violations table for tracking blocked content
CREATE TABLE IF NOT EXISTS policy_violations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    surface VARCHAR(50) NOT NULL,
    pattern VARCHAR(100) NOT NULL,
    content_preview TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on timestamp for efficient querying
CREATE INDEX IF NOT EXISTS idx_policy_violations_timestamp ON policy_violations(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_policy_violations_user_id ON policy_violations(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on conversations
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to automatically update updated_at on documents
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial system message for testing
INSERT INTO conversations (conversation_id, user_id, metadata)
VALUES ('test-conversation', 'test-user', '{"purpose": "testing"}')
ON CONFLICT (conversation_id) DO NOTHING;

-- Grant necessary permissions (if using specific database user)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ordo;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ordo;

-- Display success message
DO $$
BEGIN
    RAISE NOTICE 'Ordo database initialized successfully!';
    RAISE NOTICE 'pgvector extension enabled';
    RAISE NOTICE 'Tables created: audit_log, user_permissions, conversations, messages, documents, policy_violations';
    RAISE NOTICE 'Indexes created for efficient querying';
END $$;
