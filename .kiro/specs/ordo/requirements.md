# Requirements Document: Ordo

## Introduction

Ordo is a privacy-first native AI assistant for Solana Seeker that provides intelligent multi-surface access to Gmail, social media (X/Twitter, Telegram), and Solana wallet functionality. The system implements a three-tier permission model to ensure user privacy while enabling powerful cross-surface AI capabilities. Built on React Native and Solana Mobile Stack, Ordo acts as a secure orchestrator that combines data from multiple sources while enforcing strict privacy policies and requiring explicit user confirmation for all write operations.

## Glossary

- **Ordo_System**: The complete AI assistant application including frontend and backend components
- **OrchestrationEngine**: Frontend component responsible for AI routing and tool dispatching
- **PermissionManager**: Component that enforces the three-tier permission system
- **ContextAggregator**: Component that combines data from multiple surfaces
- **PolicyEngine**: Backend component that enforces content filtering rules
- **SeedVault**: Solana Mobile Stack secure enclave for private key storage
- **MWA**: Mobile Wallet Adapter protocol for transaction signing
- **Surface**: A data source that Ordo can access (Gmail, X, Telegram, Wallet)
- **Sensitive_Data**: Content that must be blocked including OTP codes, verification codes, bank statements, tax documents, recovery phrases, passwords
- **Tool**: A backend function that performs a specific action (read email, get portfolio, etc.)
- **RAG**: Retrieval-Augmented Generation system for documentation queries
- **Helius_RPC**: Solana RPC provider for on-chain data access
- **User_Confirmation**: Explicit user approval required before executing write operations

## Requirements

### Requirement 1: Three-Tier Permission System

**User Story:** As a user, I want granular control over what data Ordo can access, so that I maintain privacy while enabling useful AI features.

#### Acceptance Criteria

1. WHEN a user first launches Ordo, THE PermissionManager SHALL display a permission request interface for each surface (Gmail, X, Telegram, Wallet)
2. WHEN a user grants a surface permission, THE PermissionManager SHALL store the permission state and obtain necessary OAuth tokens or API credentials
3. WHEN a user revokes a surface permission, THE PermissionManager SHALL invalidate all associated tokens and delete cached data from that surface
4. WHEN Ordo attempts to access a surface without permission, THE OrchestrationEngine SHALL return an error message requesting the user to grant permission
5. THE PermissionManager SHALL support these permission types: READ_GMAIL, READ_SOCIAL_X, READ_SOCIAL_TELEGRAM, READ_WALLET, SIGN_TRANSACTIONS
6. WHEN displaying permission status, THE Ordo_System SHALL show which surfaces are currently authorized and when authorization was granted

### Requirement 2: Policy-Based Content Filtering

**User Story:** As a user, I want Ordo to automatically block access to sensitive data like OTP codes and passwords, so that my security is never compromised even if I grant broad permissions.

#### Acceptance Criteria

1. WHEN the PolicyEngine receives content from any surface, THE PolicyEngine SHALL scan for Sensitive_Data patterns before returning results
2. WHEN Sensitive_Data is detected in email content, THE PolicyEngine SHALL exclude that email from results and log the blocked access attempt
3. WHEN Sensitive_Data is detected in social media messages, THE PolicyEngine SHALL exclude that message from results and log the blocked access attempt
4. THE PolicyEngine SHALL block content matching these patterns: OTP codes (numeric sequences 4-8 digits), verification codes, bank statement keywords, tax document keywords, recovery phrase patterns (12/24 word sequences), password reset emails
5. WHEN a user query would only return blocked content, THE Ordo_System SHALL respond with a polite refusal explaining why the request cannot be fulfilled
6. THE PolicyEngine SHALL maintain an audit log of all blocked access attempts including timestamp, surface, and reason for blocking

### Requirement 3: User Confirmation for Write Operations

**User Story:** As a user, I want to explicitly approve all actions that send data or execute transactions, so that Ordo never acts on my behalf without my knowledge.

#### Acceptance Criteria

1. WHEN Ordo prepares to send an email, THE Ordo_System SHALL display a preview of the email content and require explicit user confirmation before sending
2. WHEN Ordo prepares to send a social media message, THE Ordo_System SHALL display a preview of the message and require explicit user confirmation before sending
3. WHEN Ordo builds a transaction payload, THE Ordo_System SHALL display transaction details (recipient, amount, program) and require user confirmation before requesting signature
4. WHEN a user confirms a transaction, THE MWA SHALL handle the signing process through SeedVault with biometric authentication
5. THE Ordo_System SHALL NOT implement any auto-send or auto-execute capabilities for write operations
6. WHEN a user cancels a confirmation dialog, THE Ordo_System SHALL abort the operation and inform the user that the action was cancelled

### Requirement 4: Gmail Integration

**User Story:** As a user, I want Ordo to search and read my Gmail messages while protecting sensitive emails, so that I can quickly find information without compromising security.

#### Acceptance Criteria

1. WHEN a user grants READ_GMAIL permission, THE Ordo_System SHALL initiate OAuth flow using Google Sign-In and obtain gmail.readonly scope
2. WHEN Ordo searches email threads, THE Ordo_System SHALL send queries through the backend proxy which applies PolicyEngine filtering
3. WHEN returning email results, THE Ordo_System SHALL include thread subject, sender, date, and filtered content
4. WHEN a user requests to read a specific email, THE Ordo_System SHALL retrieve the email content and apply Sensitive_Data filtering before display
5. THE Ordo_System SHALL support email search queries with natural language (e.g., "emails about hackathons from last month")
6. WHEN OAuth tokens expire, THE Ordo_System SHALL prompt the user to re-authenticate and refresh the token

### Requirement 5: Wallet Integration

**User Story:** As a user, I want Ordo to view my wallet portfolio and help me build transactions without ever accessing my private keys, so that I can manage my assets securely.

#### Acceptance Criteria

1. WHEN a user grants READ_WALLET permission, THE Ordo_System SHALL obtain the wallet address from SeedVault without accessing private keys
2. WHEN Ordo retrieves portfolio data, THE Ordo_System SHALL query Helius_RPC for token balances, NFTs, and transaction history
3. WHEN displaying portfolio information, THE Ordo_System SHALL show token symbols, amounts, USD values, and percentage changes
4. WHEN Ordo builds a transaction payload, THE Ordo_System SHALL construct a valid Solana transaction with proper instructions and accounts
5. WHEN a user confirms a transaction, THE Ordo_System SHALL use MWA to request signature from SeedVault with biometric authentication
6. THE Ordo_System SHALL never request, store, or transmit private keys or recovery phrases

### Requirement 6: Social Media Integration

**User Story:** As a user, I want Ordo to read my X/Twitter and Telegram messages while filtering sensitive content, so that I can stay updated on important communications.

#### Acceptance Criteria

1. WHEN a user grants READ_SOCIAL_X permission, THE Ordo_System SHALL authenticate using X OAuth and obtain read access to DMs and mentions
2. WHEN a user grants READ_SOCIAL_TELEGRAM permission, THE Ordo_System SHALL authenticate using Telegram Bot API and obtain access to messages
3. WHEN Ordo retrieves social media messages, THE PolicyEngine SHALL filter out messages containing Sensitive_Data patterns
4. WHEN displaying social media results, THE Ordo_System SHALL show sender, timestamp, and filtered message content
5. THE Ordo_System SHALL support queries like "show my recent Telegram messages" and "check X mentions from today"
6. WHEN social media API rate limits are reached, THE Ordo_System SHALL queue requests and inform the user of the delay

### Requirement 7: AI Orchestration and Tool Routing

**User Story:** As a user, I want Ordo to intelligently route my queries to the right tools and combine information from multiple sources, so that I get comprehensive answers.

#### Acceptance Criteria

1. WHEN a user submits a query, THE OrchestrationEngine SHALL analyze the query and determine which tools are needed
2. WHEN multiple surfaces are required, THE OrchestrationEngine SHALL execute tool calls in parallel where possible and sequentially where dependencies exist
3. WHEN tool execution completes, THE ContextAggregator SHALL combine results from multiple surfaces into a coherent response
4. THE OrchestrationEngine SHALL use LangGraph-based agent architecture for tool routing and execution
5. WHEN responding to queries, THE Ordo_System SHALL cite sources for information retrieved from user data
6. WHEN a query cannot be fulfilled due to missing permissions, THE Ordo_System SHALL explain which permissions are needed and offer to request them

### Requirement 8: RAG System for Documentation

**User Story:** As a user, I want Ordo to answer questions about Solana, Seeker, and dApps using accurate documentation, so that I can learn without leaving the app.

#### Acceptance Criteria

1. THE Ordo_System SHALL maintain a vector database using Supabase pgvector containing embeddings of Solana documentation, Seeker documentation, and popular dApp documentation
2. WHEN a user asks a documentation question, THE RAG SHALL retrieve relevant document chunks based on semantic similarity
3. WHEN generating responses from documentation, THE Ordo_System SHALL cite the source documents and provide links where available
4. THE RAG SHALL support queries about Solana concepts, Seeker features, wallet operations, and dApp usage
5. WHEN documentation is not available for a query, THE Ordo_System SHALL use web search tools to find current information
6. THE Ordo_System SHALL update documentation embeddings periodically to maintain accuracy

### Requirement 9: Cross-Surface Task Execution

**User Story:** As a user, I want Ordo to combine data from multiple surfaces to complete complex tasks, so that I can accomplish more with simple natural language requests.

#### Acceptance Criteria

1. WHEN a user requests a cross-surface task, THE OrchestrationEngine SHALL identify all required surfaces and check permissions
2. WHEN executing cross-surface tasks, THE ContextAggregator SHALL merge data from multiple sources while maintaining source attribution
3. THE Ordo_System SHALL support tasks combining Gmail + Calendar, Wallet + DeFi search, Social + Email search
4. WHEN presenting cross-surface results, THE Ordo_System SHALL clearly indicate which information came from which surface
5. WHEN a cross-surface task requires write operations, THE Ordo_System SHALL request user confirmation for each write action separately
6. THE OrchestrationEngine SHALL handle partial failures gracefully by completing available portions and explaining what could not be completed

### Requirement 10: Privacy-Aware System Behavior

**User Story:** As a user, I want Ordo to treat all my data as confidential and never expose sensitive information, so that I can trust the system with my personal data.

#### Acceptance Criteria

1. THE Ordo_System SHALL include privacy instructions in all AI system prompts explicitly forbidding extraction or repetition of Sensitive_Data
2. WHEN generating responses, THE Ordo_System SHALL never include OTP codes, verification codes, passwords, recovery phrases, or bank account numbers in output
3. WHEN a user asks Ordo to perform an action that would expose Sensitive_Data, THE Ordo_System SHALL politely refuse and explain the privacy concern
4. THE Ordo_System SHALL treat all user data as confidential and never transmit it to third parties except as required for tool execution (e.g., sending to LLM API)
5. WHEN storing cached data, THE Ordo_System SHALL encrypt all cached content and delete it when permissions are revoked
6. THE Ordo_System SHALL provide transparency about data access by showing which surfaces were queried for each response

### Requirement 11: Audit Logging and Compliance

**User Story:** As a user, I want to review what data Ordo has accessed, so that I can verify the system is respecting my privacy settings.

#### Acceptance Criteria

1. THE Ordo_System SHALL maintain an audit log of all surface access attempts including timestamp, surface, query type, and success/failure status
2. WHEN the PolicyEngine blocks Sensitive_Data, THE audit log SHALL record the blocked attempt with the reason for blocking
3. WHEN a user views the audit log, THE Ordo_System SHALL display access history in chronological order with filtering options
4. THE audit log SHALL retain entries for at least 90 days before automatic deletion
5. WHEN a user requests to export their audit log, THE Ordo_System SHALL generate a downloadable file in JSON format
6. THE Ordo_System SHALL never log the actual content of Sensitive_Data, only that access was blocked

### Requirement 12: Error Handling and Resilience

**User Story:** As a user, I want Ordo to handle errors gracefully and provide clear feedback, so that I understand what went wrong and how to fix it.

#### Acceptance Criteria

1. WHEN an OAuth token expires, THE Ordo_System SHALL detect the expiration and prompt the user to re-authenticate
2. WHEN a backend API is unavailable, THE Ordo_System SHALL display an error message explaining the service is temporarily unavailable and suggest retry
3. WHEN network connectivity is lost, THE Ordo_System SHALL detect the offline state and inform the user that internet connection is required
4. WHEN a tool execution fails, THE OrchestrationEngine SHALL log the error and attempt to complete the query using available tools
5. WHEN rate limits are exceeded, THE Ordo_System SHALL queue requests and inform the user of expected wait time
6. THE Ordo_System SHALL never expose technical error details (stack traces, API keys) to the user interface

### Requirement 13: React Native Frontend Architecture

**User Story:** As a developer, I want a well-structured React Native frontend with clear separation of concerns, so that the codebase is maintainable and extensible.

#### Acceptance Criteria

1. THE Ordo_System SHALL implement OrchestrationEngine as a TypeScript module responsible for AI routing and tool dispatching
2. THE Ordo_System SHALL implement PermissionManager as a TypeScript module responsible for permission state management and token storage
3. THE Ordo_System SHALL implement ContextAggregator as a TypeScript module responsible for combining multi-surface results
4. THE Ordo_System SHALL implement adapter modules for each surface: SeedVaultAdapter, GmailAdapter, XAdapter, TelegramAdapter
5. THE Ordo_System SHALL implement security modules: PromptIsolation for sandboxing AI prompts, SensitiveDataFilter for client-side filtering
6. WHEN frontend components are modified, THE backend API contracts SHALL remain stable

### Requirement 14: Python Backend Architecture

**User Story:** As a developer, I want a scalable Python backend with clear API contracts, so that the system can handle multiple concurrent users and tool executions.

#### Acceptance Criteria

1. THE Ordo_System SHALL implement a FastAPI backend with endpoints for tool execution, RAG queries, and policy enforcement
2. THE backend SHALL implement tool modules: email_tools, social_tools, wallet_tools, web_tools
3. THE backend SHALL implement a LangGraph-based orchestrator for agent workflow management
4. THE backend SHALL implement PolicyEngine as a module that scans content and blocks Sensitive_Data
5. THE backend SHALL implement audit_logger as a module that records all access attempts and policy violations
6. WHEN backend services scale horizontally, THE Ordo_System SHALL maintain consistent state using shared database storage

### Requirement 15: Web Search Integration

**User Story:** As a user, I want Ordo to search the web for current information when needed, so that I can get up-to-date answers beyond my personal data.

#### Acceptance Criteria

1. WHEN a user query requires current information not available in RAG or user data, THE Ordo_System SHALL execute web search using a search API
2. WHEN presenting web search results, THE Ordo_System SHALL cite the source URLs and publication dates
3. THE Ordo_System SHALL prioritize official documentation and reputable sources over general web content
4. WHEN web search results contain conflicting information, THE Ordo_System SHALL present multiple perspectives and cite sources
5. THE Ordo_System SHALL support web search for Solana ecosystem information, DeFi protocols, token prices, and general knowledge
6. WHEN web search APIs are unavailable, THE Ordo_System SHALL inform the user and attempt to answer using available data sources

### Requirement 16: DeFi Operations Integration

**User Story:** As a user, I want Ordo to help me perform DeFi operations like swapping tokens, lending assets, and trading, so that I can manage my crypto portfolio efficiently.

#### Acceptance Criteria

1. WHEN a user requests to swap tokens, THE Ordo_System SHALL use Jupiter Exchange integration to execute swaps with optimal routing
2. WHEN a user requests to lend assets, THE Ordo_System SHALL integrate with Lulo protocol for USDC lending with APY tracking
3. WHEN a user requests token price information, THE Ordo_System SHALL fetch real-time prices from Birdeye, CoinGecko, or Pyth oracles
4. WHEN a user requests to launch a token, THE Ordo_System SHALL support token deployment via Pump.fun or Raydium with proper confirmation
5. WHEN a user requests to stake SOL, THE Ordo_System SHALL integrate with Sanctum or Jupiter for liquid staking operations
6. WHEN a user requests to bridge assets, THE Ordo_System SHALL use deBridge or Wormhole for cross-chain transfers with status tracking
7. THE Ordo_System SHALL display estimated fees, slippage, and transaction details before executing any DeFi operation
8. WHEN DeFi operations fail, THE Ordo_System SHALL provide clear error messages and suggest alternative actions

### Requirement 17: NFT Operations

**User Story:** As a user, I want Ordo to help me manage NFTs including viewing my collection, buying, and selling, so that I can interact with the NFT ecosystem.

#### Acceptance Criteria

1. WHEN a user requests to view their NFT collection, THE Ordo_System SHALL display NFTs with metadata, images, and floor prices using Helius DAS API
2. WHEN a user requests to buy an NFT, THE Ordo_System SHALL integrate with Tensor or Magic Eden marketplaces with price confirmation
3. WHEN a user requests to list an NFT for sale, THE Ordo_System SHALL support listing on supported marketplaces with user confirmation
4. WHEN a user requests to create an NFT collection, THE Ordo_System SHALL support collection deployment via Metaplex or 3.Land
5. THE Ordo_System SHALL display NFT floor prices, collection stats, and recent sales data
6. WHEN NFT operations require signatures, THE Ordo_System SHALL use MWA for secure transaction signing

### Requirement 18: Advanced Trading Features

**User Story:** As a user, I want Ordo to support advanced trading features like perpetuals, limit orders, and market analysis, so that I can execute sophisticated trading strategies.

#### Acceptance Criteria

1. WHEN a user requests to open a perpetual position, THE Ordo_System SHALL integrate with Drift or Adrena protocols with leverage and collateral confirmation
2. WHEN a user requests to place a limit order, THE Ordo_System SHALL support limit orders via Manifest or Jupiter with price and expiry settings
3. WHEN a user requests market analysis, THE Ordo_System SHALL provide trending tokens, top gainers, and market sentiment data
4. WHEN a user requests to create a liquidity pool, THE Ordo_System SHALL support pool creation on Raydium, Meteora, or Orca with parameter confirmation
5. THE Ordo_System SHALL display position health, liquidation prices, and PnL for open positions
6. WHEN executing leveraged trades, THE Ordo_System SHALL clearly warn users about risks and require explicit confirmation

### Requirement 19: Agentic Payments (x402 Protocol)

**User Story:** As a user, I want Ordo to autonomously pay for AI services and APIs on my behalf, so that I can seamlessly use AI-powered features without manual payment intervention.

#### Acceptance Criteria

1. WHEN Ordo needs to access a paid AI service or API, THE Ordo_System SHALL use x402 protocol for autonomous payment authorization
2. WHEN setting up agentic payments, THE user SHALL configure spending limits and approved service providers
3. WHEN Ordo makes an autonomous payment, THE Ordo_System SHALL log the transaction in the audit log with service details and amount
4. THE Ordo_System SHALL support payment for AI model inference, data APIs, and blockchain services
5. WHEN spending limits are reached, THE Ordo_System SHALL request user approval before making additional payments
6. THE Ordo_System SHALL provide a dashboard showing all autonomous payments made, categorized by service type

### Requirement 20: Model Context Protocol (MCP) Integration

**User Story:** As a developer, I want all external tools to follow a standardized protocol, so that tool integration is consistent, maintainable, and extensible.

#### Acceptance Criteria

1. WHEN implementing external tool integrations, THE Ordo_System SHALL expose all tools via MCP servers using the Model Context Protocol
2. WHEN the orchestrator needs to execute a tool, THE Ordo_System SHALL use LangChain MCP adapters to communicate with MCP servers
3. WHEN a tool is executed, THE MCP interceptors SHALL inject runtime context including user permissions, OAuth tokens, and user ID
4. WHEN a tool execution completes, THE MCP interceptors SHALL log the execution to the audit log
5. THE Ordo_System SHALL organize MCP servers by domain: email, social, wallet, defi, nft, trading
6. WHEN developing MCP servers, THE development environment SHALL support testing via Kiro's built-in MCP panel
7. THE Ordo_System SHALL expose user data (emails, messages, portfolio) as MCP resources for efficient data access
8. THE Ordo_System SHALL provide reusable prompt templates as MCP prompts for common query patterns

### Requirement 21: Digital Assistant App Capabilities

**User Story:** As a user, I want Ordo to function as a full-featured digital assistant on my mobile device, so that I can interact with it naturally through voice, text, and system integrations.

#### Acceptance Criteria

1. WHEN a user launches Ordo, THE Ordo_System SHALL request necessary Android/iOS permissions including: internet access, notifications, microphone (for voice), contacts (optional), calendar (optional), storage (for cache)
2. WHEN a user speaks to Ordo, THE Ordo_System SHALL support voice input via speech-to-text and voice output via text-to-speech
3. WHEN Ordo needs to notify the user, THE Ordo_System SHALL send push notifications for important events (transaction confirmations, price alerts, message summaries)
4. WHEN a user wants quick access, THE Ordo_System SHALL provide a home screen widget showing portfolio summary and recent activity
5. WHEN a user enables it, THE Ordo_System SHALL integrate with device assistant (Siri, Google Assistant) for voice commands
6. WHEN running in background, THE Ordo_System SHALL maintain connection to backend services for real-time updates
7. WHEN a user shares content to Ordo, THE Ordo_System SHALL accept share intents from other apps (share wallet address, share transaction link)
8. WHEN a user enables biometric authentication, THE Ordo_System SHALL use device biometrics (fingerprint, face ID) for app access and transaction signing
9. WHEN a user wants offline access, THE Ordo_System SHALL cache recent data and provide read-only access when offline
10. WHEN a user enables accessibility features, THE Ordo_System SHALL support screen readers, high contrast mode, and large text
