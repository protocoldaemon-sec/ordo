import '../models/command_action.dart';

/// Smart command router - decides if command needs AI or can be handled locally
class CommandRouter {
  /// Route command to appropriate handler
  static CommandRoute route(String command) {
    final lowerCommand = command.toLowerCase().trim();
    
    // Portfolio/Balance commands - direct API call
    if (_isBalanceCommand(lowerCommand)) {
      return CommandRoute(
        type: RouteType.directApi,
        action: ActionType.checkBalance,
        apiEndpoint: '/wallet/portfolio',
        reason: 'Simple balance check - no AI needed',
      );
    }
    
    // Portfolio view - show panel immediately
    if (_isPortfolioCommand(lowerCommand)) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.showPortfolio,
        params: {},
        reason: 'Portfolio - instant UI',
      );
    }
    
    // Transaction history - show panel immediately
    if (_isHistoryCommand(lowerCommand)) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.showTransactions,
        params: {},
        reason: 'Transaction history - instant UI',
      );
    }
    
    // NFT view - show panel immediately (will fetch data in panel)
    if (_isNftCommand(lowerCommand)) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.showNfts,
        params: {},
        reason: 'NFT gallery - instant UI',
      );
    }
    
    // Settings/Preferences - show panel immediately
    if (_isSettingsCommand(lowerCommand)) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.showPreferences,
        params: {},
        reason: 'Settings - instant UI',
      );
    }
    
    // Staking interface - show panel immediately
    if (_isStakingCommand(lowerCommand)) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.stake,
        params: {},
        reason: 'Staking interface - instant UI',
      );
    }
    
    // Lending interface - show panel immediately
    if (_isLendingCommand(lowerCommand)) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.lend,
        params: {},
        reason: 'Lending interface - instant UI',
      );
    }
    
    // Borrowing interface - show panel immediately
    if (_isBorrowingCommand(lowerCommand)) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.borrow,
        params: {},
        reason: 'Borrowing interface - instant UI',
      );
    }
    
    // Liquidity interface - show panel immediately
    if (_isLiquidityCommand(lowerCommand)) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.addLiquidity,
        params: {},
        reason: 'Liquidity interface - instant UI',
      );
    }
    
    // Bridge interface - show panel immediately
    if (_isBridgeCommand(lowerCommand)) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.bridge,
        params: {},
        reason: 'Bridge interface - instant UI',
      );
    }
    
    // Token risk analysis
    if (_isTokenRiskCommand(lowerCommand)) {
      final token = _extractToken(lowerCommand);
      return CommandRoute(
        type: RouteType.aiAgent, // Need token mint and analysis
        action: ActionType.tokenRisk,
        params: {'symbol': token},
        reason: 'Token risk analysis needs AI',
      );
    }
    
    // Simple price check
    if (_isPriceCommand(lowerCommand)) {
      final token = _extractToken(lowerCommand);
      return CommandRoute(
        type: RouteType.aiAgent, // Need token mint address, use AI
        action: ActionType.tokenPrice,
        params: {'symbol': token},
        reason: 'Price check needs token mint address',
      );
    }
    
    // Swap with clear parameters - show panel directly
    final swapParams = _parseSwapCommand(lowerCommand);
    if (swapParams != null) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.swapTokens,
        params: swapParams,
        reason: 'Clear swap parameters - show panel directly',
      );
    }
    
    // Send/Transfer with clear parameters
    final sendParams = _parseSendCommand(lowerCommand);
    if (sendParams != null) {
      return CommandRoute(
        type: RouteType.localPanel,
        action: ActionType.sendSol,
        params: sendParams,
        reason: 'Clear send parameters - show panel directly',
      );
    }
    
    // Complex commands - need AI reasoning
    if (_needsAiReasoning(lowerCommand)) {
      return CommandRoute(
        type: RouteType.aiAgent,
        action: ActionType.unknown,
        reason: 'Complex query - needs AI reasoning',
      );
    }
    
    // Default: use AI for ambiguous commands
    return CommandRoute(
      type: RouteType.aiAgent,
      action: ActionType.unknown,
      reason: 'Ambiguous command - using AI',
    );
  }
  
  // Balance check patterns
  static bool _isBalanceCommand(String cmd) {
    return cmd.contains('balance') ||
           cmd.contains('check balance') ||
           cmd == 'balance' ||
           cmd == 'bal';
  }
  
  // Portfolio patterns
  static bool _isPortfolioCommand(String cmd) {
    return cmd.contains('portfolio') ||
           cmd.contains('holdings') ||
           cmd.contains('my assets');
  }
  
  // History patterns
  static bool _isHistoryCommand(String cmd) {
    return cmd.contains('history') ||
           cmd.contains('transactions') ||
           cmd.contains('tx history');
  }
  
  // NFT patterns
  static bool _isNftCommand(String cmd) {
    return (cmd.contains('nft') || cmd.contains('nfts')) &&
           (cmd.contains('show') || cmd.contains('my') || cmd.contains('view'));
  }
  
  // Settings patterns
  static bool _isSettingsCommand(String cmd) {
    return cmd.contains('settings') ||
           cmd.contains('preferences') ||
           cmd.contains('config');
  }
  
  // Staking patterns
  static bool _isStakingCommand(String cmd) {
    return (cmd.contains('stake') || cmd.contains('staking')) &&
           !cmd.contains('unstake');
  }
  
  // Lending patterns
  static bool _isLendingCommand(String cmd) {
    return cmd.contains('lend') || cmd.contains('lending');
  }
  
  // Borrowing patterns
  static bool _isBorrowingCommand(String cmd) {
    return cmd.contains('borrow') || cmd.contains('borrowing');
  }
  
  // Liquidity patterns
  static bool _isLiquidityCommand(String cmd) {
    return cmd.contains('liquidity') || 
           cmd.contains('add liquidity') ||
           cmd.contains('pool');
  }
  
  // Bridge patterns
  static bool _isBridgeCommand(String cmd) {
    return cmd.contains('bridge') || cmd.contains('cross-chain');
  }
  
  // Token risk patterns
  static bool _isTokenRiskCommand(String cmd) {
    return (cmd.contains('risk') || cmd.contains('safe') || cmd.contains('analyze')) &&
           (cmd.contains('token') || cmd.contains('sol') || cmd.contains('usdc') || cmd.contains('bonk'));
  }
  
  // Price check patterns
  static bool _isPriceCommand(String cmd) {
    return (cmd.contains('price') || cmd.contains('how much')) &&
           !cmd.contains('swap') &&
           !cmd.contains('buy');
  }
  
  // Extract token from price command
  static String _extractToken(String cmd) {
    // Try to find token symbol
    final tokens = ['sol', 'usdc', 'usdt', 'bonk', 'jup', 'jto'];
    for (final token in tokens) {
      if (cmd.contains(token)) {
        return token.toUpperCase();
      }
    }
    return 'SOL'; // default
  }
  
  // Parse swap command: "swap 1 sol to usdc"
  static Map<String, dynamic>? _parseSwapCommand(String cmd) {
    if (!cmd.contains('swap')) return null;
    
    // Pattern: swap [amount] [from] to [to]
    final regex = RegExp(r'swap\s+(\d+\.?\d*)\s+(\w+)\s+to\s+(\w+)', caseSensitive: false);
    final match = regex.firstMatch(cmd);
    
    if (match != null) {
      return {
        'amount': double.tryParse(match.group(1) ?? '0') ?? 0.0,
        'from': match.group(2)?.toUpperCase() ?? 'SOL',
        'to': match.group(3)?.toUpperCase() ?? 'USDC',
      };
    }
    
    return null;
  }
  
  // Parse send command: "send 0.5 sol to [address]"
  static Map<String, dynamic>? _parseSendCommand(String cmd) {
    if (!cmd.contains('send') && !cmd.contains('transfer')) return null;
    
    // Pattern: send [amount] [token] to [address]
    final regex = RegExp(r'(?:send|transfer)\s+(\d+\.?\d*)\s+(\w+)', caseSensitive: false);
    final match = regex.firstMatch(cmd);
    
    if (match != null) {
      return {
        'amount': double.tryParse(match.group(1) ?? '0') ?? 0.0,
        'token': match.group(2)?.toUpperCase() ?? 'SOL',
      };
    }
    
    return null;
  }
  
  // Check if command needs AI reasoning
  static bool _needsAiReasoning(String cmd) {
    // Questions
    if (cmd.contains('?') || 
        cmd.startsWith('what') ||
        cmd.startsWith('how') ||
        cmd.startsWith('why') ||
        cmd.startsWith('when') ||
        cmd.startsWith('should')) {
      return true;
    }
    
    // Complex analysis
    if (cmd.contains('analyze') ||
        cmd.contains('recommend') ||
        cmd.contains('suggest') ||
        cmd.contains('best') ||
        cmd.contains('strategy') ||
        cmd.contains('optimize')) {
      return true;
    }
    
    return false;
  }
}

enum RouteType {
  directApi,    // Call API directly, no AI
  localPanel,   // Show panel with parsed data, no API
  aiAgent,      // Use AI for reasoning
}

class CommandRoute {
  final RouteType type;
  final ActionType action;
  final String? apiEndpoint;
  final Map<String, dynamic>? params;
  final String reason;
  
  CommandRoute({
    required this.type,
    required this.action,
    this.apiEndpoint,
    this.params,
    required this.reason,
  });
}
