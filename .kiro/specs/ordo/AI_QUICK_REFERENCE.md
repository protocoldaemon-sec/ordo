# Ordo AI Coding - Quick Reference Card

One-page cheat sheet for generating Ordo components.

## 🔐 Security Patterns (MANDATORY)

### 1. Permission Check
```typescript
const manager = PermissionManager.getInstance();
if (!await manager.hasPermission(Permission.READ_GMAIL)) {
  throw new Error('Gmail access not granted');
}
const token = await manager.getToken(Surface.GMAIL);
```

### 2. Sensitive Data Filter
```python
scan_result = policy_engine.scan_content(text)
if scan_result.is_sensitive:
    await audit_logger.log_blocked_access(...)
    return None  # Block content
```

### 3. User Confirmation
```typescript
const confirmed = await showConfirmationDialog({
  title: 'Send Email',
  preview: { to, subject, body }
});
if (!confirmed) return { cancelled: true };
```

### 4. Seed Vault (MWA)
```typescript
return await transact(async (wallet) => {
  await wallet.authorize({...});
  return await wallet.signTransactions({...});
});
```

## 📁 File Locations

```
ordo/services/          → PermissionManager, Adapters, Filters
ordo/components/        → React UI components
ordo/__tests__/         → Unit & property tests

ordo-backend/ordo_backend/
  ├── api/              → FastAPI routes
  ├── orchestrator/     → LangGraph agent
  ├── mcp_servers/      → MCP servers (email, social, wallet, defi, nft, trading)
  ├── rag/              → RAG system (embedder, vector_store, retriever)
  └── security/         → PolicyEngine, AuditLogger

ordo-backend/tests/     → Python tests
```

## 🎯 Common Tasks

### Create PermissionManager
```typescript
// ordo/services/PermissionManager.ts
import * as SecureStore from 'expo-secure-store';

export class PermissionManager {
  private static instance: PermissionManager;
  static getInstance() { /* singleton */ }
  
  async hasPermission(p: Permission): Promise<boolean> {
    return await SecureStore.getItemAsync(`ordo_permission_${p}`) === 'granted';
  }
  
  async getToken(s: Surface): Promise<string | null> {
    return await SecureStore.getItemAsync(`ordo_token_${s}`);
  }
}
```

### Create MCP Server
```python
# ordo-backend/ordo_backend/mcp_servers/email.py
from fastmcp import FastMCP

mcp = FastMCP("Ordo Email Server")

@mcp.tool()
async def search_emails(query: str, token: str, user_id: str):
    # Call Gmail API
    results = await call_gmail_api(query, token)
    
    # Filter sensitive data
    filtered, blocked = await policy_engine.filter_emails(results)
    
    return filtered

if __name__ == "__main__":
    mcp.run(transport="http", port=8001)
```

### Add Property Test
```python
# ordo-backend/tests/test_properties.py
from hypothesis import given, strategies as st

@given(email_body=st.text())
def test_otp_always_blocked(email_body):
    email_with_otp = f"{email_body}\nCode: 123456"
    assert policy_engine.is_sensitive(email_with_otp) == True
```

## 🧪 Testing Commands

```bash
# Frontend
npm test                          # All tests
npm test -- PermissionManager     # Specific test
npm run test:coverage             # Coverage report

# Backend
pytest                            # All tests
pytest tests/test_properties.py   # Property tests
pytest --hypothesis-show-statistics  # PBT stats
```

## 🚨 Prohibited Actions

❌ NEVER:
- Access wallet private keys
- Store tokens in plain text
- Skip permission checks
- Auto-send without confirmation
- Log sensitive data
- Use HTTP (HTTPS only)

## ✅ Required Checks

Before submitting code:
- [ ] Uses expo-secure-store for tokens
- [ ] Checks permissions before access
- [ ] Filters sensitive data
- [ ] Requires user confirmation for writes
- [ ] Uses Seed Vault for wallet ops
- [ ] Has error handling
- [ ] Has property-based tests
- [ ] Logs to audit trail

## 📊 46 Security Properties

| ID | Property | Test With |
|----|----------|-----------|
| 1-4 | Permission system | fast-check |
| 5-9 | Content filtering | Hypothesis |
| 10-11 | Write confirmation | fast-check |
| 12 | Private key isolation | fast-check |
| 13-15 | Response sanitization | Hypothesis |
| 16-21 | Social media filtering | Hypothesis |
| 22-25 | Orchestration | Hypothesis |
| 26-27 | RAG system | Hypothesis |
| 31-40 | Error handling | fast-check + Hypothesis |
| 41-46 | DeFi/NFT/Trading | Hypothesis |

## 🔗 Quick Links

- **Index**: `AI_INSTRUCTIONS_INDEX.md`
- **Core**: `AI_CODING_INSTRUCTIONS.md`
- **Templates**: `AI_COMPONENT_TEMPLATES.md`
- **PBT Guide**: `AI_PROPERTY_TESTING_GUIDE.md`
- **RAG/MCP**: `AI_RAG_MCP_GUIDE.md`

## 💡 Tips

1. **Start with templates** - Don't write from scratch
2. **Test early** - Write property tests alongside code
3. **Check security** - Verify all 4 security patterns
4. **Use types** - TypeScript strict, Python type hints
5. **Log everything** - Audit trail for all access

## 🎯 Response Format

When generating code:

1. **Confirm**: "Generating {Component} for {Purpose}"
2. **Dependencies**: List required packages
3. **Code**: Complete, runnable implementation
4. **Security**: Explain security decisions
5. **Testing**: Provide test commands
6. **Integration**: How to integrate with existing code

## 📞 Need Help?

1. Check `AI_INSTRUCTIONS_INDEX.md` for overview
2. Read `AI_CODING_INSTRUCTIONS.md` for patterns
3. Use `AI_COMPONENT_TEMPLATES.md` for examples
4. Study `AI_PROPERTY_TESTING_GUIDE.md` for tests

---

**Version**: 1.0.0 | **Updated**: 2026-01-28 | **Status**: ✅ Ready
