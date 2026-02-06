/// Represents a step in the AI processing workflow
class AIProcessStep {
  final String id;
  final StepType type;
  final String title;
  final String? description;
  final StepStatus status;
  final Map<String, dynamic>? result;
  final DateTime timestamp;
  
  AIProcessStep({
    required this.id,
    required this.type,
    required this.title,
    this.description,
    this.status = StepStatus.pending,
    this.result,
    DateTime? timestamp,
  }) : timestamp = timestamp ?? DateTime.now();
  
  AIProcessStep copyWith({
    String? id,
    StepType? type,
    String? title,
    String? description,
    StepStatus? status,
    Map<String, dynamic>? result,
    DateTime? timestamp,
  }) {
    return AIProcessStep(
      id: id ?? this.id,
      type: type ?? this.type,
      title: title ?? this.title,
      description: description ?? this.description,
      status: status ?? this.status,
      result: result ?? this.result,
      timestamp: timestamp ?? this.timestamp,
    );
  }
  
  /// Get display-friendly tool name
  String get displayTitle {
    if (type == StepType.tool) {
      return _formatToolName(title);
    }
    return title;
  }
  
  /// Format tool name for display
  String _formatToolName(String name) {
    // Convert snake_case to Title Case
    final words = name.replaceAll('_', ' ').split(' ');
    return words.map((w) => w.isNotEmpty 
        ? '${w[0].toUpperCase()}${w.substring(1)}' 
        : '').join(' ');
  }
  
  /// Get icon name based on type/title
  String get iconName {
    switch (type) {
      case StepType.thinking:
        return 'psychology';
      case StepType.tool:
        return _getToolIcon(title);
      case StepType.reasoning:
        return 'lightbulb';
      case StepType.result:
        return 'check_circle';
      case StepType.error:
        return 'error';
    }
  }
  
  String _getToolIcon(String toolName) {
    final name = toolName.toLowerCase();
    if (name.contains('balance') || name.contains('wallet')) return 'account_balance_wallet';
    if (name.contains('swap')) return 'swap_horiz';
    if (name.contains('transfer') || name.contains('send')) return 'send';
    if (name.contains('stake')) return 'savings';
    if (name.contains('price')) return 'trending_up';
    if (name.contains('nft')) return 'collections';
    if (name.contains('risk')) return 'security';
    if (name.contains('list')) return 'format_list_bulleted';
    if (name.contains('create')) return 'add_circle';
    if (name.contains('delete') || name.contains('remove')) return 'delete';
    if (name.contains('import')) return 'download';
    if (name.contains('analytics')) return 'analytics';
    return 'build';
  }
}

enum StepType {
  thinking,   // Initial analysis
  tool,       // Tool being called
  reasoning,  // AI reasoning step
  result,     // Final result
  error,      // Error occurred
}

enum StepStatus {
  pending,    // Not started
  running,    // In progress
  completed,  // Done successfully
  failed,     // Failed
}
