/**
 * Integration tests for SeedVaultAdapter MWA transaction signing flow
 * 
 * These tests validate the complete MWA integration flow including:
 * - Authorization with different clusters
 * - Transaction signing with realistic transaction objects
 * - Batch transaction signing
 * - Error handling and user rejection scenarios
 * - Private key isolation verification
 * 
 * NOTE: These tests use mocked MWA since actual device testing requires
 * physical Solana Seeker hardware. For device testing, see the testing
 * guide in TASK_2.1.2_TESTING_GUIDE.md
 */

import { SeedVaultAdapter, AuthorizationResult, SignedTransaction } from '../services/SeedVaultAdapter';
import { 
  Transaction, 
  VersionedTransaction, 
  PublicKey, 
  SystemProgram,
  TransactionMessage,
  TransactionInstruction,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

// Mock the MWA module
jest.mock('@solana-mobile/mobile-wallet-adapter-protocol-web3js', () => ({
  transact: jest.fn(),
}));

describe('SeedVaultAdapter Integration Tests', () => {
  let adapter: SeedVaultAdapter;
  const mockTransact = transact as jest.MockedFunction<typeof transact>;

  // Mock wallet addresses
  const mockAddress = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
  const mockRecipient = 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK';
  const mockPublicKey = new PublicKey(mockAddress);
  const mockRecipientKey = new PublicKey(mockRecipient);

  beforeEach(() => {
    adapter = new SeedVaultAdapter();
    jest.clearAllMocks();
  });

  describe('Authorization Flow Integration', () => {
    it('should complete full authorization flow with mainnet-beta', async () => {
      // Mock successful authorization
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [
              {
                address: mockAddress,
                label: 'My Seeker Wallet',
              },
            ],
            auth_token: 'mock-auth-token-12345',
            wallet_uri_base: 'https://phantom.app',
          }),
        };

        return await callback(mockWallet as any);
      });

      const result = await adapter.authorize('mainnet-beta');

      // Verify authorization result structure
      expect(result).toMatchObject({
        address: mockAddress,
        publicKey: expect.any(PublicKey),
        accountLabel: 'My Seeker Wallet',
        walletUriBase: 'https://phantom.app',
        authToken: 'mock-auth-token-12345',
      });

      // Verify public key matches address
      expect(result.publicKey.toBase58()).toBe(mockAddress);

      // Verify transact was called with correct parameters
      expect(mockTransact).toHaveBeenCalledTimes(1);
    });

    it('should complete authorization flow with devnet cluster', async () => {
      const authorizeSpy = jest.fn().mockResolvedValue({
        accounts: [{ address: mockAddress }],
        wallet_uri_base: 'https://phantom.app',
      });

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = { authorize: authorizeSpy };
        return await callback(mockWallet as any);
      });

      await adapter.authorize('devnet');

      // Verify devnet cluster was passed to authorize
      expect(authorizeSpy).toHaveBeenCalledWith({
        cluster: 'devnet',
        identity: expect.objectContaining({
          name: 'Ordo',
          uri: 'https://ordo.app',
        }),
      });
    });

    it('should complete authorization flow with testnet cluster', async () => {
      const authorizeSpy = jest.fn().mockResolvedValue({
        accounts: [{ address: mockAddress }],
        wallet_uri_base: 'https://phantom.app',
      });

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = { authorize: authorizeSpy };
        return await callback(mockWallet as any);
      });

      await adapter.authorize('testnet');

      // Verify testnet cluster was passed to authorize
      expect(authorizeSpy).toHaveBeenCalledWith({
        cluster: 'testnet',
        identity: expect.objectContaining({
          name: 'Ordo',
        }),
      });
    });

    it('should reject invalid cluster names', async () => {
      await expect(
        adapter.authorize('invalid-cluster' as any)
      ).rejects.toThrow('Invalid cluster specified');
    });
  });

  describe('SOL Transfer Transaction Signing', () => {
    it('should sign a realistic SOL transfer transaction', async () => {
      // Create a realistic SOL transfer transaction
      const transferAmount = 0.1 * LAMPORTS_PER_SOL; // 0.1 SOL
      const transaction = new Transaction();
      
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: transferAmount,
        })
      );

      // Mock recent blockhash (would come from RPC in real scenario)
      transaction.recentBlockhash = 'GHtXQBsoZHVnNFa9YevAzFr17DJjgHXk3ycTKD5xD3Zi';
      transaction.feePayer = mockPublicKey;

      const mockSignature = new Uint8Array(64).fill(1); // 64-byte signature

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            {
              ...transaction,
              signatures: [mockSignature],
            },
          ]),
        };

        return await callback(mockWallet as any);
      });

      const result = await adapter.signTransaction(transaction, 'mainnet-beta');

      // Verify signed transaction structure
      expect(result).toHaveProperty('signature');
      expect(result).toHaveProperty('transaction');
      expect(result.signature).toBeInstanceOf(Uint8Array);

      // Verify signature is 64 bytes (Ed25519 signature)
      expect(result.signature.length).toBe(64);

      // Verify transaction contains the transfer instruction
      if ('instructions' in result.transaction) {
        expect(result.transaction.instructions).toHaveLength(1);
        expect(result.transaction.instructions[0].programId.toBase58()).toBe(
          SystemProgram.programId.toBase58()
        );
      }
    });

    it('should sign transaction with custom memo instruction', async () => {
      const transaction = new Transaction();
      
      // Add transfer instruction
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.01 * LAMPORTS_PER_SOL,
        })
      );

      // Add memo instruction (common pattern)
      const memoProgram = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
      transaction.add(
        new TransactionInstruction({
          keys: [],
          programId: memoProgram,
          data: Buffer.from('Ordo payment', 'utf-8'),
        })
      );

      transaction.recentBlockhash = 'GHtXQBsoZHVnNFa9YevAzFr17DJjgHXk3ycTKD5xD3Zi';
      transaction.feePayer = mockPublicKey;

      const mockSignature = new Uint8Array(64).fill(2);

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            {
              ...transaction,
              signatures: [mockSignature],
            },
          ]),
        };

        return await callback(mockWallet as any);
      });

      const result = await adapter.signTransaction(transaction);

      // Verify both instructions are present
      if ('instructions' in result.transaction) {
        expect(result.transaction.instructions).toHaveLength(2);
      }
      expect(result.signature).toEqual(mockSignature);
    });

    it('should handle user rejection of transaction', async () => {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 1 * LAMPORTS_PER_SOL,
        })
      );

      mockTransact.mockRejectedValue(new Error('User declined transaction'));

      await expect(
        adapter.signTransaction(transaction)
      ).rejects.toThrow('Transaction signing cancelled by user');
    });

    it('should handle network errors during signing', async () => {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.5 * LAMPORTS_PER_SOL,
        })
      );

      mockTransact.mockRejectedValue(new Error('Network connection failed'));

      await expect(
        adapter.signTransaction(transaction)
      ).rejects.toThrow('Transaction signing failed: Network connection failed');
    });
  });

  describe('Batch Transaction Signing', () => {
    it('should sign multiple SOL transfer transactions', async () => {
      // Create multiple transfer transactions
      const transaction1 = new Transaction();
      transaction1.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.1 * LAMPORTS_PER_SOL,
        })
      );
      transaction1.recentBlockhash = 'GHtXQBsoZHVnNFa9YevAzFr17DJjgHXk3ycTKD5xD3Zi';
      transaction1.feePayer = mockPublicKey;

      const transaction2 = new Transaction();
      transaction2.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: new PublicKey('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'),
          lamports: 0.2 * LAMPORTS_PER_SOL,
        })
      );
      transaction2.recentBlockhash = 'GHtXQBsoZHVnNFa9YevAzFr17DJjgHXk3ycTKD5xD3Zi';
      transaction2.feePayer = mockPublicKey;

      const mockSignature1 = new Uint8Array(64).fill(1);
      const mockSignature2 = new Uint8Array(64).fill(2);

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            {
              ...transaction1,
              signatures: [mockSignature1],
            },
            {
              ...transaction2,
              signatures: [mockSignature2],
            },
          ]),
        };

        return await callback(mockWallet as any);
      });

      const results = await adapter.signTransactions([transaction1, transaction2]);

      // Verify batch signing results
      expect(results).toHaveLength(2);
      expect(results[0].signature).toEqual(mockSignature1);
      expect(results[1].signature).toEqual(mockSignature2);
      if ('instructions' in results[0].transaction) {
        expect(results[0].transaction.instructions).toHaveLength(1);
      }
      if ('instructions' in results[1].transaction) {
        expect(results[1].transaction.instructions).toHaveLength(1);
      }
    });

    it('should sign batch with mixed transaction types', async () => {
      // Transaction 1: Simple transfer
      const tx1 = new Transaction();
      tx1.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.1 * LAMPORTS_PER_SOL,
        })
      );
      tx1.recentBlockhash = 'GHtXQBsoZHVnNFa9YevAzFr17DJjgHXk3ycTKD5xD3Zi';
      tx1.feePayer = mockPublicKey;

      // Transaction 2: Transfer with memo
      const tx2 = new Transaction();
      tx2.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.2 * LAMPORTS_PER_SOL,
        })
      );
      const memoProgram = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
      tx2.add(
        new TransactionInstruction({
          keys: [],
          programId: memoProgram,
          data: Buffer.from('Batch payment', 'utf-8'),
        })
      );
      tx2.recentBlockhash = 'GHtXQBsoZHVnNFa9YevAzFr17DJjgHXk3ycTKD5xD3Zi';
      tx2.feePayer = mockPublicKey;

      const mockSig1 = new Uint8Array(64).fill(1);
      const mockSig2 = new Uint8Array(64).fill(2);

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            { ...tx1, signatures: [mockSig1] },
            { ...tx2, signatures: [mockSig2] },
          ]),
        };

        return await callback(mockWallet as any);
      });

      const results = await adapter.signTransactions([tx1, tx2]);

      expect(results).toHaveLength(2);
      if ('instructions' in results[0].transaction) {
        expect(results[0].transaction.instructions).toHaveLength(1);
      }
      if ('instructions' in results[1].transaction) {
        expect(results[1].transaction.instructions).toHaveLength(2); // Transfer + Memo
      }
    });

    it('should reject empty transaction array', async () => {
      await expect(
        adapter.signTransactions([])
      ).rejects.toThrow('Transaction array cannot be empty');
    });

    it('should handle user rejection of batch', async () => {
      const tx1 = new Transaction();
      tx1.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.1 * LAMPORTS_PER_SOL,
        })
      );

      const tx2 = new Transaction();
      tx2.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.2 * LAMPORTS_PER_SOL,
        })
      );

      mockTransact.mockRejectedValue(new Error('User declined batch signing'));

      await expect(
        adapter.signTransactions([tx1, tx2])
      ).rejects.toThrow('Transaction signing cancelled by user');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle wallet returning no accounts', async () => {
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [],
            wallet_uri_base: 'https://phantom.app',
          }),
        };

        return await callback(mockWallet as any);
      });

      await expect(
        adapter.authorize('mainnet-beta')
      ).rejects.toThrow('No accounts returned from wallet');
    });

    it('should handle malformed authorization response', async () => {
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            // Missing accounts array
            wallet_uri_base: 'https://phantom.app',
          }),
        };

        return await callback(mockWallet as any);
      });

      await expect(
        adapter.authorize('mainnet-beta')
      ).rejects.toThrow();
    });

    it('should handle timeout during transaction signing', async () => {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.1 * LAMPORTS_PER_SOL,
        })
      );

      mockTransact.mockRejectedValue(new Error('Request timeout'));

      await expect(
        adapter.signTransaction(transaction)
      ).rejects.toThrow('Transaction signing failed: Request timeout');
    });

    it('should handle unknown error types gracefully', async () => {
      mockTransact.mockRejectedValue('Unknown error string');

      await expect(
        adapter.authorize('mainnet-beta')
      ).rejects.toThrow('Authorization failed: Unknown error');
    });
  });

  describe('Private Key Isolation Verification', () => {
    it('should never access private key methods', async () => {
      const getPrivateKeySpy = jest.fn();
      const exportPrivateKeySpy = jest.fn();
      const signMessageSpy = jest.fn();

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            {
              signatures: [new Uint8Array(64).fill(1)],
            },
          ]),
          // These methods should NEVER be called
          getPrivateKey: getPrivateKeySpy,
          exportPrivateKey: exportPrivateKeySpy,
          signMessage: signMessageSpy,
        };

        return await callback(mockWallet as any);
      });

      // Perform various operations
      await adapter.authorize('mainnet-beta');
      
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.1 * LAMPORTS_PER_SOL,
        })
      );
      
      await adapter.signTransaction(transaction);

      // Verify private key methods were NEVER called
      expect(getPrivateKeySpy).not.toHaveBeenCalled();
      expect(exportPrivateKeySpy).not.toHaveBeenCalled();
      expect(signMessageSpy).not.toHaveBeenCalled();
    });

    it('should only use MWA transact pattern for all operations', async () => {
      // Verify that all operations go through transact
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            {
              signatures: [new Uint8Array(64).fill(1)],
            },
          ]),
        };

        return await callback(mockWallet as any);
      });

      // All operations should use transact
      await adapter.authorize('mainnet-beta');
      expect(mockTransact).toHaveBeenCalledTimes(1);

      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.1 * LAMPORTS_PER_SOL,
        })
      );

      await adapter.signTransaction(transaction);
      expect(mockTransact).toHaveBeenCalledTimes(2);

      await adapter.signTransactions([transaction]);
      expect(mockTransact).toHaveBeenCalledTimes(3);
    });

    it('should verify no private key data in any response', async () => {
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
            auth_token: 'mock-token',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            {
              signatures: [new Uint8Array(64).fill(1)],
            },
          ]),
        };

        return await callback(mockWallet as any);
      });

      // Check authorization result
      const authResult = await adapter.authorize('mainnet-beta');
      expect(authResult).not.toHaveProperty('privateKey');
      expect(authResult).not.toHaveProperty('secretKey');
      expect(authResult).not.toHaveProperty('mnemonic');
      expect(authResult).not.toHaveProperty('seed');

      // Check transaction signing result
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.1 * LAMPORTS_PER_SOL,
        })
      );

      const signResult = await adapter.signTransaction(transaction);
      expect(signResult).not.toHaveProperty('privateKey');
      expect(signResult).not.toHaveProperty('secretKey');
      expect(signResult).toHaveProperty('signature'); // Only signature, not private key
      expect(signResult.signature).toBeInstanceOf(Uint8Array);
    });
  });

  describe('Cache Management Integration', () => {
    it('should cache authorization data across operations', async () => {
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
            auth_token: 'cached-token',
          }),
        };

        return await callback(mockWallet as any);
      });

      // First authorization
      const result1 = await adapter.authorize('mainnet-beta');
      expect(result1.address).toBe(mockAddress);

      // Clear mock to verify cache is used
      mockTransact.mockClear();

      // Get address should use cache
      const address = await adapter.getAddress();
      expect(address).toBe(mockAddress);
      expect(mockTransact).not.toHaveBeenCalled(); // Cache hit

      // Get public key should use cache
      const publicKey = await adapter.getPublicKey();
      expect(publicKey.toBase58()).toBe(mockAddress);
      expect(mockTransact).not.toHaveBeenCalled(); // Cache hit
    });

    it('should clear cache and re-authorize after clearCache()', async () => {
      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
          }),
        };

        return await callback(mockWallet as any);
      });

      // Authorize and cache
      await adapter.authorize('mainnet-beta');
      mockTransact.mockClear();

      // Clear cache
      adapter.clearCache();

      // Next getAddress should trigger new authorization
      await adapter.getAddress();
      expect(mockTransact).toHaveBeenCalledTimes(1); // New authorization
    });
  });

  describe('Real-World Transaction Scenarios', () => {
    it('should handle transaction with priority fees', async () => {
      const transaction = new Transaction();
      
      // Add compute budget instruction (priority fees)
      const computeBudgetProgram = new PublicKey('ComputeBudget111111111111111111111111111111');
      transaction.add(
        new TransactionInstruction({
          keys: [],
          programId: computeBudgetProgram,
          data: Buffer.from([0x03, 0x10, 0x27, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), // Set compute unit price
        })
      );

      // Add transfer instruction
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: mockPublicKey,
          toPubkey: mockRecipientKey,
          lamports: 0.5 * LAMPORTS_PER_SOL,
        })
      );

      transaction.recentBlockhash = 'GHtXQBsoZHVnNFa9YevAzFr17DJjgHXk3ycTKD5xD3Zi';
      transaction.feePayer = mockPublicKey;

      const mockSignature = new Uint8Array(64).fill(3);

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
          }),
          signTransactions: jest.fn().mockResolvedValue([
            {
              ...transaction,
              signatures: [mockSignature],
            },
          ]),
        };

        return await callback(mockWallet as any);
      });

      const result = await adapter.signTransaction(transaction);

      // Verify transaction has both compute budget and transfer instructions
      if ('instructions' in result.transaction) {
        expect(result.transaction.instructions).toHaveLength(2);
      }
      expect(result.signature).toEqual(mockSignature);
    });

    it('should handle large batch of transactions (stress test)', async () => {
      // Create 10 transactions (realistic batch size)
      const transactions: Transaction[] = [];
      const mockSignatures: Uint8Array[] = [];

      for (let i = 0; i < 10; i++) {
        const tx = new Transaction();
        tx.add(
          SystemProgram.transfer({
            fromPubkey: mockPublicKey,
            toPubkey: mockRecipientKey,
            lamports: (0.01 * (i + 1)) * LAMPORTS_PER_SOL,
          })
        );
        tx.recentBlockhash = 'GHtXQBsoZHVnNFa9YevAzFr17DJjgHXk3ycTKD5xD3Zi';
        tx.feePayer = mockPublicKey;
        transactions.push(tx);

        const sig = new Uint8Array(64).fill(i);
        mockSignatures.push(sig);
      }

      mockTransact.mockImplementation(async (callback) => {
        const mockWallet = {
          authorize: jest.fn().mockResolvedValue({
            accounts: [{ address: mockAddress }],
            wallet_uri_base: 'https://phantom.app',
          }),
          signTransactions: jest.fn().mockResolvedValue(
            transactions.map((tx, i) => ({
              ...tx,
              signatures: [mockSignatures[i]],
            }))
          ),
        };

        return await callback(mockWallet as any);
      });

      const results = await adapter.signTransactions(transactions);

      // Verify all transactions were signed
      expect(results).toHaveLength(10);
      results.forEach((result, i) => {
        expect(result.signature).toEqual(mockSignatures[i]);
        if ('instructions' in result.transaction) {
          expect(result.transaction.instructions).toHaveLength(1);
        }
      });
    });
  });
});
