# Resource References

This document lists critical resources for deep research and implementation guidance. Always consult these sources when working on related features.

## LLM Documentation Files

Located in `resources/llms/`:

### Core Technologies
- **`langchain-llms.txt`** - LangChain, LangGraph, LangSmith documentation
  - Use for: AI orchestration, agent workflows, tool integration
  
- **`solana-llms.txt`** - Solana blockchain documentation
  - Use for: Blockchain operations, transactions, accounts
  
- **`solana-mobile-llms.txt`** - Solana Mobile Stack documentation
  - Use for: MWA, Seed Vault, mobile wallet integration
  
- **`solana-app-kit-llms.txt`** - Solana App Kit documentation
  - Use for: Wallet UI components, connection management

### Integration Services
- **`helius-llms.txt`** - Helius RPC and API documentation
  - Use for: Enhanced RPC, webhooks, NFT APIs, DAS API
  
- **`sendai-llms.txt`** - Sendai (Solana Agent Kit) documentation
  - Use for: AI agent tools, DeFi operations, NFT management

### Additional Resources
- **`flutter-llms.txt`** - Flutter framework documentation
  - Use for: Cross-platform mobile development reference
  
- **`openrouter-llms.txt`** - OpenRouter API documentation
  - Use for: LLM routing and fallback strategies
  
- **`resources.md`** - Resource index and links

## Reference Repositories

Located in `resources/`:

### Agent and AI Tools
- **`resources/solana-agent-kit/`** - Solana Agent Kit repository
  - Complete implementation of Solana AI agent tools
  - DeFi integrations: Jupiter, Lulo, Sanctum, Drift
  - NFT operations: Metaplex, Tensor
  - Trading: Manifest, Adrena
  - Use for: Tool implementation patterns, API usage examples

- **`resources/plugin-god-mode/`** - Plugin God Mode repository
  - Advanced plugin architecture patterns
  - Use for: Plugin system design, extensibility patterns

### MCP Servers
- **`resources/solana-mcp/`** - Solana MCP Server
  - Model Context Protocol implementation for Solana
  - Use for: MCP tool definitions, Solana integration patterns

- **`resources/x402-mcp/`** - X402 MCP Server
  - Additional MCP server implementations
  - Use for: MCP architecture patterns, tool design

### Framework Reference
- **`resources/flutter/`** - Flutter framework source
  - Complete Flutter framework codebase
  - Use for: Mobile development patterns, widget architecture

## Usage Guidelines

### When to Consult Resources

1. **Before implementing new features**:
   - Check relevant LLM docs for API patterns
   - Review reference repos for implementation examples

2. **When integrating external services**:
   - Helius: Check `helius-llms.txt` for API capabilities
   - Solana: Check `solana-llms.txt` and `solana-mobile-llms.txt`
   - LangChain: Check `langchain-llms.txt` for orchestration patterns

3. **When building AI agent tools**:
   - Review `solana-agent-kit/` for tool patterns
   - Check `sendai-llms.txt` for agent capabilities
   - Reference `solana-mcp/` for MCP integration

4. **When working on mobile features**:
   - Check `solana-mobile-llms.txt` for MWA and Seed Vault
   - Reference `solana-app-kit-llms.txt` for wallet UI
   - Review `flutter/` for mobile patterns (if applicable)

### Research Workflow

1. **Identify the domain**: Determine which resource(s) are relevant
2. **Read documentation**: Start with LLM txt files for quick reference
3. **Review implementations**: Check reference repos for code examples
4. **Verify patterns**: Ensure implementation matches documented best practices
5. **Test thoroughly**: Validate against examples in resources

### Key Resource Paths

```
# LLM Documentation
resources/llms/langchain-llms.txt
resources/llms/solana-llms.txt
resources/llms/solana-mobile-llms.txt
resources/llms/helius-llms.txt
resources/llms/sendai-llms.txt
resources/llms/solana-app-kit-llms.txt

# Reference Implementations
resources/solana-agent-kit/
resources/solana-mcp/
resources/x402-mcp/
resources/plugin-god-mode/

# Framework Reference
resources/flutter/
```

## Priority Resources by Feature

### Wallet Integration
1. `solana-mobile-llms.txt` - MWA and Seed Vault
2. `solana-llms.txt` - Blockchain operations
3. `solana-app-kit-llms.txt` - Wallet UI components
4. `resources/solana-agent-kit/` - Implementation examples

### AI Orchestration
1. `langchain-llms.txt` - LangChain/LangGraph patterns
2. `sendai-llms.txt` - Agent tool definitions
3. `resources/solana-mcp/` - MCP integration
4. `resources/x402-mcp/` - MCP architecture

### DeFi Operations
1. `sendai-llms.txt` - DeFi tool APIs
2. `resources/solana-agent-kit/` - DeFi implementations
3. `helius-llms.txt` - RPC and data APIs
4. `solana-llms.txt` - Transaction patterns

### NFT Management
1. `helius-llms.txt` - NFT APIs and DAS
2. `sendai-llms.txt` - NFT tools
3. `resources/solana-agent-kit/` - Metaplex/Tensor examples
4. `solana-llms.txt` - NFT standards

### Mobile Development
1. `solana-mobile-llms.txt` - Mobile-specific APIs
2. `solana-app-kit-llms.txt` - Mobile UI patterns
3. `resources/flutter/` - Framework reference (if needed)

## Important Notes

- **Always check resources before implementing**: Avoid reinventing patterns that are already documented
- **Keep resources updated**: When new versions are released, update the resource files
- **Document deviations**: If implementation differs from resources, document why
- **Cross-reference**: Multiple resources may cover the same topic from different angles
- **Validate examples**: Test code examples from resources before using in production

## Resource Maintenance

When updating resources:
1. Update corresponding LLM txt files with new documentation
2. Pull latest changes from reference repositories
3. Document breaking changes in this file
4. Update implementation code to match new patterns
5. Run tests to ensure compatibility
