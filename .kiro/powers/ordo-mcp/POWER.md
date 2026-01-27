# Ordo MCP Power

A comprehensive Model Context Protocol (MCP) integration for building privacy-first AI assistants with multi-surface data access (Gmail, Social Media, Solana Wallet, DeFi, NFT, Trading).

## Overview

This Power provides a complete MCP-based architecture for Ordo, a privacy-first AI assistant for Solana Seeker. It includes:

- **6 MCP Servers**: Email, Social, Wallet, DeFi, NFT, Trading
- **Privacy-First Design**: Multi-layer filtering with policy engine
- **Permission System**: Three-tier permission model with user consent
- **LangGraph Integration**: AI orchestration with MCP tool execution
- **Kiro Development Tools**: Built-in testing and debugging support

## Keywords

mcp, model-context-protocol, langchain, ai-assistant, privacy, solana, defi, nft, trading, email, social-media, wallet, langgraph, fastmcp, tool-integration

## Features

### MCP Servers

1. **Email MCP Server** (`ordo-email`)
   - Search Gmail threads with policy filtering
   - Get email content with sensitive data blocking
   - Send emails with user confirmation
   - Expose inbox as MCP resource

2. **Social MCP Server** (`ordo-social`)
   - Get X/Twitter DMs and mentions
   - Get Telegram messages
   - Send messages with confirmation
   - Filter sensitive content

3. **Wallet MCP Server** (`ordo-wallet`)
   - Get Solana wallet portfolio via Helius DAS API
   - Get transaction history with Enhanced Transactions
   - Build transactions for MWA signing
   - Estimate priority fees

4. **DeFi MCP Server** (`ordo-defi`)
   - Swap tokens via Jupiter Exchange
   - Lend USDC on Lulo protocol
   - Stake SOL via Sanctum
   - Bridge assets via deBridge
   - Get token prices from Birdeye
   - Launch tokens on Pump.fun

5. **NFT MCP Server** (`ordo-nft`)
   - View NFT collections with Helius DAS
   - Buy NFTs on Tensor marketplace
   - List NFTs for sale
   - Create NFT collections via Metaplex

6. **Trading MCP Server** (`ordo-trading`)
   - Open perpetual positions on Drift
   - Place limit orders on Manifest
   - Get market analysis from Birdeye
   - Create liquidity pools on Raydium

### MCP Interceptors

- **Permission Checking**: Verify user has granted access to required surfaces
- **Token Injection**: Automatically inject OAuth tokens and API keys
- **Audit Logging**: Log all tool executions for compliance
- **Context Injection**: Provide runtime context (user ID, permissions, state)

### Privacy Features

- **Policy Engine**: Multi-layer filtering for sensitive data (OTP codes, passwords, recovery phrases)
- **User Confirmation**: Explicit approval required for all write operations
- **Zero Private Key Access**: Wallet integration via Seed Vault and MWA only
- **Audit Trail**: Complete logging of all data access attempts

## Installation

### Prerequisites

```bash
# Python 3.11+
python --version

# Install dependencies
pip install fastmcp langchain-mcp-adapters langchain-mistralai langgraph httpx
```

### Kiro MCP Configuration

Create `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "ordo-email": {
      "command": "python",
      "args": ["-m", "uvicorn", "ordo_backend.mcp_servers.email:app", "--port", "8001"],
      "cwd": "${workspaceFolder}/ordo-backend",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/ordo-backend"
      },
      "disabled": false,
      "autoApprove": ["search_email_threads", "get_email_content"]
    },
    "ordo-wallet": {
      "command": "python",
      "args": ["-m", "uvicorn", "ordo_backend.mcp_servers.wallet:app", "--port", "8003"],
      "cwd": "${workspaceFolder}/ordo-backend",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/ordo-backend",
        "HELIUS_API_KEY": "${env:HELIUS_API_KEY}"
      },
      "disabled": false,
      "autoApprove": ["get_wallet_portfolio"]
    },
    "ordo-defi": {
      "command": "python",
      "args": ["-m", "uvicorn", "ordo_backend.mcp_servers.defi:app", "--port", "8004"],
      "cwd": "${workspaceFolder}/ordo-backend",
      "disabled": false
    },
    "ordo-nft": {
      "command": "python",
      "args": ["-m", "uvicorn", "ordo_backend.mcp_servers.nft:app", "--port", "8005"],
      "cwd": "${workspaceFolder}/ordo-backend",
      "disabled": false
    },
    "ordo-trading": {
      "command": "python",
      "args": ["-m", "uvicorn", "ordo_backend.mcp_servers.trading:app", "--port", "8006"],
      "cwd": "${workspaceFolder}/ordo-backend",
      "disabled": false
    }
  }
}
```

## Quick Start

### 1. Create MCP Server

```python
# ordo_backend/mcp_servers/email.py
from fastmcp import FastMCP

email_mcp = FastMCP("Ordo Email Server")

@email_mcp.tool()
async def search_email_threads(
    query: str,
    token: str,
    user_id: str,
    max_results: int = 10
) -> list[dict]:
    """
    Search Gmail threads with policy filtering
    
    Args:
        query: Search query string
        token: OAuth token for Gmail API
        user_id: User ID for audit logging
        max_results: Maximum number of results
    
    Returns:
        List of filtered email threads
    """
    # Implementation
    threads = await _search_gmail(query, token, max_results)
    filtered = await policy_engine.filter_emails(threads)
    return filtered

if __name__ == "__main__":
    email_mcp.run(transport="http", port=8001)
```

### 2. Set Up MCP Client with Interceptors

```python
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_mcp_adapters.interceptors import MCPToolCallRequest
from dataclasses import dataclass

@dataclass
class OrdoContext:
    user_id: str
    permissions: dict[str, bool]
    tokens: dict[str, str]

async def inject_ordo_context(request: MCPToolCallRequest, handler):
    """Inject permissions and tokens"""
    runtime = request.runtime
    context: OrdoContext = runtime.context
    
    # Check permissions
    tool_surface = get_surface_from_tool(request.name)
    if not context.permissions.get(tool_surface, False):
        raise PermissionError(f"Missing permission for {tool_surface}")
    
    # Inject token
    modified_request = request.override(
        args={
            **request.args,
            "token": context.tokens.get(tool_surface),
            "user_id": context.user_id
        }
    )
    return await handler(modified_request)

# Create MCP client
mcp_client = MultiServerMCPClient(
    {
        "ordo-email": {"url": "http://localhost:8001/mcp", "transport": "http"},
        "ordo-wallet": {"url": "http://localhost:8003/mcp", "transport": "http"},
    },
    tool_interceptors=[inject_ordo_context]
)

# Load tools
tools = await mcp_client.get_tools()
```

### 3. Integrate with LangGraph

```python
from langgraph.graph import StateGraph
from langchain_mistralai import ChatMistralAI

# Create agent with MCP tools
llm = ChatMistralAI(model="mistral-large-latest")
tools = await mcp_client.get_tools()

# Build LangGraph workflow
workflow = StateGraph(AgentState)
workflow.add_node("execute_tools", execute_tools_node)
# ... add more nodes

agent = workflow.compile()

# Execute with context
result = await agent.ainvoke(
    {"query": "Search my emails about hackathons"},
    context=OrdoContext(
        user_id="user_123",
        permissions={"GMAIL": True},
        tokens={"GMAIL": "oauth_token_here"}
    )
)
```

### 4. Test in Kiro

1. Open Kiro's MCP panel (View → MCP Servers)
2. Select "ordo-email" server
3. Click "Test Tool" → "search_email_threads"
4. Enter test parameters:
   ```json
   {
     "query": "test",
     "token": "fake_token",
     "user_id": "test_user",
     "max_results": 5
   }
   ```
5. View results and debug

## Architecture

### MCP Server Structure

```
ordo-backend/
├── ordo_backend/
│   ├── mcp_servers/
│   │   ├── __init__.py
│   │   ├── email.py          # Email MCP server
│   │   ├── social.py         # Social MCP server
│   │   ├── wallet.py         # Wallet MCP server
│   │   ├── defi.py           # DeFi MCP server
│   │   ├── nft.py            # NFT MCP server
│   │   └── trading.py        # Trading MCP server
│   ├── tools/
│   │   ├── email_tools.py    # Email implementations
│   │   ├── wallet_tools.py   # Wallet implementations
│   │   └── ...
│   ├── interceptors/
│   │   ├── permissions.py    # Permission checking
│   │   ├── audit.py          # Audit logging
│   │   └── context.py        # Context injection
│   └── policy_engine.py      # Privacy filtering
└── .kiro/
    └── settings/
        └── mcp.json          # Kiro MCP config
```

### Data Flow

```
User Query
    ↓
LangGraph Orchestrator
    ↓
MCP Client (with interceptors)
    ↓
MCP Server (email/wallet/defi/etc)
    ↓
Tool Implementation
    ↓
Policy Engine (filter sensitive data)
    ↓
Audit Logger
    ↓
Return filtered results
```

## Privacy & Security

### Three-Tier Permission Model

1. **Tier 1: Surface Access Control**
   - User grants permission per surface (Gmail, X, Telegram, Wallet)
   - OAuth tokens managed securely
   - Revocation triggers cleanup

2. **Tier 2: Policy-Based Filtering**
   - Automatic blocking of sensitive data
   - Pattern matching for OTP codes, passwords, recovery phrases
   - Audit logging of blocked attempts

3. **Tier 3: User Confirmation**
   - Explicit approval for all write operations
   - Preview before execution
   - Cancellation support

### Sensitive Data Patterns

```python
PATTERNS = {
    'OTP_CODE': r'\b\d{4,8}\b.*(?:code|otp|verification)',
    'VERIFICATION_CODE': r'(?:verification|confirm|verify).*code.*\d{4,8}',
    'RECOVERY_PHRASE': r'\b(?:word\s+\d+|seed phrase|recovery phrase)\b',
    'PASSWORD_RESET': r'(?:reset|change).*password',
    'BANK_STATEMENT': r'(?:bank statement|account balance)',
}
```

## Development Workflow

### 1. Create New MCP Server

```python
from fastmcp import FastMCP

my_mcp = FastMCP("My Custom Server")

@my_mcp.tool()
async def my_tool(param: str) -> dict:
    """Tool description"""
    return {"result": param}

if __name__ == "__main__":
    my_mcp.run(transport="http", port=8007)
```

### 2. Add to Kiro Configuration

```json
{
  "mcpServers": {
    "my-server": {
      "command": "python",
      "args": ["-m", "uvicorn", "my_server:app", "--port", "8007"],
      "disabled": false
    }
  }
}
```

### 3. Test in Kiro

- Kiro auto-reconnects on config changes
- Use MCP panel to test tools
- View server logs for debugging
- Iterate quickly with hot reload

## Best Practices

### 1. Tool Design

- **Single Responsibility**: Each tool does one thing well
- **Clear Parameters**: Use type hints and docstrings
- **Error Handling**: Return meaningful error messages
- **Idempotency**: Tools should be safe to retry

### 2. Interceptors

- **Order Matters**: First interceptor is outermost layer
- **Immutable Requests**: Use `request.override()` to modify
- **Error Propagation**: Let errors bubble up for proper handling
- **Logging**: Log at appropriate levels (DEBUG, INFO, ERROR)

### 3. Privacy

- **Filter Early**: Apply policy engine before returning data
- **Audit Everything**: Log all access attempts
- **User Consent**: Never access data without permission
- **Zero Trust**: Assume all external data is untrusted

### 4. Testing

- **Unit Tests**: Test tool implementations independently
- **Integration Tests**: Test MCP server end-to-end
- **Property Tests**: Use property-based testing for security
- **Kiro Panel**: Use for manual testing and debugging

## Examples

### Example 1: Email Search with Filtering

```python
# Query
result = await agent.ainvoke(
    {"query": "Find emails about Solana hackathons"},
    context=OrdoContext(
        user_id="user_123",
        permissions={"GMAIL": True},
        tokens={"GMAIL": "oauth_token"}
    )
)

# Response
{
    "response": "Found 3 emails about Solana hackathons:\n1. [gmail:msg_123] Solana Summer Camp Hackathon\n2. [gmail:msg_456] Breakpoint Hackathon Registration\n3. [gmail:msg_789] Colosseum Hackathon Winners",
    "sources": [
        {"surface": "GMAIL", "id": "msg_123", "preview": "Solana Summer Camp..."},
        {"surface": "GMAIL", "id": "msg_456", "preview": "Breakpoint Hackathon..."},
        {"surface": "GMAIL", "id": "msg_789", "preview": "Colosseum Hackathon..."}
    ]
}
```

### Example 2: Wallet Portfolio Query

```python
# Query
result = await agent.ainvoke(
    {"query": "What's in my wallet?"},
    context=OrdoContext(
        user_id="user_123",
        permissions={"WALLET": True},
        tokens={"WALLET": "helius_api_key"}
    )
)

# Response
{
    "response": "Your wallet contains:\n- 10.5 SOL ($2,100)\n- 1,000 USDC ($1,000)\n- 5 NFTs from DeGods collection\nTotal value: $3,100",
    "sources": [
        {"surface": "WALLET", "id": "portfolio", "preview": "10.5 SOL, 1000 USDC..."}
    ]
}
```

### Example 3: DeFi Swap with Confirmation

```python
# Query
result = await agent.ainvoke(
    {"query": "Swap 1 SOL for USDC"},
    context=OrdoContext(
        user_id="user_123",
        permissions={"WALLET": True, "DEFI": True},
        tokens={"WALLET": "helius_api_key"}
    )
)

# Response (requires confirmation)
{
    "response": "I can swap 1 SOL for approximately 200 USDC via Jupiter Exchange.",
    "requires_confirmation": {
        "action": "swap_tokens",
        "preview": {
            "input": "1 SOL",
            "output": "~200 USDC",
            "price_impact": "0.1%",
            "fee": "0.0025 SOL",
            "route": "SOL → USDC (Orca)"
        }
    }
}
```

## Troubleshooting

### MCP Server Won't Start

1. Check Kiro MCP panel for error messages
2. Verify Python environment is activated
3. Check port is not already in use
4. Review server logs in Kiro

### Tools Not Loading

1. Verify MCP server is running (check Kiro panel)
2. Check `mcp.json` configuration is correct
3. Test server connectivity: `curl http://localhost:8001/mcp`
4. Review interceptor logs for errors

### Permission Errors

1. Verify user has granted required permissions
2. Check OAuth tokens are valid and not expired
3. Review interceptor logic for permission checking
4. Check audit log for blocked attempts

### Policy Engine Blocking Too Much

1. Review sensitive data patterns
2. Adjust pattern matching rules
3. Test with sample data
4. Check audit log for false positives

## Resources

- [LangChain MCP Documentation](https://docs.langchain.com/mcp)
- [FastMCP Library](https://github.com/jlowin/fastmcp)
- [Model Context Protocol Spec](https://modelcontextprotocol.io)
- [Kiro MCP Guide](https://docs.kiro.ai/mcp)
- [Ordo Specification](.kiro/specs/ordo/)

## Contributing

To extend this Power:

1. Add new MCP server in `ordo_backend/mcp_servers/`
2. Implement tools with proper type hints and docstrings
3. Add to `.kiro/settings/mcp.json`
4. Test in Kiro MCP panel
5. Update documentation

## License

MIT License - See LICENSE file for details
