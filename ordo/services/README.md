# Services

This directory contains business logic services for Ordo.

## Core Services

### Permission Management
- **PermissionManager.ts**: Manages permission state, OAuth tokens, and permission requests

### AI Orchestration
- **OrchestrationEngine.ts**: Routes queries to appropriate tools and coordinates execution
- **ContextAggregator.ts**: Combines results from multiple surfaces into coherent responses

### Surface Adapters
- **SeedVaultAdapter.ts**: Wallet integration using Solana Mobile Stack (MWA + Seed Vault)
- **GmailAdapter.ts**: Gmail integration with OAuth 2.0
- **XAdapter.ts**: X/Twitter integration with OAuth 2.0
- **TelegramAdapter.ts**: Telegram integration with Bot API

### Security
- **SensitiveDataFilter.ts**: Client-side filtering of sensitive data patterns
- **PromptIsolation.ts**: Protection against prompt injection attacks

## Implementation Status

All services will be implemented in Phase 1-5 of the Ordo roadmap.

## Usage

Services are imported and used throughout the app:

```typescript
import { PermissionManager } from '@/services/PermissionManager';
import { OrchestrationEngine } from '@/services/OrchestrationEngine';

// Initialize services
const permissionManager = new PermissionManager();
const orchestrator = new OrchestrationEngine(permissionManager);

// Use services
const hasPermission = await permissionManager.hasPermission(Permission.READ_GMAIL);
const response = await orchestrator.processQuery("Show my recent emails");
```

## Testing

Each service has corresponding unit tests in `__tests__/services/`.
