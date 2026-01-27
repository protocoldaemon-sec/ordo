/**
 * Property-Based Tests for PermissionManager
 * 
 * Tests universal properties that should hold for all inputs using fast-check.
 * These tests verify correctness properties from the requirements document.
 */

import * as fc from 'fast-check';
import { PermissionManager, Permission, Surface } from '../services/PermissionManager';
import * as SecureStore from 'expo-secure-store';

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe('PermissionManager - Property-Based Tests', () => {
  let permissionManager: PermissionManager;
  let mockStorage: Map<string, string>;

  beforeEach(() => {
    jest.clearAllMocks();
    permissionManager = new PermissionManager();
    mockStorage = new Map<string, string>();

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

  /**
   * Property 1: Permission State Persistence (Requirements 1.2)
   * 
   * Universal Property: For any permission that is granted, the permission state
   * must persist across PermissionManager instances and remain accessible until
   * explicitly revoked.
   * 
   * Validates: Requirements 1.2 - "WHEN a user grants a surface permission, 
   * THE PermissionManager SHALL store the permission state and obtain necessary 
   * OAuth tokens or API credentials"
   */
  describe('Property 1: Permission State Persistence', () => {
    it('should persist granted permissions across instances', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate arbitrary permission and token
          fc.constantFrom(...Object.values(Permission)),
          fc.string({ minLength: 10, maxLength: 100 }),
          async (permission, token) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Grant permission with first instance
            const manager1 = new PermissionManager();
            await manager1.requestPermission(permission, token);

            // Create new instance and verify persistence
            const manager2 = new PermissionManager();
            const hasPermission = await manager2.hasPermission(permission);
            const storedToken = await manager2.getToken(getSurfaceForPermission(permission));

            // Property: Permission and token must persist
            expect(hasPermission).toBe(true);
            expect(storedToken).toBe(token);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain permission state with metadata', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...Object.values(Permission)),
          async (permission) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            const beforeGrant = new Date().toISOString();
            await permissionManager.requestPermission(permission);
            const afterGrant = new Date().toISOString();

            const state = await permissionManager.getPermissionState(permission);

            // Property: State must exist with valid metadata
            expect(state).not.toBeNull();
            expect(state?.permission).toBe(permission);
            expect(state?.granted).toBe(true);
            expect(state?.grantedAt).toBeDefined();
            
            // Timestamp must be within reasonable bounds
            if (state?.grantedAt) {
              expect(state.grantedAt >= beforeGrant).toBe(true);
              expect(state.grantedAt <= afterGrant).toBe(true);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should persist multiple permissions independently', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate array of unique permissions
          fc.uniqueArray(fc.constantFrom(...Object.values(Permission)), { minLength: 2, maxLength: 5 }),
          async (permissions) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Generate tokens matching the number of permissions
            const tokens = permissions.map((_, i) => `token-${i}-${Math.random()}`);
            
            // Grant all permissions
            for (let i = 0; i < permissions.length; i++) {
              await permissionManager.requestPermission(permissions[i], tokens[i]);
            }

            // Property: All permissions must be independently accessible
            for (let i = 0; i < permissions.length; i++) {
              const hasPermission = await permissionManager.hasPermission(permissions[i]);
              expect(hasPermission).toBe(true);
              
              // Note: Multiple permissions can share the same surface (e.g., READ_WALLET and SIGN_TRANSACTIONS both use WALLET surface)
              // So we verify the token exists for the surface, but it may be the last token set for that surface
              const surface = getSurfaceForPermission(permissions[i]);
              const token = await permissionManager.getToken(surface);
              
              // Token should exist if we provided one
              if (tokens[i]) {
                expect(token).toBeDefined();
                expect(token).not.toBeNull();
                
                // If this is the last permission for this surface, token should match
                const lastPermissionForSurface = permissions.findLastIndex(p => getSurfaceForPermission(p) === surface);
                if (lastPermissionForSurface === i) {
                  expect(token).toBe(tokens[i]);
                }
              }
            }
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  /**
   * Property 2: Permission Revocation Cleanup (Requirements 1.3)
   * 
   * Universal Property: When a permission is revoked, all associated data
   * (permission state, OAuth tokens, cached data) must be completely removed
   * and the permission must no longer be accessible.
   * 
   * Validates: Requirements 1.3 - "WHEN a user revokes a surface permission, 
   * THE PermissionManager SHALL invalidate all associated tokens and delete 
   * cached data from that surface"
   */
  describe('Property 2: Permission Revocation Cleanup', () => {
    it('should completely remove permission state on revocation', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...Object.values(Permission)),
          fc.string({ minLength: 10, maxLength: 100 }),
          async (permission, token) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Grant permission
            await permissionManager.requestPermission(permission, token);
            
            // Verify it's granted
            expect(await permissionManager.hasPermission(permission)).toBe(true);
            
            // Revoke permission
            await permissionManager.revokePermission(permission);

            // Property: Permission must be completely removed
            const hasPermission = await permissionManager.hasPermission(permission);
            const storedToken = await permissionManager.getToken(getSurfaceForPermission(permission));
            const state = await permissionManager.getPermissionState(permission);

            expect(hasPermission).toBe(false);
            expect(storedToken).toBeNull();
            expect(state).toBeNull();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not affect other permissions when revoking one', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.uniqueArray(fc.constantFrom(...Object.values(Permission)), { minLength: 3, maxLength: 5 }),
          fc.array(fc.string({ minLength: 10, maxLength: 50 }), { minLength: 3, maxLength: 5 }),
          fc.integer({ min: 0, max: 2 }), // Index of permission to revoke
          async (permissions, tokens, revokeIndex) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Grant all permissions
            for (let i = 0; i < permissions.length; i++) {
              await permissionManager.requestPermission(permissions[i], tokens[i]);
            }

            // Revoke one permission
            const revokedPermission = permissions[revokeIndex];
            await permissionManager.revokePermission(revokedPermission);

            // Property: Only revoked permission should be removed
            for (let i = 0; i < permissions.length; i++) {
              const hasPermission = await permissionManager.hasPermission(permissions[i]);
              
              if (i === revokeIndex) {
                expect(hasPermission).toBe(false);
              } else {
                expect(hasPermission).toBe(true);
              }
            }
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle revocation of non-existent permissions gracefully', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...Object.values(Permission)),
          async (permission) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Property: Revoking non-existent permission should not throw
            await expect(
              permissionManager.revokePermission(permission)
            ).resolves.not.toThrow();

            // State should remain clean
            const hasPermission = await permissionManager.hasPermission(permission);
            expect(hasPermission).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 3: Unauthorized Access Rejection (Requirements 1.4)
   * 
   * Universal Property: Any attempt to check or use a permission that has not
   * been granted must return false/null, ensuring no unauthorized access.
   * 
   * Validates: Requirements 1.4 - "WHEN Ordo attempts to access a surface 
   * without permission, THE OrchestrationEngine SHALL return an error message 
   * requesting the user to grant permission"
   */
  describe('Property 3: Unauthorized Access Rejection', () => {
    it('should reject access to ungranted permissions', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...Object.values(Permission)),
          async (permission) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Property: Ungranted permission must return false
            const hasPermission = await permissionManager.hasPermission(permission);
            expect(hasPermission).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return null for tokens of ungranted permissions', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...Object.values(Surface)),
          async (surface) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Property: Token for ungranted surface must be null
            const token = await permissionManager.getToken(surface);
            expect(token).toBeNull();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return null for state of ungranted permissions', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...Object.values(Permission)),
          async (permission) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Property: State for ungranted permission must be null
            const state = await permissionManager.getPermissionState(permission);
            expect(state).toBeNull();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not include ungranted permissions in granted list', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.uniqueArray(fc.constantFrom(...Object.values(Permission)), { minLength: 2, maxLength: 5 }),
          fc.integer({ min: 0, max: 1 }), // Number of permissions to grant
          async (allPermissions, grantCount) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Grant only some permissions
            const grantedPermissions = allPermissions.slice(0, grantCount);
            const ungrantedPermissions = allPermissions.slice(grantCount);

            for (const permission of grantedPermissions) {
              await permissionManager.requestPermission(permission);
            }

            // Property: Only granted permissions should be in the list
            const grantedList = await permissionManager.getGrantedPermissions();
            
            for (const permission of grantedPermissions) {
              expect(grantedList).toContain(permission);
            }
            
            for (const permission of ungrantedPermissions) {
              expect(grantedList).not.toContain(permission);
            }
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  /**
   * Property 4: Permission Status Completeness (Requirements 1.6)
   * 
   * Universal Property: The permission status display must accurately reflect
   * all granted permissions with complete metadata (surface, timestamp).
   * 
   * Validates: Requirements 1.6 - "WHEN displaying permission status, 
   * THE Ordo_System SHALL show which surfaces are currently authorized 
   * and when authorization was granted"
   */
  describe('Property 4: Permission Status Completeness', () => {
    it('should provide complete status for all granted permissions', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.uniqueArray(fc.constantFrom(...Object.values(Permission)), { minLength: 1, maxLength: 5 }),
          async (permissions) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Grant all permissions
            for (const permission of permissions) {
              await permissionManager.requestPermission(permission);
            }

            // Property: All states must be complete and accurate
            const allStates = await permissionManager.getAllPermissionStates();
            
            expect(allStates).toHaveLength(permissions.length);
            
            for (const state of allStates) {
              // Each state must have all required fields
              expect(state.permission).toBeDefined();
              expect(state.surface).toBeDefined();
              expect(state.granted).toBe(true);
              expect(state.grantedAt).toBeDefined();
              
              // Permission must be in the granted list
              expect(permissions).toContain(state.permission);
              
              // Surface must match permission
              const expectedSurface = getSurfaceForPermission(state.permission);
              expect(state.surface).toBe(expectedSurface);
            }
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should maintain accurate count of granted permissions', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.uniqueArray(fc.constantFrom(...Object.values(Permission)), { minLength: 0, maxLength: 5 }),
          async (permissions) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Grant permissions
            for (const permission of permissions) {
              await permissionManager.requestPermission(permission);
            }

            // Property: Count must match exactly
            const grantedList = await permissionManager.getGrantedPermissions();
            const allStates = await permissionManager.getAllPermissionStates();
            
            expect(grantedList).toHaveLength(permissions.length);
            expect(allStates).toHaveLength(permissions.length);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should update status correctly after revocations', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.uniqueArray(fc.constantFrom(...Object.values(Permission)), { minLength: 3, maxLength: 5 }),
          fc.integer({ min: 1, max: 2 }), // Number of permissions to revoke
          async (permissions, revokeCount) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Grant all permissions
            for (const permission of permissions) {
              await permissionManager.requestPermission(permission);
            }

            // Revoke some permissions
            const revokedPermissions = permissions.slice(0, revokeCount);
            const remainingPermissions = permissions.slice(revokeCount);

            for (const permission of revokedPermissions) {
              await permissionManager.revokePermission(permission);
            }

            // Property: Status must reflect current state accurately
            const grantedList = await permissionManager.getGrantedPermissions();
            const allStates = await permissionManager.getAllPermissionStates();
            
            expect(grantedList).toHaveLength(remainingPermissions.length);
            expect(allStates).toHaveLength(remainingPermissions.length);
            
            for (const permission of remainingPermissions) {
              expect(grantedList).toContain(permission);
            }
            
            for (const permission of revokedPermissions) {
              expect(grantedList).not.toContain(permission);
            }
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  /**
   * Additional Property: Token Management Consistency
   * 
   * Universal Property: Token storage and retrieval must be consistent
   * with permission state.
   */
  describe('Additional Property: Token Management Consistency', () => {
    it('should maintain token consistency with permission state', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...Object.values(Permission)),
          fc.string({ minLength: 10, maxLength: 100 }),
          async (permission, token) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Grant permission with token
            await permissionManager.requestPermission(permission, token);

            // Property: Token must be retrievable if permission is granted
            const hasPermission = await permissionManager.hasPermission(permission);
            const storedToken = await permissionManager.getToken(getSurfaceForPermission(permission));

            if (hasPermission) {
              expect(storedToken).toBe(token);
            } else {
              expect(storedToken).toBeNull();
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle token refresh correctly', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...Object.values(Surface)),
          fc.string({ minLength: 10, maxLength: 50 }),
          fc.string({ minLength: 10, maxLength: 50 }),
          async (surface, oldToken, newToken) => {
            // Clear storage for test isolation
            mockStorage.clear();
            
            // Assume oldToken and newToken are different
            fc.pre(oldToken !== newToken);

            // Store old token
            await permissionManager.refreshToken(surface, oldToken);
            expect(await permissionManager.getToken(surface)).toBe(oldToken);

            // Refresh with new token
            await permissionManager.refreshToken(surface, newToken);

            // Property: New token must replace old token
            const currentToken = await permissionManager.getToken(surface);
            expect(currentToken).toBe(newToken);
            expect(currentToken).not.toBe(oldToken);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});

// Helper function to get surface for permission
function getSurfaceForPermission(permission: Permission): Surface {
  const mapping: Record<Permission, Surface> = {
    [Permission.READ_GMAIL]: Surface.GMAIL,
    [Permission.READ_SOCIAL_X]: Surface.X,
    [Permission.READ_SOCIAL_TELEGRAM]: Surface.TELEGRAM,
    [Permission.READ_WALLET]: Surface.WALLET,
    [Permission.SIGN_TRANSACTIONS]: Surface.WALLET,
  };
  return mapping[permission];
}
