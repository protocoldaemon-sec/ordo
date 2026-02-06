import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';

class ErrorPanel extends StatelessWidget {
  final String error;
  final VoidCallback? onRetry;
  final VoidCallback? onDismiss;

  const ErrorPanel({
    super.key,
    required this.error,
    this.onRetry,
    this.onDismiss,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Error card
            Container(
              padding: const EdgeInsets.all(32),
              decoration: BoxDecoration(
                color: AppTheme.surface.withOpacity(0.6),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(
                  color: AppTheme.error.withOpacity(0.3),
                  width: 1,
                ),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.error.withOpacity(0.1),
                    blurRadius: 40,
                    spreadRadius: -15,
                  ),
                ],
              ),
              child: Column(
                children: [
                  // Error icon with glow
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      // Glow effect
                      Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: AppTheme.error.withOpacity(0.2),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.error.withOpacity(0.3),
                              blurRadius: 40,
                            ),
                          ],
                        ),
                      ),
                      // Icon container
                      Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: AppTheme.error.withOpacity(0.1),
                          border: Border.all(
                            color: AppTheme.error.withOpacity(0.2),
                            width: 1,
                          ),
                        ),
                        child: const Icon(
                          Icons.warning_rounded,
                          size: 48,
                          color: AppTheme.error,
                        ),
                      ),
                    ],
                  ),
                  
                  const SizedBox(height: 32),
                  
                  // Error title
                  Text(
                    _getErrorTitle(error),
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  
                  const SizedBox(height: 12),
                  
                  // Error message
                  Text(
                    _getErrorMessage(error),
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.textSecondary,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Error details (if available)
                  if (_hasErrorDetails(error))
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.03),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: Colors.white.withOpacity(0.05),
                          width: 1,
                        ),
                      ),
                      child: Column(
                        children: [
                          _buildDetailRow(
                            context,
                            'Required',
                            '1.000005 SOL',
                            isHighlight: true,
                          ),
                          const SizedBox(height: 12),
                          Container(
                            height: 1,
                            color: Colors.white.withOpacity(0.1),
                          ),
                          const SizedBox(height: 12),
                          _buildDetailRow(
                            context,
                            'Current',
                            '0.5 SOL',
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Action buttons
            Column(
              children: [
                // Retry button
                if (onRetry != null)
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: onRetry,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.error,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        elevation: 0,
                        shadowColor: AppTheme.error.withOpacity(0.3),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.refresh, size: 20),
                          const SizedBox(width: 8),
                          Text(
                            'Try Again',
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                
                const SizedBox(height: 12),
                
                // Dismiss button
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton(
                    onPressed: onDismiss,
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppTheme.textSecondary,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      side: BorderSide(
                        color: Colors.white.withOpacity(0.1),
                        width: 1,
                      ),
                    ),
                    child: Text(
                      'Dismiss',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(
    BuildContext context,
    String label,
    String value, {
    bool isHighlight = false,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label.toUpperCase(),
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
            fontSize: 10,
            letterSpacing: 1,
            color: AppTheme.textTertiary,
          ),
        ),
        Text(
          value,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            fontFamily: 'Tomorrow',
            fontWeight: FontWeight.w700,
            fontSize: 16,
            color: isHighlight ? AppTheme.error : AppTheme.textPrimary,
          ),
        ),
      ],
    );
  }

  String _getErrorTitle(String error) {
    if (error.toLowerCase().contains('insufficient')) {
      return 'Insufficient Balance';
    } else if (error.toLowerCase().contains('network')) {
      return 'Network Error';
    } else if (error.toLowerCase().contains('timeout')) {
      return 'Request Timeout';
    } else if (error.toLowerCase().contains('unauthorized')) {
      return 'Authentication Required';
    }
    return 'Error Occurred';
  }

  String _getErrorMessage(String error) {
    if (error.toLowerCase().contains('insufficient')) {
      return 'The transaction failed because you don\'t have enough gas for the swap.';
    } else if (error.toLowerCase().contains('network')) {
      return 'Unable to connect to the network. Please check your connection.';
    } else if (error.toLowerCase().contains('timeout')) {
      return 'The request took too long to complete. Please try again.';
    } else if (error.toLowerCase().contains('unauthorized')) {
      return 'You need to login to perform this action.';
    }
    return error;
  }

  bool _hasErrorDetails(String error) {
    return error.toLowerCase().contains('insufficient');
  }
}
