/**
 * SeedVaultAdapter
 * 
 * Provides secure wallet integration using Solana Mobile Stack (MWA + Seed Vault).
 * All transaction signing happens through Seed Vault with biometric authentication.
 * 
 * Key Principle: ZERO PRIVATE KEY ACCESS
 * - Never requests, stores, or transmits private keys
 * - All signing operations use MWA transact pattern
 * - Wallet address obtained via authorize flow
 */

import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { Transaction, VersionedTransaction, PublicKey } from '@solana/web3.js';
import { Platform } from 'react-native';

/**
 * Supported Solana clusters
 */
export type SolanaCluster = 'mainnet-beta' | 'devnet' | 'testnet';

/**
 * Authorization result from Seed Vault
 */
export interface AuthorizationResult {
  address: string;
  publicKey: PublicKey;
  accountLabel?: string;
  walletUriBase?: string;
  authToken?: string;
}

/**
 * Signed transaction result
 */
export interface SignedTransaction {
  signature: Uint8Array;
  transaction: Transaction | VersionedTransaction;
}

/**
 * App identity for MWA authorization
 */
const ORDO_IDENTITY = {
  name: 'Ordo',
  uri: 'https://ordo.app',
  icon: 'favicon.ico', // Relative path to app icon
};

/**
 * Error message constants
 */
const ERROR_MESSAGES = {
  USER_DECLINED: 'User declined',
  NO_ACCOUNTS: 'No accounts returned from wallet',
  EMPTY_TRANSACTIONS: 'Transaction array cannot be empty',
  INVALID_CLUSTER: 'Invalid cluster specified',
} as const;

/**
 * SeedVaultAdapter class
 * 
 * Responsibilities:
 * - Check Seed Vault availability
 * - Authorize sessions with Seed Vault
 * - Get wallet address without private key access
 * - Sign transactions via MWA
 * - Handle user rejection and errors gracefully
 */
export class SeedVaultAdapter {
  private cachedAddress: string | null = null;
  private cachedPublicKey: PublicKey | null = null;
  private cachedAuthToken: string | null = null;

  /**
   * Validate cluster parameter
   */
  private validateCluster(cluster: string): void {
    const validClusters: SolanaCluster[] = ['mainnet-beta', 'devnet', 'testnet'];
    if (!validClusters.includes(cluster as SolanaCluster)) {
      throw new Error(`${ERROR_MESSAGES.INVALID_CLUSTER}: ${cluster}`);
    }
  }

  /**
   * Extract signature from signed transaction
   * Handles both Uint8Array and SignaturePubkeyPair formats
   */
  private extractSignature(signedTx: Transaction | VersionedTransaction): Uint8Array {
    if (!Array.isArray(signedTx.signatures) || signedTx.signatures.length === 0) {
      return new Uint8Array();
    }

    const sig = signedTx.signatures[0];
    
    // Handle Uint8Array format
    if (sig instanceof Uint8Array) {
      return sig;
    }
    
    // Handle SignaturePubkeyPair format
    if (typeof sig === 'object' && sig !== null && 'signature' in sig) {
      const sigData = (sig as any).signature;
      if (sigData instanceof Uint8Array) {
        return sigData;
      }
      // Handle ArrayBuffer or ArrayBufferView
      if (sigData && typeof sigData === 'object') {
        try {
          return new Uint8Array(sigData.buffer || sigData);
        } catch {
          return new Uint8Array();
        }
      }
    }
    
    return new Uint8Array();
  }

  /**
   * Check if Seed Vault is available on this device
   * 
   * @returns true if MWA is available, false otherwise
   */
  async isAvailable(): Promise<boolean> {
    try {
      // MWA is only available on Android with Solana Mobile Stack
      if (Platform.OS !== 'android') {
        return false;
      }

      // Check if transact function is available
      if (typeof transact !== 'function') {
        return false;
      }

      // TODO: In production, add additional checks:
      // - Verify Solana Mobile Stack is installed
      // - Check minimum version requirements
      // - Test actual MWA connectivity
      
      return true;
    } catch (error) {
      console.error('[SeedVaultAdapter] Error checking availability:', error);
      return false;
    }
  }

  /**
   * Authorize session with Seed Vault
   * 
   * This establishes a session with the wallet and obtains the wallet address.
   * The user will be prompted to approve the connection via biometric auth.
   * 
   * @param cluster - Solana cluster to connect to (mainnet-beta, devnet, testnet)
   * @returns Authorization result with address and public key
   * @throws Error if user rejects or authorization fails
   */
  async authorize(cluster: SolanaCluster = 'mainnet-beta'): Promise<AuthorizationResult> {
    this.validateCluster(cluster);

    try {
      const result = await transact(async (wallet) => {
        // Request authorization from Seed Vault
        const authResult = await wallet.authorize({
          cluster,
          identity: ORDO_IDENTITY,
        });

        // Validate accounts array
        if (!authResult.accounts || authResult.accounts.length === 0) {
          throw new Error(ERROR_MESSAGES.NO_ACCOUNTS);
        }

        // Extract address and public key
        const address = authResult.accounts[0].address;
        const publicKey = new PublicKey(address);

        return {
          address,
          publicKey,
          accountLabel: authResult.accounts[0].label,
          walletUriBase: authResult.wallet_uri_base,
          authToken: authResult.auth_token,
        };
      });

      // Cache the authorization data for future use
      this.cachedAddress = result.address;
      this.cachedPublicKey = result.publicKey;
      this.cachedAuthToken = result.authToken || null;

      console.log('[SeedVaultAdapter] Authorization successful:', this.redactAddress(result.address));
      return result;
    } catch (error) {
      console.error('[SeedVaultAdapter] Authorization failed:', error);
      
      // Clear cached values on error
      this.clearCache();
      
      // Provide user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes(ERROR_MESSAGES.USER_DECLINED)) {
          throw new Error('Authorization cancelled by user');
        }
        throw new Error(`Authorization failed: ${error.message}`);
      }
      
      throw new Error('Authorization failed: Unknown error');
    }
  }

  /**
   * Redact address for logging (show first 4 and last 4 characters)
   */
  private redactAddress(address: string): string {
    if (address.length <= 8) return '***';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }

  /**
   * Get wallet address without accessing private key
   * 
   * If address is cached from previous authorization, returns cached value.
   * Otherwise, triggers authorization flow.
   * 
   * @param cluster - Solana cluster (default: mainnet-beta)
   * @returns Wallet address as base58 string
   * @throws Error if authorization fails
   */
  async getAddress(cluster: SolanaCluster = 'mainnet-beta'): Promise<string> {
    // Return cached address if available
    if (this.cachedAddress) {
      return this.cachedAddress;
    }

    // Otherwise, authorize and get address
    const authResult = await this.authorize(cluster);
    return authResult.address;
  }

  /**
   * Get wallet public key
   * 
   * @param cluster - Solana cluster (default: mainnet-beta)
   * @returns PublicKey object
   * @throws Error if authorization fails
   */
  async getPublicKey(cluster: SolanaCluster = 'mainnet-beta'): Promise<PublicKey> {
    // Return cached public key if available
    if (this.cachedPublicKey) {
      return this.cachedPublicKey;
    }

    // Otherwise, authorize and get public key
    const authResult = await this.authorize(cluster);
    return authResult.publicKey;
  }

  /**
   * Sign a single transaction via Seed Vault
   * 
   * The user will be prompted to approve the transaction via biometric auth.
   * The transaction details will be displayed in the wallet UI.
   * 
   * @param transaction - Transaction to sign
   * @param cluster - Solana cluster (default: mainnet-beta)
   * @returns Signed transaction with signature
   * @throws Error if user rejects or signing fails
   */
  async signTransaction(
    transaction: Transaction | VersionedTransaction,
    cluster: SolanaCluster = 'mainnet-beta'
  ): Promise<SignedTransaction> {
    this.validateCluster(cluster);

    try {
      const result = await transact(async (wallet) => {
        // Authorize if needed (MWA handles session management)
        await wallet.authorize({
          cluster,
          identity: ORDO_IDENTITY,
        });

        // Sign the transaction
        const signedTxs = await wallet.signTransactions({
          transactions: [transaction],
        });

        // Extract signature and transaction
        const signedTx = signedTxs[0];
        const signature = this.extractSignature(signedTx);
        
        return {
          signature,
          transaction: signedTx,
        };
      });

      console.log('[SeedVaultAdapter] Transaction signed successfully');
      return result;
    } catch (error) {
      console.error('[SeedVaultAdapter] Transaction signing failed:', error);
      
      // Provide user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes(ERROR_MESSAGES.USER_DECLINED)) {
          throw new Error('Transaction signing cancelled by user');
        }
        throw new Error(`Transaction signing failed: ${error.message}`);
      }
      
      throw new Error('Transaction signing failed: Unknown error');
    }
  }

  /**
   * Sign multiple transactions in batch via Seed Vault
   * 
   * All transactions will be presented to the user for approval together.
   * The user can approve or reject the entire batch.
   * 
   * @param transactions - Array of transactions to sign
   * @param cluster - Solana cluster (default: mainnet-beta)
   * @returns Array of signed transactions with signatures
   * @throws Error if user rejects or signing fails
   */
  async signTransactions(
    transactions: (Transaction | VersionedTransaction)[],
    cluster: SolanaCluster = 'mainnet-beta'
  ): Promise<SignedTransaction[]> {
    this.validateCluster(cluster);

    // Validate input
    if (!transactions || transactions.length === 0) {
      throw new Error(ERROR_MESSAGES.EMPTY_TRANSACTIONS);
    }

    try {
      const results = await transact(async (wallet) => {
        // Authorize if needed
        await wallet.authorize({
          cluster,
          identity: ORDO_IDENTITY,
        });

        // Sign all transactions
        const signedTxs = await wallet.signTransactions({
          transactions,
        });

        // Map to SignedTransaction format
        return signedTxs.map((signedTx) => ({
          signature: this.extractSignature(signedTx),
          transaction: signedTx,
        }));
      });

      console.log(`[SeedVaultAdapter] ${results.length} transactions signed successfully`);
      return results;
    } catch (error) {
      console.error('[SeedVaultAdapter] Batch transaction signing failed:', error);
      
      // Provide user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes(ERROR_MESSAGES.USER_DECLINED)) {
          throw new Error('Transaction signing cancelled by user');
        }
        throw new Error(`Batch signing failed: ${error.message}`);
      }
      
      throw new Error('Batch signing failed: Unknown error');
    }
  }

  /**
   * Clear cached authorization data
   * 
   * Call this when user revokes wallet permission or logs out.
   */
  clearCache(): void {
    this.cachedAddress = null;
    this.cachedPublicKey = null;
    this.cachedAuthToken = null;
    console.log('[SeedVaultAdapter] Cache cleared');
  }
}

// Export singleton instance
export const seedVaultAdapter = new SeedVaultAdapter();
