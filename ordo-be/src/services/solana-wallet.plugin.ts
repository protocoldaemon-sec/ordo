/**
 * Solana Wallet Plugin
 * Provides AI access to Solana wallet operations
 */

import { Plugin, Action } from '../types/plugin';
import walletService from './wallet.service';
import logger from '../config/logger';

// =============================================
// SOLANA WALLET ACTIONS
// =============================================

const createSolanaWalletAction: Action = {
  name: 'create_solana_wallet',
  description: 'Create a new Solana wallet for the user',
  parameters: [],
  examples: [
    {
      description: 'Create a new Solana wallet',
      input: {},
      output: {
        success: true,
        wallet: {
          id: 'uuid',
          publicKey: 'ABC123...xyz',
          isPrimary: true,
        },
        message: 'Solana wallet created successfully',
      },
    },
  ],
  handler: async (_params, context) => {
    try {
      const wallet = await walletService.createWallet(context.userId);

      return {
        success: true,
        wallet: {
          id: wallet.id,
          publicKey: wallet.public_key,
          isPrimary: wallet.is_primary,
          createdAt: wallet.created_at,
        },
        chain: 'solana',
        message: 'Solana wallet created successfully',
      };
    } catch (error: any) {
      logger.error('Create Solana wallet action error:', error);
      throw new Error(`Failed to create Solana wallet: ${error.message}`);
    }
  },
};

const importSolanaWalletAction: Action = {
  name: 'import_solana_wallet',
  description: 'Import an existing Solana wallet using a private key',
  parameters: [
    {
      name: 'privateKey',
      type: 'string',
      description: 'Base58 encoded private key',
      required: true,
    },
  ],
  examples: [
    {
      description: 'Import Solana wallet',
      input: { privateKey: '5abc123...' },
      output: {
        success: true,
        wallet: {
          id: 'uuid',
          publicKey: 'ABC123...xyz',
          isPrimary: false,
        },
        message: 'Solana wallet imported successfully',
      },
    },
  ],
  handler: async (params, context) => {
    try {
      const { privateKey } = params;

      if (!privateKey) {
        throw new Error('Private key is required');
      }

      const wallet = await walletService.importWallet(context.userId, privateKey);

      return {
        success: true,
        wallet: {
          id: wallet.id,
          publicKey: wallet.public_key,
          isPrimary: wallet.is_primary,
          createdAt: wallet.created_at,
        },
        chain: 'solana',
        message: 'Solana wallet imported successfully',
      };
    } catch (error: any) {
      logger.error('Import Solana wallet action error:', error);
      throw new Error(`Failed to import Solana wallet: ${error.message}`);
    }
  },
};

const getSolanaBalanceAction: Action = {
  name: 'get_solana_balance',
  description: 'Get SOL balance for a Solana wallet',
  parameters: [
    {
      name: 'walletId',
      type: 'string',
      description: 'Wallet ID (optional - uses primary wallet if not specified)',
      required: false,
    },
  ],
  examples: [
    {
      description: 'Get SOL balance',
      input: {},
      output: {
        success: true,
        balance: 10.5,
        publicKey: 'ABC123...xyz',
      },
    },
  ],
  handler: async (params, context) => {
    try {
      let walletId = params.walletId;

      // If no wallet ID, get primary wallet
      if (!walletId) {
        const wallets = await walletService.getWallets(context.userId);
        const primaryWallet = wallets.find((w) => w.is_primary);
        if (!primaryWallet) {
          throw new Error('No primary wallet found');
        }
        walletId = primaryWallet.id;
      }

      const balance = await walletService.getBalance(walletId);
      const wallets = await walletService.getWallets(context.userId);
      const wallet = wallets.find((w) => w.id === walletId);

      return {
        success: true,
        balance,
        publicKey: wallet?.public_key,
        chain: 'solana',
      };
    } catch (error: any) {
      logger.error('Get Solana balance action error:', error);
      throw new Error(`Failed to get Solana balance: ${error.message}`);
    }
  },
};

const listSolanaWalletsAction: Action = {
  name: 'list_solana_wallets',
  description: 'List all Solana wallets for the user',
  parameters: [],
  examples: [
    {
      description: 'List all Solana wallets',
      input: {},
      output: {
        success: true,
        wallets: [
          {
            id: 'uuid1',
            publicKey: 'ABC123...xyz',
            isPrimary: true,
          },
          {
            id: 'uuid2',
            publicKey: 'DEF456...abc',
            isPrimary: false,
          },
        ],
        count: 2,
      },
    },
  ],
  handler: async (_params, context) => {
    try {
      const wallets = await walletService.getWallets(context.userId);

      const safeWallets = wallets.map((w) => ({
        id: w.id,
        publicKey: w.public_key,
        isPrimary: w.is_primary,
        createdAt: w.created_at,
      }));

      return {
        success: true,
        wallets: safeWallets,
        count: safeWallets.length,
        chain: 'solana',
      };
    } catch (error: any) {
      logger.error('List Solana wallets action error:', error);
      throw new Error(`Failed to list Solana wallets: ${error.message}`);
    }
  },
};

const setPrimaryWalletAction: Action = {
  name: 'set_primary_solana_wallet',
  description: 'Set a Solana wallet as the primary wallet',
  parameters: [
    {
      name: 'walletId',
      type: 'string',
      description: 'Wallet ID to set as primary',
      required: true,
    },
  ],
  examples: [
    {
      description: 'Set primary wallet',
      input: { walletId: 'uuid' },
      output: {
        success: true,
        message: 'Primary wallet updated',
      },
    },
  ],
  handler: async (params, context) => {
    try {
      const { walletId } = params;

      if (!walletId) {
        throw new Error('Wallet ID is required');
      }

      await walletService.setPrimaryWallet(context.userId, walletId);

      return {
        success: true,
        message: 'Primary wallet updated successfully',
        chain: 'solana',
      };
    } catch (error: any) {
      logger.error('Set primary Solana wallet action error:', error);
      throw new Error(`Failed to set primary wallet: ${error.message}`);
    }
  },
};

// =============================================
// PLUGIN DEFINITION
// =============================================

const solanaWalletPlugin: Plugin = {
  id: 'solana-wallet',
  name: 'Solana Wallet Operations',
  description: 'Solana wallet management including create, import, balance, and listing wallets',
  version: '1.0.0',
  isEnabled: true,
  actions: [
    createSolanaWalletAction,
    importSolanaWalletAction,
    getSolanaBalanceAction,
    listSolanaWalletsAction,
    setPrimaryWalletAction,
  ],
};

export default solanaWalletPlugin;
