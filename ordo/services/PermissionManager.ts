/**
 * PermissionManager
 * 
 * Manages the three-tier permission system for Ordo.
 * Handles permission state, OAuth tokens, and secure storage.
 */

import * as SecureStore from 'expo-secure-store';

// Permission types for different surfaces
export enum Permission {
  READ_GMAIL = 'READ_GMAIL',
  READ_SOCIAL_X = 'READ_SOCIAL_X',
  READ_SOCIAL_TELEGRAM = 'READ_SOCIAL_TELEGRAM',
  READ_WALLET = 'READ_WALLET',
  SIGN_TRANSACTIONS = 'SIGN_TRANSACTIONS'
}

// Surface types
export enum Surface {
  GMAIL = 'GMAIL',
  X = 'X',
  TELEGRAM = 'TELEGRAM',
  WALLET = 'WALLET'
}

// Result of permission request
export interface PermissionResult {
  granted: boolean;
  token?: string;
  error?: string;
}

// Permission state stored in secure storage
interface PermissionState {
  permission: Permission;
  granted: boolean;
  grantedAt?: string; // ISO timestamp
  surface: Surface;
}

// Secure storage keys
const STORAGE_KEYS = {
  PERMISSIONS: 'ordo_permissions',
  TOKEN_PREFIX: 'ordo_token_',
};

/**
 * Maps permissions to their corresponding surfaces
 */
const PERMISSION_TO_SURFACE: Record<Permission, Surface> = {
  [Permission.READ_GMAIL]: Surface.GMAIL,
  [Permission.READ_SOCIAL_X]: Surface.X,
  [Permission.READ_SOCIAL_TELEGRAM]: Surface.TELEGRAM,
  [Permission.READ_WALLET]: Surface.WALLET,
  [Permission.SIGN_TRANSACTIONS]: Surface.WALLET,
};

/**
 * PermissionManager class
 * 
 * Responsibilities:
 * - Store and retrieve permission states
 * - Manage OAuth tokens and refresh flows
 * - Handle permission grant/revoke operations
 * - Validate permission requirements before tool execution
 */
export class PermissionManager {
  /**
   * Check if a specific permission is granted
   */
  async hasPermission(permission: Permission): Promise<boolean> {
    try {
      const permissions = await this.loadPermissions();
      const permissionState = permissions.find(p => p.permission === permission);
      return permissionState?.granted ?? false;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }

  /**
   * Request permission from user
   * 
   * Note: This method handles the permission state management.
   * The actual OAuth flow should be initiated by the UI layer
   * and the token should be passed to this method.
   */
  async requestPermission(permission: Permission, token?: string): Promise<PermissionResult> {
    try {
      const surface = PERMISSION_TO_SURFACE[permission];
      
      // Load existing permissions
      const permissions = await this.loadPermissions();
      
      // Check if permission already exists
      const existingIndex = permissions.findIndex(p => p.permission === permission);
      
      // Create new permission state
      const newPermissionState: PermissionState = {
        permission,
        granted: true,
        grantedAt: new Date().toISOString(),
        surface,
      };
      
      // Update or add permission
      if (existingIndex >= 0) {
        permissions[existingIndex] = newPermissionState;
      } else {
        permissions.push(newPermissionState);
      }
      
      // Save permissions
      await this.savePermissions(permissions);
      
      // Store token if provided
      if (token) {
        await this.storeToken(surface, token);
      }
      
      return {
        granted: true,
        token,
      };
    } catch (error) {
      console.error('Error requesting permission:', error);
      return {
        granted: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Revoke permission and clean up
   * 
   * This will:
   * 1. Remove the permission state
   * 2. Delete the associated OAuth token
   * 3. Clear any cached data (to be implemented by caller)
   */
  async revokePermission(permission: Permission): Promise<void> {
    try {
      const surface = PERMISSION_TO_SURFACE[permission];
      
      // Load existing permissions
      const permissions = await this.loadPermissions();
      
      // Remove the permission
      const filteredPermissions = permissions.filter(p => p.permission !== permission);
      
      // Save updated permissions
      await this.savePermissions(filteredPermissions);
      
      // Delete the token
      await this.deleteToken(surface);
      
      console.log(`Permission ${permission} revoked successfully`);
    } catch (error) {
      console.error('Error revoking permission:', error);
      throw error;
    }
  }

  /**
   * Get OAuth token for a surface
   */
  async getToken(surface: Surface): Promise<string | null> {
    try {
      const tokenKey = `${STORAGE_KEYS.TOKEN_PREFIX}${surface}`;
      const token = await SecureStore.getItemAsync(tokenKey);
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  /**
   * Refresh expired token
   * 
   * Note: This is a placeholder. The actual token refresh logic
   * should be implemented by the OAuth provider-specific adapters.
   * This method should be called by those adapters to store the new token.
   */
  async refreshToken(surface: Surface, newToken: string): Promise<string> {
    try {
      await this.storeToken(surface, newToken);
      return newToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  /**
   * Get all granted permissions
   */
  async getGrantedPermissions(): Promise<Permission[]> {
    try {
      const permissions = await this.loadPermissions();
      return permissions
        .filter(p => p.granted)
        .map(p => p.permission);
    } catch (error) {
      console.error('Error getting granted permissions:', error);
      return [];
    }
  }

  /**
   * Get permission state with metadata (including grant timestamp)
   */
  async getPermissionState(permission: Permission): Promise<PermissionState | null> {
    try {
      const permissions = await this.loadPermissions();
      return permissions.find(p => p.permission === permission) ?? null;
    } catch (error) {
      console.error('Error getting permission state:', error);
      return null;
    }
  }

  /**
   * Get all permission states (for UI display)
   */
  async getAllPermissionStates(): Promise<PermissionState[]> {
    try {
      return await this.loadPermissions();
    } catch (error) {
      console.error('Error getting all permission states:', error);
      return [];
    }
  }

  // Private helper methods

  /**
   * Load permissions from secure storage
   */
  private async loadPermissions(): Promise<PermissionState[]> {
    try {
      const permissionsJson = await SecureStore.getItemAsync(STORAGE_KEYS.PERMISSIONS);
      if (!permissionsJson) {
        return [];
      }
      return JSON.parse(permissionsJson) as PermissionState[];
    } catch (error) {
      console.error('Error loading permissions:', error);
      return [];
    }
  }

  /**
   * Save permissions to secure storage
   */
  private async savePermissions(permissions: PermissionState[]): Promise<void> {
    try {
      const permissionsJson = JSON.stringify(permissions);
      await SecureStore.setItemAsync(STORAGE_KEYS.PERMISSIONS, permissionsJson);
    } catch (error) {
      console.error('Error saving permissions:', error);
      throw error;
    }
  }

  /**
   * Store OAuth token for a surface
   */
  private async storeToken(surface: Surface, token: string): Promise<void> {
    try {
      const tokenKey = `${STORAGE_KEYS.TOKEN_PREFIX}${surface}`;
      await SecureStore.setItemAsync(tokenKey, token);
    } catch (error) {
      console.error('Error storing token:', error);
      throw error;
    }
  }

  /**
   * Delete OAuth token for a surface
   */
  private async deleteToken(surface: Surface): Promise<void> {
    try {
      const tokenKey = `${STORAGE_KEYS.TOKEN_PREFIX}${surface}`;
      await SecureStore.deleteItemAsync(tokenKey);
    } catch (error) {
      console.error('Error deleting token:', error);
      throw error;
    }
  }

  /**
   * Clear all permissions and tokens (for testing or reset)
   */
  async clearAll(): Promise<void> {
    try {
      // Clear permissions
      await SecureStore.deleteItemAsync(STORAGE_KEYS.PERMISSIONS);
      
      // Clear all tokens
      for (const surface of Object.values(Surface)) {
        await this.deleteToken(surface);
      }
      
      console.log('All permissions and tokens cleared');
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const permissionManager = new PermissionManager();
