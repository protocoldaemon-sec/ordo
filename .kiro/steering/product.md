# Product Overview

Ordo is a privacy-first AI assistant for Solana Seeker that provides intelligent multi-surface access to Gmail, social media (X/Twitter, Telegram), and Solana wallet functionality.

## Core Value Proposition

- **Privacy-First**: Three-tier permission system with automatic sensitive data filtering
- **Multi-Surface Integration**: Unified access to email, social media, and blockchain operations
- **AI-Powered**: Intelligent query routing and natural language interaction
- **Secure Wallet Operations**: All transactions via Seed Vault (zero private key access)

## Key Features

### Permission System
- Surface-level access control (Gmail, X, Telegram, Wallet)
- Policy-based content filtering (blocks OTP codes, passwords, recovery phrases)
- User confirmation required for all write operations
- Comprehensive audit logging

### Integrations
- **Gmail**: Search, read, compose, send emails
- **X/Twitter**: Read timeline, post tweets, send DMs
- **Telegram**: Read messages, send messages
- **Solana Wallet**: View balance, send SOL/tokens, sign transactions
- **DeFi**: Jupiter swaps, Lulo lending, Sanctum staking, Drift trading
- **NFT**: View, buy, sell, create NFTs via Metaplex and Tensor

### AI Capabilities
- Natural language query processing
- Intelligent tool selection and orchestration
- RAG-powered documentation queries
- Multi-surface context aggregation

## Target Platform

- **Primary**: Solana Seeker (Android mobile device)
- **Secondary**: iOS, Android (via Expo)
- **Development**: Web preview support

## Architecture

- **Frontend**: React Native + Expo + Solana Mobile Stack
- **Backend**: Python FastAPI + LangChain + LangGraph
- **AI**: Mistral AI (mistral-large-latest, mistral-embed)
- **Blockchain**: Solana via Helius RPC
- **Database**: PostgreSQL with pgvector
- **Cache**: Redis

## Development Status

Currently in active development following a phased approach:
1. Core Infrastructure ✅
2. Wallet Integration (in progress)
3. Gmail Integration
4. Social Media Integration
5. AI Orchestration
6. RAG System
7. Security & Privacy
8. UI/UX, Testing, Deployment
