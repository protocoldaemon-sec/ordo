/**
 * Unit tests for PermissionManager
 * 
 * Tests permission state management, token storage, and revocation.
 */

import { PermissionManager, Permission, Surface } from '../services/PermissionManager';
import * as SecureStore from 'expo-secure-store';

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe('PermissionManager', () => {
  let permissionManager: PermissionManager;
  let mockStorage: Map<string, string>;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create a new instance for each test
    permissionManager = new PermissionManager();
    
    // Create mock storage
    mockStorage = new Map<string, string>();
    
    // Mock SecureStore methods
    (SecureStore.getItemAsync as jest.Mock).mockImplementation(async (key: string) => {
      return mockStorage.get(key) ?? null;
    });
    
    (SecureStore.setItemAsync as jest.Mock).mockImplementation(async (key: string, value: string) => {
      mockStorage.set(key, value);
    });
    
    (SecureStore.deleteItemAsync as jest.Mock).mockImplementation(async (key: string) => {
      mockStorage.delete(key);
    });
  });

  describe('hasPermission', () => {
    it('should return false for ungranted permission', async () => {
      const hasPermission = await permissionManager.hasPermission(Permission.READ_GMAIL);
      expect(hasPermission).toBe(false);
    });

    it('should return true for granted permission', async () => {
      // Grant permission
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'test-token');
      
      // Check permission
      const hasPermission = await permissionManager.hasPermission(Permission.READ_GMAIL);
      expect(hasPermission).toBe(true);
    });

    it('should return false after permission is revoked', async () => {
      // Grant and then revoke
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'test-token');
      await permissionManager.revokePermission(Permission.READ_GMAIL);
      
      // Check permission
      const hasPermission = await permissionManager.hasPermission(Permission.READ_GMAIL);
      expect(hasPermission).toBe(false);
    });

    it('should handle multiple permissions independently', async () => {
      // Grant multiple permissions
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'gmail-token');
      await permissionManager.requestPermission(Permission.READ_WALLET, 'wallet-token');
      
      // Check both
      expect(await permissionManager.hasPermission(Permission.READ_GMAIL)).toBe(true);
      expect(await permissionManager.hasPermission(Permission.READ_WALLET)).toBe(true);
      expect(await permissionManager.hasPermission(Permission.READ_SOCIAL_X)).toBe(false);
    });
  });

  describe('requestPermission', () => {
    it('should grant permission successfully', async () => {
      const result = await permissionManager.requestPermission(Permission.READ_GMAIL, 'test-token');
      
      expect(result.granted).toBe(true);
      expect(result.token).toBe('test-token');
      expect(result.error).toBeUndefined();
    });

    it('should store permission state', async () => {
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'test-token');
      
      const state = await permissionManager.getPermissionState(Permission.READ_GMAIL);
      expect(state).not.toBeNull();
      expect(state?.permission).toBe(Permission.READ_GMAIL);
      expect(state?.granted).toBe(true);
      expect(state?.surface).toBe(Surface.GMAIL);
      expect(state?.grantedAt).toBeDefined();
    });

    it('should store token in secure storage', async () => {
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'test-token');
      
      const token = await permissionManager.getToken(Surface.GMAIL);
      expect(token).toBe('test-token');
    });

    it('should update existing permission', async () => {
      // Grant permission first time
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'token-1');
      const state1 = await permissionManager.getPermissionState(Permission.READ_GMAIL);
      
      // Wait a bit to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Grant permission again with new token
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'token-2');
      const state2 = await permissionManager.getPermissionState(Permission.READ_GMAIL);
      
      // Should have updated timestamp
      expect(state2?.grantedAt).not.toBe(state1?.grantedAt);
      
      // Should have new token
      const token = await permissionManager.getToken(Surface.GMAIL);
      expect(token).toBe('token-2');
    });

    it('should work without token (for wallet permissions)', async () => {
      const result = await permissionManager.requestPermission(Permission.READ_WALLET);
      
      expect(result.granted).toBe(true);
      expect(result.token).toBeUndefined();
    });

    it('should handle multiple permissions for same surface', async () => {
      // Both READ_WALLET and SIGN_TRANSACTIONS use WALLET surface
      await permissionManager.requestPermission(Permission.READ_WALLET);
      await permissionManager.requestPermission(Permission.SIGN_TRANSACTIONS);
      
      expect(await permissionManager.hasPermission(Permission.READ_WALLET)).toBe(true);
      expect(await permissionManager.hasPermission(Permission.SIGN_TRANSACTIONS)).toBe(true);
    });
  });

  describe('revokePermission', () => {
    it('should revoke permission successfully', async () => {
      // Grant permission
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'test-token');
      
      // Revoke permission
      await permissionManager.revokePermission(Permission.READ_GMAIL);
      
      // Check permission is revoked
      expect(await permissionManager.hasPermission(Permission.READ_GMAIL)).toBe(false);
    });

    it('should delete associated token', async () => {
      // Grant permission with token
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'test-token');
      
      // Revoke permission
      await permissionManager.revokePermission(Permission.READ_GMAIL);
      
      // Token should be deleted
      const token = await permissionManager.getToken(Surface.GMAIL);
      expect(token).toBeNull();
    });

    it('should not affect other permissions', async () => {
      // Grant multiple permissions
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'gmail-token');
      await permissionManager.requestPermission(Permission.READ_SOCIAL_X, 'x-token');
      
      // Revoke one
      await permissionManager.revokePermission(Permission.READ_GMAIL);
      
      // Other permission should remain
      expect(await permissionManager.hasPermission(Permission.READ_SOCIAL_X)).toBe(true);
      expect(await permissionManager.getToken(Surface.X)).toBe('x-token');
    });

    it('should handle revoking non-existent permission', async () => {
      // Should not throw error
      await expect(
        permissionManager.revokePermission(Permission.READ_GMAIL)
      ).resolves.not.toThrow();
    });
  });

  describe('getToken', () => {
    it('should return null for non-existent token', async () => {
      const token = await permissionManager.getToken(Surface.GMAIL);
      expect(token).toBeNull();
    });

    it('should return stored token', async () => {
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'test-token');
      
      const token = await permissionManager.getToken(Surface.GMAIL);
      expect(token).toBe('test-token');
    });

    it('should return correct token for each surface', async () => {
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'gmail-token');
      await permissionManager.requestPermission(Permission.READ_SOCIAL_X, 'x-token');
      await permissionManager.requestPermission(Permission.READ_SOCIAL_TELEGRAM, 'telegram-token');
      
      expect(await permissionManager.getToken(Surface.GMAIL)).toBe('gmail-token');
      expect(await permissionManager.getToken(Surface.X)).toBe('x-token');
      expect(await permissionManager.getToken(Surface.TELEGRAM)).toBe('telegram-token');
    });
  });

  describe('refreshToken', () => {
    it('should update token', async () => {
      // Store initial token
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'old-token');
      
      // Refresh token
      const newToken = await permissionManager.refreshToken(Surface.GMAIL, 'new-token');
      
      expect(newToken).toBe('new-token');
      expect(await permissionManager.getToken(Surface.GMAIL)).toBe('new-token');
    });

    it('should work even if no previous token exists', async () => {
      const newToken = await permissionManager.refreshToken(Surface.GMAIL, 'new-token');
      
      expect(newToken).toBe('new-token');
      expect(await permissionManager.getToken(Surface.GMAIL)).toBe('new-token');
    });
  });

  describe('getGrantedPermissions', () => {
    it('should return empty array when no permissions granted', async () => {
      const permissions = await permissionManager.getGrantedPermissions();
      expect(permissions).toEqual([]);
    });

    it('should return all granted permissions', async () => {
      await permissionManager.requestPermission(Permission.READ_GMAIL);
      await permissionManager.requestPermission(Permission.READ_WALLET);
      await permissionManager.requestPermission(Permission.READ_SOCIAL_X);
      
      const permissions = await permissionManager.getGrantedPermissions();
      expect(permissions).toHaveLength(3);
      expect(permissions).toContain(Permission.READ_GMAIL);
      expect(permissions).toContain(Permission.READ_WALLET);
      expect(permissions).toContain(Permission.READ_SOCIAL_X);
    });

    it('should not include revoked permissions', async () => {
      await permissionManager.requestPermission(Permission.READ_GMAIL);
      await permissionManager.requestPermission(Permission.READ_WALLET);
      await permissionManager.revokePermission(Permission.READ_GMAIL);
      
      const permissions = await permissionManager.getGrantedPermissions();
      expect(permissions).toHaveLength(1);
      expect(permissions).toContain(Permission.READ_WALLET);
      expect(permissions).not.toContain(Permission.READ_GMAIL);
    });
  });

  describe('getPermissionState', () => {
    it('should return null for non-existent permission', async () => {
      const state = await permissionManager.getPermissionState(Permission.READ_GMAIL);
      expect(state).toBeNull();
    });

    it('should return permission state with metadata', async () => {
      const beforeGrant = new Date().toISOString();
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'test-token');
      const afterGrant = new Date().toISOString();
      
      const state = await permissionManager.getPermissionState(Permission.READ_GMAIL);
      
      expect(state).not.toBeNull();
      expect(state?.permission).toBe(Permission.READ_GMAIL);
      expect(state?.granted).toBe(true);
      expect(state?.surface).toBe(Surface.GMAIL);
      expect(state?.grantedAt).toBeDefined();
      
      // Check timestamp is reasonable
      if (state?.grantedAt) {
        expect(state.grantedAt >= beforeGrant).toBe(true);
        expect(state.grantedAt <= afterGrant).toBe(true);
      }
    });
  });

  describe('getAllPermissionStates', () => {
    it('should return empty array when no permissions', async () => {
      const states = await permissionManager.getAllPermissionStates();
      expect(states).toEqual([]);
    });

    it('should return all permission states', async () => {
      await permissionManager.requestPermission(Permission.READ_GMAIL);
      await permissionManager.requestPermission(Permission.READ_WALLET);
      
      const states = await permissionManager.getAllPermissionStates();
      expect(states).toHaveLength(2);
      
      const gmailState = states.find(s => s.permission === Permission.READ_GMAIL);
      const walletState = states.find(s => s.permission === Permission.READ_WALLET);
      
      expect(gmailState).toBeDefined();
      expect(walletState).toBeDefined();
    });
  });

  describe('clearAll', () => {
    it('should clear all permissions and tokens', async () => {
      // Grant multiple permissions
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'gmail-token');
      await permissionManager.requestPermission(Permission.READ_WALLET);
      await permissionManager.requestPermission(Permission.READ_SOCIAL_X, 'x-token');
      
      // Clear all
      await permissionManager.clearAll();
      
      // Check everything is cleared
      expect(await permissionManager.getGrantedPermissions()).toEqual([]);
      expect(await permissionManager.getToken(Surface.GMAIL)).toBeNull();
      expect(await permissionManager.getToken(Surface.X)).toBeNull();
      expect(await permissionManager.getToken(Surface.WALLET)).toBeNull();
      expect(await permissionManager.getToken(Surface.TELEGRAM)).toBeNull();
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle SecureStore errors gracefully', async () => {
      // Mock SecureStore to throw error
      (SecureStore.getItemAsync as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      
      // Should return false instead of throwing
      const hasPermission = await permissionManager.hasPermission(Permission.READ_GMAIL);
      expect(hasPermission).toBe(false);
    });

    it('should handle corrupted permission data', async () => {
      // Store invalid JSON
      mockStorage.set('ordo_permissions', 'invalid json');
      
      // Should return empty array instead of throwing
      const permissions = await permissionManager.getGrantedPermissions();
      expect(permissions).toEqual([]);
    });

    it('should handle permission state persistence across instances', async () => {
      // Grant permission with first instance
      const manager1 = new PermissionManager();
      await manager1.requestPermission(Permission.READ_GMAIL, 'test-token');
      
      // Create new instance and check permission
      const manager2 = new PermissionManager();
      const hasPermission = await manager2.hasPermission(Permission.READ_GMAIL);
      const token = await manager2.getToken(Surface.GMAIL);
      
      expect(hasPermission).toBe(true);
      expect(token).toBe('test-token');
    });
  });

  describe('Permission to Surface mapping', () => {
    it('should map READ_GMAIL to GMAIL surface', async () => {
      await permissionManager.requestPermission(Permission.READ_GMAIL, 'token');
      const state = await permissionManager.getPermissionState(Permission.READ_GMAIL);
      expect(state?.surface).toBe(Surface.GMAIL);
    });

    it('should map READ_SOCIAL_X to X surface', async () => {
      await permissionManager.requestPermission(Permission.READ_SOCIAL_X, 'token');
      const state = await permissionManager.getPermissionState(Permission.READ_SOCIAL_X);
      expect(state?.surface).toBe(Surface.X);
    });

    it('should map READ_SOCIAL_TELEGRAM to TELEGRAM surface', async () => {
      await permissionManager.requestPermission(Permission.READ_SOCIAL_TELEGRAM, 'token');
      const state = await permissionManager.getPermissionState(Permission.READ_SOCIAL_TELEGRAM);
      expect(state?.surface).toBe(Surface.TELEGRAM);
    });

    it('should map READ_WALLET to WALLET surface', async () => {
      await permissionManager.requestPermission(Permission.READ_WALLET);
      const state = await permissionManager.getPermissionState(Permission.READ_WALLET);
      expect(state?.surface).toBe(Surface.WALLET);
    });

    it('should map SIGN_TRANSACTIONS to WALLET surface', async () => {
      await permissionManager.requestPermission(Permission.SIGN_TRANSACTIONS);
      const state = await permissionManager.getPermissionState(Permission.SIGN_TRANSACTIONS);
      expect(state?.surface).toBe(Surface.WALLET);
    });
  });
});
