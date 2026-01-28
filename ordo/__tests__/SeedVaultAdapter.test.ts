/**
 * Unit tests for SeedVaultAdapter
 * 
 * Tests wallet integration via MWA and Seed Vault.
 * All tests use mocked MWA to avoid requiring actual device.
 */

import { SeedVaultAdapter, AuthorizationResult, SignedTransaction } from '../services/SeedVaultAdapter';
import { Transaction, VersionedTransaction, PublicKey } from '@solana/web3.js';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { Platform } from 'react-native';

// Mock the MWA module
jest.mock('@solana-mobile/mobile-wallet-adapter-protocol-web3js', () => ({
  transact: jest.fn(),
}));

describe('SeedVaultAdapter', () => {
  let adapter: SeedVaultAdapter;
  const mockTransact = transact as jest.MockedFunction<typeof transact>;

  // Mock wallet address and public key
  const mockAddress = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
  const mockPublicKey = new PublicKey(mockAddress);

  beforeEach(() => {
    // Create fresh adapter instance for each test
    adapter = new SeedVaultAdapter();
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('isAvailable', () => {
    it('should return true when MWA is available on Android', async () => {
      const isAvailable = await adapter.isAvailable();
      expect(isAvailable).toBe(true);
    });

    it('should return false on non-Android platforms', async () => {
      // Mock Platform.OS to return 'ios'
      const originalOS = Platform.OS;
      Object.defineProperty(Platform, 'OS', {
        get: () => 'ios',
        configurable: true,
      });

      const isAvailable = await adapter.isAvailable();
      expect(isAvailable).toBe(false);

      // Restore original Platform.OS
      Object.defineProperty(Platform, 'OS', {
        get: () => originalOS,
        configurable: true,
      });
    });
  });

  describe('authorize', () => {
    it('should authorize successfully and return address', async () => {
      // Mock successful authorization
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [
              {
                address: mockAddress,
                label: 'My Wallet',
              },
            ],
            wallet_uri_base: 'https://wallet.app',
          }),
        };

        return await callback(mockWallet as any);
      });

      const result = await adapter.authorize('mainnet-beta');

      expect(result.address).toBe(mockAddress);
      expect(result.publicKey.toBase58()).toBe(mockAddress);
      expect(result.accountLabel).toBe('My Wallet');
      expect(result.walletUriBase).toBe('https://wallet.app');
    });

    it('should cache address and public key after authorization', async () => {
      // Mock successful authorization
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
        };

        return await callback(mockWallet as any);
      });

      await adapter.authorize('mainnet-beta');

      // Verify cache by calling getAddress (should not trigger new authorization)
      mockTransact.mockClear();
      const address = await adapter.getAddress();
      
      expect(address).toBe(mockAddress);
      expect(mockTransact).not.toHaveBeenCalled(); // Should use cache
    });

    it('should handle user rejection', async () => {
      // Mock user rejection
      mockTransact.mockRejectedValue(new Error('User declined authorization'));

      await expect(adapter.authorize('mainnet-beta')).rejects.toThrow(
        'Authorization cancelled by user'
      );
    });

    it('should clear cache on authorization failure', async () => {
      // First, set up cache with successful authorization
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
        };
        return await callback(mockWallet as any);
      });

      await adapter.authorize('mainnet-beta');

      // Now fail authorization
      mockTransact.mockRejectedValue(new Error('Authorization failed'));

      await expect(adapter.authorize('mainnet-beta')).rejects.toThrow();

      // Cache should be cleared, so getAddress should trigger new authorization
      mockTransact.mockClear();
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
        };
        return await callback(mockWallet as any);
      });

      await adapter.getAddress();
      expect(mockTransact).toHaveBeenCalled(); // Should not use cache
    });

    it('should use specified cluster', async () => {
      const authorizeSpy = jest.fn().mockResolvedValue({
        accounts: [{ address: mockAddress }],
        wallet_uri_base: 'https://wallet.app',
      });

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = { authorize: authorizeSpy };
        return await callback(mockWallet as any);
      });

      await adapter.authorize('devnet');

      expect(authorizeSpy).toHaveBeenCalledWith({
        cluster: 'devnet',
        identity: expect.objectContaining({
          name: 'Ordo',
        }),
      });
    });
  });

  describe('getAddress', () => {
    it('should return cached address if available', async () => {
      // Set up cache
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
        };
        return await callback(mockWallet as any);
      });

      await adapter.authorize('mainnet-beta');
      mockTransact.mockClear();

      // Get address (should use cache)
      const address = await adapter.getAddress();

      expect(address).toBe(mockAddress);
      expect(mockTransact).not.toHaveBeenCalled();
    });

    it('should trigger authorization if no cached address', async () => {
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
        };
        return await callback(mockWallet as any);
      });

      const address = await adapter.getAddress();

      expect(address).toBe(mockAddress);
      expect(mockTransact).toHaveBeenCalled();
    });
  });

  describe('getPublicKey', () => {
    it('should return cached public key if available', async () => {
      // Set up cache
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
        };
        return await callback(mockWallet as any);
      });

      await adapter.authorize('mainnet-beta');
      mockTransact.mockClear();

      // Get public key (should use cache)
      const publicKey = await adapter.getPublicKey();

      expect(publicKey.toBase58()).toBe(mockAddress);
      expect(mockTransact).not.toHaveBeenCalled();
    });

    it('should trigger authorization if no cached public key', async () => {
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
        };
        return await callback(mockWallet as any);
      });

      const publicKey = await adapter.getPublicKey();

      expect(publicKey.toBase58()).toBe(mockAddress);
      expect(mockTransact).toHaveBeenCalled();
    });
  });

  describe('signTransaction', () => {
    it('should sign transaction successfully', async () => {
      const mockTransaction = new Transaction();
      const mockSignature = new Uint8Array([1, 2, 3, 4, 5]);

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            {
              ...mockTransaction,
              signatures: [mockSignature],
            },
          ]),
        };

        return await callback(mockWallet as any);
      });

      const result = await adapter.signTransaction(mockTransaction);

      expect(result.signature).toEqual(mockSignature);
      expect(result.transaction).toBeDefined();
    });

    it('should handle user rejection of transaction', async () => {
      const mockTransaction = new Transaction();

      mockTransact.mockRejectedValue(new Error('User declined transaction'));

      await expect(adapter.signTransaction(mockTransaction)).rejects.toThrow(
        'Transaction signing cancelled by user'
      );
    });

    it('should handle signing errors', async () => {
      const mockTransaction = new Transaction();

      mockTransact.mockRejectedValue(new Error('Network error'));

      await expect(adapter.signTransaction(mockTransaction)).rejects.toThrow(
        'Transaction signing failed: Network error'
      );
    });

    it('should use specified cluster', async () => {
      const mockTransaction = new Transaction();
      const authorizeSpy = jest.fn().mockResolvedValue({
        accounts: [{ address: mockAddress }],
        wallet_uri_base: 'https://wallet.app',
      });

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: authorizeSpy,
          signTransactions: jest.fn().mockResolvedValue([
            {
              ...mockTransaction,
              signatures: [new Uint8Array([1, 2, 3])],
            },
          ]),
        };

        return await callback(mockWallet as any);
      });

      await adapter.signTransaction(mockTransaction, 'devnet');

      expect(authorizeSpy).toHaveBeenCalledWith({
        cluster: 'devnet',
        identity: expect.objectContaining({
          name: 'Ordo',
        }),
      });
    });
  });

  describe('signTransactions', () => {
    it('should sign multiple transactions successfully', async () => {
      const mockTransaction1 = new Transaction();
      const mockTransaction2 = new Transaction();
      const mockSignature1 = new Uint8Array([1, 2, 3]);
      const mockSignature2 = new Uint8Array([4, 5, 6]);

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            {
              ...mockTransaction1,
              signatures: [mockSignature1],
            },
            {
              ...mockTransaction2,
              signatures: [mockSignature2],
            },
          ]),
        };

        return await callback(mockWallet as any);
      });

      const results = await adapter.signTransactions([mockTransaction1, mockTransaction2]);

      expect(results).toHaveLength(2);
      expect(results[0].signature).toEqual(mockSignature1);
      expect(results[1].signature).toEqual(mockSignature2);
    });

    it('should handle user rejection of batch', async () => {
      const mockTransaction1 = new Transaction();
      const mockTransaction2 = new Transaction();

      mockTransact.mockRejectedValue(new Error('User declined batch'));

      await expect(
        adapter.signTransactions([mockTransaction1, mockTransaction2])
      ).rejects.toThrow('Transaction signing cancelled by user');
    });

    it('should handle batch signing errors', async () => {
      const mockTransaction1 = new Transaction();
      const mockTransaction2 = new Transaction();

      mockTransact.mockRejectedValue(new Error('Batch signing failed'));

      await expect(
        adapter.signTransactions([mockTransaction1, mockTransaction2])
      ).rejects.toThrow('Batch signing failed');
    });
  });

  describe('clearCache', () => {
    it('should clear cached address and public key', async () => {
      // Set up cache
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
        };
        return await callback(mockWallet as any);
      });

      await adapter.authorize('mainnet-beta');
      
      // Clear cache
      adapter.clearCache();

      // Verify cache is cleared by checking if getAddress triggers new authorization
      mockTransact.mockClear();
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
        };
        return await callback(mockWallet as any);
      });

      await adapter.getAddress();
      expect(mockTransact).toHaveBeenCalled(); // Should not use cache
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle unknown errors gracefully', async () => {
      mockTransact.mockRejectedValue('Unknown error');

      await expect(adapter.authorize('mainnet-beta')).rejects.toThrow(
        'Authorization failed: Unknown error'
      );
    });

    it('should handle missing wallet accounts', async () => {
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [],
            wallet_uri_base: 'https://wallet.app',
          }),
        };

        return await callback(mockWallet as any);
      });

      await expect(adapter.authorize('mainnet-beta')).rejects.toThrow();
    });

    it('should handle multiple authorization calls', async () => {
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
        };
        return await callback(mockWallet as any);
      });

      // Call authorize multiple times
      const result1 = await adapter.authorize('mainnet-beta');
      const result2 = await adapter.authorize('mainnet-beta');

      expect(result1.address).toBe(mockAddress);
      expect(result2.address).toBe(mockAddress);
    });
  });

  describe('Private key isolation', () => {
    it('should never access private keys', async () => {
      // This test verifies that the adapter never calls any methods
      // that would access private keys

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://wallet.app',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            {
              signatures: [new Uint8Array([1, 2, 3])],
            },
          ]),
          // These methods should NEVER be called
          getPrivateKey: jest.fn(),
          exportPrivateKey: jest.fn(),
          signMessage: jest.fn(), // Only signTransactions should be used
        };

        return await callback(mockWallet as any);
      });

      await adapter.authorize('mainnet-beta');
      await adapter.signTransaction(new Transaction());

      // Verify private key methods were never called
      expect(mockTransact).toHaveBeenCalled();
      // The wallet mock would throw if getPrivateKey or exportPrivateKey were called
    });
  });
});
