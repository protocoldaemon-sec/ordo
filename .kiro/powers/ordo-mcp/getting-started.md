# Getting Started with Ordo MCP

This guide will help you set up and start using the Ordo MCP Power for building privacy-first AI assistants.

## Prerequisites

Before you begin, ensure you have:

- Python 3.11 or higher
- Node.js 18+ (for frontend development)
- Kiro IDE installed
- Basic understanding of LangChain and LangGraph
- API keys for services you want to integrate (Gmail, Helius, etc.)

## Installation

### 1. Install Python Dependencies

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install required packages
pip install fastmcp langchain-mcp-adapters langchain-mistralai langgraph httpx
pip install solana solders  # For Solana integration
pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client  # For Gmail
```

### 2. Set Up Project Structure

```bash
# Create backend directory
mkdir -p ordo-backend/ordo_backend/mcp_servers
mkdir -p ordo-backend/ordo_backend/tools
mkdir -p ordo-backend/ordo_backend/interceptors

# Create __init__.py files
touch ordo-backend/ordo_backend/__init__.py
touch ordo-backend/ordo_backend/mcp_servers/__init__.py
touch ordo-backend/ordo_backend/tools/__init__.py
touch ordo-backend/ordo_backend/interceptors/__init__.py
```

### 3. Configure Environment Variables

Create `.env` file in `ordo-backend/`:

```bash
# Mistral AI API Key
MISTRAL_API_KEY=...

# Helius API Key (for Solana)
HELIUS_API_KEY=...

# Gmail OAuth Credentials
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# X/Twitter API Credentials
X_API_KEY=...
X_API_SECRET=...

# Telegram Bot Token
TELEGRAM_BOT_TOKEN=...
```

### 4. Install Ordo MCP Power in Kiro

1. Open Kiro IDE
2. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
3. Type "Powers: Configure"
4. Click "Install from Folder"
5. Select `.kiro/powers/ordo-mcp/`

Alternatively, the Power is automatically detected if you have the `.kiro/powers/ordo-mcp/` folder in your workspace.

## Quick Start: Email MCP Server

Let's create your first MCP server for email integration.

### Step 1: Create Email MCP Server

Create `ordo-backend/ordo_backend/mcp_servers/email.py`:

```python
from fastmcp import FastMCP
from typing import List, Dict, Any
import os

# Create MCP server
email_mcp = FastMCP("Ordo Email Server")

@email_mcp.tool()
async def search_email_threads(
    query: str,
    token: str,
    user_id: str,
    max_results: int = 10
) -> List[Dict[str, Any]]:
    """
    Search Gmail threads using Gmail API
    
    Args:
        query: Search query string (e.g., "from:example@gmail.com")
        token: OAuth token for Gmail API
        user_id: User ID for audit logging
        max_results: Maximum number of results to return (default: 10)
    
    Returns:
        List of email threads with subject, sender, date, and snippet
    """
    # For now, return mock data
    # In production, this would call Gmail API
    return [
        {
            "id": "thread_123",
            "subject": "Welcome to Solana",
            "from": "hello@solana.com",
            "date": "2024-01-15",
            "snippet": "Welcome to the Solana ecosystem..."
        },
        {
            "id": "thread_456",
            "subject": "Hackathon Invitation",
            "from": "events@solana.com",
            "date": "2024-01-20",
            "snippet": "Join us for the upcoming hackathon..."
        }
    ]

@email_mcp.tool()
async def get_email_content(
    email_id: str,
    token: str,
    user_id: str
) -> Dict[str, Any]:
    """
    Get full content of a specific email
    
    Args:
        email_id: Gmail message ID
        token: OAuth token for Gmail API
        user_id: User ID for audit logging
    
    Returns:
        Email with full content including body
    """
    # Mock data
    return {
        "id": email_id,
        "subject": "Welcome to Solana",
        "from": "hello@solana.com",
        "to": ["user@example.com"],
        "date": "2024-01-15",
        "body": "Welcome to the Solana ecosystem! We're excited to have you here."
    }

# MCP Resource: Inbox
@email_mcp.resource("email://inbox")
async def get_inbox(token: str, user_id: str) -> str:
    """
    Get user's inbox as a formatted resource
    
    Args:
        token: OAuth token for Gmail API
        user_id: User ID for audit logging
    
    Returns:
        Formatted text representation of inbox
    """
    threads = await search_email_threads("in:inbox", token, user_id, max_results=20)
    
    inbox_text = "# Your Inbox\n\n"
    for thread in threads:
        inbox_text += f"- **{thread['subject']}** from {thread['from']} ({thread['date']})\n"
        inbox_text += f"  {thread['snippet']}\n\n"
    
    return inbox_text

# Run server
if __name__ == "__main__":
    email_mcp.run(transport="http", port=8001)
```

### Step 2: Configure in Kiro

The Power automatically creates `.kiro/settings/mcp.json`, but you can verify it:

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
    }
  }
}
```

### Step 3: Test in Kiro

1. **Open MCP Panel**:
   - View → MCP Servers (or Ctrl+Shift+M)

2. **Start Server**:
   - Find "ordo-email" in the list
   - Click "Start" button
   - Server status should show "Running"

3. **Test Tool**:
   - Click "Test Tool" next to "search_email_threads"
   - Enter test parameters:
     ```json
     {
       "query": "test",
       "token": "fake_token_for_testing",
       "user_id": "test_user",
       "max_results": 5
     }
     ```
   - Click "Execute"
   - View results in the output panel

4. **View Logs**:
   - Click "View Logs" to see server output
   - Debug any issues

### Step 4: Integrate with LangGraph

Create `ordo-backend/agent.py`:

```python
import asyncio
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_mistralai import ChatMistralAI
from langgraph.graph import StateGraph, END
from typing import TypedDict, List, Dict, Any

# Define agent state
class AgentState(TypedDict):
    query: str
    messages: List[Any]
    tool_results: Dict[str, Any]
    response: str

# Create MCP client
async def create_mcp_client():
    return MultiServerMCPClient({
        "ordo-email": {
            "url": "http://localhost:8001/mcp",
            "transport": "http"
        }
    })

# Agent nodes
async def execute_tools_node(state: AgentState) -> AgentState:
    """Execute MCP tools based on query"""
    mcp_client = await create_mcp_client()
    tools = await mcp_client.get_tools()
    
    # For demo, just call search_email_threads
    email_tool = next(t for t in tools if t.name == "search_email_threads")
    result = await email_tool.ainvoke({
        "query": state["query"],
        "token": "fake_token",
        "user_id": "demo_user",
        "max_results": 5
    })
    
    state["tool_results"] = {"emails": result}
    return state

async def generate_response_node(state: AgentState) -> AgentState:
    """Generate natural language response"""
    emails = state["tool_results"].get("emails", [])
    
    if not emails:
        state["response"] = "No emails found."
    else:
        response = f"Found {len(emails)} emails:\n"
        for email in emails:
            response += f"- {email['subject']} from {email['from']}\n"
        state["response"] = response
    
    return state

# Build workflow
async def create_agent():
    workflow = StateGraph(AgentState)
    
    workflow.add_node("execute_tools", execute_tools_node)
    workflow.add_node("generate_response", generate_response_node)
    
    workflow.set_entry_point("execute_tools")
    workflow.add_edge("execute_tools", "generate_response")
    workflow.add_edge("generate_response", END)
    
    return workflow.compile()

# Run agent
async def main():
    agent = await create_agent()
    
    result = await agent.ainvoke({
        "query": "hackathon",
        "messages": [],
        "tool_results": {},
        "response": ""
    })
    
    print(result["response"])

if __name__ == "__main__":
    asyncio.run(main())
```

### Step 5: Run the Agent

```bash
cd ordo-backend
python agent.py
```

Expected output:
```
Found 2 emails:
- Welcome to Solana from hello@solana.com
- Hackathon Invitation from events@solana.com
```

## Next Steps

Now that you have a basic MCP server running, you can:

1. **Add More Servers**: Create wallet, social, DeFi servers
2. **Implement Real APIs**: Replace mock data with actual API calls
3. **Add Interceptors**: Implement permission checking and audit logging
4. **Add Privacy Filtering**: Implement policy engine for sensitive data
5. **Build Frontend**: Create React Native app to interact with agent

See the other steering files for detailed guides:
- `privacy-security.md` - Implementing privacy features
- `mcp-development.md` - Advanced MCP development
- `testing-debugging.md` - Testing and debugging strategies

## Common Issues

### Server Won't Start

**Problem**: MCP server fails to start in Kiro panel

**Solutions**:
1. Check Python environment is activated
2. Verify `PYTHONPATH` is set correctly in `mcp.json`
3. Check port 8001 is not already in use
4. Review server logs in Kiro for error messages

### Tools Not Loading

**Problem**: `get_tools()` returns empty list

**Solutions**:
1. Verify server is running (check Kiro MCP panel)
2. Test server endpoint: `curl http://localhost:8001/mcp`
3. Check server logs for startup errors
4. Verify FastMCP version is compatible

### Import Errors

**Problem**: `ModuleNotFoundError` when running server

**Solutions**:
1. Verify virtual environment is activated
2. Install missing packages: `pip install fastmcp langchain-mcp-adapters`
3. Check `PYTHONPATH` includes `ordo-backend` directory
4. Verify `__init__.py` files exist in all directories

## Resources

- [POWER.md](./POWER.md) - Complete Power documentation
- [privacy-security.md](./privacy-security.md) - Privacy implementation guide
- [mcp-development.md](./mcp-development.md) - Advanced MCP development
- [testing-debugging.md](./testing-debugging.md) - Testing strategies
- [LangChain MCP Docs](https://docs.langchain.com/mcp)
- [FastMCP GitHub](https://github.com/jlowin/fastmcp)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review server logs in Kiro MCP panel
3. Consult the other steering files
4. Check LangChain MCP documentation
