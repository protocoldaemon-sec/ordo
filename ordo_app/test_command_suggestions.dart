// Test script to verify command suggestions are working correctly
// Run with: dart test_command_suggestions.dart

import 'lib/services/command_index.dart';

void main() {
  print('🧪 Testing Command Suggestions\n');
  
  // Test 1: Default suggestions (no query)
  print('Test 1: Default Suggestions (no query)');
  print('=' * 50);
  final defaultSuggestions = CommandIndexService.search('', limit: 10);
  print('Count: ${defaultSuggestions.length}');
  for (var i = 0; i < defaultSuggestions.length; i++) {
    final suggestion = defaultSuggestions[i];
    print('${i + 1}. [${suggestion.tag}] ${suggestion.label}');
    print('   Template: ${suggestion.template}');
  }
  print('');
  
  // Test 2: Search for "swap"
  print('Test 2: Search for "swap"');
  print('=' * 50);
  final swapSuggestions = CommandIndexService.search('swap', limit: 5);
  print('Count: ${swapSuggestions.length}');
  for (var i = 0; i < swapSuggestions.length; i++) {
    final suggestion = swapSuggestions[i];
    print('${i + 1}. [${suggestion.tag}] ${suggestion.label}');
    print('   Template: ${suggestion.template}');
  }
  print('');
  
  // Test 3: Search for "balance"
  print('Test 3: Search for "balance"');
  print('=' * 50);
  final balanceSuggestions = CommandIndexService.search('balance', limit: 5);
  print('Count: ${balanceSuggestions.length}');
  for (var i = 0; i < balanceSuggestions.length; i++) {
    final suggestion = balanceSuggestions[i];
    print('${i + 1}. [${suggestion.tag}] ${suggestion.label}');
    print('   Template: ${suggestion.template}');
  }
  print('');
  
  // Test 4: Search for "nft"
  print('Test 4: Search for "nft"');
  print('=' * 50);
  final nftSuggestions = CommandIndexService.search('nft', limit: 5);
  print('Count: ${nftSuggestions.length}');
  for (var i = 0; i < nftSuggestions.length; i++) {
    final suggestion = nftSuggestions[i];
    print('${i + 1}. [${suggestion.tag}] ${suggestion.label}');
    print('   Template: ${suggestion.template}');
  }
  print('');
  
  // Test 5: Search for "risk"
  print('Test 5: Search for "risk"');
  print('=' * 50);
  final riskSuggestions = CommandIndexService.search('risk', limit: 5);
  print('Count: ${riskSuggestions.length}');
  for (var i = 0; i < riskSuggestions.length; i++) {
    final suggestion = riskSuggestions[i];
    print('${i + 1}. [${suggestion.tag}] ${suggestion.label}');
    print('   Template: ${suggestion.template}');
  }
  print('');
  
  // Test 6: Verify all commands have equal priority
  print('Test 6: Verify Equal Priority');
  print('=' * 50);
  final allCommands = CommandIndexService.getAllCommands();
  final priorities = allCommands.map((cmd) => cmd.priority).toSet();
  print('Total commands: ${allCommands.length}');
  print('Unique priorities: ${priorities.toList()}');
  print('All equal? ${priorities.length == 1 && priorities.first == 5}');
  print('');
  
  // Test 7: Verify category diversity in default suggestions
  print('Test 7: Category Diversity in Default Suggestions');
  print('=' * 50);
  final categories = defaultSuggestions.map((s) => s.tag).toSet();
  print('Unique categories: ${categories.length}');
  print('Categories: ${categories.toList()}');
  print('Diversity score: ${(categories.length / defaultSuggestions.length * 100).toStringAsFixed(1)}%');
  print('');
  
  print('✅ All tests completed!');
}
