# Task 2.1.2: MWA Transaction Signing Flow Testing Guide

## Overview

This document provides comprehensive guidance for testing the MWA (Mobile Wallet Adapter) transaction signing flow in the SeedVaultAdapter. It covers both automated testing (completed) and manual device testing (required for full validation).

## Automated Integration Tests

### Test Coverage

The integration test suite (`__tests__/SeedVaultAdapter.integration.test.ts`) validates:

✅ **Authorization Flow Integration**
- Full authorization with mainnet-beta cluster
- Authorization with devnet and testnet clusters
- Invalid cluster rejection
- Authorization result structure validation

✅ **SOL Transfer Transaction Signing**
- Realistic SOL transfer transactions
- Transactions with custom memo instructions
- User rejection handling
- Network error handling

✅ **Batch Transaction Signing**
- Multiple SOL transfer transactions
- Mixed transaction types (transfer + memo)
- Empty array rejection
- User rejection of batch operations

✅ **Error Handling and Edge Cases**
- Wallet returning no accounts
- Malformed authorization responses
- Timeout during signing
- Unknown error types

✅ **Private Key Isolation Verification**
- No private key method access
- MWA transact pattern enforcement
- No private key data in responses

✅ **Cache Management Integration**
- Authorization data caching
- Cache clearing and re-authorization

✅ **Real-World Transaction Scenarios**
- Transactions with priority fees (compute budget)
- Large batch stress test (10 transactions)

### Running Automated Tests

```bash
# Run all tests
npm test

# Run only integration tests
npm test SeedVaultAdapter.integration.test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```

### Test Results

All integration tests use mocked MWA since actual device testing requires physical Solana Seeker hardware. The tests validate:

1. **Correct API usage**: All MWA calls follow the documented patterns
2. **Error handling**: All error scenarios are handled gracefully
3. **Data structures**: All responses match expected interfaces
4. **Security**: No private key access in any code path

## Device Testing Requirements

### Prerequisites

To test on actual device, you need:

1. **Hardware**:
   - Solana Seeker device (or Android device with Solana Mobile Stack)
   - USB cable for debugging
   - Computer with Android SDK

2. **Software**:
   - Seed Vault app installed on device
   - Wallet app that supports MWA (Phantom, Solflare, etc.)
   - Android Debug Bridge (adb)
   - Expo CLI

3. **Setup**:
   - Device in developer mode
   - USB debugging enabled
   - Wallet configured with test account

### Device Testing Procedure

#### 1. Build and Deploy to Device

```bash
# Connect device via USB
adb devices

# Build and run on device
npm run android

# Or use Expo development build
npx expo run:android --device
```

#### 2. Test Authorization Flow

**Test Case 2.1.2.1: Authorize with mainnet-beta**

1. Open Ordo app on device
2. Navigate to wallet permission screen
3. Tap "Connect Wallet"
4. Expected: Seed Vault biometric prompt appears
5. Authenticate with fingerprint/face
6. Expected: Wallet selection screen appears
7. Select wallet account
8. Expected: Authorization success, wallet address displayed
9. Verify: Address matches wallet app

**Test Case 2.1.2.2: Authorize with devnet**

1. Change cluster to devnet in settings
2. Tap "Connect Wallet"
3. Expected: Seed Vault prompt with devnet cluster
4. Authenticate and select account
5. Expected: Authorization success
6. Verify: Cluster indicator shows "devnet"

**Test Case 2.1.2.3: User rejection**

1. Tap "Connect Wallet"
2. When Seed Vault prompt appears, tap "Cancel"
3. Expected: Error message "Authorization cancelled by user"
4. Verify: No wallet address cached

#### 3. Test Transaction Signing

**Test Case 2.1.2.4: Sign SOL transfer**

1. Ensure wallet is authorized
2. Navigate to send screen
3. Enter recipient address: `DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK`
4. Enter amount: 0.01 SOL
5. Tap "Send"
6. Expected: Transaction preview dialog appears
7. Verify: Recipient, amount, fee displayed correctly
8. Tap "Confirm"
9. Expected: Seed Vault signing prompt appears
10. Authenticate with biometric
11. Expected: Transaction signed and submitted
12. Verify: Transaction signature returned
13. Check: Transaction appears in wallet history

**Test Case 2.1.2.5: Sign transaction with memo**

1. Navigate to send screen
2. Enter recipient and amount
3. Enter memo: "Test payment from Ordo"
4. Tap "Send"
5. Expected: Preview shows memo
6. Confirm and sign
7. Expected: Transaction includes memo instruction
8. Verify: Memo visible in explorer

**Test Case 2.1.2.6: User rejects transaction**

1. Initiate SOL transfer
2. When Seed Vault signing prompt appears, tap "Cancel"
3. Expected: Error message "Transaction signing cancelled by user"
4. Verify: Transaction not submitted
5. Verify: Wallet balance unchanged

#### 4. Test Batch Signing

**Test Case 2.1.2.7: Sign multiple transactions**

1. Navigate to batch send screen
2. Add 3 recipients with different amounts
3. Tap "Send All"
4. Expected: Batch preview shows all transactions
5. Confirm batch
6. Expected: Seed Vault prompt for batch signing
7. Authenticate
8. Expected: All transactions signed
9. Verify: All signatures returned
10. Check: All transactions in wallet history

**Test Case 2.1.2.8: Reject batch**

1. Initiate batch send
2. When Seed Vault prompt appears, tap "Cancel"
3. Expected: Error message "Transaction signing cancelled by user"
4. Verify: No transactions submitted

#### 5. Test Error Scenarios

**Test Case 2.1.2.9: Network timeout**

1. Enable airplane mode on device
2. Attempt to sign transaction
3. Expected: Error message about network failure
4. Disable airplane mode
5. Retry transaction
6. Expected: Success

**Test Case 2.1.2.10: Insufficient balance**

1. Attempt to send more SOL than available
2. Expected: Error before reaching Seed Vault
3. Verify: Clear error message about insufficient funds

#### 6. Verify Private Key Isolation

**Test Case 2.1.2.11: No private key access**

1. Review all code paths in SeedVaultAdapter
2. Verify: No calls to getPrivateKey()
3. Verify: No calls to exportPrivateKey()
4. Verify: Only signTransactions() used for signing
5. Verify: No private key data in logs
6. Check: No private key data in memory dumps

**Test Case 2.1.2.12: MWA transact pattern**

1. Review all wallet operations
2. Verify: All operations use transact() wrapper
3. Verify: Authorization happens within transact()
4. Verify: Signing happens within transact()
5. Verify: No direct wallet API calls outside transact()

### Device Testing Checklist

- [ ] Test Case 2.1.2.1: Authorize with mainnet-beta
- [ ] Test Case 2.1.2.2: Authorize with devnet
- [ ] Test Case 2.1.2.3: User rejection of authorization
- [ ] Test Case 2.1.2.4: Sign SOL transfer
- [ ] Test Case 2.1.2.5: Sign transaction with memo
- [ ] Test Case 2.1.2.6: User rejects transaction
- [ ] Test Case 2.1.2.7: Sign multiple transactions
- [ ] Test Case 2.1.2.8: Reject batch signing
- [ ] Test Case 2.1.2.9: Network timeout handling
- [ ] Test Case 2.1.2.10: Insufficient balance error
- [ ] Test Case 2.1.2.11: No private key access verification
- [ ] Test Case 2.1.2.12: MWA transact pattern verification

## Testing Best Practices

### 1. Use Test Accounts

- Never use real funds for testing
- Use devnet/testnet for most tests
- Keep test account balances low
- Use faucets to get test SOL

### 2. Test on Multiple Devices

- Test on Solana Seeker (primary target)
- Test on other Android devices with SMS
- Test with different wallet apps
- Test with different Android versions

### 3. Monitor Logs

```bash
# View device logs
adb logcat | grep -i "SeedVaultAdapter"

# View Expo logs
npx expo start --android

# View wallet app logs
adb logcat | grep -i "wallet"
```

### 4. Verify Transactions

- Check transaction signatures in logs
- Verify transactions on Solana Explorer
- Confirm balances in wallet app
- Check transaction history

### 5. Security Verification

- Review code for private key access
- Check logs for sensitive data
- Verify biometric authentication required
- Confirm Seed Vault isolation

## Common Issues and Solutions

### Issue 1: MWA Not Available

**Symptoms**: `isAvailable()` returns false

**Solutions**:
- Verify Solana Mobile Stack installed
- Check device is Android
- Ensure Seed Vault app installed
- Update to latest SMS version

### Issue 2: Authorization Fails

**Symptoms**: Authorization throws error

**Solutions**:
- Check wallet app is installed
- Verify wallet is configured
- Ensure device has internet connection
- Try different wallet app

### Issue 3: Transaction Signing Timeout

**Symptoms**: Signing takes too long and times out

**Solutions**:
- Check network connection
- Verify RPC endpoint is responsive
- Reduce transaction complexity
- Increase timeout value

### Issue 4: User Rejection Not Handled

**Symptoms**: App crashes when user cancels

**Solutions**:
- Verify error handling in catch blocks
- Check for "User declined" error message
- Ensure UI shows cancellation message
- Test with different wallet apps

## Performance Benchmarks

Expected performance on Solana Seeker:

- **Authorization**: < 3 seconds (including biometric)
- **Single transaction signing**: < 2 seconds
- **Batch signing (5 txs)**: < 5 seconds
- **Cache hit (getAddress)**: < 10ms

If performance is slower, investigate:
- Network latency
- RPC endpoint performance
- Device performance
- Wallet app responsiveness

## Security Checklist

- [ ] No private key access in any code path
- [ ] All signing via MWA transact pattern
- [ ] Biometric authentication required
- [ ] No private key data in logs
- [ ] No private key data in error messages
- [ ] Seed Vault isolation maintained
- [ ] Authorization tokens stored securely
- [ ] Cache cleared on permission revocation

## Next Steps

After completing device testing:

1. **Document Results**: Record all test case results
2. **Report Issues**: File bugs for any failures
3. **Update Code**: Fix any issues found
4. **Retest**: Verify fixes on device
5. **Proceed to Task 2.1.3**: Write property-based tests for wallet security

## Resources

- [Solana Mobile Stack Documentation](https://docs.solanamobile.com/)
- [Mobile Wallet Adapter Specification](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html)
- [Seed Vault Documentation](https://docs.solanamobile.com/android-native/seed_vault)
- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)

## Conclusion

This testing guide provides comprehensive coverage of the MWA transaction signing flow. The automated integration tests validate the implementation logic, while device testing ensures real-world functionality. Both are essential for production readiness.

**Status**: Automated tests complete ✅ | Device testing pending ⏳
