# Project Structure

## Repository Layout

```
ordo/
├── ordo/                    # React Native frontend
├── ordo-backend/            # Python FastAPI backend
├── resources/               # Reference materials and documentation
├── scripts/                 # Build and setup scripts
├── docker-compose.yml       # Local development services
└── README.md                # Project overview
```

## Frontend Structure (ordo/)

### Core Directories

**`/app`** - Expo Router pages (file-based routing)
- `(tabs)/` - Tab navigation screens (index, account, settings)
- `_layout.tsx` - Root layout with providers
- `sign-in.tsx` - Authentication screen
- `+not-found.tsx` - 404 screen

**`/components`** - React components organized by feature
- `account/` - Account management and wallet UI
- `auth/` - Authentication components
- `cluster/` - Solana cluster selection and status
- `demo/` - Demo and testing components
- `settings/` - Settings UI
- `solana/` - Wallet buttons and transaction UI
- `ui/` - Reusable UI primitives
- `app-*.tsx` - Shared app-level components

**`/services`** - Business logic (core functionality)
- `PermissionManager.ts` - Permission state management
- `OrchestrationEngine.ts` - AI query orchestration
- `ContextAggregator.ts` - Multi-surface data aggregation
- `SeedVaultAdapter.ts` - Wallet integration (MWA + Seed Vault)
- `GmailAdapter.ts` - Gmail integration
- `XAdapter.ts` - X/Twitter integration
- `TelegramAdapter.ts` - Telegram integration
- `SensitiveDataFilter.ts` - Client-side content filtering
- `PromptIsolation.ts` - Prompt injection protection

**`/hooks`** - Custom React hooks
- `use-color-scheme.ts` - Theme management
- `use-theme-color.ts` - Dynamic theming
- `use-track-locations.ts` - Location tracking

**`/utils`** - Utility functions
- `ellipsify.ts` - String truncation
- `lamports-to-sol.ts` - Solana conversions

**`/constants`** - Configuration
- `app-config.ts` - App configuration and feature flags
- `colors.ts` - Color palette

**`/assets`** - Static resources
- `fonts/` - Custom fonts (AeonikPro family)
- `images/` - Icons and splash screens

**`/__tests__`** - Test files
- `PermissionManager.test.ts` - Service tests
- Property-based tests using fast-check

### Configuration Files
- `app.json` - Expo configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript config with `@/` path alias
- `.prettierrc` - Code formatting rules
- `eslint.config.js` - Linting rules
- `jest.config.js` - Test configuration
- `.env.example` - Environment variables template

## Backend Structure (ordo-backend/)

### Core Directories

**`/ordo_backend`** - Main package
- `config.py` - Configuration management
- `__init__.py` - Package initialization

**`/ordo_backend/routes`** - API endpoints
- `health.py` - Health check endpoints
- `query.py` - Query processing
- `tools.py` - Tool execution
- `rag.py` - Documentation queries
- `audit.py` - Audit log access

**`/ordo_backend/services`** - Business logic
- `orchestrator.py` - LangGraph agent for query routing
- `policy_engine.py` - Content filtering and policy enforcement
- `__init__.py` - Service exports

**`/ordo_backend/models`** - Database models
- `database.py` - SQLAlchemy models
- `__init__.py` - Model exports

**`/ordo_backend/utils`** - Utilities
- `logger.py` - Logging configuration
- `__init__.py` - Utility exports

**`/scripts`** - Database and setup scripts
- `init-db.sql` - Database initialization
- `verify_setup.py` - Setup verification

**`/tests`** - Test files
- `test_health.py` - API tests
- Property-based tests using hypothesis
- `__init__.py` - Test package

### Configuration Files
- `main.py` - Application entry point
- `requirements.txt` - Python dependencies
- `pytest.ini` - Test configuration
- `.env.example` - Environment variables template

## Naming Conventions

### Files
- **Components**: PascalCase (`PermissionCard.tsx`)
- **Services**: PascalCase (`PermissionManager.ts`)
- **Utilities**: kebab-case (`lamports-to-sol.ts`)
- **Tests**: `*.test.ts` or `*.test.tsx`
- **Routes**: kebab-case (`app/(tabs)/index.tsx`)

### Code
- **Components**: PascalCase (`PermissionCard`)
- **Functions**: camelCase (`processQuery`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`PermissionResult`)
- **Enums**: PascalCase (`Permission`)

## Import Patterns

### Frontend
Use `@/` path alias for cleaner imports:
```typescript
import { PermissionManager } from '@/services/PermissionManager'
import { Button } from '@/components/ui/Button'
import { ellipsify } from '@/utils/ellipsify'
```

### Backend
Use relative imports within package:
```python
from ordo_backend.services.orchestrator import Orchestrator
from ordo_backend.models.database import AuditLog
from ordo_backend.utils.logger import get_logger
```

## Code Organization Principles

1. **Feature-based organization**: Group related code by feature/domain
2. **Separation of concerns**: UI (components) → Logic (services) → Data (models)
3. **Reusability**: Extract common functionality into utils and hooks
4. **Type safety**: TypeScript strict mode, Pydantic validation
5. **Testing**: Co-locate tests with implementation

## Adding New Features

### Frontend
1. Create screen in `/app` if needed
2. Create UI components in `/components/{feature}/`
3. Implement business logic in `/services/`
4. Add utilities in `/utils/` if needed
5. Create hooks in `/hooks/` if needed
6. Write tests in `/__tests__/`

### Backend
1. Create route handler in `/routes/`
2. Implement business logic in `/services/`
3. Add database models in `/models/` if needed
4. Create utilities in `/utils/` if needed
5. Write tests in `/tests/`

## Key Architectural Patterns

### Frontend
- **File-based routing**: Expo Router for navigation
- **Component composition**: Small, reusable components
- **Service layer**: Business logic separate from UI
- **React Query**: Server state management
- **Secure storage**: expo-secure-store for sensitive data

### Backend
- **FastAPI**: Async API framework
- **LangGraph**: AI agent orchestration
- **MCP**: Model Context Protocol for tool integration
- **SQLAlchemy**: Async ORM for database
- **Pydantic**: Request/response validation

## Documentation References

- Frontend: `ordo/README.md`, `ordo/PROJECT_STRUCTURE.md`
- Backend: `ordo-backend/README.md`
- Specs: `.kiro/specs/ordo/` (requirements, design, tasks)
- Docker: `DOCKER_SETUP.md`
