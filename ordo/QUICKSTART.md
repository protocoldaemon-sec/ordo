# Ordo Quick Start Guide

Get up and running with Ordo in 5 minutes!

## Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 18+ installed
- ✅ npm or yarn package manager
- ✅ Expo CLI (`npm install -g expo-cli`)
- ✅ Android Studio (for Android) or Xcode (for iOS)
- ✅ Solana Seeker device or emulator

## Step 1: Install Dependencies

```bash
cd ordo
npm install
```

This will install all required dependencies including:
- React Native and Expo
- Solana Mobile Stack (MWA + Seed Vault)
- UI components and utilities

## Step 2: Configure Environment

Copy the environment template and configure your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Required for basic functionality
BACKEND_API_URL=http://localhost:8000
HELIUS_API_KEY=your-helius-api-key-here
MISTRAL_API_KEY=your-mistral-api-key-here

# Optional - add as needed for specific features
GOOGLE_CLIENT_ID=your-google-client-id-here
X_CLIENT_ID=your-x-client-id-here
TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here
```

### Where to Get API Keys

| Service | URL | Purpose |
|---------|-----|---------|
| Helius | https://helius.dev | Solana RPC and DAS API |
| Mistral AI | https://mistral.ai | LLM inference and embeddings |
| Google Cloud | https://console.cloud.google.com | Gmail OAuth |
| X Developer | https://developer.twitter.com | X/Twitter OAuth |
| Telegram | https://t.me/botfather | Telegram Bot API |
| Brave Search | https://brave.com/search/api/ | Web search |
| Supabase | https://supabase.com | RAG database |

## Step 3: Verify Setup

Run the setup verification script:

```bash
npm run verify-setup
```

This will check:
- ✅ All required directories exist
- ✅ All required files are present
- ✅ All dependencies are installed
- ✅ App configuration is correct
- ✅ Environment variables are configured

## Step 4: Start Development Server

```bash
npm run dev
```

This will start the Expo development server. You'll see a QR code and options to:

- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Press `w` to open in web browser
- Scan QR code with Expo Go app on your device

## Step 5: Run on Device

### Android (Solana Seeker)

1. Enable USB debugging on your Seeker device
2. Connect via USB
3. Run:
   ```bash
   npm run android
   ```

### iOS (Simulator)

1. Open Xcode and start iOS simulator
2. Run:
   ```bash
   npm run ios
   ```

## Development Workflow

### File Structure

```
ordo/
├── app/           # Screens (file-based routing)
├── components/    # UI components
├── services/      # Business logic
├── utils/         # Helper functions
└── __tests__/     # Tests
```

### Making Changes

1. **Add a new screen**: Create a file in `app/`
2. **Add a component**: Create a file in `components/`
3. **Add business logic**: Create a service in `services/`
4. **Add tests**: Create tests in `__tests__/`

### Hot Reload

Changes to your code will automatically reload in the app. No need to restart!

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run android          # Run on Android
npm run ios              # Run on iOS
npm run web              # Run on web

# Code Quality
npm run lint             # Check code style
npm run lint:fix         # Fix code style issues
npm run fmt              # Format code
npm run fmt:check        # Check formatting

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Build
npm run build            # Build for production
npm run android:build    # Build Android APK

# Utilities
npm run verify-setup     # Verify setup
npm run doctor           # Run Expo doctor
```

## Troubleshooting

### "Module not found" errors

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start -- --clear
```

### "Unable to resolve module" errors

```bash
# Reset Metro bundler cache
npm start -- --reset-cache
```

### Android build errors

```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run android
```

### iOS build errors

```bash
# Clean and rebuild
cd ios
pod install
cd ..
npm run ios
```

## Next Steps

Now that you're set up, you can:

1. **Explore the codebase**: Check out `PROJECT_STRUCTURE.md`
2. **Read the docs**: See `README.md` for detailed documentation
3. **Review the design**: Read `.kiro/specs/ordo/design.md`
4. **Start building**: Follow the tasks in `.kiro/specs/ordo/tasks.md`

## Getting Help

- 📖 **Documentation**: See `README.md` and `PROJECT_STRUCTURE.md`
- 🐛 **Issues**: Report bugs on GitHub
- 💬 **Discord**: Join our community
- 📧 **Email**: support@ordo.app

## Development Tips

### 1. Use TypeScript

All code should be TypeScript with strict type checking:

```typescript
// Good
const processQuery = async (query: string): Promise<QueryResponse> => {
  // ...
};

// Bad
const processQuery = async (query) => {
  // ...
};
```

### 2. Write Tests

Write tests alongside your code:

```typescript
// PermissionManager.ts
export class PermissionManager {
  async hasPermission(permission: Permission): Promise<boolean> {
    // ...
  }
}

// PermissionManager.test.ts
describe('PermissionManager', () => {
  it('should check permission correctly', async () => {
    // ...
  });
});
```

### 3. Use Path Aliases

Import using `@/` prefix:

```typescript
// Good
import { Button } from '@/components/ui/Button';

// Bad
import { Button } from '../../../components/ui/Button';
```

### 4. Follow Naming Conventions

- Components: `PascalCase` (e.g., `PermissionCard.tsx`)
- Functions: `camelCase` (e.g., `processQuery`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)

### 5. Keep Components Small

Break large components into smaller, reusable pieces:

```typescript
// Good
<PermissionCard>
  <PermissionIcon />
  <PermissionTitle />
  <PermissionStatus />
</PermissionCard>

// Bad
<PermissionCard>
  {/* 200 lines of JSX */}
</PermissionCard>
```

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Solana Mobile Stack](https://solanamobile.com/developers)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Happy coding! 🚀
