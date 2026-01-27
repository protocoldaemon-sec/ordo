# Ordo AI Coding Agent - Specialized Component Instructions

This document contains detailed instructions for generating specific Ordo components.

## Table of Contents

1. [PermissionManager](#permissionmanager)
2. [PolicyEngine](#policyengine)
3. [RAG System](#rag-system)
4. [MCP Servers](#mcp-servers)
5. [Property-Based Tests](#property-based-tests)
6. [OrchestrationEngine](#orchestrationengine)
7. [SeedVaultAdapter](#seedvaultadapter)
8. [UI Components](#ui-components)

---

## PermissionManager

### Purpose
Manages the three-tier permission system for all surface access (Gmail, X, Telegram, Wallet).

### Requirements
- Singleton pattern for global access
- Encrypted token storage using expo-secure-store
- Permission state persistence
- OAuth token refresh logic
- Permission revocation with cleanup

### Interface
```typescript
enum Permission {
  READ_GMAIL = 'READ_GMAIL',
  READ_SOCIAL_X = 'READ_SOCIAL_X',
  READ_SOCIAL_TELEGRAM = 'READ_SOCIAL_TELEGRAM',
  READ_WALLET = 'READ_WALLET',
  SIGN_TRANSACTIONS = 'SIGN_TRANSACTIONS'
}

enum Surface {
  GMAIL = 'GMAIL',
  X = 'X',
  TELEGRAM = 'TELEGRAM',
  WALLET = 'WALLET'
}

interface PermissionResult {
  granted: boolean;
  token?: string;
  error?: string;
}

class PermissionManager {
  static getInstance(): PermissionManager;
  
  hasPermission(permission: Permission): Promise<boolean>;
  requestPermission(permission: Permission): Promise<PermissionResult>;
  revokePermission(permission: Permission): Promise<void>;
  
  getToken(surface: Surface): Promise<string | null>;
  refreshToken(surface: Surface): Promise<string>;
  getGrantedPermissions(): Promise<Permission[]>;
}
```

### Implementation Guidelines

1. **Token Storage**
   - Use `expo-secure-store` for all OAuth tokens
   - Key format: `ordo_token_{surface}`
   - Never store tokens in AsyncStorage or plain text

2. **Permission State**
   - Store permission grants in SecureStore
   - Key format: `ordo_permission_{permission}`
   - Include grant timestamp for audit

3. **Token Refresh**
   - Implement automatic refresh on 401 errors
   - Use refresh tokens where available (Gmail, X)
   - Prompt user to re-authenticate if refresh fails

4. **Revocation Cleanup**
   - Delete OAuth tokens from SecureStore
   - Clear cached data for that surface
   - Log revocation to audit trail
   - Notify OrchestrationEngine to update state

### Testing Requirements
```typescript
// Property-based tests
- Property 1: Permission state persistence
- Property 2: Permission revocation cleanup
- Property 3: Unauthorized access rejection
- Property 4: Permission status completeness

// Unit tests
- Test token encryption/decryption
- Test permission grant/revoke flow
- Test token refresh logic
- Test error handling for expired tokens
```

### Example Usage
```typescript
const manager = PermissionManager.getInstance();

// Check permission
const hasGmail = await manager.hasPermission(Permission.READ_GMAIL);

// Request permission (triggers OAuth flow)
const result = await manager.requestPermission(Permission.READ_GMAIL);
if (result.granted) {
  console.log('Gmail access granted');
}

// Get token for API call
const token = await manager.getToken(Surface.GMAIL);

// Revoke permission
await manager.revokePermission(Permission.READ_GMAIL);
```

---

## PolicyEngine

### Purpose
Server-side content filtering to block sensitive data (OTP codes, passwords, recovery phrases).

### Requirements
- Pattern-based content scanning
- Multi-surface support (email, social, wallet)
- Audit logging for blocked content
- Configurable sensitivity patterns
- Performance: <100ms per item

### Interface
```python
class PolicyEngine:
    def __init__(self):
        self.patterns: Dict[str, Pattern] = {}
    
    def scan_content(self, text: str) -> ScanResult
    def filter_emails(self, emails: List[Email]) -> List[Email]
    def filter_messages(self, messages: List[Message]) -> List[Message]
    def is_sensitive(self, text: str) -> bool
```

