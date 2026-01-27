# Solana Agent Kit v2 - Available Tools Reference

This document provides a comprehensive reference of all available tools in Solana Agent Kit v2 plugins for the Ordo implementation.

## Plugin Architecture

Solana Agent Kit v2 uses a modular plugin system. Each plugin exposes specific actions that can be used by the AI agent:

```typescript
import { SolanaAgentKit } from "solana-agent-kit";
import TokenPlugin from "@solana-agent-kit/plugin-token";
import NFTPlugin from "@solana-agent-kit/plugin-nft";
import DefiPlugin from "@solana-agent-kit/plugin-defi";
import MiscPlugin from "@solana-agent-kit/plugin-misc";

const agent = new SolanaAgentKit(wallet, rpcUrl, config)
  .use(TokenPlugin)
  .use(NFTPlugin)
  .use(DefiPlugin)
  .use(MiscPlugin);
```

---

## Token Plugin (`@solana-agent-kit/plugin-token`)

### Dexscreener
- `getTokenDataByAddress` - Get token data using a token's mint address
- `getTokenAddressFromTicker` - Get a token's mint address using its ticker symbol

### Jupiter
- `fetchPrice` - Get the current price of a token in USDC
- `stakeWithJup` - Stake SOL to receive jupSOL
- `trade` - Swap tokens using Jupiter's aggregator
- `getTokenByTicker` - Get token data using a token's ticker symbol

### Light Protocol
- `sendCompressedAirdrop` - Send compressed token airdrops to multiple addresses efficiently

### Solana Core
- `closeEmptyTokenAccounts` - Close empty token accounts to reclaim rent
- `getTPS` - Get current transactions per second on Solana
- `get_balance` - Get SOL or token balance for a wallet
- `get_balance_other` - Get balance for another wallet address
- `get_token_balance` - Get detailed token balances including metadata
- `request_faucet_funds` - Request tokens from a faucet (devnet/testnet)
- `transfer` - Transfer SOL or tokens to another address
- `getWalletAddress` - Get the wallet address of the current user

### Mayan
- `swap` - Cross-chain token swaps using Mayan DEX

### Pumpfun
- `launchPumpFunToken` - Launch new tokens on pump.fun

### Pyth
- `fetchPythPrice` - Get real-time price data from Pyth oracles
- `fetchPythPriceFeedID` - Get price feed ID for a token

### Rugcheck
- `fetchTokenDetailedReport` - Get detailed token security analysis
- `fetchTokenReportSummary` - Get summarized token security report

### Solutiofi
- `burnTokens` - Burn tokens using Solutiofi
- `closeAccounts` - Close token accounts using Solutiofi
- `mergeTokens` - Merge multiple tokens into one
- `spreadToken` - Split tokens across multiple addresses

---

## DeFi Plugin (`@solana-agent-kit/plugin-defi`)

### Adrena (Perpetuals)
- `openPerpTradeLong` - Open a long perpetual trade
- `openPerpTradeShort` - Open a short perpetual trade
- `closePerpTradeLong` - Close a long perpetual trade
- `closePerpTradeShort` - Close a short perpetual trade

### Flash (Trading)
- `flashOpenTrade` - Open a flash trade
- `flashCloseTrade` - Close a flash trade

### Lulo (Lending)
- `lendAsset` - Lend an asset
- `luloLend` - Lend using Lulo
- `luloWithdraw` - Withdraw from Lulo

### Manifest (DEX)
- `limitOrder` - Create a limit order
- `cancelAllOrders` - Cancel all orders
- `withdrawAll` - Withdraw all assets
- `manifestCreateMarket` - Create a market on Manifest

### Debridge (Cross-chain Bridge)
- `checkDebridgeTransactionStatus` - Check the status of a Debridge transaction
- `createDebridgeBridgeOrder` - Create a bridge order
- `executeDebridgeBridgeOrder` - Execute a bridge order
- `getBridgeQuote` - Get a bridge quote
- `getDebridgeSupportedChains` - Get supported chains for Debridge
- `getDebridgeTokensInfo` - Get token information for Debridge

### Drift (Perpetuals & Vaults)
- `driftPerpTrade` - Open a perpetual trade on Drift
- `calculatePerpMarketFundingRate` - Calculate the funding rate for a perpetual market
- `createVault` - Create a vault
- `createDriftUserAccount` - Create a Drift user account
- `depositIntoVault` - Deposit into a vault
- `withdrawFromDriftVault` - Withdraw from a Drift vault
- `stakeToDriftInsuranceFund` - Stake to the Drift insurance fund

### Openbook (DEX)
- `openbookCreateMarket` - Create a market on the Openbook DEX

### Fluxbeam (Liquidity)
- `fluxBeamCreatePool` - Create a pool on FluxBeam

### Orca (AMM)
- `orcaClosePosition` - Close a position on Orca
- `orcaCreateCLMM` - Create a CLMM on Orca
- `orcaOpenCenteredPositionWithLiquidity` - Open a centered position with liquidity on Orca

### Raydium (AMM)
- `raydiumCreateAmmV4` - Create an AMM v4 on Raydium
- `raydiumCreateClmm` - Create a CLMM on Raydium
- `raydiumCreateCpmm` - Create a CPMM on Raydium

### Solayer (Staking)
- `stakeWithSolayer` - Stake SOL with Solayer

### Voltr (Strategies)
- `voltrDepositStrategy` - Deposit into a Voltr strategy
- `voltrGetPositionValues` - Get position values for Voltr

### Sanctum (Liquid Staking)
- `sanctumSwapLST` - Swap LSTs on Sanctum
- `sanctumAddLiquidity` - Add liquidity on Sanctum
- `sanctumRemoveLiquidity` - Remove liquidity on Sanctum
- `sanctumGetLSTAPY` - Get the APY for LSTs on Sanctum
- `sanctumGetLSTPrice` - Get the price of LSTs on Sanctum
- `sanctumGetLSTTVL` - Get the TVL for LSTs on Sanctum
- `sanctumGetOwnedLST` - Get owned LSTs on Sanctum

---

## NFT Plugin (`@solana-agent-kit/plugin-nft`)

### Metaplex (NFT Standard)
- `deployCollection` - Deploy a new NFT collection
- `deployToken` - Deploy a new NFT token
- `getAsset` - Retrieve asset details
- `getAssetsByAuthority` - Get assets by authority
- `getAssetsByCreator` - Get assets by creator
- `mintCollectionNFT` - Mint an NFT in a collection
- `searchAssets` - Search for assets

### Tensor (NFT Marketplace)
- `listNFTForSale` - List an NFT for sale
- `cancelListing` - Cancel an NFT listing

### 3Land (NFT Platform)
- `create3LandCollection` - Create a collection on 3Land
- `create3LandSingle` - Create a single NFT on 3Land

---

## Misc Plugin (`@solana-agent-kit/plugin-misc`)

### AllDomains (Domain Names)
- `getAllDomainsTLDs` - Retrieve all top-level domains
- `getOwnedAllDomains` - Get all domains owned by a specific wallet
- `getOwnedDomainsForTLD` - Get domains owned by a wallet for a specific TLD
- `resolveDomain` - Resolve a domain to get its owner's public key

### Allora (AI/ML)
- `getAllTopics` - Retrieve all topics
- `getInferenceByTopicId` - Get inference data by topic ID
- `getPriceInference` - Get price inference data

### Gibwork (Task Management)
- `createGibworkTask` - Create a new task on Gibwork

### Helius (RPC & Webhooks)
- `createWebhook` - Create a new webhook to monitor transactions
- `deleteWebhook` - Delete an existing webhook
- `getAssetsByOwner` - Get assets owned by a specific wallet
- `getWebhook` - Retrieve webhook details
- `parseTransaction` - Parse a Solana transaction

### SNS (Solana Name Service)
- `resolveSolDomain` - Resolve a .sol domain
- `registerDomain` - Register a new .sol domain
- `getPrimaryDomain` - Get the primary domain for a wallet
- `getMainAllDomainsDomain` - Get the main domain for AllDomains
- `getAllRegisteredAllDomains` - Get all registered domains

### Squads (Multisig)
- `transferFromMultisigTreasury` - Transfer funds from a multisig treasury
- `rejectMultisigProposal` - Reject a multisig proposal
- `executeMultisigProposal` - Execute a multisig proposal
- `depositToMultisigTreasury` - Deposit funds into a multisig treasury
- `createMultisig` - Create a new multisig account
- `createMultisigProposal` - Create a new multisig proposal

### Coingecko (Market Data)
- `getCoingeckoTokenInfo` - Get token information from Coingecko
- `getCoingeckoTopGainers` - Get top gaining tokens
- `getCoingeckoLatestPools` - Get the latest pools
- `getCoingeckoTrendingPools` - Get trending pools
- `getCoingeckoTokenPriceData` - Get token price data
- `getCoingeckoTrendingTokens` - Get trending tokens

### ElfaAi (Social Analytics)
- `getElfaAiApiKeyStatus` - Check the status of an ElfaAi API key
- `getSmartMentions` - Get smart mentions using ElfaAi
- `getSmartTwitterAccountStats` - Get Twitter account stats using ElfaAi
- `getTopMentionsByTicker` - Get top mentions by ticker using ElfaAi
- `getTrendingTokensUsingElfaAi` - Get trending tokens using ElfaAi
- `pingElfaAiApi` - Ping the ElfaAi API
- `searchMentionsByKeywords` - Search mentions by keywords using ElfaAi

### Switchboard (Oracles)
- `simulate_switchboard_feed` - Simulate a switchboard feed

### HomoMemetus (Token Discovery)
- `fetch_oldest_tokens` - Fetch oldest token list in token list created in 24h
- `fetch_recent_tokens` - Fetch recent token list in token list created in 24h
- `fetch_token_by_creator` - Fetch tokens filter with created by a specific creator
- `fetch_token_by_initializer` - Filter tokens initialized by a specific address
- `fetch_token_by_mint` - Filter by a specific token address
- `fetch_token_by_signature` - Filter by a specific transaction signature
- `fetch_tokens_by_creators` - Filter tokens created by a specific creator address list
- `fetch_tokens_by_initializers` - Filter tokens initialized by a specific address list
- `fetch_tokens_by_duration` - Filter token list by creation time
- `fetch_tokens_by_market_cap` - Filter token list by token market cap
- `fetch_tokens_by_metadata` - Filter token list by token metadata
- `fetch_tokens_by_mints` - Filter token list by mint address list

### OtterSec (Program Verification)
- `create_verification_pda` - Generate a PDA for program verification
- `decode_verification_pda_data` - Decode the PDA data composed in hex
- `get_program_build_log` - Get build logs for a solana program
- `get_program_verification_status` - Get program verification status
- `get_verification_job_status` - Get status of an async verification job
- `get_verified_programs` - Get list of all verified programs
- `verify_program` - Verify a Solana program

---

## MCP Adapter (`@solana-agent-kit/adapter-mcp`)

The MCP adapter allows you to expose Solana Agent Kit actions as MCP tools for standardized LLM integration.

### Key Functions
- `startMcpServer(actions, agent, metadata)` - Start an MCP server with selected actions
- `createMcpServer(actions, agent, metadata)` - Create an MCP server instance
- `zodToMCPShape(schema)` - Convert Zod schemas to MCP shape format

### Usage Example

```typescript
import { SolanaAgentKit, KeypairWallet } from "solana-agent-kit";
import { startMcpServer } from '@solana-agent-kit/adapter-mcp';
import TokenPlugin from '@solana-agent-kit/plugin-token';

const wallet = new KeypairWallet(process.env.SOLANA_PRIVATE_KEY);

const agent = new SolanaAgentKit(
  wallet,
  process.env.RPC_URL,
  { OPENAI_API_KEY: process.env.OPENAI_API_KEY }
).use(TokenPlugin);

// Select which actions to expose
const finalActions = {
  BALANCE_ACTION: agent.actions.find((action) => action.name === "BALANCE_ACTION"),
  TOKEN_BALANCE_ACTION: agent.actions.find((action) => action.name === "TOKEN_BALANCE_ACTION"),
  GET_WALLET_ADDRESS_ACTION: agent.actions.find((action) => action.name === "GET_WALLET_ADDRESS_ACTION"),
};

// Start MCP server
startMcpServer(finalActions, agent, { name: "solana-agent", version: "0.0.1" });
```

---

## Implementation Notes for Ordo

### Plugin Selection Strategy

For Ordo, we should use a selective plugin approach to reduce LLM context and hallucinations:

1. **Core Plugins (Always Loaded)**:
   - TokenPlugin - Essential for wallet operations
   - MiscPlugin - Needed for domain resolution, webhooks

2. **Context-Dependent Plugins**:
   - DefiPlugin - Load when user queries involve DeFi operations
   - NFTPlugin - Load when user queries involve NFT operations

3. **MCP Server Architecture**:
   - Create separate MCP servers for each plugin category
   - Use MCP interceptors for permission checking and audit logging
   - Expose only relevant actions per server

### Security Considerations

1. **Never expose private keys** - Always use wallet adapters
2. **User confirmation required** for all write operations
3. **Policy filtering** before returning data to user
4. **Audit logging** for all tool executions

### Example Tool Usage in Ordo

```typescript
// In MCP server (defi.py)
@defi_mcp.tool()
async def swap_tokens_jupiter(
    input_mint: str,
    output_mint: str,
    amount: float,
    slippage_bps: int = 50,
    token: str,
    user_id: str
) -> dict:
    """Swap tokens using Jupiter aggregator"""
    # Use Solana Agent Kit's trade action
    result = await agent.methods.trade(
        agent,
        output_mint,
        amount,
        input_mint,
        slippage_bps
    )
    
    # Apply policy filtering
    filtered_result = await policy_engine.filter_defi_result(result)
    
    # Audit log
    await audit_logger.log_access(
        user_id=user_id,
        surface="DEFI",
        action="swap_tokens_jupiter",
        success=True,
        details={"input": input_mint, "output": output_mint, "amount": amount}
    )
    
    return filtered_result
```

---

## Additional Tools from Plugin God Mode

Plugin God Mode provides additional specialized tools that complement Solana Agent Kit v2:

### Jupiter Advanced Features
- `createDCA` - Create Dollar Cost Averaging orders
- `cancelDCA` - Cancel DCA orders
- `getDCAOrders` - Get active DCA orders
- `createLO` - Create Limit Orders
- `cancelLO` - Cancel Limit Orders
- `getLOs` - Get active Limit Orders
- `buy` - Simplified buy action
- `sell` - Simplified sell action

### Kamino (Lending)
- `getKaminoSupplyApy` - Get supply APY for Kamino lending

### Meteora (Token Launch)
- `launchMeteoraToken` - Launch tokens on Meteora
- `claimMeteoraCreatorFee` - Claim creator fees from Meteora

### Crossmint (NFT Checkout)
- `checkout` - Create NFT checkout session
- `confirmOrder` - Confirm NFT purchase order

### Polymarket (Prediction Markets)
- `listMarkets` - List available prediction markets
- `getTrades` - Get trade history
- `placeOrder` - Place prediction market order
- `getOrderBook` - Get market order book

### Wallet Enhancements
- `getPortfolio` - Get complete portfolio overview
- `getSolBalance` - Get SOL balance
- `getSolPrice` - Get current SOL price
- `getTokenBalance` - Get specific token balance
- `getWalletAddress` - Get wallet address
- `getEvmAddress` - Get EVM-compatible address
- `transferSPL` - Transfer SPL tokens
- `transfer` - Transfer SOL
- `getTransactionHistory` - Get transaction history
- `onramp` - Fiat on-ramp integration

### Birdeye (Market Data)
- `getToken` - Get token data from Birdeye
- `getTrendingTokens` - Get trending tokens

### Sanctum (Liquid Staking)
- `sanctumGetLSTAPY` - Get LST APY
- `getTopLST` - Get top liquid staking tokens

### Lulo (Lending)
- `luloLend` - Lend assets on Lulo
- `initiateLuloWithdraw` - Withdraw from Lulo
- `getLuloBalance` - Get Lulo balance
- `luloGetApy` - Get Lulo APY

### Rugcheck (Security)
- `rugcheck` - Check token for rug pull risks

### Debridge (Cross-chain)
- `bridge` - Bridge assets cross-chain

---

## Recommended Plugin Combination for Ordo

For optimal functionality, Ordo should use both Solana Agent Kit v2 plugins AND Plugin God Mode:

```typescript
import { SolanaAgentKit } from "solana-agent-kit";
import TokenPlugin from "@solana-agent-kit/plugin-token";
import NFTPlugin from "@solana-agent-kit/plugin-nft";
import DefiPlugin from "@solana-agent-kit/plugin-defi";
import MiscPlugin from "@solana-agent-kit/plugin-misc";
import GodModePlugin from "plugin-god-mode";

const agent = new SolanaAgentKit(wallet, rpcUrl, config)
  .use(TokenPlugin)      // Core token operations
  .use(NFTPlugin)        // NFT operations
  .use(DefiPlugin)       // DeFi protocols
  .use(MiscPlugin)       // Utilities
  .use(GodModePlugin);   // Advanced features (DCA, LO, Polymarket, etc.)
```

### Key Advantages of Plugin God Mode:

1. **Advanced Trading**: DCA and Limit Orders on Jupiter
2. **Prediction Markets**: Polymarket integration
3. **Token Launch**: Meteora token launch platform
4. **NFT Commerce**: Crossmint checkout integration
5. **Enhanced Wallet**: Portfolio overview and transaction history
6. **Fiat On-ramp**: Direct fiat-to-crypto conversion

---

## References

- [Solana Agent Kit Documentation](https://docs.sendai.fun)
- [GitHub Repository](https://github.com/sendaifun/solana-agent-kit)
- [MCP Specification](https://modelcontextprotocol.io)
