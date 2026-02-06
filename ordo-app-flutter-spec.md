# Ordo Flutter App - Single-Surface Design Specification

## Overview
Ordo adalah **command-driven Solana DeFi assistant** dengan single-surface UI. User berinteraksi melalui natural language commands untuk melakukan 60+ blockchain operations.

**Developed by**: Daemon BlockInt Technologies  
**Backend API**: `https://api.ordo-assistant.com/api/v1`

---

## Design Philosophy

### Core Principles
- **One screen** - Single surface untuk semua interactions
- **One primary input** - Command bar sebagai main interface
- **Zero navigation hierarchy** - No tabs, no menus, no screens
- **State-driven** - UI berubah based on context, bukan navigation
- **Contextual features** - Features muncul saat dibutuhkan, lalu hilang
- **OS-layer feel** - Seperti system command palette, bukan chat app

### NOT This
- Chat bubbles  
- Bottom navigation  
- Tabs  
- Menu screens  
- Settings pages  
- Dashboard cards  

### YES This
- Command input  
- Inline results  
- Contextual panels  
- Gesture-based  
- State transitions  
- Ephemeral UI  

---

## Layout Structure (Single Surface)

```
┌─────────────────────────────────┐
│ ┌─────────────────────────────┐ │ ← Top Area
│ │ [zap] Idle  [user] Guest [•]│ │   Status strip
│ └─────────────────────────────┘ │
│                                 │
│                                 │
│                                 │
│ ┌─────────────────────────────┐ │ ← Center Area
│ │                             │ │   (Primary Focus)
│ │  What do you want to do?    │ │
│ │                             │ │   Command input
│ └─────────────────────────────┘ │
│                                 │
│                                 │
│  [Context panels appear here]   │ ← Context Area
│                                 │   (Dynamic)
│                                 │
│                                 │
│                                 │
│         ⌃ swipe up             │ ← Bottom Area
└─────────────────────────────────┘   Gesture hints
```

### Top Area (Minimal Status Strip)
**Always Visible**:
- **State Indicator** (icon only):
  - [zap] Idle
  - [mic] Listening
  - [cpu] Thinking
  - [settings] Executing
  - [check] Complete
- **User Status**: 
  - [user] Guest (if not logged in)
  - [wallet] Balance (if logged in, collapsed)
- **Menu Trigger**: [more-vertical] (swipe down or tap)

**Expanded Menu** (overlay, dismissible):
- Login / Logout
- Wallets (quick view)
- Preferences (minimal)
- About
  - Version info
  - Made by Daemon BlockInt Technologies
  - Terms & Privacy

### Center Area (Primary Focus)
**Command Input Bar**:
- Large, prominent
- Placeholder: "What do you want to do?"
- Text input + voice button
- Expands on focus
- Collapses after execution
- Auto-suggestions appear below

**Example Commands**:
```
"What's my SOL balance?"
"Swap 1 SOL to USDC"
"Send 0.5 SOL to [address]"
"Stake 5 SOL with Marinade"
"Show my NFTs"
"What's the risk score of BONK?"
"Add liquidity to SOL-USDC pool"
```

### Context Area (Dynamic Panels)
**Appears contextually, never permanently**:

#### 1. Suggestions Panel (Input State)
```
┌─────────────────────────────────┐
│ Quick Actions:                  │
│ [send] Check balance            │
│ [repeat] Swap tokens            │
│ [arrow-up-right] Send SOL       │
│ [image] View NFTs               │
└─────────────────────────────────┘
```

#### 2. Reasoning Panel (Thinking State)
```
┌─────────────────────────────────┐
│ [cpu] Planning...               │
│ ├─ Fetching wallet balance      │
│ ├─ Getting SOL price            │
│ └─ Calculating swap route       │
└─────────────────────────────────┘
```

#### 3. Execution Panel (Executing State)
```
┌─────────────────────────────────┐
│ [settings] Executing swap...    │
│ [████████░░] 80%                │
│ Jupiter • Raydium • Orca        │
└─────────────────────────────────┘
```

#### 4. Result Panel (Complete State)
```
┌─────────────────────────────────┐
│ [check-circle] Swap Complete    │
│                                 │
│ 1 SOL → 150.25 USDC             │
│ Fee: 0.000005 SOL               │
│ Signature: 5wHu1q...            │
│                                 │
│ [View Details] [Done]           │
└─────────────────────────────────┘
```

#### 4b. Price Chart Panel (When Relevant)
```
┌─────────────────────────────────┐
│ SOL/USDT • $150.25 [+2.5%]      │
│                                 │
│     ╱╲    ╱╲                    │
│    ╱  ╲  ╱  ╲╱╲                 │
│   ╱    ╲╱      ╲                │
│  ╱              ╲               │
│ ╱                ╲              │
│                                 │
│ 1H  4H  1D  1W  1M              │
│                                 │
│ High: $152.30  Low: $148.10     │
│ Vol: 1.2M SOL                   │
└─────────────────────────────────┘
```

**Chart Muncul Saat**:

1. **Price Query Commands**:
   - "what's the price of SOL?"
   - "show SOL price"
   - "how much is USDC?"
   - "SOL price now"
   - "check BONK price"

2. **Chart Request Commands**:
   - "show SOL chart"
   - "SOL chart"
   - "show me USDC chart"
   - "price chart for JUP"

3. **After Swap Execution** (optional, user preference):
   - User: "swap 1 SOL to USDC"
   - System executes swap
   - Chart muncul showing SOL/USDT price movement
   - Helps user see if they got good timing

4. **Token Analysis Commands**:
   - "analyze SOL"
   - "tell me about BONK"
   - "is JUP safe to buy?"
   - Chart muncul bersama risk score

5. **Portfolio View** (when user taps token):
   - User: "show my portfolio"
   - System shows token list
   - User taps SOL → Chart muncul

**Chart TIDAK Muncul Saat**:
- Balance check ("what's my balance?") → No chart, just numbers
- Transfer commands ("send 1 SOL to...") → No chart needed
- Wallet operations ("create wallet") → No chart
- General questions ("what is Solana?") → No chart

**Display Behavior**:
- Slides in from bottom (modal)
- Overlays context area
- Swipe down to dismiss
- Auto-dismiss after 30s of inactivity
- Tap outside to dismiss
- Smooth animation (300ms)

**Chart Interactions**:
- **Pinch**: Zoom in/out
- **Pan**: Scroll through time
- **Tap**: Show price at point
- **Long press**: Show detailed info
- **Double tap**: Reset zoom

**Timeframe Selection**:
```
[1H] 4H  1D  1W  1M
```
- Tap to switch timeframe
- Active timeframe highlighted
- Smooth transition between timeframes

#### 5. Approval Panel (Requires Approval)
```
┌─────────────────────────────────┐
│ [lock] Approval Required        │
│                                 │
│ Transfer 5 SOL ($750)           │
│ Exceeds your limit (1 SOL)     │
│                                 │
│ [Approve] [Reject]              │
└─────────────────────────────────┘
```

#### 6. Login Panel (Auth Required)
```
┌─────────────────────────────────┐
│ [lock] Login Required           │
│                                 │
│ To check balance, you need to   │
│ create an account or login.     │
│                                 │
│ [Create Account] [Login]        │
│                                 │
│ [Continue as Guest]             │
└─────────────────────────────────┘
```

### Bottom Area (Gesture Zone)
**Gestures**:
- **Swipe up**: Command history (ephemeral overlay)
- **Swipe down**: Dismiss context panels
- **Long press**: Voice input
- **Shake**: Clear/reset

**Subtle hint**: ⌃ (only visible when idle)

---

## State-Driven Behavior

### 1. Idle State
```
┌─────────────────────────────────┐
│ [zap] Idle          [user] Guest│
│                                 │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ What do you want to do?     │ │
│ └─────────────────────────────┘ │
│                                 │
│                                 │
│         ⌃ swipe up             │
└─────────────────────────────────┘
```
- Minimal, calm
- Only command bar visible
- No clutter

### 2. Input State
```
┌─────────────────────────────────┐
│ [zap] Idle          [user] Guest│
│                                 │
│ ┌─────────────────────────────┐ │
│ │ sw_                         │ │ ← User input
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [repeat] Swap tokens        │ │ ← Indexed command
│ │ [send] Check balance        │ │ ← Indexed command
│ │ [arrow-up-right] Send SOL   │ │ ← Indexed command
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```
- Command bar expands
- **Auto-suggestions appear** (indexed commands)
- Fuzzy search matching
- Icon + short label
- Tap to complete

**Auto-Complete Behavior**:
```
User types: "s"
  → Shows: Send, Swap, Stake, Show

User types: "sw"
  → Shows: Swap tokens, Switch wallet

User types: "swap"
  → Shows: Swap tokens, Swap 1 SOL to USDC (recent)

User types: "swap 1 sol"
  → Shows: Swap 1 SOL to USDC, Swap 1 SOL to USDT
```

### 3. Reasoning State
```
┌─────────────────────────────────┐
│ [cpu] Thinking      [user] Guest│
│                                 │
│ ┌─────────────────────────────┐ │
│ │ swap 1 sol to usdc          │ │
│ └─────────────────────────────┘ │
│                                 │
│ Planning swap...                │
│ ├─ Getting quote from Jupiter   │
│ └─ Calculating best route       │
└─────────────────────────────────┘
```
- Thinking indicator
- Optional reasoning preview
- Collapsed by default

### 4. Execution State
```
┌─────────────────────────────────┐
│ [settings] Executing [user] Guest│
│                                 │
│ ┌─────────────────────────────┐ │
│ │ swap 1 sol to usdc          │ │
│ └─────────────────────────────┘ │
│                                 │
│ Executing swap...               │
│ [████████░░] 80%                │
│ Via Jupiter • Raydium           │
└─────────────────────────────────┘
```
- Execution status
- Progress indicator
- Tool icons

### 5. Result State
```
┌─────────────────────────────────┐
│ [check] Complete    [user] Guest│
│                                 │
│ ┌─────────────────────────────┐ │
│ │ swap 1 sol to usdc          │ │
│ └─────────────────────────────┘ │
│                                 │
│ [check-circle] Swapped 1 SOL    │
│ → 150.25 USDC                   │
│ Fee: 0.000005 SOL               │
│                                 │
│ [View Details] [Done]           │
└─────────────────────────────────┘
```
- Result shown inline
- Structured output
- Follow-up actions
- Auto-dismiss after 5s

### 6. Error State
```
┌─────────────────────────────────┐
│ [alert-circle] Error [user] Guest│
│                                 │
│ ┌─────────────────────────────┐ │
│ │ swap 1 sol to usdc          │ │
│ └─────────────────────────────┘ │
│                                 │
│ [alert-triangle] Insufficient   │
│ balance. You need 1.000005 SOL  │
│ Current: 0.5 SOL                │
│                                 │
│ [Try Again] [Dismiss]           │
└─────────────────────────────────┘
```
- Error message
- Helpful context
- Recovery actions

---

## Command Index & Auto-Complete

### Indexed Commands
System maintains index of all available commands untuk fast lookup:

#### Wallet Commands
```
[wallet] "check balance" → Get wallet balance
[wallet] "show balance" → Get wallet balance
[wallet] "my balance" → Get wallet balance
[key] "create wallet" → Create new wallet
[key] "new wallet" → Create new wallet
[key] "import wallet" → Import existing wallet
[repeat] "switch wallet" → Switch active wallet
[list] "list wallets" → Show all wallets
```

#### Transfer Commands
```
[send] "send sol" → Transfer SOL
[send] "transfer sol" → Transfer SOL
[send] "send usdc" → Transfer USDC
[send] "transfer token" → Transfer any token
[arrow-up-right] "send [amount] sol to [address]" → Quick transfer
```

#### Swap Commands
```
[repeat] "swap" → Token swap
[repeat] "swap sol to usdc" → Specific swap
[repeat] "exchange" → Token swap
[repeat] "convert" → Token swap
[trending-up] "token price" → Get token price
[trending-up] "sol price" → Get SOL price
```

#### DeFi Commands
```
[coins] "stake" → Stake SOL
[coins] "stake sol" → Stake SOL
[coins] "unstake" → Unstake SOL
[hand-coins] "lend" → Lend assets
[hand-coins] "borrow" → Borrow assets
[droplet] "add liquidity" → Add to pool
[droplet] "remove liquidity" → Remove from pool
[bridge] "bridge" → Cross-chain bridge
```

#### NFT Commands
```
[image] "my nfts" → View NFT collection
[image] "show nfts" → View NFT collection
[image] "nft collection" → View NFT collection
[palette] "mint nft" → Mint new NFT
[send] "send nft" → Transfer NFT
[flame] "burn nft" → Burn NFT
```

#### Portfolio Commands
```
[bar-chart] "portfolio" → View portfolio
[bar-chart] "my portfolio" → View portfolio
[briefcase] "total value" → Portfolio value
[trending-up] "performance" → Portfolio performance
[scroll-text] "history" → Transaction history
[scroll-text] "transactions" → Transaction history
```

#### Settings Commands
```
[settings] "settings" → User preferences
[settings] "preferences" → User preferences
[lock] "set limit" → Set transfer limit
[sliders] "set slippage" → Set slippage tolerance
[bot] "auto stake" → Enable auto-staking
```

### Auto-Complete Algorithm

```dart
class CommandIndex {
  // Indexed commands with metadata
  final List<IndexedCommand> commands = [
    IndexedCommand(
      keywords: ['swap', 'exchange', 'convert', 'trade'],
      icon: 'repeat',
      label: 'Swap tokens',
      template: 'swap [amount] [from] to [to]',
      requiresAuth: true,
    ),
    IndexedCommand(
      keywords: ['send', 'transfer', 'pay'],
      icon: 'send',
      label: 'Send SOL',
      template: 'send [amount] sol to [address]',
      requiresAuth: true,
    ),
    // ... more commands
  ];
  
  // Fuzzy search with ranking
  List<IndexedCommand> search(String query) {
    final results = commands.where((cmd) {
      return cmd.keywords.any((keyword) => 
        keyword.contains(query.toLowerCase())
      );
    }).toList();
    
    // Sort by relevance
    results.sort((a, b) {
      final aScore = _calculateScore(query, a);
      final bScore = _calculateScore(query, b);
      return bScore.compareTo(aScore);
    });
    
    return results.take(5).toList();
  }
  
  int _calculateScore(String query, IndexedCommand cmd) {
    int score = 0;
    
    // Exact match = highest score
    if (cmd.keywords.contains(query)) score += 100;
    
    // Starts with = high score
    if (cmd.keywords.any((k) => k.startsWith(query))) score += 50;
    
    // Contains = medium score
    if (cmd.keywords.any((k) => k.contains(query))) score += 25;
    
    // Recent usage = bonus
    if (cmd.recentlyUsed) score += 10;
    
    return score;
  }
}
```

### Suggestion Display

**Visual Design**:
```
┌─────────────────────────────────┐
│ ┌─────────────────────────────┐ │
│ │ sw_                         │ │ ← User input
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [repeat] Swap tokens        │ │ ← Match 1 (best)
│ │    swap [amount] [from]...  │ │   Template hint
│ ├─────────────────────────────┤ │
│ │ [repeat] Switch wallet      │ │ ← Match 2
│ │    switch to [wallet]       │ │
│ ├─────────────────────────────┤ │
│ │ [send] Send SOL             │ │ ← Match 3
│ │    send [amount] sol to...  │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

**Interaction**:
- **Tap suggestion**: Fill command bar with template
- **Arrow keys**: Navigate suggestions (keyboard)
- **Enter**: Execute top suggestion
- **Esc**: Dismiss suggestions

### Smart Suggestions

**Context-Aware**:
```dart
// If user has low balance
if (balance < 0.1) {
  suggestions.add('Get SOL from exchange');
  suggestions.add('Bridge from Ethereum');
}

// If user has pending approvals
if (hasPendingApprovals) {
  suggestions.insert(0, 'View pending approvals');
}

// If user recently swapped
if (recentAction == 'swap') {
  suggestions.add('Swap back to SOL');
  suggestions.add('View transaction');
}
```

**Recent Commands** (higher priority):
```
User recently used:
1. "swap 1 sol to usdc"
2. "check balance"
3. "stake 5 sol"

When user types "s":
  → Shows: "swap 1 sol to usdc" (recent)
  → Then: "stake 5 sol" (recent)
  → Then: "send sol" (indexed)
```

### Command Templates

**Parameterized Commands**:
```
Template: "swap [amount] [from] to [to]"
Example: "swap 1 sol to usdc"

Template: "send [amount] [token] to [address]"
Example: "send 0.5 sol to ABC123..."

Template: "stake [amount] sol with [protocol]"
Example: "stake 5 sol with marinade"
```

**Auto-Fill Parameters**:
```
User types: "swap 1 sol"
  → Suggestion: "swap 1 sol to usdc" (common pair)
  → Suggestion: "swap 1 sol to usdt"
  → Suggestion: "swap 1 sol to bonk"

User types: "send 0.5 sol to"
  → Suggestion: "send 0.5 sol to [recent address 1]"
  → Suggestion: "send 0.5 sol to [recent address 2]"
  → Suggestion: "send 0.5 sol to [paste from clipboard]"
```

---

## Price Chart Integration (Binance API)

### Overview
Price charts use **Binance Public API** (free, no authentication required) untuk real-time dan historical price data.

**Why Binance**:
- Free public API
- No API key required
- High reliability (99.9% uptime)
- Real-time data
- Historical data available
- Global coverage

### Binance API Endpoints

#### 1. Get Current Price
**Endpoint**: `GET https://api.binance.com/api/v3/ticker/price`

**Parameters**:
- `symbol`: Trading pair (e.g., SOLUSDT, BTCUSDT)

**Request Example**:
```
GET https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT
```

**Response**:
```json
{
  "symbol": "SOLUSDT",
  "price": "150.25000000"
}
```

#### 2. Get 24h Price Change
**Endpoint**: `GET https://api.binance.com/api/v3/ticker/24hr`

**Parameters**:
- `symbol`: Trading pair

**Request Example**:
```
GET https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT
```

**Response**:
```json
{
  "symbol": "SOLUSDT",
  "priceChange": "3.75000000",
  "priceChangePercent": "2.56",
  "lastPrice": "150.25000000",
  "highPrice": "152.30000000",
  "lowPrice": "148.10000000",
  "volume": "1234567.89000000",
  "quoteVolume": "185000000.00000000",
  "openTime": 1738540800000,
  "closeTime": 1738627200000
}
```

#### 3. Get Kline/Candlestick Data
**Endpoint**: `GET https://api.binance.com/api/v3/klines`

**Parameters**:
- `symbol`: Trading pair (e.g., SOLUSDT)
- `interval`: Timeframe (1m, 5m, 15m, 1h, 4h, 1d, 1w, 1M)
- `limit`: Number of candles (default: 500, max: 1000)

**Request Example**:
```
GET https://api.binance.com/api/v3/klines?symbol=SOLUSDT&interval=1h&limit=24
```

**Response**:
```json
[
  [
    1738540800000,      // Open time
    "150.25",           // Open
    "152.30",           // High
    "148.10",           // Low
    "150.50",           // Close
    "123456.78",        // Volume
    1738544399999,      // Close time
    "18500000.00",      // Quote asset volume
    1234,               // Number of trades
    "61728.39",         // Taker buy base asset volume
    "9250000.00",       // Taker buy quote asset volume
    "0"                 // Ignore
  ]
]
```

### Chart Implementation

#### Flutter Chart Library
**Recommended**: `fl_chart` (most popular, 6k+ stars)

**Installation**:
```yaml
dependencies:
  fl_chart: ^0.66.0
  http: ^1.2.0
```

**Alternative**: `syncfusion_flutter_charts` (more features, commercial license for production)

#### Chart Widget Structure
```dart
class PriceChartPanel extends StatefulWidget {
  final String symbol;
  final String baseAsset;
  
  @override
  _PriceChartPanelState createState() => _PriceChartPanelState();
}

class _PriceChartPanelState extends State<PriceChartPanel> {
  String selectedInterval = '1h';
  List<CandleData> chartData = [];
  PriceStats? stats;
  bool isLoading = true;
  
  @override
  void initState() {
    super.initState();
    loadChartData();
  }
  
  Future<void> loadChartData() async {
    setState(() => isLoading = true);
    
    // Fetch 24h stats
    final statsResponse = await http.get(
      Uri.parse('https://api.binance.com/api/v3/ticker/24hr?symbol=${widget.symbol}')
    );
    
    // Fetch kline data
    final klineResponse = await http.get(
      Uri.parse('https://api.binance.com/api/v3/klines?symbol=${widget.symbol}&interval=$selectedInterval&limit=100')
    );
    
    // Parse and update state
    setState(() {
      stats = PriceStats.fromJson(jsonDecode(statsResponse.body));
      chartData = parseKlineData(jsonDecode(klineResponse.body));
      isLoading = false;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onVerticalDragEnd: (details) {
        if (details.primaryVelocity! > 0) {
          // Swipe down - dismiss
          Navigator.pop(context);
        }
      },
      child: Container(
        decoration: BoxDecoration(
          color: Color(0xFF1A1A24),
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: Column(
          children: [
            // Header
            _buildHeader(),
            
            // Chart
            Expanded(
              child: isLoading 
                ? Center(child: CircularProgressIndicator())
                : _buildChart(),
            ),
            
            // Timeframe selector
            _buildTimeframeSelector(),
            
            // Stats
            _buildStats(),
          ],
        ),
      ),
    );
  }
  
  Widget _buildHeader() {
    return Padding(
      padding: EdgeInsets.all(16),
      child: Row(
        children: [
          Text(
            '${widget.baseAsset}/USDT',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
          ),
          SizedBox(width: 8),
          Text(
            '\$${stats?.lastPrice ?? "..."}',
            style: TextStyle(fontSize: 18),
          ),
          SizedBox(width: 8),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: (stats?.priceChangePercent ?? 0) >= 0 
                ? Color(0xFF10B981).withOpacity(0.2)
                : Color(0xFFEF4444).withOpacity(0.2),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              '${(stats?.priceChangePercent ?? 0) >= 0 ? "+" : ""}${stats?.priceChangePercent ?? "0"}%',
              style: TextStyle(
                color: (stats?.priceChangePercent ?? 0) >= 0 
                  ? Color(0xFF10B981)
                  : Color(0xFFEF4444),
                fontSize: 14,
              ),
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildChart() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: LineChart(
        LineChartData(
          gridData: FlGridData(show: false),
          titlesData: FlTitlesData(show: false),
          borderData: FlBorderData(show: false),
          lineBarsData: [
            LineChartBarData(
              spots: chartData.asMap().entries.map((entry) {
                return FlSpot(entry.key.toDouble(), entry.value.close);
              }).toList(),
              isCurved: true,
              color: Color(0xFF6366F1),
              barWidth: 2,
              dotData: FlDotData(show: false),
              belowBarData: BarAreaData(
                show: true,
                color: Color(0xFF6366F1).withOpacity(0.1),
              ),
            ),
          ],
          lineTouchData: LineTouchData(
            touchTooltipData: LineTouchTooltipData(
              tooltipBgColor: Color(0xFF1A1A24),
              getTooltipItems: (touchedSpots) {
                return touchedSpots.map((spot) {
                  final candle = chartData[spot.x.toInt()];
                  return LineTooltipItem(
                    '\$${candle.close.toStringAsFixed(2)}\n${_formatTime(candle.time)}',
                    TextStyle(color: Colors.white),
                  );
                }).toList();
              },
            ),
          ),
        ),
      ),
    );
  }
  
  Widget _buildTimeframeSelector() {
    final timeframes = ['1H', '4H', '1D', '1W', '1M'];
    final intervals = ['1h', '4h', '1d', '1w', '1M'];
    
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: timeframes.asMap().entries.map((entry) {
          final isSelected = selectedInterval == intervals[entry.key];
          return GestureDetector(
            onTap: () {
              setState(() {
                selectedInterval = intervals[entry.key];
              });
              loadChartData();
            },
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: isSelected ? Color(0xFF6366F1) : Colors.transparent,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                entry.value,
                style: TextStyle(
                  color: isSelected ? Colors.white : Color(0xFF9CA3AF),
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
  
  Widget _buildStats() {
    return Padding(
      padding: EdgeInsets.all(16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildStatItem('High', '\$${stats?.highPrice ?? "..."}'),
          _buildStatItem('Low', '\$${stats?.lowPrice ?? "..."}'),
          _buildStatItem('Vol', '${_formatVolume(stats?.volume ?? 0)}'),
        ],
      ),
    );
  }
  
  Widget _buildStatItem(String label, String value) {
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(color: Color(0xFF9CA3AF), fontSize: 12),
        ),
        SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
        ),
      ],
    );
  }
  
  String _formatVolume(double volume) {
    if (volume >= 1000000) {
      return '${(volume / 1000000).toStringAsFixed(1)}M';
    } else if (volume >= 1000) {
      return '${(volume / 1000).toStringAsFixed(1)}K';
    }
    return volume.toStringAsFixed(0);
  }
  
  String _formatTime(DateTime time) {
    return '${time.hour}:${time.minute.toString().padLeft(2, '0')}';
  }
}

class CandleData {
  final DateTime time;
  final double open;
  final double high;
  final double low;
  final double close;
  final double volume;
  
  CandleData({
    required this.time,
    required this.open,
    required this.high,
    required this.low,
    required this.close,
    required this.volume,
  });
}

class PriceStats {
  final String symbol;
  final double priceChange;
  final double priceChangePercent;
  final double lastPrice;
  final double highPrice;
  final double lowPrice;
  final double volume;
  
  PriceStats({
    required this.symbol,
    required this.priceChange,
    required this.priceChangePercent,
    required this.lastPrice,
    required this.highPrice,
    required this.lowPrice,
    required this.volume,
  });
  
  factory PriceStats.fromJson(Map<String, dynamic> json) {
    return PriceStats(
      symbol: json['symbol'],
      priceChange: double.parse(json['priceChange']),
      priceChangePercent: double.parse(json['priceChangePercent']),
      lastPrice: double.parse(json['lastPrice']),
      highPrice: double.parse(json['highPrice']),
      lowPrice: double.parse(json['lowPrice']),
      volume: double.parse(json['volume']),
    );
  }
}

List<CandleData> parseKlineData(List<dynamic> data) {
  return data.map((item) {
    return CandleData(
      time: DateTime.fromMillisecondsSinceEpoch(item[0]),
      open: double.parse(item[1]),
      high: double.parse(item[2]),
      low: double.parse(item[3]),
      close: double.parse(item[4]),
      volume: double.parse(item[5]),
    );
  }).toList();
}
```

### Token Symbol Mapping

**Solana Tokens → Binance Symbols**:
```dart
class TokenSymbolMapper {
  static const Map<String, String> solanaToBindance = {
    // Native
    'SOL': 'SOLUSDT',
    
    // Stablecoins
    'USDC': 'USDCUSDT',
    'USDT': 'USDTUSDT',
    
    // Major tokens
    'BONK': 'BONKUSDT',
    'JTO': 'JTOUSDT',
    'PYTH': 'PYTHUSDT',
    'WIF': 'WIFUSDT',
    'JUP': 'JUPUSDT',
    
    // Wrapped
    'wSOL': 'SOLUSDT',
    'wBTC': 'BTCUSDT',
    'wETH': 'ETHUSDT',
  };
  
  static String? getBinanceSymbol(String solanaToken) {
    return solanaToBindance[solanaToken.toUpperCase()];
  }
  
  static bool isSupported(String solanaToken) {
    return solanaToBindance.containsKey(solanaToken.toUpperCase());
  }
}
```

### Chart Display Logic

```dart
class ChartDisplayController {
  // Determine if chart should be shown based on context
  bool shouldShowChart(String userMessage, String? responseContext) {
    final lowerMessage = userMessage.toLowerCase();
    
    // 1. Explicit price queries
    if (_isPriceQuery(lowerMessage)) return true;
    
    // 2. Explicit chart requests
    if (_isChartRequest(lowerMessage)) return true;
    
    // 3. After swap execution (if enabled in preferences)
    if (_isSwapComplete(responseContext) && _userPrefersChartAfterSwap()) {
      return true;
    }
    
    // 4. Token analysis
    if (_isTokenAnalysis(lowerMessage)) return true;
    
    return false;
  }
  
  bool _isPriceQuery(String message) {
    final priceKeywords = ['price', 'how much', 'what is', 'current price', 'worth', 'value of'];
    return priceKeywords.any((keyword) => message.contains(keyword));
  }
  
  bool _isChartRequest(String message) {
    return message.contains('chart') || message.contains('graph') || message.contains('show me');
  }
  
  bool _isSwapComplete(String? context) {
    if (context == null) return false;
    return context.contains('swap') && context.contains('complete');
  }
  
  bool _isTokenAnalysis(String message) {
    final analysisKeywords = ['analyze', 'tell me about', 'is it safe', 'should i buy', 'risk score'];
    return analysisKeywords.any((keyword) => message.contains(keyword));
  }
  
  bool _userPrefersChartAfterSwap() {
    return PreferencesService.getShowChartAfterSwap();
  }
  
  // Extract token symbol from message
  String? extractTokenSymbol(String message) {
    final tokens = ['SOL', 'USDC', 'USDT', 'BONK', 'JTO', 'PYTH', 'WIF', 'JUP'];
    for (final token in tokens) {
      if (message.toUpperCase().contains(token)) return token;
    }
    return null;
  }
  
  // Show chart with animation
  void showChart(BuildContext context, String tokenSymbol) {
    final binanceSymbol = TokenSymbolMapper.getBinanceSymbol(tokenSymbol);
    
    if (binanceSymbol == null) {
      _showPriceOnly(context, tokenSymbol);
      return;
    }
    
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => PriceChartPanel(
        symbol: binanceSymbol,
        baseAsset: tokenSymbol,
      ),
    );
  }
  
  void _showPriceOnly(BuildContext context, String tokenSymbol) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => PriceOnlyPanel(token: tokenSymbol),
    );
  }
}
```

### Example Scenarios

#### Scenario 1: Price Query → CHART MUNCUL
```
User: "what's the price of SOL?"
  ↓
System detects: isPriceQuery = true
  ↓
Extract token: "SOL"
  ↓
Map to Binance: "SOLUSDT"
  ↓
Show chart: SOL/USDT with 1H timeframe
  ↓
User sees: Current price + chart + 24h stats
```

#### Scenario 2: Swap Execution → CHART MUNCUL (optional)
```
User: "swap 1 SOL to USDC"
  ↓
System executes swap
  ↓
Swap complete
  ↓
Check user preference: showChartAfterSwap = true
  ↓
Show chart: SOL/USDT
  ↓
User sees: "Did I get good timing?"
```

#### Scenario 3: Token Analysis → CHART MUNCUL
```
User: "is BONK safe to buy?"
  ↓
System analyzes token risk
  ↓
Shows risk score: 65 (Caution)
  ↓
Also shows chart: BONK/USDT
  ↓
User sees: Risk score + price movement
```

#### Scenario 4: Balance Check → NO CHART
```
User: "what's my balance?"
  ↓
System detects: NOT a price query
  ↓
Shows balance: 1.5 SOL, 100 USDC
  ↓
NO chart shown
  ↓
User sees: Just numbers, clean and fast
```

#### Scenario 5: Transfer → NO CHART
```
User: "send 1 SOL to ABC123..."
  ↓
System executes transfer
  ↓
Shows result: "Transferred 1 SOL"
  ↓
NO chart shown
  ↓
User sees: Just confirmation
```

### Chart Integration Points

**In Chat Flow**:
```dart
// After AI response
if (chartController.shouldShowChart(userMessage, aiResponse)) {
  final token = chartController.extractTokenSymbol(userMessage);
  if (token != null) {
    Future.delayed(Duration(milliseconds: 500), () {
      chartController.showChart(context, token);
    });
  }
}
```

**In Swap Flow**:
```dart
// After swap execution
if (swapResult.success) {
  showResult('Swap complete: 1 SOL → 150.25 USDC');
  
  if (preferences.showChartAfterSwap) {
    Future.delayed(Duration(milliseconds: 800), () {
      chartController.showChart(context, 'SOL');
    });
  }
}
```

**In Portfolio View**:
```dart
// When user taps token in portfolio
ListTile(
  title: Text('SOL'),
  subtitle: Text('1.5 SOL • \$225.38'),
  onTap: () {
    chartController.showChart(context, 'SOL');
  },
)
```

### User Preferences for Charts

```dart
class ChartPreferences {
  bool showChartAfterSwap = false;      // Default: false (less intrusive)
  bool showChartAfterPrice = true;      // Default: true (expected)
  bool showChartAfterAnalysis = true;   // Default: true (helpful)
  String defaultTimeframe = '1H';       // Default: 1 hour
  bool autoRefresh = true;              // Default: true (every 30s)
}
```

---

### Caching Strategy

```dart
class PriceChartCache {
  static final Map<String, CachedChartData> _cache = {};
  static const cacheDuration = Duration(minutes: 5);
  
  static CachedChartData? get(String symbol, String interval) {
    final key = '$symbol-$interval';
    final cached = _cache[key];
    
    if (cached != null && 
        DateTime.now().difference(cached.timestamp) < cacheDuration) {
      return cached;
    }
    
    return null;
  }
  
  static void set(String symbol, String interval, List<CandleData> data) {
    final key = '$symbol-$interval';
    _cache[key] = CachedChartData(
      data: data,
      timestamp: DateTime.now(),
    );
  }
}

class CachedChartData {
  final List<CandleData> data;
  final DateTime timestamp;
  
  CachedChartData({required this.data, required this.timestamp});
}
```

### Error Handling

```dart
class BinanceApiClient {
  static Future<T> fetchWithRetry<T>(
    Future<T> Function() request,
    {int maxRetries = 3}
  ) async {
    int attempts = 0;
    
    while (attempts < maxRetries) {
      try {
        return await request();
      } catch (e) {
        attempts++;
        
        if (attempts >= maxRetries) {
          throw Exception('Failed to fetch data after $maxRetries attempts');
        }
        
        // Exponential backoff
        await Future.delayed(Duration(seconds: attempts * 2));
      }
    }
    
    throw Exception('Unexpected error');
  }
}
```

### Performance Optimization

**Best Practices**:
1. **Cache aggressively**: 5-minute cache for chart data
2. **Lazy load**: Only fetch when chart is shown
3. **Limit data points**: Max 100 candles per timeframe
4. **Debounce requests**: Prevent rapid API calls
5. **Preload common pairs**: SOL, USDC, USDT
6. **Background refresh**: Update every 30s when visible

**Data Limits**:
- 1H: Last 100 hours (4 days)
- 4H: Last 400 hours (16 days)
- 1D: Last 100 days (3 months)
- 1W: Last 100 weeks (2 years)
- 1M: Last 100 months (8 years)

### Fallback Strategy

```dart
// If Binance API fails or token not supported
class ChartFallbackHandler {
  static Widget buildFallback(String token) {
    return Container(
      padding: EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.show_chart, size: 48, color: Color(0xFF9CA3AF)),
          SizedBox(height: 16),
          Text(
            'Chart not available for $token',
            style: TextStyle(fontSize: 16),
          ),
          SizedBox(height: 8),
          Text(
            'Price data from Ordo backend',
            style: TextStyle(fontSize: 14, color: Color(0xFF9CA3AF)),
          ),
        ],
      ),
    );
  }
}
```

**Fallback Order**:
1. Try Binance API
2. If token not on Binance → Use Ordo backend price endpoint
3. If both fail → Show "Price unavailable"

---

### Wallet Operations
```
"create wallet"
"import wallet from [key]"
"what's my balance?"
"show my wallets"
"switch to ethereum wallet"
```

### Token Operations
```
"send 0.5 SOL to [address]"
"transfer 100 USDC to [address]"
"swap 1 SOL to USDC"
"what's the price of SOL?"
"show me all tokens"
```

### DeFi Operations
```
"stake 5 SOL with Marinade"
"unstake 2 SOL"
"lend 100 USDC on Kamino"
"borrow 50 USDC"
"add liquidity to SOL-USDC pool"
"remove liquidity from [pool]"
"bridge 1 ETH to Solana"
```

### NFT Operations
```
"show my NFTs"
"mint NFT [name]"
"transfer NFT [id] to [address]"
"what's my NFT portfolio worth?"
```

### Portfolio & Analytics
```
"show my portfolio"
"what's my total value?"
"show transaction history"
"what are my active positions?"
```

### Risk & Preferences
```
"what's the risk score of BONK?"
"set max transfer to 2 SOL"
"set slippage to 1%"
"enable auto-staking"
```

### General Queries
```
"what is Solana?"
"how does staking work?"
"explain liquidity pools"
"what's the best APY for staking?"
```

---

## Authentication Flow (On-Demand)

### Guest Mode
User dapat:
- Ask general questions
- View token prices
- Explore features
- Get information

### Login Required
Triggered when user tries:
- Create/import wallet
- View balance
- Execute transactions
- View portfolio

### Login Flow
```
1. User: "what's my balance?"
   ↓
2. System detects auth required
   ↓
3. Show login panel (inline)
   ↓
4. User logs in
   ↓
5. Return to original intent
   ↓
6. Execute: show balance
```

**Login Panel** (inline, not separate screen):
```
┌─────────────────────────────────┐
│ [lock] Login Required           │
│                                 │
│ To check balance, you need to   │
│ create an account or login.     │
│                                 │
│ Email: [____________]           │
│ Password: [____________]        │
│                                 │
│ [Login] [Create Account]        │
│                                 │
│ [Continue as Guest]             │
└─────────────────────────────────┘
```

---

## Gesture Interactions

### Primary Gestures
- **Tap command bar**: Focus input
- **Swipe up**: Command history (ephemeral)
- **Swipe down**: Dismiss panels
- **Long press command bar**: Voice input
- **Shake device**: Clear/reset
- **Pull down from top**: Refresh

### Command History (Swipe Up)
```
┌─────────────────────────────────┐
│ Recent Commands                 │
│ ────────────────────────────    │
│ • swap 1 sol to usdc            │
│ • what's my balance?            │
│ • stake 5 sol                   │
│ • show my nfts                  │
│                                 │
│ [Clear History]                 │
└─────────────────────────────────┘
```
- Overlay from bottom
- Tap to reuse command
- Swipe down to dismiss

---

## Visual Design

### Color Palette

**Design System Colors** (Consistent & Purposeful):

```dart
// Base Colors (Backgrounds & Surfaces)
class AppColors {
  // Backgrounds
  static const background = Color(0xFF0A0A0F);      // Deep dark
  static const surface = Color(0xFF1A1A24);         // Card/panel background
  static const surfaceLight = Color(0xFF2A2A34);    // Hover/active states
  
  // Primary (Brand)
  static const primary = Color(0xFF6366F1);         // Indigo (main brand)
  static const primaryLight = Color(0xFF818CF8);    // Lighter indigo
  static const primaryDark = Color(0xFF4F46E5);     // Darker indigo
  
  // Semantic Colors
  static const success = Color(0xFF10B981);         // Green (success, positive)
  static const warning = Color(0xFFF59E0B);         // Amber (warning, executing)
  static const error = Color(0xFFEF4444);           // Red (error, negative)
  static const info = Color(0xFF3B82F6);            // Blue (info)
  
  // Text Colors
  static const textPrimary = Color(0xFFF9FAFB);     // High contrast white
  static const textSecondary = Color(0xFF9CA3AF);   // Muted gray
  static const textTertiary = Color(0xFF6B7280);    // More muted
  static const textDisabled = Color(0xFF4B5563);    // Disabled state
  
  // Opacity Helpers
  static Color withOpacity(Color color, double opacity) {
    return color.withOpacity(opacity);
  }
}
```

**Usage Guidelines**:

```dart
// Backgrounds
Container(
  color: AppColors.background,        // Main app background
)

Container(
  color: AppColors.surface,           // Panels, cards
)

// Primary Actions
Container(
  color: AppColors.primary,           // Buttons, active states
)

// State Indicators
Container(
  color: AppColors.success,           // Success messages, positive changes
)

Container(
  color: AppColors.warning,           // Warnings, in-progress actions
)

Container(
  color: AppColors.error,             // Errors, negative changes
)

// Text
Text(
  'Title',
  style: TextStyle(color: AppColors.textPrimary),    // Headings, important text
)

Text(
  'Description',
  style: TextStyle(color: AppColors.textSecondary),  // Body text, descriptions
)

Text(
  'Caption',
  style: TextStyle(color: AppColors.textTertiary),   // Captions, metadata
)

// Borders & Dividers
Border.all(
  color: AppColors.primary.withOpacity(0.2),  // Subtle borders
)

Container(
  height: 1,
  color: AppColors.surface,                   // Dividers
)
```

**State-Specific Colors**:

```dart
Color getStateColor(AssistantState state) {
  switch (state) {
    case AssistantState.listening:
      return AppColors.success;      // Green (active listening)
    case AssistantState.thinking:
      return AppColors.primary;      // Indigo (processing)
    case AssistantState.executing:
      return AppColors.warning;      // Amber (in progress)
    case AssistantState.complete:
      return AppColors.success;      // Green (success)
    case AssistantState.error:
      return AppColors.error;        // Red (error)
    default:
      return AppColors.primary;      // Default indigo
  }
}
```

**Opacity Scale** (Consistent transparency):

```dart
// Use these standard opacity values
const opacity10 = 0.1;   // Very subtle (backgrounds)
const opacity20 = 0.2;   // Subtle (borders, dividers)
const opacity40 = 0.4;   // Medium (disabled states)
const opacity60 = 0.6;   // Strong (glass effects)
const opacity80 = 0.8;   // Very strong (overlays)

// Examples
AppColors.primary.withOpacity(0.1)   // Subtle primary background
AppColors.primary.withOpacity(0.2)   // Subtle primary border
AppColors.surface.withOpacity(0.6)   // Glass-morphism effect
```

**Color Combinations** (Pre-tested for accessibility):

```dart
// Panel with primary accent
Container(
  decoration: BoxDecoration(
    color: AppColors.surface.withOpacity(0.6),
    border: Border.all(
      color: AppColors.primary.withOpacity(0.2),
      width: 1,
    ),
  ),
)

// Success panel
Container(
  decoration: BoxDecoration(
    color: AppColors.surface.withOpacity(0.6),
    border: Border.all(
      color: AppColors.success.withOpacity(0.2),
      width: 1,
    ),
  ),
  child: Icon(
    Icons.check_circle,
    color: AppColors.success,
  ),
)

// Warning panel
Container(
  decoration: BoxDecoration(
    color: AppColors.surface.withOpacity(0.6),
    border: Border.all(
      color: AppColors.warning.withOpacity(0.2),
      width: 1,
    ),
  ),
  child: Icon(
    Icons.warning,
    color: AppColors.warning,
  ),
)

// Error panel
Container(
  decoration: BoxDecoration(
    color: AppColors.surface.withOpacity(0.6),
    border: Border.all(
      color: AppColors.error.withOpacity(0.2),
      width: 1,
    ),
  ),
  child: Icon(
    Icons.error,
    color: AppColors.error,
  ),
)
```

**Visual Hierarchy**:

```
Background (#0A0A0F)
  └─ Surface (#1A1A24)
      └─ Surface Light (#2A2A34)
          └─ Primary (#6366F1)

Text Primary (#F9FAFB) - Highest contrast
Text Secondary (#9CA3AF) - Medium contrast
Text Tertiary (#6B7280) - Lower contrast
Text Disabled (#4B5563) - Lowest contrast
```

**Accessibility**:
- All text colors meet WCAG AA standards (4.5:1 contrast ratio)
- Primary color (#6366F1) has sufficient contrast on dark backgrounds
- Semantic colors (success, warning, error) are distinguishable
- Not relying on color alone (always paired with icons/text)

### Typography

**Primary Font**: **Tomorrow** (Google Fonts)
- Futuristic, tech-forward aesthetic
- Perfect for crypto/blockchain apps
- Clean geometric design
- Excellent readability
- Modern and distinctive
- Free and open source

**Secondary Font**: **Inter** (for body text)
- Use Tomorrow for headings/titles
- Use Inter for body text (better readability for long text)
- Creates nice hierarchy

**Font Sizes & Weights**:
```dart
// App Name / Large Titles
TextStyle(
  fontFamily: 'Tomorrow',
  fontSize: 32,
  fontWeight: FontWeight.w700, // Bold
  letterSpacing: -0.5,
)

// Command Input
TextStyle(
  fontFamily: 'Tomorrow',
  fontSize: 20,
  fontWeight: FontWeight.w500, // Medium
  letterSpacing: 0,
)

// Panel Title / Section Headers
TextStyle(
  fontFamily: 'Tomorrow',
  fontSize: 16,
  fontWeight: FontWeight.w600, // Semibold
  letterSpacing: 0,
)

// Body Text (use Inter for better readability)
TextStyle(
  fontFamily: 'Inter',
  fontSize: 14,
  fontWeight: FontWeight.w400, // Regular
  height: 1.5,
)

// Caption / Small Text
TextStyle(
  fontFamily: 'Inter',
  fontSize: 12,
  fontWeight: FontWeight.w500, // Medium
)

// Numbers (Balance, Prices) - use Tomorrow for tech feel
TextStyle(
  fontFamily: 'Tomorrow',
  fontSize: 18,
  fontWeight: FontWeight.w600, // Semibold
  fontFeatures: [FontFeature.tabularFigures()], // Monospaced numbers
)

// Tags / Labels
TextStyle(
  fontFamily: 'Tomorrow',
  fontSize: 11,
  fontWeight: FontWeight.w600, // Semibold
  letterSpacing: 0.5,
)
```

**Font Configuration** (pubspec.yaml):
```yaml
flutter:
  fonts:
    # Tomorrow for headings/titles
    - family: Tomorrow
      fonts:
        - asset: fonts/Tomorrow-Regular.ttf
          weight: 400
        - asset: fonts/Tomorrow-Medium.ttf
          weight: 500
        - asset: fonts/Tomorrow-SemiBold.ttf
          weight: 600
        - asset: fonts/Tomorrow-Bold.ttf
          weight: 700
    
    # Inter for body text
    - family: Inter
      fonts:
        - asset: fonts/Inter-Regular.ttf
          weight: 400
        - asset: fonts/Inter-Medium.ttf
          weight: 500
```

**Or use Google Fonts package** (easier):
```yaml
dependencies:
  google_fonts: ^6.1.0
```

```dart
import 'package:google_fonts/google_fonts.dart';

// Tomorrow for titles
Text(
  'Ordo',
  style: GoogleFonts.tomorrow(
    fontSize: 32,
    fontWeight: FontWeight.w700,
  ),
)

// Inter for body
Text(
  'Your Solana DeFi Assistant',
  style: GoogleFonts.inter(
    fontSize: 14,
    fontWeight: FontWeight.w400,
  ),
)
```

**Why Tomorrow?**
- ✅ Futuristic, tech-forward look
- ✅ Perfect for crypto/blockchain apps
- ✅ Distinctive and memorable
- ✅ Clean geometric shapes
- ✅ Great for headings and numbers
- ✅ Modern, forward-thinking aesthetic

**Font Pairing Strategy**:
- **Tomorrow**: App name, headings, numbers, labels
- **Inter**: Body text, descriptions, long-form content
- Creates visual hierarchy and improves readability

**Font Hierarchy Example**:
```
Ordo                          ← 32px, Tomorrow Bold
Your Solana DeFi Assistant    ← 14px, Inter Regular

What do you want to do?       ← 20px, Tomorrow Medium

Planning                      ← 16px, Tomorrow Semibold
Getting quote from Jupiter    ← 14px, Inter Regular

1.5 SOL                       ← 18px, Tomorrow Semibold
$225.38                       ← 14px, Tomorrow Semibold

EXECUTING                     ← 11px, Tomorrow Semibold (uppercase)
Via Jupiter • Raydium         ← 12px, Inter Medium
```

**Visual Character**:
```
Tomorrow: TECH • FUTURE • CRYPTO • BOLD
Inter:    clean • readable • neutral • body
```

### Spacing
```
Padding: 16px, 24px, 32px
Margin: 8px, 16px, 24px
Border Radius: 12px, 16px, 24px
```

### Effects
```
Blur: backdrop-filter: blur(20px)
Shadow: 0 4px 24px rgba(0,0,0,0.3)
Opacity: 0.9 for glass surfaces
```

### Icons
- **Style**: Minimal line icons (Lucide, Heroicons)
- **Size**: 20px, 24px
- **Stroke**: 2px
- **Usage**: Contextual only

### Token & Chain Logos

#### Logo Sources
**Primary**: Jupiter Token List (most comprehensive)
- URL: `https://token.jup.ag/all`
- Contains 1000+ Solana tokens with logos
- High quality, verified tokens
- Updated regularly

**Fallback**: CoinGecko API
- URL: `https://api.coingecko.com/api/v3/coins/{id}`
- For tokens not on Jupiter
- Global coverage

**Local Assets**: For major chains
- Solana, Ethereum, Polygon, BSC, etc.
- Bundled with app for offline support

#### Token Logo Implementation

```dart
class TokenLogoService {
  static const jupiterTokenListUrl = 'https://token.jup.ag/all';
  static Map<String, TokenInfo> _tokenCache = {};
  
  // Load token list on app start
  Future<void> initialize() async {
    try {
      final response = await http.get(Uri.parse(jupiterTokenListUrl));
      final List<dynamic> tokens = jsonDecode(response.body);
      
      for (var token in tokens) {
        _tokenCache[token['address']] = TokenInfo(
          address: token['address'],
          symbol: token['symbol'],
          name: token['name'],
          logoURI: token['logoURI'],
          decimals: token['decimals'],
        );
      }
      
      print('Loaded ${_tokenCache.length} tokens');
    } catch (e) {
      print('Error loading token list: $e');
    }
  }
  
  // Get token logo URL
  String? getTokenLogo(String mintAddress) {
    return _tokenCache[mintAddress]?.logoURI;
  }
  
  // Get token info
  TokenInfo? getTokenInfo(String mintAddress) {
    return _tokenCache[mintAddress];
  }
  
  // Search tokens by symbol
  List<TokenInfo> searchTokens(String query) {
    return _tokenCache.values
        .where((token) => 
          token.symbol.toLowerCase().contains(query.toLowerCase()) ||
          token.name.toLowerCase().contains(query.toLowerCase())
        )
        .toList();
  }
}

class TokenInfo {
  final String address;
  final String symbol;
  final String name;
  final String logoURI;
  final int decimals;
  
  TokenInfo({
    required this.address,
    required this.symbol,
    required this.name,
    required this.logoURI,
    required this.decimals,
  });
}
```

#### Token Logo Widget

```dart
class TokenLogo extends StatelessWidget {
  final String mintAddress;
  final double size;
  final String? fallbackSymbol;
  
  const TokenLogo({
    required this.mintAddress,
    this.size = 32,
    this.fallbackSymbol,
  });
  
  @override
  Widget build(BuildContext context) {
    final logoUrl = TokenLogoService.instance.getTokenLogo(mintAddress);
    
    if (logoUrl != null) {
      return CachedNetworkImage(
        imageUrl: logoUrl,
        width: size,
        height: size,
        placeholder: (context, url) => _buildPlaceholder(),
        errorWidget: (context, url, error) => _buildFallback(),
      );
    }
    
    return _buildFallback();
  }
  
  Widget _buildPlaceholder() {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: Color(0xFF1A1A24),
        shape: BoxShape.circle,
      ),
      child: Center(
        child: CircularProgressIndicator(
          strokeWidth: 2,
          valueColor: AlwaysStoppedAnimation(Color(0xFF6366F1)),
        ),
      ),
    );
  }
  
  Widget _buildFallback() {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: Color(0xFF1A1A24),
        shape: BoxShape.circle,
        border: Border.all(color: Color(0xFF6366F1), width: 1),
      ),
      child: Center(
        child: Text(
          fallbackSymbol?.substring(0, 1).toUpperCase() ?? '?',
          style: TextStyle(
            fontSize: size * 0.5,
            fontWeight: FontWeight.w600,
            color: Color(0xFF6366F1),
          ),
        ),
      ),
    );
  }
}
```

#### Chain Logo Assets

**Local Assets** (bundled with app):
```
assets/chains/
├── solana.png          # Solana logo
├── ethereum.png        # Ethereum logo
├── polygon.png         # Polygon logo
├── bsc.png            # Binance Smart Chain
├── arbitrum.png       # Arbitrum
├── optimism.png       # Optimism
├── avalanche.png      # Avalanche
└── base.png           # Base
```

**Chain Logo Widget**:
```dart
class ChainLogo extends StatelessWidget {
  final String chainId;
  final double size;
  
  const ChainLogo({
    required this.chainId,
    this.size = 24,
  });
  
  @override
  Widget build(BuildContext context) {
    final assetPath = _getChainAsset(chainId);
    
    return Image.asset(
      assetPath,
      width: size,
      height: size,
      errorBuilder: (context, error, stackTrace) {
        return Icon(
          Icons.link,
          size: size,
          color: Color(0xFF6366F1),
        );
      },
    );
  }
  
  String _getChainAsset(String chainId) {
    switch (chainId.toLowerCase()) {
      case 'solana':
        return 'assets/chains/solana.png';
      case 'ethereum':
        return 'assets/chains/ethereum.png';
      case 'polygon':
        return 'assets/chains/polygon.png';
      case 'bsc':
        return 'assets/chains/bsc.png';
      case 'arbitrum':
        return 'assets/chains/arbitrum.png';
      case 'optimism':
        return 'assets/chains/optimism.png';
      case 'avalanche':
        return 'assets/chains/avalanche.png';
      case 'base':
        return 'assets/chains/base.png';
      default:
        return 'assets/chains/solana.png';
    }
  }
}
```

#### Logo Usage Examples

**In Token List**:
```dart
ListTile(
  leading: TokenLogo(
    mintAddress: 'So11111111111111111111111111111111111111112',
    size: 40,
    fallbackSymbol: 'SOL',
  ),
  title: Text('Solana'),
  subtitle: Text('SOL'),
  trailing: Text('1.5 SOL'),
)
```

**In Swap Interface**:
```dart
Row(
  children: [
    TokenLogo(
      mintAddress: inputMint,
      size: 32,
      fallbackSymbol: 'SOL',
    ),
    SizedBox(width: 8),
    Text('SOL'),
    Spacer(),
    Icon(Icons.arrow_forward),
    Spacer(),
    TokenLogo(
      mintAddress: outputMint,
      size: 32,
      fallbackSymbol: 'USDC',
    ),
    SizedBox(width: 8),
    Text('USDC'),
  ],
)
```

**In Portfolio View**:
```dart
Card(
  child: Row(
    children: [
      TokenLogo(
        mintAddress: token.mint,
        size: 48,
        fallbackSymbol: token.symbol,
      ),
      SizedBox(width: 16),
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(token.symbol, style: TextStyle(fontSize: 18)),
          Text(token.name, style: TextStyle(fontSize: 14, color: Colors.grey)),
        ],
      ),
      Spacer(),
      Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Text('${token.balance} ${token.symbol}'),
          Text('\$${token.usdValue}', style: TextStyle(color: Colors.grey)),
        ],
      ),
    ],
  ),
)
```

**In Chain Selector**:
```dart
DropdownButton<String>(
  value: selectedChain,
  items: [
    DropdownMenuItem(
      value: 'solana',
      child: Row(
        children: [
          ChainLogo(chainId: 'solana', size: 20),
          SizedBox(width: 8),
          Text('Solana'),
        ],
      ),
    ),
    DropdownMenuItem(
      value: 'ethereum',
      child: Row(
        children: [
          ChainLogo(chainId: 'ethereum', size: 20),
          SizedBox(width: 8),
          Text('Ethereum'),
        ],
      ),
    ),
  ],
  onChanged: (value) => setState(() => selectedChain = value!),
)
```

#### Logo Caching Strategy

```dart
class LogoCacheService {
  static final Map<String, Uint8List> _memoryCache = {};
  static const maxCacheSize = 100; // Max 100 logos in memory
  
  // Cache logo in memory
  static void cacheImage(String url, Uint8List bytes) {
    if (_memoryCache.length >= maxCacheSize) {
      // Remove oldest entry
      _memoryCache.remove(_memoryCache.keys.first);
    }
    _memoryCache[url] = bytes;
  }
  
  // Get cached logo
  static Uint8List? getCachedImage(String url) {
    return _memoryCache[url];
  }
  
  // Preload common tokens
  static Future<void> preloadCommonTokens() async {
    final commonMints = [
      'So11111111111111111111111111111111111111112', // SOL
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
      'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
      'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // BONK
      'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL', // JTO
    ];
    
    for (final mint in commonMints) {
      final logoUrl = TokenLogoService.instance.getTokenLogo(mint);
      if (logoUrl != null) {
        try {
          final response = await http.get(Uri.parse(logoUrl));
          cacheImage(logoUrl, response.bodyBytes);
        } catch (e) {
          print('Error preloading logo: $e');
        }
      }
    }
  }
}
```

#### Major Token Addresses (Solana)

```dart
class WellKnownTokens {
  static const Map<String, String> solanaTokens = {
    // Native
    'SOL': 'So11111111111111111111111111111111111111112',
    
    // Stablecoins
    'USDC': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    'USDT': 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    
    // Major tokens
    'BONK': 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    'JTO': 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
    'PYTH': 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
    'WIF': 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
    'JUP': 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    'ORCA': 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE',
    'RAY': '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    'MNGO': 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac',
  };
  
  static String? getMintAddress(String symbol) {
    return solanaTokens[symbol.toUpperCase()];
  }
}
```

### Animations
- **Duration**: 200ms - 400ms
- **Easing**: ease-in-out, spring
- **Types**: fade, slide, scale
- **60fps**: Always smooth

### Loading Indicators

#### Primary Loading Indicator
**Location**: **ONLY below command input bar** (global indicator)  
**Purpose**: Show that ANY process is running  
**Style**: Thin bouncing line (2px height)  
**Animation**: Fast kanan-kiri (800ms cycle)

```
┌─────────────────────────────────┐
│ What do you want to do?         │ ← Command input
└─────────────────────────────────┘
  ░░░░████░░░░░░░░░░░░░░░░░░░░░░   ← Bouncing line (ONLY HERE)
```

**Rules**:
- ✅ Show when: Listening, Thinking, Executing
- ✅ Hide when: Idle, Complete, Error
- ✅ Color changes by state (green/indigo/amber)
- ❌ NO loading bars in context area
- ❌ NO duplicate loading indicators

#### Context Area Content (Task-Specific)

**Di area main, tampilkan sesuai task**:

**1. Thinking State** - Show reasoning steps:
```
┌─────────────────────────────────┐
│ swap 1 sol to usdc              │
└─────────────────────────────────┘
  ░░░░████░░░░░░░░░░░░░░░░░░░░░░   ← Loading bar (di input)

[cpu] Planning...                   ← Context area
├─ Getting quote from Jupiter
└─ Calculating best route
```

**2. Executing State** - Show execution progress:
```
┌─────────────────────────────────┐
│ swap 1 sol to usdc              │
└─────────────────────────────────┘
  ░░░░░░░░████░░░░░░░░░░░░░░░░░░   ← Loading bar (di input)

[settings] Executing swap...        ← Context area
Via Jupiter • Raydium
```

**3. Fetching Data** - Show what's being fetched:
```
┌─────────────────────────────────┐
│ what's my balance?              │
└─────────────────────────────────┘
  ░░░░░░░░░░░░████░░░░░░░░░░░░░░   ← Loading bar (di input)

[cpu] Fetching balance...           ← Context area
Checking SOL and tokens
```

**4. Chart Loading** - Show chart placeholder:
```
┌─────────────────────────────────┐
│ show sol chart                  │
└─────────────────────────────────┘
  ░░░░░░░░░░░░░░░░████░░░░░░░░░░   ← Loading bar (di input)

┌─────────────────────────────────┐
│ SOL/USDT                        │
│                                 │
│   Loading chart data...         │ ← Context area
│                                 │
└─────────────────────────────────┘
```

**5. Complete State** - NO loading bar:
```
┌─────────────────────────────────┐
│ swap 1 sol to usdc              │
└─────────────────────────────────┘
                                     ← No loading bar

[check-circle] Swap Complete        ← Context area
1 SOL → 150.25 USDC
Fee: 0.000005 SOL
```

#### Implementation

```dart
class CommandInputWithLoading extends StatelessWidget {
  final bool isLoading;
  final AssistantState state;
  final TextEditingController controller;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Command input bar
        Container(
          padding: EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          decoration: BoxDecoration(
            color: Color(0xFF1A1A24),
            borderRadius: BorderRadius.circular(16),
          ),
          child: TextField(
            controller: controller,
            decoration: InputDecoration(
              hintText: 'What do you want to do?',
              border: InputBorder.none,
            ),
          ),
        ),
        
        // ONLY loading indicator (no duplicates elsewhere)
        AnimatedContainer(
          duration: Duration(milliseconds: 200),
          height: isLoading ? 2 : 0,
          child: isLoading
            ? BouncingLinearProgress(
                color: _getLoadingColor(state),
                height: 2,
              )
            : SizedBox.shrink(),
        ),
      ],
    );
  }
  
  Color _getLoadingColor(AssistantState state) {
    switch (state) {
      case AssistantState.listening:
        return Color(0xFF10B981); // Green
      case AssistantState.thinking:
        return Color(0xFF6366F1); // Indigo
      case AssistantState.executing:
        return Color(0xFFF59E0B); // Amber
      default:
        return Color(0xFF6366F1);
    }
  }
}
```

```dart
class BouncingLinearProgress extends StatefulWidget {
  final Color color;
  final double height;
  
  @override
  _BouncingLinearProgressState createState() => _BouncingLinearProgressState();
}

class _BouncingLinearProgressState extends State<BouncingLinearProgress>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  
  @override
  void initState() {
    super.initState();
    
    // Fast bouncing animation (800ms per cycle)
    _controller = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 800),
    )..repeat(reverse: true); // Reverse = bouncing effect
    
    // Smooth curve
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return CustomPaint(
          painter: BouncingProgressPainter(
            progress: _animation.value,
            color: widget.color,
          ),
          size: Size(double.infinity, widget.height),
        );
      },
    );
  }
}

class BouncingProgressPainter extends CustomPainter {
  final double progress; // 0.0 to 1.0
  final Color color;
  
  BouncingProgressPainter({required this.progress, required this.color});
  
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;
    
    // Line width (20% of total width)
    final lineWidth = size.width * 0.2;
    
    // Calculate position (0 to size.width - lineWidth)
    final maxPosition = size.width - lineWidth;
    final position = progress * maxPosition;
    
    // Draw the moving line
    final rect = Rect.fromLTWH(
      position,
      0,
      lineWidth,
      size.height,
    );
    
    canvas.drawRect(rect, paint);
  }
  
  @override
  bool shouldRepaint(BouncingProgressPainter oldDelegate) {
    return oldDelegate.progress != progress;
  }
}
```

#### Context Area Content Examples

**Design Principles**:
- ✅ **Stable positioning** - Content doesn't jump around
- ✅ **Smooth transitions** - Fade in/out, slide up/down
- ✅ **Consistent spacing** - Same padding/margins always
- ✅ **Elegant typography** - Clear hierarchy, proper weights
- ✅ **Subtle animations** - Not distracting, just polished

**Thinking Panel** (elegant, stable):
```dart
class ThinkingPanel extends StatelessWidget {
  final List<String> steps;
  
  @override
  Widget build(BuildContext context) {
    return AnimatedOpacity(
      opacity: 1.0,
      duration: Duration(milliseconds: 300),
      curve: Curves.easeOut,
      child: Container(
        margin: EdgeInsets.only(top: 24), // Consistent spacing
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Color(0xFF1A1A24).withOpacity(0.6),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: Color(0xFF6366F1).withOpacity(0.2),
            width: 1,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min, // Don't expand unnecessarily
          children: [
            // Header with icon
            Row(
              children: [
                Container(
                  padding: EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Color(0xFF6366F1).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(
                    Icons.psychology_outlined,
                    size: 20,
                    color: Color(0xFF6366F1),
                  ),
                ),
                SizedBox(width: 12),
                Text(
                  'Planning',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFFF9FAFB),
                    letterSpacing: -0.3,
                  ),
                ),
              ],
            ),
            
            // Steps with staggered animation
            SizedBox(height: 16),
            ...steps.asMap().entries.map((entry) {
              return TweenAnimationBuilder<double>(
                tween: Tween(begin: 0.0, end: 1.0),
                duration: Duration(milliseconds: 300),
                delay: Duration(milliseconds: entry.key * 100), // Stagger
                curve: Curves.easeOut,
                builder: (context, value, child) {
                  return Opacity(
                    opacity: value,
                    child: Transform.translate(
                      offset: Offset(0, 10 * (1 - value)),
                      child: Padding(
                        padding: EdgeInsets.only(top: entry.key > 0 ? 8 : 0),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              margin: EdgeInsets.only(top: 6),
                              width: 4,
                              height: 4,
                              decoration: BoxDecoration(
                                color: Color(0xFF6366F1).withOpacity(0.6),
                                shape: BoxShape.circle,
                              ),
                            ),
                            SizedBox(width: 12),
                            Expanded(
                              child: Text(
                                entry.value,
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Color(0xFF9CA3AF),
                                  height: 1.5,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              );
            }).toList(),
          ],
        ),
      ),
    );
  }
}
```

**Executing Panel** (elegant, stable):
```dart
class ExecutingPanel extends StatelessWidget {
  final String action;
  final List<String> tools;
  
  @override
  Widget build(BuildContext context) {
    return AnimatedOpacity(
      opacity: 1.0,
      duration: Duration(milliseconds: 300),
      curve: Curves.easeOut,
      child: Container(
        margin: EdgeInsets.only(top: 24), // Same as thinking panel
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Color(0xFF1A1A24).withOpacity(0.6),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: Color(0xFFF59E0B).withOpacity(0.2),
            width: 1,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header with pulsing icon
            Row(
              children: [
                TweenAnimationBuilder<double>(
                  tween: Tween(begin: 0.8, end: 1.0),
                  duration: Duration(milliseconds: 1000),
                  curve: Curves.easeInOut,
                  builder: (context, value, child) {
                    return Transform.scale(
                      scale: value,
                      child: Container(
                        padding: EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Color(0xFFF59E0B).withOpacity(0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Icon(
                          Icons.settings_outlined,
                          size: 20,
                          color: Color(0xFFF59E0B),
                        ),
                      ),
                    );
                  },
                ),
                SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Executing',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFFF9FAFB),
                          letterSpacing: -0.3,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        action,
                        style: TextStyle(
                          fontSize: 14,
                          color: Color(0xFF9CA3AF),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            
            // Tools with subtle animation
            if (tools.isNotEmpty) ...[
              SizedBox(height: 16),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: tools.map((tool) {
                  return Container(
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: Color(0xFFF59E0B).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: Color(0xFFF59E0B).withOpacity(0.2),
                        width: 1,
                      ),
                    ),
                    child: Text(
                      tool,
                      style: TextStyle(
                        fontSize: 12,
                        color: Color(0xFFF59E0B),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  );
                }).toList(),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
```

**Result Panel** (elegant, stable):
```dart
class ResultPanel extends StatelessWidget {
  final String title;
  final String subtitle;
  final List<ResultItem> items;
  final bool isSuccess;
  
  @override
  Widget build(BuildContext context) {
    final color = isSuccess ? Color(0xFF10B981) : Color(0xFFEF4444);
    
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.0, end: 1.0),
      duration: Duration(milliseconds: 400),
      curve: Curves.easeOutCubic,
      builder: (context, value, child) {
        return Opacity(
          opacity: value,
          child: Transform.translate(
            offset: Offset(0, 20 * (1 - value)),
            child: Container(
              margin: EdgeInsets.only(top: 24),
              padding: EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Color(0xFF1A1A24).withOpacity(0.6),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: color.withOpacity(0.2),
                  width: 1,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Success/Error header
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: color.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Icon(
                          isSuccess ? Icons.check_circle_outline : Icons.error_outline,
                          size: 20,
                          color: color,
                        ),
                      ),
                      SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              title,
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                                color: Color(0xFFF9FAFB),
                                letterSpacing: -0.3,
                              ),
                            ),
                            if (subtitle.isNotEmpty) ...[
                              SizedBox(height: 4),
                              Text(
                                subtitle,
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Color(0xFF9CA3AF),
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),
                    ],
                  ),
                  
                  // Result items
                  if (items.isNotEmpty) ...[
                    SizedBox(height: 16),
                    Container(
                      padding: EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Color(0xFF0A0A0F).withOpacity(0.5),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Column(
                        children: items.asMap().entries.map((entry) {
                          return Padding(
                            padding: EdgeInsets.only(
                              top: entry.key > 0 ? 12 : 0,
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  entry.value.label,
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: Color(0xFF9CA3AF),
                                  ),
                                ),
                                Text(
                                  entry.value.value,
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w600,
                                    color: Color(0xFFF9FAFB),
                                  ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class ResultItem {
  final String label;
  final String value;
  
  ResultItem({required this.label, required this.value});
}
```

**Chart Loading Placeholder** (elegant, stable):
```dart
class ChartLoadingPlaceholder extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.0, end: 1.0),
      duration: Duration(milliseconds: 300),
      curve: Curves.easeOut,
      builder: (context, value, child) {
        return Opacity(
          opacity: value,
          child: Container(
            margin: EdgeInsets.only(top: 24),
            height: 240,
            decoration: BoxDecoration(
              color: Color(0xFF1A1A24).withOpacity(0.6),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: Color(0xFF6366F1).withOpacity(0.2),
                width: 1,
              ),
            ),
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Pulsing chart icon
                  TweenAnimationBuilder<double>(
                    tween: Tween(begin: 0.8, end: 1.0),
                    duration: Duration(milliseconds: 1000),
                    curve: Curves.easeInOut,
                    builder: (context, scale, child) {
                      return Transform.scale(
                        scale: scale,
                        child: Container(
                          padding: EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Color(0xFF6366F1).withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            Icons.show_chart,
                            size: 32,
                            color: Color(0xFF6366F1),
                          ),
                        ),
                      );
                    },
                  ),
                  SizedBox(height: 16),
                  Text(
                    'Loading chart data',
                    style: TextStyle(
                      fontSize: 14,
                      color: Color(0xFF9CA3AF),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
```

**Animation Guidelines**:

1. **Fade In** (300-400ms):
   - Use for new content appearing
   - Curve: `Curves.easeOut`
   - Opacity: 0.0 → 1.0

2. **Slide Up** (300-400ms):
   - Combine with fade for elegance
   - Offset: (0, 20) → (0, 0)
   - Curve: `Curves.easeOutCubic`

3. **Stagger** (100ms delay per item):
   - For lists/steps
   - Creates flowing effect
   - Max 5 items staggered

4. **Pulse** (1000ms):
   - For active indicators
   - Scale: 0.8 → 1.0 → 0.8
   - Curve: `Curves.easeInOut`
   - Repeat infinitely

5. **Fade Out** (200ms):
   - Faster than fade in
   - Curve: `Curves.easeIn`
   - Opacity: 1.0 → 0.0

**Spacing Consistency**:
```dart
// Always use these values
const double panelTopMargin = 24.0;
const double panelPadding = 20.0;
const double panelBorderRadius = 16.0;
const double iconContainerSize = 36.0;
const double iconSize = 20.0;
const double spacingSmall = 8.0;
const double spacingMedium = 12.0;
const double spacingLarge = 16.0;
```

**Typography Hierarchy**:
```dart
// Panel title
TextStyle(
  fontSize: 16,
  fontWeight: FontWeight.w600,
  color: Color(0xFFF9FAFB),
  letterSpacing: -0.3,
)

// Panel subtitle
TextStyle(
  fontSize: 14,
  color: Color(0xFF9CA3AF),
)

// Body text
TextStyle(
  fontSize: 14,
  color: Color(0xFF9CA3AF),
  height: 1.5,
)

// Small text (tags, labels)
TextStyle(
  fontSize: 12,
  fontWeight: FontWeight.w500,
  color: Color(0xFF6366F1),
)
```

**Color Usage**:
```dart
// Panel backgrounds
Color(0xFF1A1A24).withOpacity(0.6)  // Glass effect

// Panel borders
Color(0xFF6366F1).withOpacity(0.2)  // Subtle outline

// Icon containers
Color(0xFF6366F1).withOpacity(0.1)  // Soft background

// Inner containers
Color(0xFF0A0A0F).withOpacity(0.5)  // Darker section
```

#### Loading States Summary

**Global Indicator** (below input bar):
- ✅ Shows process is running
- ✅ Color indicates state
- ✅ Bouncing animation (kanan-kiri)
- ✅ Always in same location

**Context Area** (main area):
- ✅ Task-specific content
- ✅ Text descriptions
- ✅ Icons for context
- ❌ NO loading bars
- ❌ NO spinners

---

## Technical Implementation

### State Management
```dart
enum AssistantState {
  idle,
  listening,
  thinking,
  executing,
  complete,
  error,
}

class AssistantController extends ChangeNotifier {
  AssistantState _state = AssistantState.idle;
  String? _currentCommand;
  dynamic _result;
  String? _error;
  
  // State transitions
  void processCommand(String command) { }
  void showResult(dynamic result) { }
  void showError(String error) { }
  void reset() { }
}
```

### Command Processing
```dart
class CommandProcessor {
  Future<CommandResult> process(String input) async {
    // 1. Parse intent
    final intent = await parseIntent(input);
    
    // 2. Check auth requirement
    if (intent.requiresAuth && !isAuthenticated) {
      return CommandResult.authRequired();
    }
    
    // 3. Execute via API
    final result = await executeCommand(intent);
    
    // 4. Return structured result
    return CommandResult.success(result);
  }
}
```

### API Integration
```dart
class OrdoApiClient {
  static const baseUrl = 'https://api.ordo-assistant.com/api/v1';
  
  // Chat endpoint (streaming)
  Stream<String> chat(String message) async* {
    final response = await dio.post(
      '/chat/stream',
      data: {'message': message},
      options: Options(responseType: ResponseType.stream),
    );
    
    await for (final chunk in response.data.stream) {
      yield parseSSE(chunk);
    }
  }
  
  // Direct action endpoints
  Future<dynamic> executeAction(String action, Map params) async {
    return await dio.post('/actions/$action', data: params);
  }
}
```

### Gesture Handling
```dart
class GestureHandler extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onVerticalDragEnd: (details) {
        if (details.primaryVelocity! < 0) {
          // Swipe up - show history
          showCommandHistory();
        } else if (details.primaryVelocity! > 0) {
          // Swipe down - dismiss
          dismissPanels();
        }
      },
      onLongPress: () {
        // Long press - voice input
        startVoiceInput();
      },
      child: child,
    );
  }
}
```

---

## Performance Requirements

- **App Launch**: < 1 second
- **Command Processing**: < 500ms
- **API Response**: < 2 seconds
- **Animations**: 60fps constant
- **Memory**: < 100MB
- **Battery**: Minimal drain

---

## Voice Assistant Integration

### Overview
Ordo mendukung **full voice interaction** seperti Siri/Google Assistant, memungkinkan user berinteraksi hands-free dengan natural language.

### Voice Input Methods

#### 1. In-App Voice Button
```dart
// Long press command bar untuk voice input
GestureDetector(
  onLongPress: () {
    startVoiceInput();
  },
  child: CommandInputBar(),
)
```

**Behavior**:
- Long press command bar → Start listening
- Visual indicator: [mic] icon + pulsing animation
- Real-time transcription shown in command bar
- Auto-submit when user stops speaking (2s silence)
- Tap anywhere to cancel

#### 2. System Voice Assistant Integration

**iOS - Siri Shortcuts**:
```swift
// Siri can trigger Ordo commands
"Hey Siri, check my SOL balance in Ordo"
"Hey Siri, swap 1 SOL to USDC in Ordo"
"Hey Siri, show my portfolio in Ordo"
```

**Android - Google Assistant**:
```
"Hey Google, ask Ordo what's my balance"
"Hey Google, tell Ordo to swap 1 SOL to USDC"
"Hey Google, open Ordo and show my portfolio"
```

#### 3. App Shortcuts (Quick Actions)

**iOS - Home Screen Quick Actions**:
- Long press app icon → Quick actions
  - "Check Balance"
  - "Swap Tokens"
  - "View Portfolio"
  - "Send SOL"

**Android - App Shortcuts**:
- Long press app icon → Shortcuts
  - "Check Balance"
  - "Swap Tokens"
  - "View Portfolio"
  - "Send SOL"

### Voice Recognition Implementation

```dart
import 'package:speech_to_text/speech_to_text.dart' as stt;

class VoiceInputController {
  final stt.SpeechToText _speech = stt.SpeechToText();
  bool _isListening = false;
  String _transcription = '';
  
  Future<void> initialize() async {
    bool available = await _speech.initialize(
      onStatus: (status) => _handleStatus(status),
      onError: (error) => _handleError(error),
    );
    
    if (!available) {
      throw Exception('Voice input not available');
    }
  }
  
  Future<void> startListening() async {
    if (!_isListening) {
      setState(() => _isListening = true);
      
      await _speech.listen(
        onResult: (result) {
          setState(() {
            _transcription = result.recognizedWords;
          });
          
          // Auto-submit when final
          if (result.finalResult) {
            _submitCommand(_transcription);
          }
        },
        listenFor: Duration(seconds: 30),
        pauseFor: Duration(seconds: 2),
        partialResults: true,
        localeId: 'en_US',
      );
    }
  }
  
  void stopListening() {
    _speech.stop();
    setState(() => _isListening = false);
  }
  
  void _submitCommand(String command) {
    stopListening();
    commandController.processCommand(command);
  }
  
  void _handleStatus(String status) {
    if (status == 'done') {
      setState(() => _isListening = false);
    }
  }
  
  void _handleError(dynamic error) {
    print('Voice input error: $error');
    setState(() => _isListening = false);
  }
}
```

### Voice Feedback (Text-to-Speech)

```dart
import 'package:flutter_tts/flutter_tts.dart';

class VoiceFeedbackController {
  final FlutterTts _tts = FlutterTts();
  
  Future<void> initialize() async {
    await _tts.setLanguage('en-US');
    await _tts.setSpeechRate(0.5);
    await _tts.setVolume(1.0);
    await _tts.setPitch(1.0);
  }
  
  Future<void> speak(String text) async {
    // Only speak if user has voice feedback enabled
    if (preferences.voiceFeedbackEnabled) {
      await _tts.speak(text);
    }
  }
  
  Future<void> stop() async {
    await _tts.stop();
  }
}
```

**Voice Feedback Examples**:
```
User: "What's my balance?"
  ↓
App speaks: "Your balance is 1.5 SOL, worth $225"

User: "Swap 1 SOL to USDC"
  ↓
App speaks: "Swapping 1 SOL to USDC... Complete. You received 150.25 USDC"

User: "What's the price of SOL?"
  ↓
App speaks: "SOL is currently $150.25, up 2.5% today"
```

### Siri Shortcuts Integration (iOS)

```swift
// Add to Info.plist
<key>NSUserActivityTypes</key>
<array>
    <string>com.ordo.checkBalance</string>
    <string>com.ordo.swapTokens</string>
    <string>com.ordo.viewPortfolio</string>
    <string>com.ordo.sendSOL</string>
</array>
```

```dart
import 'package:flutter_siri_suggestions/flutter_siri_suggestions.dart';

class SiriShortcutsController {
  Future<void> registerShortcuts() async {
    // Check Balance
    await FlutterSiriSuggestions.instance.buildShortcut(
      activityType: 'com.ordo.checkBalance',
      title: 'Check Balance',
      suggestedInvocationPhrase: 'Check my balance in Ordo',
      isEligibleForSearch: true,
      isEligibleForPrediction: true,
    );
    
    // Swap Tokens
    await FlutterSiriSuggestions.instance.buildShortcut(
      activityType: 'com.ordo.swapTokens',
      title: 'Swap Tokens',
      suggestedInvocationPhrase: 'Swap tokens in Ordo',
      isEligibleForSearch: true,
      isEligibleForPrediction: true,
    );
    
    // View Portfolio
    await FlutterSiriSuggestions.instance.buildShortcut(
      activityType: 'com.ordo.viewPortfolio',
      title: 'View Portfolio',
      suggestedInvocationPhrase: 'Show my portfolio in Ordo',
      isEligibleForSearch: true,
      isEligibleForPrediction: true,
    );
  }
  
  Future<void> handleShortcut(String activityType) async {
    switch (activityType) {
      case 'com.ordo.checkBalance':
        commandController.processCommand('check balance');
        break;
      case 'com.ordo.swapTokens':
        commandController.processCommand('swap');
        break;
      case 'com.ordo.viewPortfolio':
        commandController.processCommand('show portfolio');
        break;
    }
  }
}
```

### Google Assistant Integration (Android)

```xml
<!-- AndroidManifest.xml -->
<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="ordo" />
    </intent-filter>
</activity>
```

```dart
import 'package:uni_links/uni_links.dart';

class DeepLinkController {
  StreamSubscription? _linkSubscription;
  
  Future<void> initialize() async {
    // Handle initial link
    try {
      final initialLink = await getInitialLink();
      if (initialLink != null) {
        _handleDeepLink(initialLink);
      }
    } catch (e) {
      print('Error getting initial link: $e');
    }
    
    // Listen for links while app is running
    _linkSubscription = linkStream.listen((String? link) {
      if (link != null) {
        _handleDeepLink(link);
      }
    });
  }
  
  void _handleDeepLink(String link) {
    final uri = Uri.parse(link);
    
    // ordo://command?q=check+balance
    if (uri.scheme == 'ordo' && uri.host == 'command') {
      final command = uri.queryParameters['q'];
      if (command != null) {
        commandController.processCommand(command);
      }
    }
  }
  
  void dispose() {
    _linkSubscription?.cancel();
  }
}
```

---

## App Permissions

### Required Permissions

#### iOS (Info.plist)
```xml
<!-- Microphone for voice input -->
<key>NSMicrophoneUsageDescription</key>
<string>Ordo needs microphone access for voice commands</string>

<!-- Speech recognition -->
<key>NSSpeechRecognitionUsageDescription</key>
<string>Ordo uses speech recognition to understand your commands</string>

<!-- Camera (for QR code scanning) -->
<key>NSCameraUsageDescription</key>
<string>Ordo needs camera access to scan wallet addresses via QR code</string>

<!-- Face ID / Touch ID -->
<key>NSFaceIDUsageDescription</key>
<string>Ordo uses Face ID to secure your wallet access</string>

<!-- Notifications -->
<key>NSUserNotificationsUsageDescription</key>
<string>Ordo sends notifications for transaction confirmations and price alerts</string>

<!-- Internet (always allowed on iOS) -->
```

#### Android (AndroidManifest.xml)
```xml
<!-- Internet access -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Microphone for voice input -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />

<!-- Camera for QR code scanning -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Biometric authentication -->
<uses-permission android:name="android.permission.USE_BIOMETRIC" />

<!-- Notifications -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

<!-- Vibration for haptic feedback -->
<uses-permission android:name="android.permission.VIBRATE" />

<!-- Network state -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### Permission Request Flow

```dart
import 'package:permission_handler/permission_handler.dart';

class PermissionController {
  // Request microphone permission for voice input
  Future<bool> requestMicrophonePermission() async {
    final status = await Permission.microphone.request();
    
    if (status.isGranted) {
      return true;
    } else if (status.isDenied) {
      _showPermissionDialog(
        'Microphone Access',
        'Ordo needs microphone access for voice commands. Please enable it in Settings.',
      );
      return false;
    } else if (status.isPermanentlyDenied) {
      _showSettingsDialog(
        'Microphone Access',
        'Microphone access is permanently denied. Please enable it in Settings.',
      );
      return false;
    }
    
    return false;
  }
  
  // Request camera permission for QR scanning
  Future<bool> requestCameraPermission() async {
    final status = await Permission.camera.request();
    
    if (status.isGranted) {
      return true;
    } else if (status.isDenied) {
      _showPermissionDialog(
        'Camera Access',
        'Ordo needs camera access to scan QR codes for wallet addresses.',
      );
      return false;
    } else if (status.isPermanentlyDenied) {
      _showSettingsDialog(
        'Camera Access',
        'Camera access is permanently denied. Please enable it in Settings.',
      );
      return false;
    }
    
    return false;
  }
  
  // Request notification permission
  Future<bool> requestNotificationPermission() async {
    final status = await Permission.notification.request();
    return status.isGranted;
  }
  
  // Check if all required permissions are granted
  Future<Map<String, bool>> checkAllPermissions() async {
    return {
      'microphone': await Permission.microphone.isGranted,
      'camera': await Permission.camera.isGranted,
      'notification': await Permission.notification.isGranted,
    };
  }
  
  void _showPermissionDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              openAppSettings();
            },
            child: Text('Open Settings'),
          ),
        ],
      ),
    );
  }
  
  void _showSettingsDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              openAppSettings();
            },
            child: Text('Open Settings'),
          ),
        ],
      ),
    );
  }
}
```

### Permission Request Timing

**On First Launch**:
```
1. App opens
   ↓
2. Show welcome screen
   ↓
3. Explain features
   ↓
4. Request essential permissions:
   - Microphone (for voice commands)
   - Notifications (for alerts)
   ↓
5. User can skip and grant later
```

**On Feature Use** (Just-in-Time):
```
User taps voice button
  ↓
Check microphone permission
  ↓
If not granted → Request permission
  ↓
If granted → Start voice input

User taps QR scan
  ↓
Check camera permission
  ↓
If not granted → Request permission
  ↓
If granted → Open camera
```

### Permission Settings Screen

```dart
class PermissionsSettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        PermissionTile(
          icon: Icons.mic,
          title: 'Microphone',
          description: 'For voice commands',
          permission: Permission.microphone,
        ),
        PermissionTile(
          icon: Icons.camera_alt,
          title: 'Camera',
          description: 'For QR code scanning',
          permission: Permission.camera,
        ),
        PermissionTile(
          icon: Icons.notifications,
          title: 'Notifications',
          description: 'For transaction alerts',
          permission: Permission.notification,
        ),
      ],
    );
  }
}

class PermissionTile extends StatefulWidget {
  final IconData icon;
  final String title;
  final String description;
  final Permission permission;
  
  @override
  _PermissionTileState createState() => _PermissionTileState();
}

class _PermissionTileState extends State<PermissionTile> {
  bool _isGranted = false;
  
  @override
  void initState() {
    super.initState();
    _checkPermission();
  }
  
  Future<void> _checkPermission() async {
    final status = await widget.permission.status;
    setState(() => _isGranted = status.isGranted);
  }
  
  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(widget.icon),
      title: Text(widget.title),
      subtitle: Text(widget.description),
      trailing: Switch(
        value: _isGranted,
        onChanged: (value) async {
          if (value) {
            final status = await widget.permission.request();
            setState(() => _isGranted = status.isGranted);
          } else {
            openAppSettings();
          }
        },
      ),
    );
  }
}
```

---

## Accessibility

### Voice Input
- **Full support** for hands-free operation
- **Real-time transcription** shown in command bar
- **Auto-submit** after 2s silence
- **Visual feedback** (pulsing mic icon)
- **Error handling** (fallback to text input)

### Voice Output (Text-to-Speech)
- **Optional voice feedback** for responses
- **Configurable** in user preferences
- **Natural voice** (system TTS)
- **Contextual** (only for important updates)

### Screen Reader
- **All elements labeled** with semantic descriptions
- **Navigation hints** for gestures
- **State announcements** (thinking, executing, complete)
- **Error messages** read aloud

### Visual Accessibility
- **High Contrast Mode** support
- **Font Scaling** respects system settings
- **Color Blind Friendly** (not relying on color alone)
- **Reduced Motion** option (disable animations)

### Motor Accessibility
- **Large touch targets** (minimum 44x44 points)
- **Voice commands** as alternative to gestures
- **Haptic feedback** for all interactions
- **Adjustable timing** for auto-dismiss

### Cognitive Accessibility
- **Simple language** in all messages
- **Clear error messages** with recovery steps
- **Consistent patterns** throughout app
- **Progressive disclosure** (show only what's needed)

---

## About Screen

### Design (Minimal, Elegant)

```dart
class AboutScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // App name (no logo, just text)
          Text(
            'Ordo',
            style: GoogleFonts.tomorrow(
              fontSize: 32,
              fontWeight: FontWeight.w700,
              color: Color(0xFFF9FAFB),
              letterSpacing: -0.5,
            ),
          ),
          
          SizedBox(height: 8),
          
          // Tagline
          Text(
            'Your Solana DeFi Assistant',
            style: GoogleFonts.inter(
              fontSize: 14,
              fontWeight: FontWeight.w400,
              color: Color(0xFF9CA3AF),
            ),
          ),
          
          SizedBox(height: 4),
          
          // Version
          Text(
            'Version 1.0.0',
            style: GoogleFonts.inter(
              fontSize: 12,
              fontWeight: FontWeight.w400,
              color: Color(0xFF6B7280),
            ),
          ),
          
          SizedBox(height: 32),
          
          // Divider
          Container(
            height: 1,
            color: Color(0xFF1A1A24),
          ),
          
          SizedBox(height: 32),
          
          // Made by
          Column(
            children: [
              Text(
                'MADE BY',
                style: GoogleFonts.tomorrow(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF6B7280),
                  letterSpacing: 1.2,
                ),
              ),
              SizedBox(height: 12),
              Text(
                'Daemon BlockInt Technologies',
                style: GoogleFonts.inter(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFFF9FAFB),
                  letterSpacing: -0.3,
                ),
              ),
            ],
          ),
          
          SizedBox(height: 32),
          
          // Links
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextButton(
                onPressed: () {
                  // Open terms
                },
                child: Text(
                  'Terms',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF6366F1),
                  ),
                ),
              ),
              Text(
                ' • ',
                style: TextStyle(color: Color(0xFF9CA3AF)),
              ),
              TextButton(
                onPressed: () {
                  // Open privacy
                },
                child: Text(
                  'Privacy',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF6366F1),
                  ),
                ),
              ),
              Text(
                ' • ',
                style: TextStyle(color: Color(0xFF9CA3AF)),
              ),
              TextButton(
                onPressed: () {
                  // Open website
                },
                child: Text(
                  'Website',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF6366F1),
                  ),
                ),
              ),
            ],
          ),
          
          SizedBox(height: 16),
          
          // Copyright
          Text(
            '© 2026 Daemon BlockInt Technologies',
            style: GoogleFonts.inter(
              fontSize: 11,
              fontWeight: FontWeight.w400,
              color: Color(0xFF6B7280),
            ),
          ),
        ],
      ),
    );
  }
}
```

### About Menu Item (in Expanded Menu)

```dart
ListTile(
  leading: Icon(Icons.info_outline, color: Color(0xFF9CA3AF)),
  title: Text('About', style: TextStyle(color: Color(0xFFF9FAFB))),
  onTap: () {
    showModalBottomSheet(
      context: context,
      backgroundColor: Color(0xFF1A1A24),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) => AboutScreen(),
    );
  },
)
```

### Splash Screen (Optional)

```dart
class SplashScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0F),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // App name (no logo, just text with animation)
            TweenAnimationBuilder<double>(
              tween: Tween(begin: 0.0, end: 1.0),
              duration: Duration(milliseconds: 800),
              curve: Curves.easeOut,
              builder: (context, value, child) {
                return Opacity(
                  opacity: value,
                  child: Transform.scale(
                    scale: 0.9 + (0.1 * value),
                    child: Text(
                      'Ordo',
                      style: GoogleFonts.tomorrow(
                        fontSize: 48,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFFF9FAFB),
                        letterSpacing: -1.0,
                      ),
                    ),
                  ),
                );
              },
            ),
            
            SizedBox(height: 16),
            
            // Tagline
            TweenAnimationBuilder<double>(
              tween: Tween(begin: 0.0, end: 1.0),
              duration: Duration(milliseconds: 800),
              curve: Curves.easeOut,
              builder: (context, value, child) {
                return Opacity(
                  opacity: value,
                  child: Text(
                    'Your Solana DeFi Assistant',
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                      color: Color(0xFF9CA3AF),
                    ),
                  ),
                );
              },
            ),
            
            SizedBox(height: 64),
            
            // Made by (subtle)
            TweenAnimationBuilder<double>(
              tween: Tween(begin: 0.0, end: 1.0),
              duration: Duration(milliseconds: 1000),
              curve: Curves.easeOut,
              builder: (context, value, child) {
                return Opacity(
                  opacity: value * 0.5, // Very subtle
                  child: Text(
                    'by Daemon BlockInt Technologies',
                    style: GoogleFonts.inter(
                      fontSize: 11,
                      fontWeight: FontWeight.w400,
                      color: Color(0xFF6B7280),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

---

## Platform-Specific

### iOS
- Use Cupertino widgets where appropriate
- Support Face ID / Touch ID
- Haptic feedback via HapticFeedback
- Safe area handling

### Android
- Material Design 3
- Biometric authentication
- Back button handling
- Status bar theming

---

## Future Enhancements

- **Shortcuts**: Siri Shortcuts, Android App Shortcuts
- **Widgets**: Home screen widget for quick commands
- **Watch App**: Basic commands on smartwatch
- **Offline Mode**: Cache recent data
- **Multi-language**: i18n support
- **Themes**: Light mode, custom themes

---

## Summary

This specification defines a **single-surface, command-driven Flutter app** for Ordo AI assistant with:

### Core Features
- One-screen interface with state-driven UI  
- Command input as primary interaction  
- Auto-complete with indexed commands  
- Guest mode first, login on-demand  
- Real-time price charts (Binance API)  
- 60+ blockchain operations via natural language  
- Contextual panels that appear/disappear  
- Gesture-based navigation  
- Minimal, focused design  

### Technical Stack
- **Framework**: Flutter (iOS + Android)
- **Backend**: `https://api.ordo-assistant.com/api/v1`
- **Charts**: `fl_chart` package
- **Price Data**: Binance Public API (free)
- **Icons**: Lucide/Heroicons (minimal line icons)
- **Typography**: Inter font (via `google_fonts` package)
- **State**: ChangeNotifier/Provider
- **HTTP**: `http` package
- **Auth**: JWT tokens
- **Voice Input**: `speech_to_text` package
- **Voice Output**: `flutter_tts` package
- **Permissions**: `permission_handler` package
- **Siri Shortcuts**: `flutter_siri_suggestions` (iOS)
- **Deep Links**: `uni_links` package (Android)
- **Secure Storage**: `flutter_secure_storage` package
- **Local Storage**: `shared_preferences` package
- **Biometric Auth**: `local_auth` package
- **Image Caching**: `cached_network_image` package
- **Token Logos**: Jupiter Token List API

### Key Differentiators
- **NOT a chat app** - Command-driven execution assistant
- **NOT a dashboard** - Single surface that adapts
- **NOT menu-heavy** - Gesture and voice first
- **Converges to minimal** - UI returns to calm state after each action

### Next Steps
1. Set up Flutter project structure
2. Implement core state management
3. Build command input + auto-complete
4. Integrate Ordo backend API
5. Add Binance chart integration
6. Implement gesture handlers
7. Add authentication flow
8. Polish animations and transitions
9. Test on iOS and Android
10. Deploy to app stores

---

## References

- **Backend API**: See `ordo-llms.txt`
- **Design Philosophy**: See `ordo-app-instructions.txt`
- **Flutter**: https://flutter.dev
- **Solana**: https://docs.solana.com
- **Binance API**: https://binance-docs.github.io/apidocs/spot/en/
