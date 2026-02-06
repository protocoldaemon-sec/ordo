enum ActionType {
  // Portfolio
  checkBalance,
  showPortfolio,
  
  // Token Operations
  tokenInfo,
  tokenRisk,
  tokenPrice,
  
  // Transfers
  sendSol,
  sendToken,
  
  // Swaps
  swapTokens,
  getSwapQuote,
  
  // DeFi
  stake,
  unstake,
  lend,
  borrow,
  addLiquidity,
  removeLiquidity,
  bridge,
  
  // NFT
  showNfts,
  mintNft,
  sendNft,
  
  // Wallet
  createWallet,
  importWallet,
  switchWallet,
  
  // Settings
  showPreferences,
  setLimit,
  setSlippage,
  
  // History
  showTransactions,
  showCommandHistory,
  
  // Approval
  requiresApproval,
  
  // Generic
  info,
  error,
  unknown,
}

class CommandAction {
  final ActionType type;
  final Map<String, dynamic> data;
  final String? message;
  final List<String>? toolCalls;
  
  CommandAction({
    required this.type,
    required this.data,
    this.message,
    this.toolCalls,
  });
  
  factory CommandAction.fromApiResponse(Map<String, dynamic> response) {
    final data = response['data'] ?? {};
    final message = data['message'] as String?;
    final toolCallsList = data['toolCalls'] as List?;
    final toolCalls = toolCallsList?.map((t) => t['name']?.toString() ?? 'Tool').toList();
    
    // Parse action type from tool calls or message
    ActionType type = ActionType.unknown;
    Map<String, dynamic> actionData = {};
    
    print('🔵 Parsing API response:');
    print('🔵 Tool calls: $toolCalls');
    print('🔵 Message length: ${message?.length ?? 0}');
    
    if (toolCallsList != null && toolCallsList.isNotEmpty) {
      // Extract data from tool calls
      for (var tool in toolCallsList) {
        final toolName = (tool['name'] as String?)?.toLowerCase() ?? '';
        final toolResult = tool['result'];
        
        print('🔵 Tool: $toolName');
        print('🔵 Result: $toolResult');
        
        // Map tool names to action types and extract data
        if (toolName.contains('balance') || toolName.contains('portfolio') || toolName.contains('wallet')) {
          type = ActionType.checkBalance;
          
          // Extract balance data from tool result
          if (toolResult is Map) {
            actionData = Map<String, dynamic>.from(toolResult);
          } else if (toolResult is String) {
            // Try to parse balance from string
            actionData = _parseBalanceFromString(toolResult);
          }
        } else if (toolName.contains('swap')) {
          type = ActionType.swapTokens;
          if (toolResult is Map) {
            actionData = Map<String, dynamic>.from(toolResult);
          }
        } else if (toolName.contains('transfer') || toolName.contains('send')) {
          type = ActionType.sendSol;
          if (toolResult is Map) {
            actionData = Map<String, dynamic>.from(toolResult);
          }
        } else if (toolName.contains('stake')) {
          type = ActionType.stake;
          if (toolResult is Map) {
            actionData = Map<String, dynamic>.from(toolResult);
          }
        } else if (toolName.contains('risk')) {
          type = ActionType.tokenRisk;
          if (toolResult is Map) {
            actionData = Map<String, dynamic>.from(toolResult);
          }
        } else if (toolName.contains('price')) {
          type = ActionType.tokenPrice;
          if (toolResult is Map) {
            actionData = Map<String, dynamic>.from(toolResult);
          }
        } else if (toolName.contains('nft')) {
          type = ActionType.showNfts;
          if (toolResult is Map) {
            actionData = Map<String, dynamic>.from(toolResult);
          }
        } else if (toolName.contains('wallet')) {
          type = ActionType.createWallet;
          if (toolResult is Map) {
            actionData = Map<String, dynamic>.from(toolResult);
          }
        }
        
        // If we found a type, break
        if (type != ActionType.unknown) break;
      }
      
      // If still unknown, default to info
      if (type == ActionType.unknown) {
        type = ActionType.info;
        actionData = {'summary': _extractSummary(message ?? 'Command processed')};
      }
    } else if (message != null) {
      // No tool calls - just info response
      // Extract short summary, don't show long text
      type = ActionType.info;
      actionData = {'summary': _extractSummary(message)};
    }
    
    print('🔵 Final action type: $type');
    print('🔵 Final action data: $actionData');
    
    return CommandAction(
      type: type,
      data: actionData,
      message: message,
      toolCalls: toolCalls,
    );
  }
  
  // Parse balance from string response
  static Map<String, dynamic> _parseBalanceFromString(String text) {
    final data = <String, dynamic>{};
    
    // Try to extract SOL balance
    final solMatch = RegExp(r'(\d+\.?\d*)\s*SOL').firstMatch(text);
    if (solMatch != null) {
      data['sol'] = double.tryParse(solMatch.group(1) ?? '0') ?? 0.0;
    }
    
    // Try to extract USD value
    final usdMatch = RegExp(r'\$(\d+\.?\d*)').firstMatch(text);
    if (usdMatch != null) {
      data['usdValue'] = double.tryParse(usdMatch.group(1) ?? '0') ?? 0.0;
    }
    
    return data;
  }
  
  // Extract short summary from long message
  static String _extractSummary(String message) {
    // Take first sentence or first 100 chars
    final sentences = message.split('. ');
    if (sentences.isNotEmpty) {
      return sentences.first.trim();
    }
    return message.length > 100 
        ? '${message.substring(0, 100)}...' 
        : message;
  }
}
