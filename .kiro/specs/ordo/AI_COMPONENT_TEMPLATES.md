# Ordo Component Templates - Copy-Paste Ready

Quick reference templates for common Ordo components.

## PermissionManager Template

```typescript
// ordo/services/PermissionManager.ts
import * as SecureStore from 'expo-secure-store';

export enum Permission {
  READ_GMAIL = 'READ_GMAIL',
  READ_SOCIAL_X = 'READ_SOCIAL_X',
  READ_SOCIAL_TELEGRAM = 'READ_SOCIAL_TELEGRAM',
  READ_WALLET = 'READ_WALLET',
  SIGN_TRANSACTIONS = 'SIGN_TRANSACTIONS'
}

export enum Surface {
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

export class PermissionManager {
  private static instance: PermissionManager;
  
  private constructor() {}
  
  static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }
  
  async hasPermission(permission: Permission): Promise<boolean> {
    try {
      const key = `ordo_permission_${permission}`;
      const value = await SecureStore.getItemAsync(key);
      return value === 'granted';
    } catch (error) {
      console.error('[PermissionManager] Failed to check permission:', error);
      return false;
    }
  }
  
  async requestPermission(permission: Permission): Promise<PermissionResult> {
    // Implementation depends on surface
    // Trigger OAuth flow for Gmail/X
    // Store bot token for Telegram
    // Authorize with Seed Vault for Wallet
    throw new Error('Not implemented');
  }
  
  async revokePermission(permission: Permission): Promise<void> {
    try {
      const key = `ordo_permission_${permission}`;
      await SecureStore.deleteItemAsync(key);
      
      // Delete associated token
      const surface = this.getSurfaceFromPermission(permission);
      const tokenKey = `ordo_token_${surface}`;
      await SecureStore.deleteItemAsync(tokenKey);
      
      // TODO: Clear cached data
      // TODO: Log to audit trail
    } catch (error) {
      console.error('[PermissionManager] Failed to revoke permission:', error);
      throw error;
    }
  }
  
  async getToken(surface: Surface): Promise<string | null> {
    try {
      const key = `ordo_token_${surface}`;
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('[PermissionManager] Failed to get token:', error);
      return null;
    }
  }
  
  async refreshToken(surface: Surface): Promise<string> {
    // Implementation depends on surface
    throw new Error('Not implemented');
  }
  
  async getGrantedPermissions(): Promise<Permission[]> {
    const permissions: Permission[] = [];
    for (const permission of Object.values(Permission)) {
      if (await this.hasPermission(permission)) {
        permissions.push(permission);
      }
    }
    return permissions;
  }
  
  private getSurfaceFromPermission(permission: Permission): Surface {
    if (permission === Permission.READ_GMAIL) return Surface.GMAIL;
    if (permission === Permission.READ_SOCIAL_X) return Surface.X;
    if (permission === Permission.READ_SOCIAL_TELEGRAM) return Surface.TELEGRAM;
    if (permission === Permission.READ_WALLET || permission === Permission.SIGN_TRANSACTIONS) {
      return Surface.WALLET;
    }
    throw new Error(`Unknown permission: ${permission}`);
  }
}
```

## PolicyEngine Template

```python
# ordo-backend/ordo_backend/security/policy_engine.py
import re
from typing import List, Dict, Tuple
from dataclasses import dataclass
import structlog

logger = structlog.get_logger()

@dataclass
class ScanResult:
    is_sensitive: bool
    patterns_found: List[str]
    reason: str

class PolicyEngine:
    """
    Server-side content filtering for sensitive data
    """
    
    BLOCKED_PATTERNS = {
        'OTP_CODE': r'\b\d{4,8}\b.*(?:code|otp|verification)',
        'VERIFICATION_CODE': r'(?:verification|confirm|verify).*code.*\d{4,8}',
        'RECOVERY_PHRASE': r'\b(?:word\s+\d+|seed phrase|recovery phrase|mnemonic)\b',
        'PASSWORD_RESET': r'(?:reset|change).*password',
        'BANK_STATEMENT': r'(?:bank statement|account balance|routing number)',
        'TAX_DOCUMENT': r'(?:tax return|w-2|1099|tax document)',
        'SSN': r'\b\d{3}-\d{2}-\d{4}\b',
        'CREDIT_CARD': r'\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b'
    }
    
    def __init__(self):
        self.compiled_patterns = {
            name: re.compile(pattern, re.IGNORECASE)
            for name, pattern in self.BLOCKED_PATTERNS.items()
        }
    
    def scan_content(self, text: str) -> ScanResult:
        """
        Scan text for sensitive patterns
        
        Returns:
            ScanResult with is_sensitive flag and patterns found
        """
        patterns_found = []
        
        for pattern_name, compiled_pattern in self.compiled_patterns.items():
            if compiled_pattern.search(text):
                patterns_found.append(pattern_name)
        
        is_sensitive = len(patterns_found) > 0
        reason = f"Contains: {', '.join(patterns_found)}" if is_sensitive else ""
        
        return ScanResult(
            is_sensitive=is_sensitive,
            patterns_found=patterns_found,
            reason=reason
        )
    
    def is_sensitive(self, text: str) -> bool:
        """Quick check if text contains sensitive data"""
        return self.scan_content(text).is_sensitive
    
    async def filter_emails(self, emails: List[Dict]) -> Tuple[List[Dict], int]:
        """
        Filter emails containing sensitive data
        
        Returns:
            (filtered_emails, blocked_count)
        """
        filtered = []
        blocked_count = 0
        
        for email in emails:
            # Scan subject and body
            subject = email.get('subject', '')
            body = email.get('body', '')
            combined = f"{subject} {body}"
            
            scan_result = self.scan_content(combined)
            
            if scan_result.is_sensitive:
                blocked_count += 1
                logger.info(
                    "email_blocked",
                    email_id=email.get('id'),
                    patterns=scan_result.patterns_found
                )
                # TODO: Log to audit trail
            else:
                filtered.append(email)
        
        return filtered, blocked_count
    
    async def filter_messages(self, messages: List[Dict]) -> Tuple[List[Dict], int]:
        """
        Filter social media messages containing sensitive data
        
        Returns:
            (filtered_messages, blocked_count)
        """
        filtered = []
        blocked_count = 0
        
        for message in messages:
            text = message.get('text', '')
            scan_result = self.scan_content(text)
            
            if scan_result.is_sensitive:
                blocked_count += 1
                logger.info(
                    "message_blocked",
                    message_id=message.get('id'),
                    patterns=scan_result.patterns_found
                )
                # TODO: Log to audit trail
            else:
                filtered.append(message)
        
        return filtered, blocked_count

# Singleton instance
policy_engine = PolicyEngine()
```

## MCP Server Template

```python
# ordo-backend/ordo_backend/mcp_servers/email.py
from fastmcp import FastMCP
from typing import List, Dict, Any
import structlog
import httpx

logger = structlog.get_logger()
mcp = FastMCP("Ordo Email Server")

@mcp.tool()
async def search_email_threads(
    query: str,
    token: str,  # Injected by interceptor
    user_id: str,  # Injected by interceptor
    max_results: int = 10
) -> List[Dict[str, Any]]:
    """
    Search Gmail threads using Gmail API
    
    Args:
        query: Search query string
        token: OAuth token for Gmail API
        user_id: User ID for audit logging
        max_results: Maximum number of results (default: 10)
    
    Returns:
        List of email threads with subject, sender, date
    """
    try:
        logger.info("searching_emails", user_id=user_id, query=query)
        
        # Call Gmail API
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://gmail.googleapis.com/gmail/v1/users/me/threads",
                headers={"Authorization": f"Bearer {token}"},
                params={"q": query, "maxResults": max_results}
            )
            response.raise_for_status()
            data = response.json()
        
        threads = data.get('threads', [])
        
        # Apply policy filtering
        from ordo_backend.security.policy_engine import policy_engine
        filtered_threads, blocked_count = await policy_engine.filter_emails(threads)
        
        logger.info(
            "email_search_complete",
            user_id=user_id,
            total=len(threads),
            filtered=len(filtered_threads),
            blocked=blocked_count
        )
        
        return filtered_threads
        
    except Exception as e:
        logger.error("email_search_failed", error=str(e), user_id=user_id)
        raise

@mcp.resource("email://inbox")
async def get_inbox(token: str, user_id: str) -> str:
    """
    Get user's inbox as a resource
    """
    threads = await search_email_threads("in:inbox", token, user_id, max_results=50)
    return format_threads_as_text(threads)

if __name__ == "__main__":
    mcp.run(transport="http", port=8001)
```

## Property-Based Test Template

```python
# ordo-backend/tests/test_properties.py
from hypothesis import given, strategies as st, settings
import pytest
from ordo_backend.security.policy_engine import policy_engine

@given(
    email_body=st.text(min_size=10, max_size=1000)
)
@settings(max_examples=100)
def test_property_otp_codes_always_blocked(email_body: str):
    """
    Property 6: Sensitive content filtering (Requirements 2.2, 2.3, 6.3)
    
    Given any email containing OTP/verification codes,
    When PolicyEngine scans it,
    Then it must be marked as sensitive
    """
    # Inject OTP pattern
    otp_patterns = [
        f"{email_body}\n\nYour verification code is: 123456",
        f"{email_body}\n\nOTP: 8765",
        f"Verification code 4321\n{email_body}"
    ]
    
    for email_with_otp in otp_patterns:
        scan_result = policy_engine.scan_content(email_with_otp)
        
        assert scan_result.is_sensitive, \
            f"Email with OTP should be marked sensitive: {email_with_otp[:100]}"
        
        assert any(p in ['OTP_CODE', 'VERIFICATION_CODE'] for p in scan_result.patterns_found), \
            f"Should detect OTP pattern, found: {scan_result.patterns_found}"
```

## React Component Template

```typescript
// ordo/components/permissions/PermissionRequestScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { PermissionManager, Permission } from '@/services/PermissionManager';

export function PermissionRequestScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleRequestPermission = async (permission: Permission) => {
    setLoading(true);
    setError(null);
    
    try {
      const manager = PermissionManager.getInstance();
      const result = await manager.requestPermission(permission);
      
      if (result.granted) {
        // Navigate to success screen
        console.log('Permission granted');
      } else {
        setError(result.error || 'Permission denied');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grant Permissions</Text>
      
      <Button
        title="Enable Gmail"
        onPress={() => handleRequestPermission(Permission.READ_GMAIL)}
        disabled={loading}
      />
      
      <Button
        title="Enable X/Twitter"
        onPress={() => handleRequestPermission(Permission.READ_SOCIAL_X)}
        disabled={loading}
      />
      
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
```

---

Use these templates as starting points and customize based on specific requirements.
