# Ordo App - Implementation Plan

## ✅ COMPLETED

### Core Infrastructure
- [x] Authentication (login/register)
- [x] Token persistence
- [x] Smart command routing (directApi, localPanel, aiAgent)
- [x] Suggestions overlay (above keyboard)
- [x] Command index service
- [x] API client with auth
- [x] Assistant controller with state management

### UI Components
- [x] Command input with voice
- [x] Status strip
- [x] Suggestions panel (with overlay)
- [x] Portfolio panel (basic)
- [x] Swap panel (basic)
- [x] Approval panel
- [x] Thinking panel
- [x] Error panel
- [x] Result panel

## 🚧 IN PROGRESS - Priority Panels

### High Priority (Core Features)
1. **Token Risk Analysis Panel** - Show risk score, liquidity, holders
2. **Transaction History Panel** - List of past transactions
3. **NFT Gallery Panel** - Grid view of NFTs
4. **Settings/Preferences Panel** - User settings
5. **Price Chart Panel** - Token price chart

### Medium Priority (DeFi Features)
6. **Staking Interface** - Stake/unstake SOL
7. **Lending Interface** - Lend assets
8. **Borrowing Interface** - Borrow assets
9. **Add Liquidity Panel** - Add to pools
10. **Remove Liquidity Panel** - Remove from pools
11. **Bridge Interface** - Cross-chain bridge

### Low Priority (Advanced)
12. **Command History** - Past commands
13. **Wallet Management** - Multiple wallets
14. **NFT Minting** - Create NFTs
15. **Send Confirmation** - Transfer confirmation

## 📋 Smart Suggestions Logic

### Context-Aware Suggestions
```
User State → Suggested Commands

1. Idle (no wallet) → 
   - Create wallet
   - Import wallet
   - Continue as guest

2. Idle (has wallet, no balance) →
   - Check balance
   - Receive SOL
   - Buy SOL

3. Idle (has balance) →
   - Check balance
   - Swap tokens
   - Send SOL
   - Stake SOL

4. After checking balance →
   - Swap tokens
   - Send SOL
   - Stake SOL
   - View NFTs

5. After swap →
   - Check balance
   - Swap again
   - View transaction

6. After error →
   - Retry command
   - Check balance
   - Help

7. Typing "swap" →
   - swap 1 sol to usdc
   - swap 0.5 sol to bonk
   - get swap quote

8. Typing "send" →
   - send 0.1 sol to [address]
   - send token
   - check balance first

9. Typing "stake" →
   - stake 1 sol
   - unstake sol
   - check staking rewards

10. Typing "nft" →
    - show my nfts
    - mint nft
    - send nft
```

## 🎨 UI Implementation Order

### Phase 1: Essential Panels (This Sprint)
1. Token Risk Analysis Panel
2. Transaction History Panel
3. Settings Panel
4. Price Chart Panel (basic)

### Phase 2: DeFi Panels
5. Staking Interface
6. Lending Interface
7. NFT Gallery

### Phase 3: Advanced Features
8. Bridge Interface
9. Liquidity Management
10. Advanced Analytics

## 📝 Notes

- All panels should follow the same design pattern:
  - Header with icon + title + close button
  - Content area (scrollable if needed)
  - Action buttons at bottom
  - Consistent spacing and colors from AppTheme

- Smart suggestions should:
  - Update based on user context
  - Show most relevant commands first
  - Include keyboard shortcuts
  - Be searchable/filterable

- Error handling:
  - Show clear error messages
  - Provide retry option
  - Suggest alternative actions
  - Log errors for debugging
