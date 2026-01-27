# Ordo AI Coding Instructions - Complete Index

This is the master index for all AI coding instructions for the Ordo project.

## 📚 Documentation Structure

### 1. **AI_CODING_INSTRUCTIONS.md** - Master Instructions
**Purpose**: Core principles, architecture, and general coding guidelines

**Contents**:
- Project context and tech stack
- Three-tier permission model
- Code quality standards
- Security requirements
- File structure
- Code generation guidelines (TypeScript, Python)
- Security patterns (CRITICAL)
- Common tasks & templates
- Response format
- Error messages
- Prohibited actions

**When to use**: Read this FIRST before generating any Ordo code.

---

### 2. **AI_COMPONENT_TEMPLATES.md** - Ready-to-Use Templates
**Purpose**: Copy-paste templates for common components

**Contents**:
- PermissionManager template (TypeScript)
- PolicyEngine template (Python)
- MCP Server template (Python)
- Property-Based Test template (Python)
- React Component template (TypeScript)

**When to use**: When you need a quick starting point for a new component.

---

### 3. **AI_PROPERTY_TESTING_GUIDE.md** - Property-Based Testing
**Purpose**: Complete guide for implementing PBT in Ordo

**Contents**:
- Why property-based testing?
- Ordo's 46 security properties
- Permission system properties (1-4)
- Content filtering properties (5-9)
- Write operation properties (10-11)
- Wallet security properties (12)
- Response properties (13-15)
- Writing new property tests
- Common pitfalls
- Running tests in CI/CD
- Debugging failed properties

**When to use**: When implementing or debugging property-based tests.

---

### 4. **AI_SPECIALIZED_INSTRUCTIONS.md** - Component-Specific Guides
**Purpose**: Detailed instructions for specific Ordo components

**Contents**:
- PermissionManager (detailed)
- PolicyEngine (detailed)
- RAG System
- MCP Servers
- OrchestrationEngine
- SeedVaultAdapter
- UI Components

**When to use**: When generating a specific component that has specialized requirements.

---

## 🎯 Quick Start Guide

### For AI Agents

1. **Read** `AI_CODING_INSTRUCTIONS.md` to understand core principles
2. **Check** `AI_COMPONENT_TEMPLATES.md` for relevant templates
3. **Reference** `AI_SPECIALIZED_INSTRUCTIONS.md` for component-specific details
4. **Follow** `AI_PROPERTY_TESTING_GUIDE.md` when writing tests

### For Developers

1. **Review** all AI instruction files to understand the system
2. **Use** templates as starting points for new components
3. **Verify** generated code follows security patterns
4. **Run** property-based tests to validate correctness

---

## 🔐 Security Checklist

Before accepting any generated code, verify:

- [ ] Uses expo-secure-store for token storage
- [ ] Checks permissions before surface access
- [ ] Filters sensitive data (OTP, passwords, recovery phrases)
- [ ] Requires user confirmation for write operations
- [ ] Uses Seed Vault + MWA for wallet operations (NEVER private keys)
- [ ] Includes error handling with user-friendly messages
- [ ] Has property-based tests for security properties
- [ ] Logs sensitive access attempts to audit trail

---

## 📋 Component Generation Workflow

### Step 1: Understand Requirements
- Read task from `.kiro/specs/ordo/tasks.md`
- Check requirements in `.kiro/specs/ordo/requirements.md`
- Review design in `.kiro/specs/ordo/design.md`

### Step 2: Choose Template
- Find relevant template in `AI_COMPONENT_TEMPLATES.md`
- Or check specialized instructions in `AI_SPECIALIZED_INSTRUCTIONS.md`

### Step 3: Generate Code
- Follow patterns from `AI_CODING_INSTRUCTIONS.md`
- Apply security patterns (CRITICAL)
- Include error handling
- Add JSDoc/docstrings

### Step 4: Write Tests
- Add unit tests for business logic
- Add property-based tests for security properties
- Follow `AI_PROPERTY_TESTING_GUIDE.md`

### Step 5: Verify
- Run tests: `npm test` or `pytest`
- Check security checklist above
- Verify integration with existing code

---

## 🚨 Critical Security Patterns

### Pattern 1: Permission Check
```typescript
const hasPermission = await PermissionManager.getInstance()
  .hasPermission(Permission.READ_GMAIL);

if (!hasPermission) {
  throw new Error('Gmail access not granted');
}
```

### Pattern 2: Sensitive Data Filter
```python
scan_result = policy_engine.scan_content(text)
if scan_result.is_sensitive:
    # Block and log
    await audit_logger.log_blocked_access(...)
    return None
```

### Pattern 3: User Confirmation
```typescript
const confirmed = await showConfirmationDialog({
  title: 'Send Email',
  preview: { to, subject, body }
});

if (!confirmed) {
  return { success: false, cancelled: true };
}
```

### Pattern 4: Seed Vault (MWA)
```typescript
return await transact(async (wallet) => {
  const authResult = await wallet.authorize({...});
  const signedTxs = await wallet.signTransactions({...});
  return signedTxs[0];
});
```

---

## 📖 Additional Resources

### Design Documents
- **Requirements**: `.kiro/specs/ordo/requirements.md` (21 requirements)
- **Design**: `.kiro/specs/ordo/design.md` (Complete architecture)
- **Tasks**: `.kiro/specs/ordo/tasks.md` (200+ implementation tasks)
- **Tools**: `.kiro/specs/ordo/SOLANA_AGENT_KIT_TOOLS.md` (Solana Agent Kit reference)

### Code Examples
- **Frontend**: `ordo/` (React Native + Expo)
- **Backend**: `ordo-backend/` (FastAPI + LangGraph)
- **Tests**: `ordo/__tests__/` and `ordo-backend/tests/`

---

## 🤖 AI Agent Acknowledgment

When ready to generate Ordo components, respond with:

```
Acknowledged. Ready to generate Ordo components.

I have reviewed:
✅ AI_CODING_INSTRUCTIONS.md - Core principles and patterns
✅ AI_COMPONENT_TEMPLATES.md - Ready-to-use templates
✅ AI_PROPERTY_TESTING_GUIDE.md - Property-based testing guide
✅ AI_SPECIALIZED_INSTRUCTIONS.md - Component-specific details

I understand:
✅ Three-tier permission model (Surface → Policy → Confirmation)
✅ Security patterns (Permission check, Sensitive filter, User confirmation, Seed Vault)
✅ Code quality standards (TypeScript strict, Python type hints, error handling)
✅ Testing requirements (Unit tests + Property-based tests)

Ready to generate production-ready, security-first Ordo code.
```

---

## 📝 Version History

- **v1.0.0** (2026-01-28): Initial comprehensive AI instruction set
  - Master instructions
  - Component templates
  - Property testing guide
  - Specialized instructions
  - Complete index

---

## 🔄 Maintenance

These instructions should be updated when:
- New security patterns are identified
- New components are added to the architecture
- New property-based tests are defined
- Security vulnerabilities are discovered and patched

**Last Updated**: 2026-01-28
**Maintainer**: Ordo Development Team
**Status**: ✅ Complete and Ready for Use
