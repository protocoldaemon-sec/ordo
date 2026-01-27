# Ordo AI Coding Instructions - README

## 🎯 Purpose

This directory contains comprehensive AI coding instructions for generating production-ready Ordo components. These instructions ensure all generated code follows security best practices, architectural patterns, and testing requirements.

## 📁 Files Overview

| File | Purpose | When to Use |
|------|---------|-------------|
| **AI_INSTRUCTIONS_INDEX.md** | Master index and quick reference | Start here - overview of all instructions |
| **AI_CODING_INSTRUCTIONS.md** | Core principles and patterns | Before generating any code |
| **AI_COMPONENT_TEMPLATES.md** | Ready-to-use code templates | Need a quick starting point |
| **AI_PROPERTY_TESTING_GUIDE.md** | Property-based testing guide | Writing security tests |
| **AI_RAG_MCP_GUIDE.md** | RAG system and MCP servers | Implementing RAG or MCP components |
| **AI_SPECIALIZED_INSTRUCTIONS.md** | Component-specific details | Generating specific components |

## 🚀 Quick Start

### For AI Coding Agents

1. **Read** `AI_INSTRUCTIONS_INDEX.md` first
2. **Review** `AI_CODING_INSTRUCTIONS.md` for core principles
3. **Check** `AI_COMPONENT_TEMPLATES.md` for templates
4. **Reference** specialized guides as needed

### For Human Developers

1. **Understand** the instruction structure
2. **Use** templates to bootstrap new components
3. **Verify** generated code follows security patterns
4. **Run** property-based tests to validate

## 🔐 Security-First Approach

All instructions emphasize Ordo's three-tier security model:

1. **Tier 1: Surface Access** - User-granted permissions
2. **Tier 2: Policy Filtering** - Automatic sensitive data blocking
3. **Tier 3: User Confirmation** - Explicit approval for write operations

### Critical Security Patterns

Every generated component MUST:
- ✅ Check permissions before surface access
- ✅ Filter sensitive data (OTP, passwords, recovery phrases)
- ✅ Require user confirmation for write operations
- ✅ Use Seed Vault + MWA for wallet operations (NEVER private keys)
- ✅ Include property-based tests for security properties

## 📚 Documentation Structure

```
.kiro/specs/ordo/
├── AI_INSTRUCTIONS_INDEX.md          # Master index (START HERE)
├── AI_CODING_INSTRUCTIONS.md         # Core principles & patterns
├── AI_COMPONENT_TEMPLATES.md         # Copy-paste templates
├── AI_PROPERTY_TESTING_GUIDE.md      # PBT guide with 46 properties
├── AI_RAG_MCP_GUIDE.md               # RAG & MCP implementation
├── AI_SPECIALIZED_INSTRUCTIONS.md    # Component-specific details
├── README_AI_INSTRUCTIONS.md         # This file
│
├── requirements.md                    # 21 functional requirements
├── design.md                          # Complete architecture
├── tasks.md                           # 200+ implementation tasks
└── SOLANA_AGENT_KIT_TOOLS.md         # Solana Agent Kit reference
```

## 🎓 Learning Path

### Beginner (New to Ordo)
1. Read `AI_INSTRUCTIONS_INDEX.md`
2. Review `AI_CODING_INSTRUCTIONS.md` sections:
   - Project Context
   - Core Principles
   - Security Patterns
3. Study `AI_COMPONENT_TEMPLATES.md` examples

### Intermediate (Ready to Generate Code)
1. Choose component from `tasks.md`
2. Find relevant template in `AI_COMPONENT_TEMPLATES.md`
3. Follow patterns from `AI_CODING_INSTRUCTIONS.md`
4. Add tests using `AI_PROPERTY_TESTING_GUIDE.md`

### Advanced (Complex Components)
1. Review `AI_SPECIALIZED_INSTRUCTIONS.md` for component
2. Study `AI_RAG_MCP_GUIDE.md` for RAG/MCP systems
3. Implement with full test coverage
4. Verify against all 46 security properties

## 🧪 Testing Requirements

### Unit Tests
- All business logic functions
- Error handling paths
- Edge cases

### Property-Based Tests
- 46 security properties defined in design doc
- 100+ iterations per property
- Use Hypothesis (Python) or fast-check (TypeScript)

### Integration Tests
- API endpoints
- OAuth flows
- MCP tool execution
- End-to-end user flows

## 🛠️ Code Generation Workflow

```
1. Read Task → 2. Choose Template → 3. Generate Code → 4. Write Tests → 5. Verify Security
```

### Step-by-Step

1. **Read Task** from `tasks.md`
   - Understand requirements
   - Check design doc for details

2. **Choose Template** from `AI_COMPONENT_TEMPLATES.md`
   - PermissionManager
   - PolicyEngine
   - MCP Server
   - React Component
   - Property Test

3. **Generate Code** following `AI_CODING_INSTRUCTIONS.md`
   - Apply security patterns
   - Include error handling
   - Add JSDoc/docstrings

4. **Write Tests** using `AI_PROPERTY_TESTING_GUIDE.md`
   - Unit tests for logic
   - Property tests for security
   - Integration tests for flows

5. **Verify Security** against checklist
   - Permission checks
   - Sensitive data filtering
   - User confirmation
   - Seed Vault usage
   - Audit logging

## 🔍 Common Use Cases

### Use Case 1: Generate PermissionManager

1. Read `AI_COMPONENT_TEMPLATES.md` → PermissionManager template
2. Customize for Ordo's surfaces (Gmail, X, Telegram, Wallet)
3. Add property tests from `AI_PROPERTY_TESTING_GUIDE.md` (Properties 1-4)
4. Verify token encryption with expo-secure-store

### Use Case 2: Create MCP Server

1. Read `AI_RAG_MCP_GUIDE.md` → MCP Server section
2. Use template from `AI_COMPONENT_TEMPLATES.md`
3. Add interceptors for permission checking
4. Test with Kiro MCP panel

### Use Case 3: Implement RAG System

1. Read `AI_RAG_MCP_GUIDE.md` → RAG System section
2. Implement Embedder, Vector Store, Retriever
3. Set up Supabase pgvector
4. Test semantic search with property tests

### Use Case 4: Add Property-Based Test

1. Read `AI_PROPERTY_TESTING_GUIDE.md`
2. Identify property to test (from 46 properties)
3. Use Hypothesis (Python) or fast-check (TypeScript)
4. Run 100+ iterations
5. Debug counterexamples

## 📊 Metrics & Quality Gates

### Code Quality
- ✅ TypeScript strict mode enabled
- ✅ Python type hints (mypy compatible)
- ✅ ESLint/Prettier passing
- ✅ No console.log in production

### Test Coverage
- ✅ >80% unit test coverage
- ✅ All 46 security properties tested
- ✅ Integration tests for critical paths
- ✅ Property tests with 100+ iterations

### Security
- ✅ No private key access
- ✅ All tokens encrypted at rest
- ✅ Sensitive data filtered
- ✅ User confirmation for writes
- ✅ Audit logging enabled

## 🚨 Common Pitfalls

### ❌ Don't
- Access wallet private keys directly
- Store OAuth tokens in plain text
- Skip permission checks
- Auto-send emails/messages without confirmation
- Log sensitive data (tokens, passwords)
- Use HTTP for API calls

### ✅ Do
- Use Seed Vault + MWA for wallet operations
- Encrypt tokens with expo-secure-store
- Check permissions before every surface access
- Show confirmation dialog for all write operations
- Log access attempts to audit trail
- Use HTTPS only

## 🔄 Maintenance

### When to Update Instructions

- New security patterns identified
- New components added to architecture
- New property-based tests defined
- Security vulnerabilities discovered
- Framework/library updates

### How to Update

1. Update relevant instruction file
2. Update `AI_INSTRUCTIONS_INDEX.md` if structure changes
3. Add examples to `AI_COMPONENT_TEMPLATES.md`
4. Document in version history

## 📞 Support

### For Questions

- Check `AI_INSTRUCTIONS_INDEX.md` for quick reference
- Review `AI_CODING_INSTRUCTIONS.md` for patterns
- Study examples in `AI_COMPONENT_TEMPLATES.md`
- Read specialized guides for complex components

### For Issues

- Verify code follows security patterns
- Run property-based tests
- Check error messages are user-friendly
- Ensure integration with existing code

## 🎉 Success Criteria

Code is ready when:
- ✅ Follows all security patterns
- ✅ Has comprehensive tests (unit + property)
- ✅ Passes all quality gates
- ✅ Integrates with existing components
- ✅ Has clear error messages
- ✅ Includes JSDoc/docstrings

## 📝 Version

- **Version**: 1.0.0
- **Last Updated**: 2026-01-28
- **Status**: ✅ Complete and Production-Ready

---

**Ready to generate Ordo components?** Start with `AI_INSTRUCTIONS_INDEX.md`!
