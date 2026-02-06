import 'dart:convert';
import 'package:http/http.dart' as http;

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

  factory CandleData.fromJson(List<dynamic> json) {
    return CandleData(
      time: DateTime.fromMillisecondsSinceEpoch(json[0]),
      open: double.parse(json[1]),
      high: double.parse(json[2]),
      low: double.parse(json[3]),
      close: double.parse(json[4]),
      volume: double.parse(json[5]),
    );
  }
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

class BinanceApiService {
  static const String _baseUrl = 'https://api.binance.com/api/v3';

  /// Token symbol mapping (Solana → Binance)
  static const Map<String, String> tokenSymbolMap = {
    // Native
    'SOL': 'SOLUSDT',
    'sol': 'SOLUSDT',
    
    // Stablecoins
    'USDC': 'USDCUSDT',
    'usdc': 'USDCUSDT',
    'USDT': 'USDTUSDT',
    'usdt': 'USDTUSDT',
    
    // Major tokens
    'BONK': 'BONKUSDT',
    'bonk': 'BONKUSDT',
    'JTO': 'JTOUSDT',
    'jto': 'JTOUSDT',
    'PYTH': 'PYTHUSDT',
    'pyth': 'PYTHUSDT',
    'WIF': 'WIFUSDT',
    'wif': 'WIFUSDT',
    'JUP': 'JUPUSDT',
    'jup': 'JUPUSDT',
    
    // Wrapped
    'wSOL': 'SOLUSDT',
    'wsol': 'SOLUSDT',
    'wBTC': 'BTCUSDT',
    'wbtc': 'BTCUSDT',
    'wETH': 'ETHUSDT',
    'weth': 'ETHUSDT',
  };

  /// Get Binance symbol from Solana token
  static String? getBinanceSymbol(String solanaToken) {
    return tokenSymbolMap[solanaToken];
  }

  /// Check if token is supported
  static bool isSupported(String solanaToken) {
    return tokenSymbolMap.containsKey(solanaToken);
  }

  /// Get current price
  static Future<double> getCurrentPrice(String symbol) async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/ticker/price?symbol=$symbol'),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return double.parse(data['price']);
      } else {
        throw Exception('Failed to fetch price');
      }
    } catch (e) {
      throw Exception('Error fetching price: $e');
    }
  }

  /// Get 24h price statistics
  static Future<PriceStats> get24hrStats(String symbol) async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/ticker/24hr?symbol=$symbol'),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return PriceStats.fromJson(data);
      } else {
        throw Exception('Failed to fetch 24hr stats');
      }
    } catch (e) {
      throw Exception('Error fetching 24hr stats: $e');
    }
  }

  /// Get kline/candlestick data
  static Future<List<CandleData>> getKlineData(
    String symbol,
    String interval,
    int limit,
  ) async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/klines?symbol=$symbol&interval=$interval&limit=$limit'),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((item) => CandleData.fromJson(item)).toList();
      } else {
        throw Exception('Failed to fetch kline data');
      }
    } catch (e) {
      throw Exception('Error fetching kline data: $e');
    }
  }

  /// Get price for Solana token (with automatic symbol mapping)
  static Future<double> getSolanaTokenPrice(String solanaToken) async {
    final binanceSymbol = getBinanceSymbol(solanaToken);
    if (binanceSymbol == null) {
      throw Exception('Token $solanaToken not supported');
    }
    return getCurrentPrice(binanceSymbol);
  }

  /// Get 24h stats for Solana token
  static Future<PriceStats> getSolanaToken24hrStats(String solanaToken) async {
    final binanceSymbol = getBinanceSymbol(solanaToken);
    if (binanceSymbol == null) {
      throw Exception('Token $solanaToken not supported');
    }
    return get24hrStats(binanceSymbol);
  }

  /// Get kline data for Solana token
  static Future<List<CandleData>> getSolanaTokenKlineData(
    String solanaToken,
    String interval,
    int limit,
  ) async {
    final binanceSymbol = getBinanceSymbol(solanaToken);
    if (binanceSymbol == null) {
      throw Exception('Token $solanaToken not supported');
    }
    return getKlineData(binanceSymbol, interval, limit);
  }
}
