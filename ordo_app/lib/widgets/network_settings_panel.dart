import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class NetworkSettingsPanel extends StatefulWidget {
  final Map<String, dynamic> data;
  final VoidCallback onDismiss;

  const NetworkSettingsPanel({
    super.key,
    required this.data,
    required this.onDismiss,
  });

  @override
  State<NetworkSettingsPanel> createState() => _NetworkSettingsPanelState();
}

class _NetworkSettingsPanelState extends State<NetworkSettingsPanel> {
  late String _selectedNetwork;
  bool _isLoading = false;

  final List<Map<String, dynamic>> _networks = [
    {
      'id': 'mainnet',
      'name': 'Mainnet',
      'description': 'Production network with real assets',
      'icon': Icons.public,
      'color': Colors.green,
      'rpcUrl': 'https://api.mainnet-beta.solana.com',
    },
    {
      'id': 'devnet',
      'name': 'Devnet',
      'description': 'Development network for testing',
      'icon': Icons.science,
      'color': Colors.orange,
      'rpcUrl': 'https://api.devnet.solana.com',
    },
    {
      'id': 'testnet',
      'name': 'Testnet',
      'description': 'Test network for validators',
      'icon': Icons.bug_report,
      'color': Colors.purple,
      'rpcUrl': 'https://api.testnet.solana.com',
    },
  ];

  @override
  void initState() {
    super.initState();
    _selectedNetwork = widget.data['network']?.toString() ??
        widget.data['mode']?.toString() ??
        'devnet';
  }

  Future<void> _switchNetwork(String networkId) async {
    setState(() {
      _isLoading = true;
    });

    // Simulate network switch
    await Future.delayed(const Duration(milliseconds: 500));

    setState(() {
      _selectedNetwork = networkId;
      _isLoading = false;
    });

    if (mounted) {
      final network = _networks.firstWhere((n) => n['id'] == networkId);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Switched to ${network['name']}'),
          backgroundColor: AppTheme.primary,
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentNetwork = _networks.firstWhere(
      (n) => n['id'] == _selectedNetwork,
      orElse: () => _networks[1], // Default to devnet
    );

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(
        color: AppTheme.surface.withOpacity(0.95),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: Colors.white.withOpacity(0.1),
          width: 1,
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Header
          Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: (currentNetwork['color'] as Color).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    Icons.settings_ethernet,
                    color: currentNetwork['color'] as Color,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: Text(
                    'Network Settings',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                IconButton(
                  onPressed: widget.onDismiss,
                  icon: Icon(
                    Icons.close,
                    color: AppTheme.textSecondary,
                  ),
                ),
              ],
            ),
          ),

          // Current Network Status
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 20),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: (currentNetwork['color'] as Color).withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: (currentNetwork['color'] as Color).withOpacity(0.3),
                width: 1,
              ),
            ),
            child: Row(
              children: [
                Icon(
                  currentNetwork['icon'] as IconData,
                  color: currentNetwork['color'] as Color,
                  size: 32,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Current Network',
                        style: TextStyle(
                          color: AppTheme.textSecondary,
                          fontSize: 12,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        currentNetwork['name'] as String,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: (currentNetwork['color'] as Color).withOpacity(0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: currentNetwork['color'] as Color,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'Active',
                        style: TextStyle(
                          color: currentNetwork['color'] as Color,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Network List
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Available Networks',
                  style: TextStyle(
                    color: AppTheme.textSecondary,
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 12),
                ..._networks.map((network) => _buildNetworkTile(network)),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // Warning for Devnet/Testnet
          if (_selectedNetwork != 'mainnet')
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 20),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.amber.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: Colors.amber.withOpacity(0.3),
                  width: 1,
                ),
              ),
              child: Row(
                children: [
                  Icon(
                    Icons.info_outline,
                    color: Colors.amber,
                    size: 20,
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'You are on a test network. Tokens have no real value.',
                      style: TextStyle(
                        color: Colors.amber.shade200,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ],
              ),
            ),

          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildNetworkTile(Map<String, dynamic> network) {
    final isSelected = network['id'] == _selectedNetwork;
    final color = network['color'] as Color;

    return GestureDetector(
      onTap: _isLoading ? null : () => _switchNetwork(network['id'] as String),
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isSelected
              ? color.withOpacity(0.1)
              : Colors.white.withOpacity(0.02),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? color.withOpacity(0.5) : Colors.transparent,
            width: 1,
          ),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(
                network['icon'] as IconData,
                color: color,
                size: 20,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    network['name'] as String,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 15,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                    ),
                  ),
                  Text(
                    network['description'] as String,
                    style: TextStyle(
                      color: AppTheme.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
            if (isSelected)
              Icon(
                Icons.check_circle,
                color: color,
                size: 22,
              )
            else if (_isLoading)
              SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation<Color>(color),
                ),
              )
            else
              Icon(
                Icons.chevron_right,
                color: AppTheme.textSecondary,
                size: 22,
              ),
          ],
        ),
      ),
    );
  }
}
