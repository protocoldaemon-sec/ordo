# Ordo Project Structure

This document describes the organization of the Ordo codebase.

## Directory Overview

```
ordo/
├── app/                    # Expo Router pages (file-based routing)
├── assets/                 # Static assets (images, fonts, sounds)
├── components/             # React components
├── constants/              # App constants and configuration
├── hooks/                  # Custom React hooks
├── services/               # Business logic services
├── utils/                  # Utility functions
├── __tests__/              # Tests (unit, integration, property-based)
├── .vscode/                # VS Code settings
├── node_modules/           # Dependencies (generated)
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier configuration
├── app.json                # Expo configuration
├── eas.json                # EAS Build configuration
├── eslint.config.js        # ESLint configuration
├── index.js                # App entry point
├── package.json            # Dependencies and scripts
├── polyfill.js             # Polyfills for crypto and web3
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration
```

## Detailed Structure

### `/app` - Expo Router Pages

File-based routing powered by Expo Router. Each file becomes a route.

```
app/
├── (tabs)/                 # Tab navigation group
│   ├── index.tsx          # Home/Chat screen
│   ├── portfolio.tsx      # Wallet portfolio screen
│   ├── messages.tsx       # Social messages screen
│   └── settings.tsx       # Settings screen
├── permissions/           # Permission management screens
│   ├── request.tsx        # Permission request screen
│   └── status.tsx         # Permission status screen
├── email/                 # Email screens
│   ├── search.tsx         # Email search screen
│   └── [id].tsx           # Email detail screen (dynamic route)
├── wallet/                # Wallet screens
│   ├── send.tsx           # Send transaction screen
│   └── history.tsx        # Transaction history screen
├── _layout.tsx            # Root layout with providers
├── +not-found.tsx         # 404 screen
└── sign-in.tsx            # Authentication screen
```

### `/assets` - Static Assets

```
assets/
├── fonts/                 # Custom fonts
├── images/                # Images and icons
│   ├── icon.png          # App icon
│   ├── splash-icon.png   # Splash screen icon
│   ├── adaptive-icon.png # Android adaptive icon
│   ├── favicon.png       # Web favicon
│   └── notification-icon.png # Notification icon
└── sounds/                # Sound files
    └── notification.wav   # Notification sound
```

### `/components` - React Components

Organized by feature and reusability.

```
components/
├── account/               # Account management components
│   ├── AccountInfo.tsx
│   └── AccountSelector.tsx
├── auth/                  # Authentication components
│   ├── SignInButton.tsx
│   └── BiometricPrompt.tsx
├── cluster/               # Solana cluster components
│   ├── ClusterSelector.tsx
│   └── ClusterStatus.tsx
├── permissions/           # Permission UI components
│   ├── PermissionCard.tsx
│   ├── PermissionRequestDialog.tsx
│   └── PermissionStatusCard.tsx
├── settings/              # Settings components
│   ├── SettingsList.tsx
│   └── SettingItem.tsx
├── solana/                # Solana wallet components
│   ├── WalletButton.tsx
│   ├── TransactionPreview.tsx
│   └── SignatureRequest.tsx
├── ui/                    # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Spinner.tsx
│   └── Text.tsx
├── app-dropdown.tsx       # Dropdown menu component
├── app-external-link.tsx  # External link component
├── app-page.tsx           # Page wrapper component
├── app-providers.tsx      # App-level providers (React Query, etc.)
├── app-qr-code.tsx        # QR code component
├── app-splash-controller.ts # Splash screen controller
├── app-text.tsx           # Styled text component
├── app-theme.tsx          # Theme provider
└── app-view.tsx           # Styled view component
```

### `/constants` - Configuration

```
constants/
├── app-config.ts          # App configuration (API URLs, feature flags)
└── colors.ts              # Color palette
```

### `/hooks` - Custom React Hooks

```
hooks/
├── use-color-scheme.ts    # Color scheme hook (light/dark mode)
├── use-color-scheme.web.ts # Web-specific color scheme
├── use-theme-color.ts     # Theme color hook
└── use-track-locations.ts # Location tracking hook
```

### `/services` - Business Logic

Core services implementing Ordo's functionality.

```
services/
├── PermissionManager.ts      # Permission state management
├── OrchestrationEngine.ts    # AI query orchestration
├── ContextAggregator.ts      # Multi-surface data aggregation
├── SeedVaultAdapter.ts       # Wallet integration (MWA + Seed Vault)
├── GmailAdapter.ts           # Gmail integration
├── XAdapter.ts               # X/Twitter integration
├── TelegramAdapter.ts        # Telegram integration
├── SensitiveDataFilter.ts    # Client-side filtering
├── PromptIsolation.ts        # Prompt injection protection
└── README.md                 # Services documentation
```

### `/utils` - Utility Functions

```
utils/
├── ellipsify.ts           # String ellipsis utility
├── lamports-to-sol.ts     # Lamports to SOL conversion
├── format-currency.ts     # Currency formatting
├── date-utils.ts          # Date formatting utilities
└── validation.ts          # Input validation utilities
```

### `/__tests__` - Tests

```
__tests__/
├── services/              # Service layer tests
│   ├── PermissionManager.test.ts
│   ├── OrchestrationEngine.test.ts
│   ├── ContextAggregator.test.ts
│   ├── SeedVaultAdapter.test.ts
│   ├── GmailAdapter.test.ts
│   ├── XAdapter.test.ts
│   ├── TelegramAdapter.test.ts
│   ├── SensitiveDataFilter.test.ts
│   └── PromptIsolation.test.ts
├── components/            # Component tests
│   ├── permissions/
│   ├── account/
│   └── ui/
├── properties/            # Property-based tests
│   ├── permission.properties.test.ts
│   ├── security.properties.test.ts
│   ├── filtering.properties.test.ts
│   └── wallet.properties.test.ts
├── integration/           # Integration tests
│   ├── email-flow.test.ts
│   ├── wallet-flow.test.ts
│   └── social-flow.test.ts
└── README.md              # Testing documentation
```

## Configuration Files

### `app.json`
Expo configuration including:
- App metadata (name, version, icon)
- Platform-specific settings (iOS, Android, Web)
- Plugins (expo-router, expo-notifications, etc.)
- Permissions and capabilities
- Deep linking configuration

### `package.json`
Dependencies and npm scripts:
- `npm run dev` - Start development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint
- `npm run fmt` - Format code with Prettier
- `npm test` - Run tests

### `tsconfig.json`
TypeScript configuration with path aliases:
- `@/` maps to project root
- Strict type checking enabled
- React Native and Expo types included

### `.env.example`
Environment variables template:
- Backend API configuration
- External API keys (Helius, Mistral, Google, X, Telegram, Brave, Supabase)
- Feature flags
- Solana configuration

## Import Aliases

TypeScript path aliases for cleaner imports:

```typescript
// Instead of: import { Button } from '../../../components/ui/Button'
import { Button } from '@/components/ui/Button';

// Instead of: import { PermissionManager } from '../../services/PermissionManager'
import { PermissionManager } from '@/services/PermissionManager';
```

## Naming Conventions

### Files
- Components: PascalCase (e.g., `PermissionCard.tsx`)
- Services: PascalCase (e.g., `PermissionManager.ts`)
- Utilities: kebab-case (e.g., `lamports-to-sol.ts`)
- Tests: `*.test.ts` or `*.test.tsx`
- Property tests: `*.properties.test.ts`

### Code
- Components: PascalCase (e.g., `PermissionCard`)
- Functions: camelCase (e.g., `processQuery`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Types/Interfaces: PascalCase (e.g., `PermissionResult`)
- Enums: PascalCase (e.g., `Permission`)

## Code Organization Principles

1. **Feature-based organization**: Group related components, services, and tests together
2. **Separation of concerns**: Keep UI, business logic, and data access separate
3. **Reusability**: Extract common functionality into utilities and hooks
4. **Type safety**: Use TypeScript for all code with strict type checking
5. **Testing**: Write tests alongside implementation (unit, integration, property-based)
6. **Documentation**: Document complex logic and public APIs

## Adding New Features

When adding a new feature:

1. Create necessary screens in `/app`
2. Create UI components in `/components`
3. Implement business logic in `/services`
4. Add utilities in `/utils` if needed
5. Create custom hooks in `/hooks` if needed
6. Write tests in `/__tests__`
7. Update this documentation

## Related Documentation

- [README.md](./README.md) - Project overview and setup
- [services/README.md](./services/README.md) - Services documentation
- [__tests__/README.md](./__tests__/README.md) - Testing documentation
- [.kiro/specs/ordo/requirements.md](../.kiro/specs/ordo/requirements.md) - Requirements
- [.kiro/specs/ordo/design.md](../.kiro/specs/ordo/design.md) - Design document
- [.kiro/specs/ordo/tasks.md](../.kiro/specs/ordo/tasks.md) - Implementation tasks
