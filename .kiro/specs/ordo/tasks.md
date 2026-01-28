# Ordo Implementation Tasks

## Phase 1: Multi-Agent System Foundation ✓ (Completed)

### 1.1 Core Infrastructure Setup ✓
- [x] 1.1.1 Set up React Native project with Expo
- [x] 1.1.2 Set up FastAPI backend with basic structure
- [x] 1.1.3 Configure PostgreSQL + pgvector database
- [x] 1.1.4 Set up Docker Compose for local development
- [x] 1.1.5 Configure environment variables and secrets management

### 1.2 Permission System Implementation ✓
- [x] 1.2.1 Implement PermissionManager frontend service
- [x] 1.2.2 Add secure storage for permission states and OAuth tokens
- [x] 1.2.3 Write unit tests for PermissionManager
- [x] 1.2.4 Write property-based tests for permission state management

### 1.3 Wallet Integration ✓
- [x] 1.3.1 Implement SeedVaultAdapter with MWA integration
- [x] 1.3.2 Add transaction signing via Seed Vault
- [x] 1.3.3 Write unit tests for SeedVaultAdapter
- [x] 1.3.4 Write property-based tests for wallet operations

## Phase 2: Multi-Agent Orchestration System

### 2.1 LangGraph Agent Architecture
- [ ] 2.1.1 Set up LangGraph StateGraph workflow
  - Create agent state TypedDict with all required fields
  - Define workflow nodes: parse_query, check_permissions, select_tools, execute_tools, filter_results, aggregate_results, generate_response
  - Add conditional edges for permission checking and error handling
  - Compile and test basic workflow execution
  - **Validates: Requirements 7.1, 7.2, 7.3**

- [ ] 2.1.2 Implement Mistral AI integration
  - Initialize ChatMistralAI with mistral-large-latest model
  - Configure temperature, max_tokens, and safety settings
  - Add function calling support for tool selection
  - Test LLM invocation with system prompts
  - **Validates: Requirements 7.1**

- [ ] 2.1.3 Create privacy-aware system prompt
  - Define ORDO_SYSTEM_PROMPT with privacy rules
  - Add capability descriptions for all surfaces
  - Include confirmation requirements for write operations
  - Add source citation format instructions
  - Test prompt with various query types
  - **Validates: Requirements 10.1, 10.2, 10.3**


### 2.2 Model Context Protocol (MCP) Integration
- [ ] 2.2.1 Set up MCP server infrastructure
  - Create MCP server directory structure (email, social, wallet, defi, nft, trading)
  - Configure Kiro MCP settings in .kiro/settings/mcp.json
  - Set up FastMCP for each domain server
  - Test MCP server connectivity via Kiro's MCP panel
  - **Validates: Requirements 20.1, 20.6**

- [ ] 2.2.2 Implement MCP interceptors
  - Create inject_ordo_context interceptor for permission checking
  - Create audit_tool_calls interceptor for logging
  - Add runtime context injection (user_id, permissions, tokens)
  - Test interceptor execution with sample tool calls
  - **Validates: Requirements 20.3, 20.4**

- [ ] 2.2.3 Initialize MultiServerMCPClient
  - Configure all MCP server URLs and transports
  - Add tool interceptors to client
  - Implement callbacks for progress and logging
  - Load tools from all MCP servers
  - Test tool discovery and execution
  - **Validates: Requirements 20.2, 20.5**

### 2.3 Policy Engine Enhancement
- [ ] 2.3.1 Expand sensitive data patterns
  - Add comprehensive OTP code patterns (4-8 digits)
  - Add verification code patterns with context
  - Add recovery phrase patterns (12/24 word sequences)
  - Add password reset email patterns
  - Add bank statement and tax document keywords
  - Test pattern matching with sample data
  - **Validates: Requirements 2.4**

- [ ] 2.3.2 Implement content filtering methods
  - Implement filter_emails with subject and body scanning
  - Implement filter_messages for social media content
  - Add filter_content dispatcher for different content types
  - Return filtered count and blocked patterns
  - **Validates: Requirements 2.2, 2.3, 6.3**

- [ ] 2.3.3 Add audit logging for policy violations
  - Create audit_logger module with PostgreSQL backend
  - Log all blocked content access attempts
  - Include timestamp, user_id, surface, pattern, content_preview
  - Implement log retention policy (90 days)
  - **Validates: Requirements 2.6, 11.2**


### 2.4 Context Aggregation System
- [ ] 2.4.1 Implement ContextAggregator frontend service
  - Create aggregateResults method for multi-surface data
  - Implement formatForLLM for context preparation
  - Add extractSources for citation tracking
  - Handle conflicting or duplicate information
  - **Validates: Requirements 7.3, 9.2**

- [ ] 2.4.2 Add source attribution tracking
  - Create Source interface with surface, identifier, timestamp, preview
  - Track sources for each piece of data
  - Format sources for display in UI
  - Test source extraction from various content types
  - **Validates: Requirements 7.5, 9.4, 10.6**

- [ ] 2.4.3 Implement cross-surface data merging
  - Combine results from multiple tools
  - Maintain source attribution during merge
  - Handle partial failures gracefully
  - Test with email + wallet, social + email combinations
  - **Validates: Requirements 9.1, 9.2, 9.6**

## Phase 3: Tool Implementation (MCP Servers)

### 3.1 Email MCP Server
- [ ] 3.1.1 Create email MCP server with FastMCP
  - Set up email_mcp FastMCP instance
  - Define search_email_threads tool with Gmail API
  - Define get_email_content tool
  - Add OAuth token parameter to all tools
  - Test tools via Kiro MCP panel
  - **Validates: Requirements 4.2, 4.3, 4.4**

- [ ] 3.1.2 Implement Gmail API integration
  - Set up Google OAuth 2.0 flow
  - Implement thread search with gmail.readonly scope
  - Implement email content retrieval
  - Add error handling for expired tokens
  - Test with real Gmail account
  - **Validates: Requirements 4.1, 4.6**

- [ ] 3.1.3 Add policy filtering to email tools
  - Integrate PolicyEngine into email tools
  - Filter emails before returning results
  - Log blocked emails to audit log
  - Return filtered count in response
  - Test with emails containing OTP codes
  - **Validates: Requirements 2.1, 2.2, 4.4**

- [ ] 3.1.4 Create email MCP resources
  - Define email://inbox resource for recent emails
  - Define email://sent resource for sent emails
  - Format email lists as text for LLM consumption
  - Test resource access via MCP
  - **Validates: Requirements 20.7**


### 3.2 Wallet MCP Server
- [ ] 3.2.1 Create wallet MCP server with FastMCP
  - Set up wallet_mcp FastMCP instance
  - Define get_wallet_portfolio tool using Helius DAS API
  - Define get_token_balances tool
  - Define get_transaction_history tool using Enhanced Transactions API
  - Test tools via Kiro MCP panel
  - **Validates: Requirements 5.2, 5.3**

- [ ] 3.2.2 Implement Helius RPC integration
  - Integrate getAssetsByOwner for portfolio data
  - Parse fungible tokens and NFTs from assets
  - Implement getTransactionsForAddress for history
  - Add priority fee estimation with getPriorityFeeEstimate
  - Test with real wallet addresses
  - **Validates: Requirements 5.2, 5.3**

- [ ] 3.2.3 Add transaction building tools
  - Define build_transfer_transaction tool for SOL transfers
  - Add SPL token transfer support
  - Return serialized transaction for frontend signing
  - Include transaction preview data (amount, recipient, fee)
  - Test transaction building and serialization
  - **Validates: Requirements 5.4**

- [ ] 3.2.4 Create wallet MCP resources
  - Define wallet://portfolio resource for current holdings
  - Define wallet://transactions resource for history
  - Format portfolio data as text for LLM
  - Test resource access via MCP
  - **Validates: Requirements 20.7**

### 3.3 Social Media MCP Server
- [ ] 3.3.1 Create social MCP server with FastMCP
  - Set up social_mcp FastMCP instance
  - Define get_x_dms tool with X OAuth
  - Define get_x_mentions tool
  - Define get_telegram_messages tool with Bot API
  - Test tools via Kiro MCP panel
  - **Validates: Requirements 6.1, 6.2, 6.4**

- [ ] 3.3.2 Implement X/Twitter API integration
  - Set up X OAuth 2.0 flow
  - Implement DM retrieval with read access
  - Implement mentions retrieval
  - Add rate limit handling and queuing
  - Test with real X account
  - **Validates: Requirements 6.1, 6.6**

- [ ] 3.3.3 Implement Telegram Bot API integration
  - Set up Telegram Bot API authentication
  - Implement message retrieval from chats
  - Add chat-specific message filtering
  - Handle API rate limits
  - Test with real Telegram bot
  - **Validates: Requirements 6.2, 6.6**

- [ ] 3.3.4 Add policy filtering to social tools
  - Integrate PolicyEngine into social tools
  - Filter messages before returning results
  - Log blocked messages to audit log
  - Return filtered count in response
  - Test with messages containing verification codes
  - **Validates: Requirements 2.1, 2.3, 6.3**


### 3.4 DeFi MCP Server (Solana Agent Kit Integration)
- [ ] 3.4.1 Create DeFi MCP server with FastMCP
  - Set up defi_mcp FastMCP instance
  - Initialize SolanaAgentKit with KeypairWallet and plugins
  - Add TokenPlugin for token operations
  - Add DefiPlugin for DeFi operations
  - Define swap_tokens_jupiter tool (0.5% fees via Jupiter Ultra API)
  - Define lend_usdc_lulo tool (0.1% fees)
  - Define stake_sol_sanctum tool (0.1% fees via Sanctum)
  - Test tools via Kiro MCP panel
  - **Validates: Requirements 16.1, 16.2, 16.5**

- [ ] 3.4.2 Implement Jupiter swap integration
  - Integrate Jupiter Ultra API for token swaps
  - Get quotes with optimal routing
  - Build swap transactions with slippage protection
  - Use sendTx(agent, instructions, otherKeypairs, feeTier) for execution
  - Return transaction preview with price impact and fees
  - Test with various token pairs
  - **Validates: Requirements 16.1, 16.7**

- [ ] 3.4.3 Implement Lulo lending integration
  - Integrate Lulo protocol for USDC lending
  - Get current APY rates
  - Build lending and withdrawal transactions
  - Use signOrSendTX for transaction execution
  - Return transaction preview with APY
  - Test lending and withdrawal operations
  - **Validates: Requirements 16.2**

- [ ] 3.4.4 Implement additional DeFi tools
  - Add bridge_assets_debridge tool (redirect to website with prefilled details)
  - Add get_token_price_birdeye tool for real-time prices
  - Add launch_token_pumpfun tool for token creation
  - Add get_token_info tool using Birdeye API
  - Test all DeFi operations
  - **Validates: Requirements 16.3, 16.4**

- [ ] 3.4.5 Add Jito Bundles support
  - Integrate Jito Bundles for MEV protection
  - Build bundle transactions
  - Submit bundles via Jito API
  - Test bundle execution
  - **Validates: Requirements 16.8**

### 3.5 NFT MCP Server (Solana Agent Kit Integration)
- [ ] 3.5.1 Create NFT MCP server with FastMCP
  - Set up nft_mcp FastMCP instance
  - Initialize SolanaAgentKit with NFTPlugin
  - Define get_nft_collection tool using Helius DAS
  - Define buy_nft_tensor tool for Tensor marketplace
  - Define list_nft_tensor tool for listing NFTs
  - Define mint_nft_metaplex tool for creating new NFTs
  - Test tools via Kiro MCP panel
  - **Validates: Requirements 17.1, 17.2, 17.3**

- [ ] 3.5.2 Implement Tensor marketplace integration
  - Integrate Tensor API for NFT listings
  - Implement NFT purchase with price verification
  - Implement NFT listing creation
  - Use sendTx for transaction execution
  - Return transaction previews with marketplace details
  - Test with real NFT collections
  - **Validates: Requirements 17.2, 17.3, 17.5**

- [ ] 3.5.3 Implement Metaplex integration
  - Add create_nft_collection_metaplex tool
  - Add mint_nft tool for individual NFT creation
  - Integrate Metaplex SDK for NFT operations
  - Build NFT creation transactions
  - Return transaction preview with royalty settings
  - Test NFT minting and collection creation
  - **Validates: Requirements 17.4**


### 3.6 Trading MCP Server (Plugin God Mode Integration)
- [ ] 3.6.1 Create trading MCP server with FastMCP
  - Set up trading_mcp FastMCP instance
  - Initialize SolanaAgentKit with GodModePlugin
  - Define open_perp_position_drift tool for Drift Protocol
  - Define open_perp_position_ranger tool (alternative to Drift)
  - Define create_dca_order tool for Jupiter DCA
  - Define create_limit_order tool for Jupiter limit orders
  - Test tools via Kiro MCP panel
  - **Validates: Requirements 18.1, 18.2**

- [ ] 3.6.2 Implement advanced trading features
  - Add place_polymarket_order tool for prediction markets
  - Add get_polymarket_data tool for market data and orderbook
  - Add launch_meteora_token tool for token launches
  - Add get_market_analysis tool for trending tokens (Birdeye)
  - Add create_liquidity_pool_raydium tool
  - Add play_rps_game tool via SendArcade Blinks
  - Test all trading operations
  - **Validates: Requirements 18.3, 18.4**

- [ ] 3.6.3 Add Messari AI integration
  - Integrate Messari AI API for market context
  - Add get_market_context tool
  - Add get_token_research tool
  - Test Messari data retrieval
  - **Validates: Requirements 18.3**

- [ ] 3.6.4 Add risk warnings for leveraged positions
  - Calculate liquidation prices for perp positions
  - Display leverage warnings in transaction previews
  - Add position health indicators
  - Show maximum loss scenarios
  - Test risk calculation accuracy
  - **Validates: Requirements 18.5, 18.6**

- [ ] 3.6.5 Add onramp integration
  - Integrate onramp provider for fiat-to-crypto
  - Add buy_crypto_with_fiat tool
  - Redirect to onramp with prefilled details
  - Test onramp flow
  - **Validates: Requirements 16.9**

### 3.7 Agent EOA Wallet Integration (Solana Agent Kit)
- [ ] 3.7.1 Create agent wallet with KeypairWallet
  - Generate Keypair for agent's EOA wallet
  - Store private key securely in backend (encrypted at rest with AES-256)
  - Initialize KeypairWallet with agent keypair and RPC URL
  - Create SolanaAgentKit instance with KeypairWallet
  - Add wallet address display in UI
  - **Validates: Requirements 19.1, 19.2**

- [ ] 3.7.2 Implement wallet funding mechanism
  - Create fund_agent_wallet tool for user to fund agent
  - Build transfer transaction from user wallet to agent wallet
  - Display agent wallet balance in UI
  - Add low balance alerts (< 0.1 SOL)
  - Test funding flow with Seed Vault signing
  - **Validates: Requirements 19.1**

- [ ] 3.7.3 Integrate SolanaAgentKit with all plugins
  - Initialize SolanaAgentKit with KeypairWallet
  - Add TokenPlugin for token operations (transfer with 0% fees)
  - Add NFTPlugin for NFT operations
  - Add DefiPlugin for DeFi operations
  - Add MiscPlugin for miscellaneous operations
  - Add GodModePlugin for advanced trading
  - Configure priority fee level (medium/high/veryHigh)
  - Test plugin initialization and method access
  - **Note**: Use sendTx(agent, instructions, otherKeypairs, feeTier) for transaction execution
  - **Note**: Use signOrSendTX(agent, instructionsOrTransaction) for flexible execution
  - **Validates: Requirements 16, 17, 18**

- [ ] 3.7.4 Create LangChain tools from SolanaAgentKit
  - Use createLangchainTools(agent, agent.actions) to generate tools
  - Each Action includes: name, description, similes, examples, schema, handler
  - Register all generated tools with LangGraph orchestrator
  - Use executeAction(action, agent, input) for tool execution
  - Test tool execution through LangChain with various inputs
  - Verify Zod schema validation for tool parameters
  - Use getActionExamples(action) for tool documentation
  - **Validates: Requirements 7.1, 20.2**

- [ ] 3.7.5 Implement spending limit enforcement
  - Create AgenticPaymentManager class
  - Add daily spending limit tracking (default: 1 SOL)
  - Add per-transaction limit validation (default: 0.1 SOL)
  - Implement daily counter reset logic at midnight UTC
  - Add spending limit exceeded error handling
  - Store spending limits in user preferences
  - **Validates: Requirements 19.2, 19.5**

- [ ] 3.7.6 Add service whitelist management
  - Create approved services configuration
  - Implement service whitelist checking before payments
  - Add UI for managing approved services list
  - Store whitelist in user preferences (encrypted)
  - Test whitelist enforcement with various services
  - **Validates: Requirements 19.2**

- [ ] 3.7.7 Implement autonomous payment execution
  - Create request_payment tool for autonomous payments
  - Validate payment against spending limits
  - Validate service against whitelist
  - Execute payment using agent KeypairWallet.signAndSendTransaction
  - Log all payments to audit log with service details
  - Send payment notifications to user
  - **Validates: Requirements 19.3, 19.4**

- [ ] 3.7.8 Add payment history and dashboard
  - Create get_payment_history API endpoint
  - Implement payment categorization by service type
  - Add remaining limit calculations (daily and per-transaction)
  - Create payment dashboard UI component
  - Display payment history with filtering by date and service
  - Show spending analytics (daily/weekly/monthly)
  - **Validates: Requirements 19.6**

- [ ] 3.7.9 Add agent wallet security measures
  - Implement private key encryption at rest (AES-256-GCM)
  - Add key rotation mechanism (monthly)
  - Implement wallet backup and recovery
  - Add transaction signing rate limiting
  - Monitor for suspicious activity patterns
  - Create emergency wallet freeze mechanism
  - **Validates: Requirements 10.4, 10.5**


## Phase 4: RAG System and Web Search

### 4.1 RAG System Implementation
- [ ] 4.1.1 Set up Supabase pgvector integration
  - Create Supabase project and database
  - Install pgvector extension
  - Create documents table with vector column
  - Create ivfflat index for vector search
  - Test vector storage and retrieval
  - **Validates: Requirements 8.1**

- [ ] 4.1.2 Implement Mistral embeddings
  - Initialize MistralAIEmbeddings with mistral-embed model
  - Create document embedding pipeline
  - Batch embed documents for efficiency
  - Store embeddings in Supabase
  - Test embedding generation and storage
  - **Validates: Requirements 8.1**

- [ ] 4.1.3 Add documentation corpus
  - Collect Solana documentation
  - Collect Seeker documentation
  - Collect popular dApp documentation
  - Chunk documents into optimal sizes (512-1024 tokens)
  - Embed and store all documentation
  - **Validates: Requirements 8.1, 8.4**

- [ ] 4.1.4 Implement semantic search
  - Create RAGSystem class with query method
  - Implement similarity search with top-k retrieval
  - Add source attribution to retrieved documents
  - Format results for LLM consumption
  - Test with various documentation queries
  - **Validates: Requirements 8.2, 8.3**

- [ ] 4.1.5 Add documentation update pipeline
  - Create update_documentation method
  - Implement periodic documentation refresh
  - Add version tracking for documents
  - Test documentation updates
  - **Validates: Requirements 8.6**

### 4.2 Web Search Integration
- [ ] 4.2.1 Implement Brave Search API integration
  - Set up Brave Search API credentials
  - Create web_search tool
  - Add result ranking and filtering
  - Extract snippets and metadata
  - Test with various search queries
  - **Validates: Requirements 15.1, 15.5**

- [ ] 4.2.2 Add web content fetching
  - Create fetch_url_content tool
  - Implement HTML parsing and text extraction
  - Add content sanitization
  - Handle various content types
  - Test with different websites
  - **Validates: Requirements 15.1**

- [ ] 4.2.3 Implement RAG fallback to web search
  - Add similarity threshold for RAG results
  - Trigger web search when RAG returns no results
  - Combine RAG and web search results
  - Prioritize official documentation over web content
  - Test fallback behavior
  - **Validates: Requirements 8.5, 15.1**

- [ ] 4.2.4 Add source citation for web results
  - Include source URLs in responses
  - Add publication dates when available
  - Format citations consistently
  - Test citation display in UI
  - **Validates: Requirements 15.2**


## Phase 5: Digital Assistant Capabilities

### 5.1 Mobile Permissions and Setup
- [ ] 5.1.1 Configure Android permissions
  - Add INTERNET and ACCESS_NETWORK_STATE permissions
  - Add POST_NOTIFICATIONS and VIBRATE permissions
  - Add RECORD_AUDIO permission for voice input
  - Add USE_BIOMETRIC and USE_FINGERPRINT permissions
  - Add FOREGROUND_SERVICE and WAKE_LOCK for background
  - Test permission requests on Android device
  - **Validates: Requirements 21.1**

- [ ] 5.1.2 Configure Seeker permissions
  - Add NSMicrophoneUsageDescription for voice
  - Add NSFaceIDUsageDescription for biometric auth
  - Add NSUserNotificationsUsageDescription
  - Add UIBackgroundModes for fetch and notifications
  - Test permission requests on Seeker device
  - **Validates: Requirements 21.1**

### 5.2 Voice Assistant Integration
- [ ] 5.2.1 Implement speech-to-text (STT)
  - Create VoiceAssistant class
  - Add microphone permission handling
  - Implement audio recording with expo-av
  - Send audio to backend for transcription (Mistral or Whisper)
  - Return transcribed text to UI
  - Test voice input accuracy
  - **Validates: Requirements 21.2**

- [ ] 5.2.2 Implement text-to-speech (TTS)
  - Create TextToSpeech class using expo-speech
  - Add voice output for responses
  - Configure voice parameters (language, pitch, rate)
  - Add stop and pause controls
  - Test TTS with various response types
  - **Validates: Requirements 21.2**

- [ ] 5.2.3 Add voice command flow
  - Create voice input button in UI
  - Connect STT to query processing
  - Connect TTS to response generation
  - Add visual feedback during voice interaction
  - Test end-to-end voice conversation
  - **Validates: Requirements 21.2**

### 5.3 Push Notifications
- [ ] 5.3.1 Set up notification system
  - Configure expo-notifications
  - Request notification permissions
  - Set up notification handler
  - Test notification display
  - **Validates: Requirements 21.3**

- [ ] 5.3.2 Implement notification types
  - Add transaction confirmation notifications
  - Add price alert notifications
  - Add message summary notifications
  - Add payment execution notifications
  - Test all notification types
  - **Validates: Requirements 21.3**

- [ ] 5.3.3 Add notification scheduling
  - Implement scheduled notifications
  - Add notification triggers (time-based, event-based)
  - Create notification preferences UI
  - Test notification scheduling
  - **Validates: Requirements 21.3**

### 5.4 Home Screen Widget
- [ ] 5.4.1 Create Android widget
  - Implement AppWidgetProvider for Android
  - Design widget layout (portfolio summary)
  - Add widget update mechanism
  - Display SOL balance and total value
  - Test widget on Android device
  - **Validates: Requirements 21.4**

- [ ] 5.4.2 Create Seeker widget
  - Implement WidgetKit extension for Seeker
  - Design widget view with SwiftUI
  - Add timeline provider for updates
  - Display portfolio summary
  - Test widget on Seeker device
  - **Validates: Requirements 21.4**

### 5.5 Device Assistant Integration
- [ ] 5.5.1 Implement Siri Shortcuts (Seeker)
  - Register Siri shortcuts for common actions
  - Add "Check portfolio" shortcut
  - Add "Send SOL" shortcut
  - Add "Check messages" shortcut
  - Handle intent execution
  - Test Siri integration
  - **Validates: Requirements 21.5**

- [ ] 5.5.2 Implement Google Assistant Actions (Android)
  - Register app actions for Google Assistant
  - Add CHECK_BALANCE action
  - Add SEND_MONEY action
  - Handle action execution
  - Test Google Assistant integration
  - **Validates: Requirements 21.5**

### 5.6 Background Services
- [ ] 5.6.1 Implement background fetch
  - Set up expo-background-fetch
  - Define background task for portfolio updates
  - Add price alert checking
  - Add message checking
  - Update widget with fresh data
  - Test background execution
  - **Validates: Requirements 21.6**

- [ ] 5.6.2 Add background task management
  - Register background tasks
  - Configure task intervals (15 minutes minimum)
  - Handle task completion and errors
  - Test task persistence across app restarts
  - **Validates: Requirements 21.6**

### 5.7 Share Extension and Deep Linking
- [ ] 5.7.1 Implement share functionality
  - Create ShareHandler class
  - Add share wallet address method
  - Add share transaction method
  - Test sharing to other apps
  - **Validates: Requirements 21.7**

- [ ] 5.7.2 Handle incoming shares
  - Detect wallet addresses in shared content
  - Detect transaction signatures in shared content
  - Navigate to appropriate screen with pre-filled data
  - Test receiving shares from other apps
  - **Validates: Requirements 21.7**

- [ ] 5.7.3 Add deep linking support
  - Configure expo-linking for deep links
  - Handle ordo:// URL scheme
  - Parse deep link parameters
  - Navigate to appropriate screens
  - Test deep link handling
  - **Validates: Requirements 21.7**

### 5.8 Biometric Authentication
- [ ] 5.8.1 Implement biometric auth service
  - Create BiometricAuth class using expo-local-authentication
  - Check biometric hardware availability
  - Get supported authentication types
  - Implement authentication flow
  - Test with fingerprint and face recognition
  - **Validates: Requirements 21.8**

- [ ] 5.8.2 Add biometric protection for sensitive actions
  - Require biometric auth for app access (optional)
  - Require biometric auth for transaction signing
  - Require biometric auth for permission changes
  - Add fallback to passcode
  - Test biometric flows
  - **Validates: Requirements 21.8**

### 5.9 Offline Mode
- [ ] 5.9.1 Implement offline cache manager
  - Create OfflineManager class
  - Monitor network connectivity with @react-native-community/netinfo
  - Cache portfolio data with timestamps
  - Cache recent messages and emails
  - Add cache expiration logic
  - **Validates: Requirements 21.9**

- [ ] 5.9.2 Add offline data access
  - Return cached data when offline
  - Display offline indicator in UI
  - Prevent write operations when offline
  - Queue operations for when online
  - Test offline functionality
  - **Validates: Requirements 21.9**

### 5.10 Accessibility Features
- [ ] 5.10.1 Implement accessibility support
  - Create AccessibilityManager class
  - Add screen reader support
  - Configure accessibility labels and hints
  - Add accessibility roles to components
  - Test with TalkBack (Android) and VoiceOver (Seeker)
  - **Validates: Requirements 21.10**

- [ ] 5.10.2 Add high contrast and large text modes
  - Implement high contrast theme
  - Add text scaling support
  - Test with system accessibility settings
  - Ensure all text is readable
  - **Validates: Requirements 21.10**


## Phase 6: User Interface and Experience

### 6.1 Chat Interface
- [ ] 6.1.1 Create chat UI components
  - Design message bubble components (user and assistant)
  - Add typing indicator animation
  - Implement message list with auto-scroll
  - Add input field with send button
  - Add voice input button
  - Test chat UI on different screen sizes
  - **Validates: Requirements 7.1**

- [ ] 6.1.2 Implement conversation management
  - Create conversation context storage
  - Add conversation history persistence
  - Implement conversation list view
  - Add new conversation creation
  - Add conversation deletion
  - Test conversation switching
  - **Validates: Requirements 7.1**

- [ ] 6.1.3 Add source citations display
  - Create citation component for inline sources
  - Display source type icons (email, wallet, social, web)
  - Add tap-to-view-source functionality
  - Format citations consistently
  - Test citation display with various source types
  - **Validates: Requirements 7.5, 10.6**

- [ ] 6.1.4 Add suggested actions
  - Display suggested follow-up actions after responses
  - Create action button components
  - Handle action button taps
  - Test suggested actions flow
  - **Validates: Requirements 7.1**

### 6.2 Permission Management UI
- [ ] 6.2.1 Create permission settings screen
  - Design permission card components
  - Display all permission types with status
  - Add grant/revoke toggle buttons
  - Show grant timestamp for each permission
  - Test permission UI interactions
  - **Validates: Requirements 1.1, 1.6**

- [ ] 6.2.2 Implement OAuth flows
  - Add Google OAuth for Gmail
  - Add X OAuth for Twitter
  - Add Telegram Bot setup flow
  - Handle OAuth callbacks
  - Display OAuth errors clearly
  - Test all OAuth flows
  - **Validates: Requirements 4.1, 6.1, 6.2**

- [ ] 6.2.3 Add permission request dialogs
  - Create permission request modal
  - Explain why permission is needed
  - Show what data will be accessed
  - Add approve/deny buttons
  - Test permission request flow
  - **Validates: Requirements 1.1**

### 6.3 Confirmation Dialogs
- [ ] 6.3.1 Create transaction confirmation dialog
  - Design transaction preview component
  - Display recipient, amount, token, fee
  - Show transaction details clearly
  - Add confirm/cancel buttons
  - Add biometric auth trigger
  - Test transaction confirmation flow
  - **Validates: Requirements 3.3, 3.4, 5.5**

- [ ] 6.3.2 Create email send confirmation dialog
  - Display email preview (to, subject, body)
  - Show character count
  - Add edit button to modify before sending
  - Add confirm/cancel buttons
  - Test email confirmation flow
  - **Validates: Requirements 3.1**

- [ ] 6.3.3 Create DeFi operation confirmation dialog
  - Display operation type (swap, lend, stake, etc.)
  - Show input/output amounts
  - Display price impact and fees
  - Show estimated outcome
  - Add risk warnings for leveraged positions
  - Test DeFi confirmation flows
  - **Validates: Requirements 16.7, 18.6**

### 6.4 Portfolio Display
- [ ] 6.4.1 Create portfolio overview screen
  - Display total portfolio value in USD
  - Show SOL balance prominently
  - List all token holdings with amounts and values
  - Display 24h price changes with colors
  - Add refresh button
  - Test portfolio display with various holdings
  - **Validates: Requirements 5.3**

- [ ] 6.4.2 Add NFT collection view
  - Display NFT grid with images
  - Show NFT names and collection info
  - Add floor price display
  - Implement NFT detail view
  - Test NFT display with various collections
  - **Validates: Requirements 17.1**

- [ ] 6.4.3 Add transaction history view
  - Display transaction list with dates
  - Show transaction types (transfer, swap, NFT, etc.)
  - Display amounts and counterparties
  - Add transaction detail view
  - Link to Solscan for full details
  - Test transaction history display
  - **Validates: Requirements 5.3**

### 6.5 Agent Wallet Dashboard
- [ ] 6.5.1 Create agent wallet overview
  - Display agent wallet address with copy button
  - Show agent wallet balance
  - Display spending limits (daily and per-transaction)
  - Show remaining daily limit
  - Add fund agent wallet button
  - Test agent wallet display
  - **Validates: Requirements 19.6**

- [ ] 6.5.2 Create payment history view
  - Display payment list with dates and services
  - Show payment amounts and descriptions
  - Add filtering by service type
  - Display spending analytics (daily/weekly/monthly)
  - Add export payment history button
  - Test payment history display
  - **Validates: Requirements 19.6**

- [ ] 6.5.3 Add spending limit configuration
  - Create spending limit settings screen
  - Add daily limit input field
  - Add per-transaction limit input field
  - Show current limits and usage
  - Add save button with confirmation
  - Test limit configuration
  - **Validates: Requirements 19.2, 19.5**

- [ ] 6.5.4 Add approved services management
  - Create approved services list screen
  - Display currently approved services
  - Add service addition flow
  - Add service removal with confirmation
  - Test service management
  - **Validates: Requirements 19.2**

### 6.6 Settings and Preferences
- [ ] 6.6.1 Create settings screen
  - Add cluster selection (mainnet/devnet/testnet)
  - Add theme selection (light/dark/auto)
  - Add language selection
  - Add notification preferences
  - Add biometric auth toggle
  - Test settings persistence
  - **Validates: Requirements 21.1**

- [ ] 6.6.2 Add audit log viewer
  - Create audit log screen
  - Display access attempts with timestamps
  - Show blocked content attempts
  - Add filtering by surface and date
  - Add export audit log button
  - Test audit log display
  - **Validates: Requirements 11.3**


## Phase 7: Testing and Quality Assurance

### 7.1 Unit Testing
- [ ] 7.1.1 Write frontend unit tests
  - Test PermissionManager methods (already done ✓)
  - Test SeedVaultAdapter methods (already done ✓)
  - Test ContextAggregator methods
  - Test UI component rendering
  - Test OAuth flow handling
  - Achieve >80% code coverage
  - **Validates: All Requirements**

- [ ] 7.1.2 Write backend unit tests
  - Test PolicyEngine pattern matching
  - Test OrdoAgent workflow nodes
  - Test MCP tool execution
  - Test API endpoint handlers
  - Test audit logging
  - Achieve >80% code coverage
  - **Validates: All Requirements**

### 7.2 Property-Based Testing
- [ ] 7.2.1 Write permission system PBT
  - Test permission state persistence (Property 1)
  - Test permission revocation cleanup (Property 2)
  - Test unauthorized access rejection (Property 3)
  - Test permission status completeness (Property 4)
  - Run with 100+ iterations
  - **Validates: Requirements 1.2, 1.3, 1.4, 1.6**

- [ ] 7.2.2 Write policy engine PBT
  - Test universal content scanning (Property 5)
  - Test sensitive content filtering (Property 6)
  - Test pattern-based blocking (Property 7)
  - Test all-blocked refusal (Property 8)
  - Run with 100+ iterations
  - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

- [ ] 7.2.3 Write wallet integration PBT
  - Test private key isolation (Property 12)
  - Test valid transaction construction (Property 20)
  - Test transaction signing flow
  - Run with 100+ iterations
  - **Validates: Requirements 5.1, 5.4, 5.6**

- [ ] 7.2.4 Write orchestration PBT
  - Test parallel tool execution (Property 22)
  - Test multi-surface result aggregation (Property 23)
  - Test source attribution (Property 24)
  - Test partial failure handling (Property 31)
  - Run with 100+ iterations
  - **Validates: Requirements 7.2, 7.3, 7.5, 9.6**

- [ ] 7.2.5 Write agent wallet PBT
  - Test spending limit enforcement (Property 44)
  - Test service whitelist (Property 45)
  - Test payment audit logging (Property 46)
  - Run with 100+ iterations
  - **Validates: Requirements 19.2, 19.3, 19.5**

### 7.3 Integration Testing
- [ ] 7.3.1 Test end-to-end query flow
  - Test query from frontend to backend to external API
  - Test multi-surface task execution
  - Test error handling and retry logic
  - Test response generation with citations
  - **Validates: Requirements 7.1, 7.2, 7.3**

- [ ] 7.3.2 Test OAuth token refresh flow
  - Test expired token detection
  - Test token refresh mechanism
  - Test re-authentication prompt
  - **Validates: Requirements 4.6, 12.1**

- [ ] 7.3.3 Test MWA transaction signing flow
  - Test transaction building
  - Test Seed Vault authorization
  - Test transaction signing with biometric
  - Test transaction submission
  - **Validates: Requirements 5.4, 5.5**

- [ ] 7.3.4 Test agent wallet operations
  - Test wallet funding from user wallet
  - Test autonomous payment execution
  - Test spending limit enforcement
  - Test payment history tracking
  - **Validates: Requirements 19.1, 19.3, 19.4, 19.6**

### 7.4 Security Testing
- [ ] 7.4.1 Test sensitive data filtering
  - Test all OTP code patterns
  - Test verification code patterns
  - Test recovery phrase patterns
  - Test password reset patterns
  - Test bank statement patterns
  - Verify no sensitive data in responses
  - **Validates: Requirements 2.4, 10.2**

- [ ] 7.4.2 Test permission enforcement
  - Test unauthorized access rejection
  - Test permission revocation cleanup
  - Test cache deletion on revocation
  - **Validates: Requirements 1.3, 1.4, 10.5**

- [ ] 7.4.3 Test private key isolation
  - Verify no code paths access private keys (user wallet)
  - Verify agent private key is encrypted at rest
  - Test key rotation mechanism
  - **Validates: Requirements 5.6, 10.4**

- [ ] 7.4.4 Test confirmation requirements
  - Verify all write operations require confirmation
  - Test confirmation cancellation
  - Verify no auto-send capabilities
  - **Validates: Requirements 3.5, 3.6**

- [ ] 7.4.5 Test audit logging
  - Verify all access attempts are logged
  - Verify policy violations are logged
  - Test audit log retention
  - **Validates: Requirements 11.1, 11.2, 11.4**

### 7.5 Performance Testing
- [ ] 7.5.1 Test query response times
  - Measure single-surface query time (target: <2s)
  - Measure multi-surface query time (target: <5s)
  - Measure RAG retrieval time (target: <500ms)
  - Measure policy filtering time (target: <100ms per item)
  - **Validates: All Requirements**

- [ ] 7.5.2 Test concurrent user load
  - Simulate 10 concurrent users
  - Simulate 50 concurrent users
  - Simulate 100 concurrent users
  - Measure response times under load
  - **Validates: All Requirements**

- [ ] 7.5.3 Test database performance
  - Measure audit log query performance
  - Measure RAG vector search performance
  - Test with large datasets (10k+ records)
  - **Validates: Requirements 8.2, 11.3**

### 7.6 User Acceptance Testing
- [ ] 7.6.1 Test on Solana Seeker device
  - Test all features on actual Seeker hardware
  - Test MWA integration with Seed Vault
  - Test biometric authentication
  - Test voice assistant
  - Verify performance on device
  - **Validates: All Requirements**

- [ ] 7.6.2 Test on Android devices
  - Test on various Android versions (10+)
  - Test on different screen sizes
  - Test with different biometric types
  - **Validates: Requirements 21.1**

- [ ] 7.6.3 Test on Seeker devices
  - Test on various Seeker versions (14+)
  - Test on different iPhone models
  - Test with Face ID and Touch ID
  - **Validates: Requirements 21.1**


## Phase 8: Deployment and Launch

### 8.1 Backend Deployment
- [ ] 8.1.1 Set up production infrastructure
  - Deploy FastAPI backend to Railway/Render/Fly.io
  - Configure PostgreSQL database with backups
  - Set up Redis for caching and rate limiting
  - Configure environment variables securely
  - Set up SSL/TLS certificates
  - **Validates: All Requirements**

- [ ] 8.1.2 Configure monitoring and alerting
  - Set up Sentry for error tracking
  - Configure Datadog for metrics
  - Set up log aggregation
  - Configure alerts for high error rates
  - Configure alerts for API latency spikes
  - **Validates: Requirements 12.1, 12.2**

- [ ] 8.1.3 Set up MCP servers
  - Deploy all MCP servers (email, social, wallet, defi, nft, trading)
  - Configure MCP server URLs in production
  - Test MCP connectivity from backend
  - Monitor MCP server health
  - **Validates: Requirements 20.1, 20.2**

- [ ] 8.1.4 Configure rate limiting and security
  - Set up Cloudflare for DDoS protection
  - Configure rate limiting per user and IP
  - Set up API key rotation policy
  - Enable CORS with proper origins
  - Test security measures
  - **Validates: Requirements 12.5**

### 8.2 Frontend Deployment
- [ ] 8.2.1 Build production app with EAS
  - Configure EAS Build for Android
  - Configure EAS Build for Seeker
  - Set up production environment variables
  - Build Android APK/AAB
  - Build Seeker IPA
  - Test production builds
  - **Validates: All Requirements**

- [ ] 8.2.2 Submit to Solana dApp Store
  - Prepare app store listing
  - Create screenshots and promotional materials
  - Write app description
  - Submit app for review
  - Address review feedback
  - **Validates: All Requirements**

- [ ] 8.2.3 Submit to Google Play Store (optional)
  - Create Google Play Console account
  - Prepare store listing
  - Submit app for review
  - Address review feedback
  - **Validates: All Requirements**

- [ ] 8.2.4 Submit to Apple App Store (optional)
  - Create App Store Connect account
  - Prepare store listing
  - Submit app for review
  - Address review feedback
  - **Validates: All Requirements**

### 8.3 Documentation
- [ ] 8.3.1 Write user documentation
  - Create getting started guide
  - Document permission system
  - Document wallet integration
  - Document agent wallet and payments
  - Create FAQ section
  - **Validates: All Requirements**

- [ ] 8.3.2 Write developer documentation
  - Document API endpoints
  - Document MCP server architecture
  - Document plugin system
  - Create contribution guide
  - Document deployment process
  - **Validates: All Requirements**

- [ ] 8.3.3 Create video tutorials
  - Record app walkthrough
  - Create permission setup tutorial
  - Create wallet connection tutorial
  - Create DeFi operations tutorial
  - **Validates: All Requirements**

### 8.4 Launch Preparation
- [ ] 8.4.1 Conduct final testing
  - Run full test suite
  - Perform security audit
  - Test on production infrastructure
  - Verify all integrations work
  - **Validates: All Requirements**

- [ ] 8.4.2 Prepare launch materials
  - Write launch announcement
  - Create social media posts
  - Prepare press release
  - Create demo videos
  - **Validates: All Requirements**

- [ ] 8.4.3 Set up support channels
  - Create Discord server
  - Set up email support
  - Create issue tracker
  - Prepare support documentation
  - **Validates: All Requirements**

### 8.5 Post-Launch
- [ ] 8.5.1 Monitor production metrics
  - Track user signups
  - Monitor error rates
  - Track API usage
  - Monitor performance metrics
  - **Validates: All Requirements**

- [ ] 8.5.2 Gather user feedback
  - Collect user reviews
  - Conduct user surveys
  - Track feature requests
  - Prioritize improvements
  - **Validates: All Requirements**

- [ ] 8.5.3 Plan future iterations
  - Review roadmap
  - Prioritize new features
  - Plan bug fixes
  - Schedule updates
  - **Validates: All Requirements**

## Summary

This task list provides a comprehensive roadmap for building Ordo as a multi-agent system for the Solana Seeker mobile digital assistant. The implementation follows a phased approach:

1. **Phase 1**: Core infrastructure and wallet integration (✓ Completed)
2. **Phase 2**: Multi-agent orchestration with LangGraph and MCP
3. **Phase 3**: Tool implementation across all domains (email, wallet, social, DeFi, NFT, trading)
4. **Phase 4**: RAG system and web search integration
5. **Phase 5**: Digital assistant capabilities (voice, notifications, widgets, etc.)
6. **Phase 6**: User interface and experience
7. **Phase 7**: Comprehensive testing (unit, property-based, integration, security)
8. **Phase 8**: Deployment and launch

Each task is mapped to specific requirements from the requirements document and includes validation criteria. The agent EOA wallet is implemented using Solana Agent Kit's KeypairWallet, enabling autonomous operations with spending limits and service whitelisting.

