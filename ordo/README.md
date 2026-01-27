# Ordo - Privacy-First AI Assistant for Solana Seeker

Ordo is a privacy-first native AI assistant for Solana Seeker that provides intelligent multi-surface access to Gmail, social media (X/Twitter, Telegram), and Solana wallet functionality. Built with React Native, Expo, and Solana Mobile Stack.

## 🌟 Features

- **Three-Tier Permission System**: Granular control over data access
- **Policy-Based Content Filtering**: Automatic blocking of sensitive data (OTP codes, passwords, recovery phrases)
- **User Confirmation for Write Operations**: Explicit approval required for all actions
- **Multi-Surface Integration**: Gmail, X/Twitter, Telegram, and Solana wallet
- **AI Orchestration**: Intelligent query routing with LangGraph and Mistral AI
- **RAG System**: Documentation queries powered by Supabase pgvector
- **Wallet Integration**: Secure transaction signing via Seed Vault and MWA
- **DeFi Operations**: Jupiter swaps, Lulo lending, Sanctum staking, and more
- **NFT Management**: View, buy, sell, and create NFTs
- **Voice Assistant**: Speech-to-text and text-to-speech support
- **Push Notifications**: Transaction confirmations, price alerts, and updates
- **Biometric Authentication**: Face ID and fingerprint support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development) or Xcode (for iOS development)
- Solana Seeker device or emulator with Seed Vault support

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ordo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your API keys:

   ```bash
   cp .env.example .env
   ```

   Required API keys:
   - **HELIUS_API_KEY**: Get from [Helius](https://helius.dev)
   - **MISTRAL_API_KEY**: Get from [Mistral AI](https://mistral.ai)
   - **GOOGLE_CLIENT_ID/SECRET**: Set up OAuth in [Google Cloud Console](https://console.cloud.google.com)
   - **X_CLIENT_ID/SECRET**: Set up OAuth in [X Developer Portal](https://developer.twitter.com)
   - **TELEGRAM_BOT_TOKEN**: Create bot via [BotFather](https://t.me/botfather)
   - **BRAVE_SEARCH_API_KEY**: Get from [Brave Search API](https://brave.com/search/api/)
   - **SUPABASE_URL/KEY**: Create project at [Supabase](https://supabase.com)

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Or use specific platform commands:
   ```bash
   npm run android    # Run on Android
   npm run ios        # Run on iOS
   npm run web        # Run on web
   ```

## 📁 Project Structure

```
ordo/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   ├── permissions/       # Permission management screens
│   ├── _layout.tsx        # Root layout
│   └── sign-in.tsx        # Authentication screen
├── components/            # React components
│   ├── account/          # Account management components
│   ├── auth/             # Authentication components
│   ├── cluster/          # Solana cluster components
│   ├── permissions/      # Permission UI components
│   ├── settings/         # Settings components
│   ├── solana/           # Solana wallet components
│   └── ui/               # Reusable UI components
├── services/             # Business logic services
│   ├── PermissionManager.ts      # Permission state management
│   ├── OrchestrationEngine.ts    # AI query orchestration
│   ├── ContextAggregator.ts      # Multi-surface data aggregation
│   ├── SeedVaultAdapter.ts       # Wallet integration
│   ├── GmailAdapter.ts           # Gmail integration
│   ├── XAdapter.ts               # X/Twitter integration
│   ├── TelegramAdapter.ts        # Telegram integration
│   ├── SensitiveDataFilter.ts    # Client-side filtering
│   └── PromptIsolation.ts        # Prompt injection protection
├── constants/            # App constants and configuration
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── assets/               # Images, fonts, and other assets
├── __tests__/            # Unit and integration tests
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
└── .env.example          # Environment variables template
```

## 🔐 Security & Privacy

Ordo implements multiple layers of security:

1. **Permission Layer**: User-granted surface access control
2. **Policy Layer**: Automatic sensitive data filtering
3. **Confirmation Layer**: User approval for all write operations
4. **Encryption**: All cached data is encrypted using expo-secure-store
5. **Zero Private Key Access**: Wallet operations use Seed Vault exclusively
6. **Audit Logging**: All data access attempts are logged

### Sensitive Data Patterns Blocked

- OTP codes (4-8 digit sequences)
- Verification codes
- Recovery phrases (12/24 word sequences)
- Password reset emails
- Bank statements
- Tax documents
- Credit card numbers
- Social Security Numbers

## 🧪 Testing

Run the test suite:

```bash
npm test                  # Run all tests
npm run test:unit        # Run unit tests only
npm run test:integration # Run integration tests
npm run test:e2e         # Run end-to-end tests
```

### Property-Based Testing

Ordo uses property-based testing (fast-check) to verify security properties:

```bash
npm run test:properties  # Run property-based tests
```

## 🏗️ Development

### Code Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run fmt              # Format code with Prettier
npm run fmt:check        # Check code formatting
npm run ci               # Run all checks (lint, format, build)
```

### Building

```bash
npm run build            # Build for production
npm run android:build    # Build Android APK
```

## 📱 Permissions Required

### iOS
- Microphone (voice commands)
- Face ID (biometric authentication)
- Camera (QR code scanning)
- Calendars (optional, calendar integration)
- Contacts (optional, contact lookup)
- Notifications (transaction alerts)
- Location (optional, nearby events)

### Android
- Internet access
- Network state
- Notifications
- Vibrate
- Audio recording
- Biometric authentication
- Foreground service
- Camera
- Storage (read/write)

## 🔗 Backend Integration

Ordo requires a Python FastAPI backend for AI orchestration and tool execution. See the backend repository for setup instructions:

- Backend API: `http://localhost:8000` (development)
- MCP Servers: Email, Social, Wallet, DeFi, NFT, Trading

## 📚 Documentation

- [Requirements Document](.kiro/specs/ordo/requirements.md)
- [Design Document](.kiro/specs/ordo/design.md)
- [Implementation Tasks](.kiro/specs/ordo/tasks.md)
- [Solana Agent Kit Tools](.kiro/specs/ordo/SOLANA_AGENT_KIT_TOOLS.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Solana Mobile Stack](https://solanamobile.com)
- [Expo](https://expo.dev)
- [Mistral AI](https://mistral.ai)
- [Helius](https://helius.dev)
- [LangChain](https://langchain.com)
- [Solana Agent Kit](https://github.com/sendaifun/solana-agent-kit)

## 📞 Support

For questions and support:
- GitHub Issues: [Create an issue](https://github.com/your-repo/ordo/issues)
- Discord: [Join our community](https://discord.gg/your-invite)
- Email: support@ordo.app

---

Built with ❤️ for the Solana ecosystem
