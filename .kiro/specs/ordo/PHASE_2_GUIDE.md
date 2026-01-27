# Phase 2 Guide: Wallet Integration

**Status**: Ready to Start  
**Duration**: Week 3  
**Prerequisites**: Phase 1 Complete ✅

---

## Overview

Phase 2 focuses on integrating Solana wallet functionality using the Solana Mobile Stack (MWA + Seed Vault) and Helius RPC. The key principle is **zero private key access** - all transaction signing happens through Seed Vault with biometric authentication.

---

## Goals

1. Implement secure wallet integration via MWA and Seed Vault
2. Integrate Helius RPC for portfolio and transaction data
3. Build wallet UI components for portfolio display and transaction confirmation
4. Ensure all wallet operations maintain private key isolation

---

## Tasks Breakdown

### 2.1 Seed Vault and MWA Integration (3 tasks)

#### 2.1.1 Implement SeedVaultAdapter ✨ START HERE
**File**: `ordo/services/SeedVaultAdapter.ts`

**Interface** (from design doc):
```typescript
interface SeedVaultAdapter {
  isAvailable(): Promise<boolean>;
  authorize(): Promise<AuthResult>;
  getAddress(): Promise<string>;
  signTransaction(transaction: Transaction): Promise<SignedTransaction>;
  signTransactions(transactions: Transaction[]): Promise<SignedTransaction[]>;
}
```

**Key Requirements**:
- Use `@solana-mobile/mobile-wallet-adapter-protocol`
- Implement MWA authorize flow for wallet address
- Implement transact pattern for transaction signing
- Never access or store private keys
- Handle user rejection gracefully

**Resources**:
- `resources/solana-mobile-llms.txt` - MWA documentation
- `resources/solana-llms.txt` - Solana transaction structure
- Existing package: `@solana-mobile/mobile-wallet-adapter-protocol` (already installed)

**Testing**:
- Unit tests for each method
- Mock MWA responses for testing
- Test error handling (user rejection, timeout)

---

#### 2.1.2 Test MWA transaction signing flow
**Goal**: Validate MWA integration on actual device

**Test Cases**:
- Authorize with mainnet-beta cluster
- Sign SOL transfer transaction
- Sign multiple transactions (batch)
- Handle user rejection
- Verify no private key access in any code path

**Device**: Test on Solana Seeker or Android emulator with MWA

---

#### 2.1.3 Write property-based tests for wallet security
**File**: `ordo/__tests__/SeedVaultAdapter.properties.test.ts`

**Property 12**: Private key isolation (Requirements 5.1, 5.6)
- Verify no code paths access private keys
- Verify all wallet operations use Seed Vault
- Use fast-check with 100+ iterations

---

### 2.2 Helius RPC Integration (5 tasks)

#### 2.2.1 Implement wallet_tools.py with Helius DAS API
**File**: `ordo-backend/ordo_backend/tools/wallet_tools.py`

**Functions**:
```python
async def get_wallet_portfolio(address: str) -> PortfolioResult
async def get_token_balances(address: str) -> List[TokenBalance]
```

**Helius APIs**:
- DAS API: `getAssetsByOwner` for tokens and NFTs
- Parse fungible tokens and NFTs from response
- Handle pagination for large portfolios

**Resources**:
- `resources/helius-llms.txt` - Helius API documentation
- Environment variable: `HELIUS_API_KEY`

**Testing**:
- Unit tests with mocked Helius responses
- Test pagination handling
- Test error handling (API failures, rate limits)

---

#### 2.2.2 Implement transaction history with Enhanced Transactions
**File**: `ordo-backend/ordo_backend/tools/wallet_tools.py`

**Function**:
```python
async def get_transaction_history(address: str, limit: int = 10) -> List[Transaction]
```

**Helius API**: Enhanced Transactions v0 API
- Parse transaction types (TRANSFER, SWAP, NFT_SALE)
- Extract native transfers and token transfers
- Format transaction descriptions

**Testing**:
- Unit tests with sample transaction data
- Test various transaction types

---

#### 2.2.3 Implement priority fee estimation
**File**: `ordo-backend/ordo_backend/tools/wallet_tools.py`

**Function**:
```python
async def get_priority_fee_estimate(accounts: List[str]) -> PriorityFeeEstimate
```

**Helius API**: Priority Fee API
- Return fee levels: min, low, medium, high, veryHigh, unsafeMax
- Account key filtering for accurate estimates

**Testing**:
- Unit tests for fee estimation
- Test with various account combinations

---

#### 2.2.4 Implement transaction building
**File**: `ordo-backend/ordo_backend/tools/wallet_tools.py`

**Functions**:
```python
async def build_transfer_transaction(
    from_address: str,
    to_address: str,
    amount_lamports: int
) -> SerializedTransaction

async def build_token_transfer_transaction(
    from_address: str,
    to_address: str,
    token_mint: str,
    amount: int
) -> SerializedTransaction
```

**Requirements**:
- Build valid Solana transactions
- Add recent blockhash
- Serialize for frontend signing
- Support SOL and SPL token transfers

**Testing**:
- Unit tests for transaction construction
- Verify transaction validity

---

#### 2.2.5 Write property-based tests for wallet operations
**File**: `ordo-backend/tests/test_wallet_tools_properties.py`

**Properties**:
- **Property 17**: Result structure completeness (Requirements 5.3)
- **Property 20**: Valid transaction construction (Requirements 5.4)

Use Hypothesis with 100+ iterations

---

### 2.3 Wallet UI Components (2 tasks)

#### 2.3.1 Create wallet portfolio display
**File**: `ordo/components/wallet/PortfolioScreen.tsx`

**Features**:
- Display tokens with balances and USD values
- Display NFT collection with images
- Total portfolio value calculation
- Refresh functionality

**Design**:
- Use FlatList for performance
- Show loading states
- Handle empty portfolio
- Pull-to-refresh

**Testing**:
- Unit tests for portfolio rendering
- Test with various portfolio sizes

---

#### 2.3.2 Create transaction confirmation dialog
**File**: `ordo/components/wallet/TransactionPreviewDialog.tsx`

**Features**:
- Display recipient, amount, token, and fee
- Priority fee selector (low, medium, high)
- Confirm/cancel actions
- Loading state during signing

**Design**:
- Clear transaction details
- Prominent fee display
- Biometric prompt integration
- Error handling

**Testing**:
- Unit tests for confirmation flow
- Test user cancellation
- Test signing errors

---

## Key Resources

### Documentation
- `resources/solana-mobile-llms.txt` - MWA and Seed Vault
- `resources/helius-llms.txt` - Helius RPC and APIs
- `resources/solana-llms.txt` - Solana blockchain
- `.kiro/specs/ordo/requirements.md` - Requirements 5.1-5.6
- `.kiro/specs/ordo/design.md` - Wallet integration design

### Existing Code
- `ordo/services/PermissionManager.ts` - Permission management pattern
- `ordo/__tests__/PermissionManager.properties.test.ts` - Property testing pattern
- `ordo-backend/ordo_backend/auth.py` - Authentication pattern

### Dependencies (Already Installed)
- Frontend: `@solana-mobile/mobile-wallet-adapter-protocol`, `@solana/web3.js`
- Backend: `solana`, `httpx` (for Helius API calls)

---

## Testing Strategy

### Unit Tests
- Test each method independently
- Mock external dependencies (MWA, Helius API)
- Test error paths and edge cases

### Property-Based Tests
- Validate universal properties (private key isolation, transaction validity)
- Use fast-check (frontend) and Hypothesis (backend)
- 100+ iterations per property

### Integration Tests
- Test on actual Solana Seeker device
- Test with real Helius API (devnet)
- Verify end-to-end flows

---

## Success Criteria

### Functional
- ✅ Wallet address retrieval via MWA
- ✅ Transaction signing via Seed Vault
- ✅ Portfolio display with tokens and NFTs
- ✅ Transaction confirmation with fee selection
- ✅ No private key access in any code path

### Testing
- ✅ All unit tests passing
- ✅ Property-based tests passing (100+ iterations)
- ✅ Integration tests on device passing

### Code Quality
- ✅ TypeScript strict mode compliance
- ✅ Python type hints with Pydantic
- ✅ Comprehensive error handling
- ✅ Documentation for all public APIs

---

## Common Pitfalls to Avoid

1. **Private Key Access**: Never request, store, or transmit private keys
2. **MWA Session Management**: Properly handle MWA session lifecycle
3. **Transaction Serialization**: Ensure transactions are properly serialized for signing
4. **Fee Estimation**: Always show fees before user confirmation
5. **Error Messages**: Provide clear, user-friendly error messages
6. **Rate Limiting**: Handle Helius API rate limits gracefully

---

## Development Workflow

### Step 1: Implement SeedVaultAdapter (Task 2.1.1)
1. Create `ordo/services/SeedVaultAdapter.ts`
2. Implement interface methods
3. Write unit tests
4. Test on device

### Step 2: Implement Helius Integration (Tasks 2.2.1-2.2.4)
1. Create `ordo-backend/ordo_backend/tools/wallet_tools.py`
2. Implement portfolio, history, fees, and transaction building
3. Write unit tests with mocked responses
4. Test with real Helius API (devnet)

### Step 3: Build UI Components (Tasks 2.3.1-2.3.2)
1. Create portfolio screen
2. Create transaction confirmation dialog
3. Integrate with SeedVaultAdapter
4. Test user flows

### Step 4: Property-Based Tests (Tasks 2.1.3, 2.2.5)
1. Write property tests for wallet security
2. Write property tests for wallet operations
3. Run with 100+ iterations
4. Fix any discovered issues

---

## Timeline Estimate

- **Day 1-2**: SeedVaultAdapter implementation and testing
- **Day 3-4**: Helius RPC integration (portfolio, history, fees)
- **Day 5**: Transaction building and property tests
- **Day 6-7**: UI components and integration testing

**Total**: 7 days (Week 3)

---

## Questions to Resolve

1. Which Solana cluster to use? (devnet for testing, mainnet-beta for production)
2. Helius API rate limits? (Check plan and implement caching if needed)
3. NFT image loading strategy? (CDN, lazy loading, caching)
4. Portfolio refresh frequency? (Manual refresh or auto-refresh?)

---

## Next Phase Preview

**Phase 3: Gmail Integration** will build on the permission system from Phase 1 and follow similar patterns for OAuth and API integration.

---

**Document Version**: 1.0  
**Last Updated**: January 28, 2026  
**Status**: Ready for Development
