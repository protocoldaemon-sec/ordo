import '../widgets/suggestions_panel.dart';

class IndexedCommand {
  final List<String> keywords;
  final String icon;
  final String label;
  final String template;
  final String tag;
  final bool requiresAuth;
  final int priority;

  const IndexedCommand({
    required this.keywords,
    required this.icon,
    required this.label,
    required this.template,
    required this.tag,
    this.requiresAuth = false,
    this.priority = 0,
  });
}

class CommandIndexService {
  static final List<IndexedCommand> _commands = [
    // Wallet Commands
    IndexedCommand(
      keywords: ['check', 'balance', 'wallet', 'my balance', 'show balance'],
      icon: 'wallet',
      label: 'Check balance',
      template: 'check balance',
      tag: '[wallet]',
      requiresAuth: true,
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['create', 'wallet', 'new wallet'],
      icon: 'wallet',
      label: 'Create wallet',
      template: 'create wallet',
      tag: '[wallet]',
      priority: 5,
    ),
    
    // Swap Commands
    IndexedCommand(
      keywords: ['swap', 'exchange', 'convert', 'trade'],
      icon: 'repeat',
      label: 'Swap tokens',
      template: 'swap [amount] [from] to [to]',
      tag: '[repeat]',
      requiresAuth: true,
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['swap sol', 'swap 1 sol'],
      icon: 'repeat',
      label: 'Swap SOL to USDC',
      template: 'swap 1 sol to usdc',
      tag: '[repeat]',
      requiresAuth: true,
      priority: 5,
    ),
    
    // Transfer Commands
    IndexedCommand(
      keywords: ['send', 'transfer', 'pay'],
      icon: 'send',
      label: 'Send SOL',
      template: 'send [amount] sol to [address]',
      tag: '[send]',
      requiresAuth: true,
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['send sol', 'transfer sol'],
      icon: 'send',
      label: 'Send SOL',
      template: 'send 0.5 sol to [address]',
      tag: '[send]',
      requiresAuth: true,
      priority: 5,
    ),
    
    // Price Commands
    IndexedCommand(
      keywords: ['price', 'sol price', 'what is', 'how much'],
      icon: 'chart',
      label: 'SOL price',
      template: 'what\'s the price of SOL?',
      tag: '[chart]',
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['chart', 'show chart', 'price chart'],
      icon: 'chart',
      label: 'Show price chart',
      template: 'show SOL chart',
      tag: '[chart]',
      priority: 5,
    ),
    
    // DeFi Commands
    IndexedCommand(
      keywords: ['stake', 'staking'],
      icon: 'coins',
      label: 'Stake SOL',
      template: 'stake [amount] sol',
      tag: '[coins]',
      requiresAuth: true,
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['lend', 'lending'],
      icon: 'hand_coins',
      label: 'Lend assets',
      template: 'lend [amount] [token]',
      tag: '[lend]',
      requiresAuth: true,
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['borrow', 'borrowing'],
      icon: 'hand_coins',
      label: 'Borrow assets',
      template: 'borrow [amount] [token]',
      tag: '[borrow]',
      requiresAuth: true,
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['liquidity', 'add liquidity', 'pool'],
      icon: 'droplet',
      label: 'Add liquidity',
      template: 'add liquidity to [pool]',
      tag: '[liquidity]',
      requiresAuth: true,
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['bridge', 'cross-chain'],
      icon: 'bridge',
      label: 'Bridge assets',
      template: 'bridge [amount] [token] to [chain]',
      tag: '[bridge]',
      requiresAuth: true,
      priority: 5,
    ),
    
    // NFT Commands
    IndexedCommand(
      keywords: ['nft', 'nfts', 'my nfts', 'show nfts'],
      icon: 'image',
      label: 'View NFTs',
      template: 'show my nfts',
      tag: '[nft]',
      requiresAuth: true,
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['mint', 'mint nft', 'create nft'],
      icon: 'image',
      label: 'Mint NFT',
      template: 'mint nft',
      tag: '[nft]',
      requiresAuth: true,
      priority: 5,
    ),
    
    // Portfolio Commands
    IndexedCommand(
      keywords: ['portfolio', 'my portfolio', 'holdings'],
      icon: 'bar_chart',
      label: 'View portfolio',
      template: 'show my portfolio',
      tag: '[portfolio]',
      requiresAuth: true,
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['history', 'transactions', 'tx history'],
      icon: 'history',
      label: 'Transaction history',
      template: 'show transaction history',
      tag: '[history]',
      requiresAuth: true,
      priority: 5,
    ),
    
    // Token Risk Commands
    IndexedCommand(
      keywords: ['risk', 'token risk', 'analyze token', 'safe'],
      icon: 'shield',
      label: 'Analyze token risk',
      template: 'analyze risk of [token]',
      tag: '[risk]',
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['risk bonk', 'bonk safe', 'analyze bonk'],
      icon: 'shield',
      label: 'Analyze BONK risk',
      template: 'analyze risk of BONK',
      tag: '[risk]',
      priority: 5,
    ),
    
    // Settings Commands
    IndexedCommand(
      keywords: ['settings', 'preferences', 'config'],
      icon: 'settings',
      label: 'Settings',
      template: 'open settings',
      tag: '[settings]',
      priority: 5,
    ),
    IndexedCommand(
      keywords: ['limit', 'set limit', 'transfer limit'],
      icon: 'settings',
      label: 'Set transfer limit',
      template: 'set transfer limit to [amount]',
      tag: '[settings]',
      requiresAuth: true,
      priority: 5,
    ),
  ];

  /// Search commands based on query
  static List<SuggestionItem> search(String query, {int limit = 5}) {
    if (query.trim().isEmpty) {
      return _getDefaultSuggestions(limit);
    }

    final lowerQuery = query.toLowerCase().trim();
    final results = <_ScoredCommand>[];

    for (final command in _commands) {
      final score = _calculateScore(lowerQuery, command);
      if (score > 0) {
        results.add(_ScoredCommand(command, score));
      }
    }

    // Sort by score (descending)
    results.sort((a, b) => b.score.compareTo(a.score));

    // Convert to SuggestionItems
    return results
        .take(limit)
        .map((scored) => SuggestionItem(
              icon: scored.command.icon,
              label: scored.command.label,
              template: scored.command.template,
              tag: scored.command.tag,
            ))
        .toList();
  }

  /// Get default suggestions when no query
  static List<SuggestionItem> _getDefaultSuggestions(int limit) {
    // Show diverse commands from different categories
    // Instead of filtering by priority, show variety
    final categories = <String, List<IndexedCommand>>{};
    
    // Group by category (based on icon/tag)
    for (final cmd in _commands) {
      final category = cmd.tag;
      categories.putIfAbsent(category, () => []);
      categories[category]!.add(cmd);
    }
    
    // Pick one command from each category (round-robin)
    final suggestions = <IndexedCommand>[];
    final categoryKeys = categories.keys.toList()..shuffle();
    
    for (final category in categoryKeys) {
      if (suggestions.length >= limit) break;
      final cmds = categories[category]!;
      if (cmds.isNotEmpty) {
        suggestions.add(cmds.first);
      }
    }
    
    // If still need more, add remaining commands
    if (suggestions.length < limit) {
      final remaining = _commands
          .where((cmd) => !suggestions.contains(cmd))
          .take(limit - suggestions.length);
      suggestions.addAll(remaining);
    }

    return suggestions
        .take(limit)
        .map((cmd) => SuggestionItem(
              icon: cmd.icon,
              label: cmd.label,
              template: cmd.template,
              tag: cmd.tag,
            ))
        .toList();
  }

  /// Calculate relevance score for a command
  static int _calculateScore(String query, IndexedCommand command) {
    int score = 0;

    for (final keyword in command.keywords) {
      // Exact match = highest score
      if (keyword == query) {
        score += 100;
        continue;
      }

      // Starts with = high score
      if (keyword.startsWith(query)) {
        score += 50;
        continue;
      }

      // Contains = medium score
      if (keyword.contains(query)) {
        score += 25;
        continue;
      }

      // Word boundary match
      final words = keyword.split(' ');
      for (final word in words) {
        if (word.startsWith(query)) {
          score += 30;
        }
      }
    }

    // Add priority bonus
    score += command.priority;

    return score;
  }

  /// Get all commands (for reference)
  static List<IndexedCommand> getAllCommands() {
    return List.unmodifiable(_commands);
  }
}

class _ScoredCommand {
  final IndexedCommand command;
  final int score;

  _ScoredCommand(this.command, this.score);
}
