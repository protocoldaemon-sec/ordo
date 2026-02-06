import 'package:flutter/foundation.dart';

/// User context for smart suggestions
enum UserContext {
  idle,              // No recent activity
  hasWallet,         // User has wallet
  hasBalance,        // User has balance > 0
  afterBalance,      // Just checked balance
  afterSwap,         // Just completed swap
  afterSend,         // Just sent tokens
  afterError,        // Last command failed
  afterStake,        // Just staked
  afterNft,          // Just viewed NFTs
  typing,            // Currently typing
}

/// Service to track user context and provide smart suggestions
class ContextService extends ChangeNotifier {
  UserContext _currentContext = UserContext.idle;
  String? _lastCommand;
  String? _lastError;
  bool _isAuthenticated = false;
  double _balance = 0.0;
  List<String> _recentCommands = [];
  
  // Getters
  UserContext get currentContext => _currentContext;
  String? get lastCommand => _lastCommand;
  String? get lastError => _lastError;
  bool get isAuthenticated => _isAuthenticated;
  double get balance => _balance;
  List<String> get recentCommands => List.unmodifiable(_recentCommands);
  
  /// Update authentication status
  void setAuthenticated(bool value) {
    _isAuthenticated = value;
    _updateContext();
    notifyListeners();
  }
  
  /// Update balance
  void setBalance(double value) {
    _balance = value;
    _updateContext();
    notifyListeners();
  }
  
  /// Record successful command
  void recordCommand(String command) {
    _lastCommand = command;
    _lastError = null;
    
    // Add to recent commands (max 10)
    _recentCommands.insert(0, command);
    if (_recentCommands.length > 10) {
      _recentCommands.removeLast();
    }
    
    // Update context based on command
    if (command.contains('balance') || command.contains('portfolio')) {
      _currentContext = UserContext.afterBalance;
    } else if (command.contains('swap')) {
      _currentContext = UserContext.afterSwap;
    } else if (command.contains('send') || command.contains('transfer')) {
      _currentContext = UserContext.afterSend;
    } else if (command.contains('stake')) {
      _currentContext = UserContext.afterStake;
    } else if (command.contains('nft')) {
      _currentContext = UserContext.afterNft;
    }
    
    notifyListeners();
  }
  
  /// Record error
  void recordError(String error) {
    _lastError = error;
    _currentContext = UserContext.afterError;
    notifyListeners();
  }
  
  /// Reset to idle
  void resetToIdle() {
    _currentContext = UserContext.idle;
    _lastCommand = null;
    _lastError = null;
    _updateContext();
    notifyListeners();
  }
  
  /// Update context based on current state
  void _updateContext() {
    if (_currentContext == UserContext.afterError ||
        _currentContext == UserContext.afterBalance ||
        _currentContext == UserContext.afterSwap ||
        _currentContext == UserContext.afterSend ||
        _currentContext == UserContext.afterStake ||
        _currentContext == UserContext.afterNft) {
      // Keep specific context
      return;
    }
    
    if (!_isAuthenticated) {
      _currentContext = UserContext.idle;
    } else if (_balance > 0) {
      _currentContext = UserContext.hasBalance;
    } else {
      _currentContext = UserContext.hasWallet;
    }
  }
  
  /// Get context-aware suggestions
  List<String> getContextualSuggestions() {
    switch (_currentContext) {
      case UserContext.idle:
        return [
          'create wallet',
          'what\'s SOL price?',
          'show my portfolio',
        ];
        
      case UserContext.hasWallet:
        return [
          'check balance',
          'what\'s SOL price?',
          'show my portfolio',
        ];
        
      case UserContext.hasBalance:
        return [
          'check balance',
          'swap 1 sol to usdc',
          'send 0.5 sol to [address]',
          'stake 1 sol',
          'show my nfts',
        ];
        
      case UserContext.afterBalance:
        return [
          'swap 1 sol to usdc',
          'send 0.5 sol to [address]',
          'stake 1 sol',
          'show my nfts',
          'show transaction history',
        ];
        
      case UserContext.afterSwap:
        return [
          'check balance',
          'swap again',
          'show transaction history',
          'what\'s SOL price?',
        ];
        
      case UserContext.afterSend:
        return [
          'check balance',
          'send again',
          'show transaction history',
        ];
        
      case UserContext.afterError:
        if (_lastCommand != null) {
          return [
            _lastCommand!, // Retry last command
            'check balance',
            'what went wrong?',
          ];
        }
        return [
          'check balance',
          'what\'s SOL price?',
        ];
        
      case UserContext.afterStake:
        return [
          'check balance',
          'check staking rewards',
          'unstake sol',
        ];
        
      case UserContext.afterNft:
        return [
          'mint nft',
          'send nft',
          'check balance',
        ];
        
      case UserContext.typing:
        return []; // Will be handled by search
    }
  }
  
  /// Get quick actions based on context
  List<QuickAction> getQuickActions() {
    final actions = <QuickAction>[];
    
    // Always available
    actions.add(QuickAction(
      icon: 'chart',
      label: 'Price',
      command: 'what\'s SOL price?',
    ));
    
    if (_isAuthenticated) {
      actions.add(QuickAction(
        icon: 'wallet',
        label: 'Balance',
        command: 'check balance',
      ));
      
      if (_balance > 0) {
        actions.add(QuickAction(
          icon: 'repeat',
          label: 'Swap',
          command: 'swap 1 sol to usdc',
        ));
        
        actions.add(QuickAction(
          icon: 'send',
          label: 'Send',
          command: 'send 0.5 sol to [address]',
        ));
      }
    }
    
    return actions;
  }
}

/// Quick action model
class QuickAction {
  final String icon;
  final String label;
  final String command;
  
  QuickAction({
    required this.icon,
    required this.label,
    required this.command,
  });
}
