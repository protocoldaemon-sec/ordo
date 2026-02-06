# Ordo Flutter App

**Command-driven Solana DeFi Assistant**

Ordo is a single-surface, command-driven mobile application for interacting with Solana blockchain. Built with Flutter for iOS and Android.

**Developed by**: Daemon BlockInt Technologies  
**Backend API**: `https://api.ordo-assistant.com/api/v1`

---

## Features

### Core Functionality
- **Single-Surface UI** - One screen for all interactions
- **Command-Driven** - Natural language commands with auto-complete
- **60+ Indexed Commands** - Fast command lookup and suggestions
- **Voice Input** - Siri/Google Assistant integration
- **Guest Mode** - Try features without login
- **State-Driven UI** - Idle → Input → Thinking → Executing → Result

### DeFi Operations
- **Wallet Management** - Create, import, switch wallets
- **Token Transfers** - Send SOL and SPL tokens
- **Token Swaps** - Jupiter aggregator integration
- **Staking** - Stake SOL with validators
- **Lending/Borrowing** - Solend integration
- **Liquidity Pools** - Add/remove liquidity
- **Cross-Chain Bridge** - Wormhole integration
- **NFT Management** - View, mint, transfer NFTs

### Analytics & Insights
- **Portfolio Analytics** - Real-time portfolio tracking
- **Price Charts** - Live price data from Binance API
- **Token Risk Analysis** - Security scoring
- **Transaction History** - Complete tx history
- **Performance Metrics** - ROI, PnL tracking

### Security Features
- **Transfer Limits** - Set daily/per-tx limits
- **Approval Queue** - Review high-value transactions
- **Slippage Protection** - Configurable slippage tolerance
- **Auto-Staking** - Automated staking strategies

---

## Tech Stack

### Framework
- **Flutter** 3.16+ (Dart 3.2+)
- **Provider** - State management
- **HTTP** - API communication

### UI/UX
- **Google Fonts** (Inter) - Typography
- **FL Chart** - Price charts
- **Material Icons** - Minimal line icons

### APIs
- **Ordo Backend** - DeFi operations
- **Binance API** - Price data (free, no auth)
- **Jupiter API** - Token logos

---

## Getting Started

### Prerequisites
- Flutter SDK 3.16 or higher
- Dart SDK 3.2 or higher
- iOS 12+ / Android 5.0+ device or emulator

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ordo_app
```

2. **Install dependencies**
```bash
flutter pub get
```

3. **Run the app**
```bash
# iOS
flutter run -d ios

# Android
flutter run -d android

# Web (development only)
flutter run -d chrome
```

### Configuration

The app connects to the production backend by default:
```dart
// lib/services/api_client.dart
static const String baseUrl = 'https://api.ordo-assistant.com/api/v1';
```

To use a local backend:
```dart
static const String baseUrl = 'http://localhost:3000/api/v1';
```

---

## Project Structure

```
ordo_app/
├── lib/
│   ├── main.dart                    # App entry point
│   ├── theme/
│   │   └── app_theme.dart           # Dark theme, colors, typography
│   ├── controllers/
│   │   └── assistant_controller.dart # State management
│   ├── services/
│   │   ├── api_client.dart          # Backend API client
│   │   ├── binance_api.dart         # Binance price API
│   │   └── command_index.dart       # Command search/indexing
│   ├── screens/
│   │   └── command_screen.dart      # Main screen
│   ├── widgets/
│   │   ├── status_strip.dart        # Top status indicator
│   │   ├── command_input.dart       # Input bar with voice
│   │   ├── bouncing_progress.dart   # Loading animation
│   │   ├── suggestions_panel.dart   # Auto-complete suggestions
│   │   ├── price_chart_panel.dart   # Price chart modal
│   │   └── context_panels/
│   │       ├── thinking_panel.dart  # Thinking state UI
│   │       ├── executing_panel.dart # Executing state UI
│   │       ├── result_panel.dart    # Success/complete UI
│   │       └── error_panel.dart     # Error state UI
│   └── models/                      # Data models (TBD)
├── assets/                          # Images, logos (TBD)
├── pubspec.yaml                     # Dependencies
└── README.md                        # This file
```

---

## Design Philosophy

### Single-Surface Design
- **One screen** - No tabs, no navigation hierarchy
- **One input** - Command bar as primary interface
- **State-driven** - UI changes based on context, not navigation
- **Contextual features** - Features appear when needed, then disappear
- **OS-layer feel** - Like system command palette

### Command-Driven Interaction
- **Natural language** - "swap 1 sol to usdc"
- **Auto-complete** - Fuzzy search with 60+ indexed commands
- **Voice input** - Hands-free operation
- **Smart suggestions** - Context-aware recommendations

### Visual Design
- **Dark theme** - Easy on the eyes
- **Inter font** - Modern, elegant, readable
- **Minimal icons** - Line icons only (no emojis)
- **Smooth animations** - Fade, slide, stagger, pulse
- **Consistent spacing** - 8px grid system

---

## State Flow

```
┌─────────┐
│  Idle   │ ← User sees command input
└────┬────┘
     │ User types/speaks
     ↓
┌─────────┐
│  Input  │ ← Suggestions appear
└────┬────┘
     │ User submits
     ↓
┌──────────┐
│ Thinking │ ← AI processes command
└────┬─────┘
     │
     ↓
┌───────────┐
│ Executing │ ← Transaction in progress
└────┬──────┘
     │
     ├─→ Success ─→ Complete ─→ Idle (5s)
     │
     └─→ Failure ─→ Error ─→ Idle (5s)
```

---

## Command Examples

### Wallet Commands
```
"check balance"
"create wallet"
"import wallet"
"switch wallet"
```

### Transfer Commands
```
"send 0.5 sol to [address]"
"transfer 100 usdc to [address]"
```

### Swap Commands
```
"swap 1 sol to usdc"
"exchange 100 usdc to sol"
"convert 5 sol to bonk"
```

### DeFi Commands
```
"stake 5 sol"
"lend 100 usdc"
"borrow 50 usdc"
"add liquidity to sol-usdc pool"
"bridge 1 sol to ethereum"
```

### NFT Commands
```
"show my nfts"
"mint nft"
"send nft [address]"
```

### Analytics Commands
```
"show my portfolio"
"what's sol price?"
"show sol chart"
"transaction history"
"analyze bonk"
```

---

## API Integration

### Ordo Backend
All DeFi operations go through the Ordo backend:
- Authentication (JWT)
- Wallet management
- Token transfers
- Swaps (Jupiter)
- Staking, lending, liquidity
- NFT operations
- Portfolio analytics

See `ordo-llms.txt` for complete API documentation.

### Binance API (Price Data)
Free public API for real-time price data:
- Current price
- 24h statistics
- Historical kline data
- No authentication required

### Jupiter API (Token Logos)
Token metadata and logos:
- Token info
- Logo URLs
- Market data

---

## Development

### Running Tests
```bash
flutter test
```

### Building for Production

**iOS**
```bash
flutter build ios --release
```

**Android**
```bash
flutter build apk --release
flutter build appbundle --release
```

### Code Style
- Follow [Effective Dart](https://dart.dev/guides/language/effective-dart)
- Use `flutter analyze` to check code quality
- Format code with `flutter format .`

---

## Roadmap

### Phase 1: Core Features (Current)
- [x] Single-surface UI
- [x] Command input with auto-complete
- [x] State management
- [x] Basic API integration
- [x] Price charts
- [ ] Voice input integration
- [ ] Real API calls (currently mock)

### Phase 2: DeFi Operations
- [ ] Wallet creation/import
- [ ] Token transfers
- [ ] Token swaps
- [ ] Staking
- [ ] Lending/borrowing
- [ ] Liquidity pools

### Phase 3: Advanced Features
- [ ] NFT management
- [ ] Portfolio analytics
- [ ] Token risk analysis
- [ ] Transaction history
- [ ] User preferences
- [ ] Security settings

### Phase 4: Polish
- [ ] Animations refinement
- [ ] Error handling
- [ ] Offline mode
- [ ] Push notifications
- [ ] Biometric auth
- [ ] Multi-language support

---

## Contributing

This is a private project by Daemon BlockInt Technologies.

---

## License

Proprietary - All rights reserved.

---

## Support

For issues or questions, contact: [support email]

---

**Made by Daemon BlockInt Technologies**
