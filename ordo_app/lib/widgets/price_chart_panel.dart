import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../theme/app_theme.dart';
import '../services/binance_api.dart';

class PriceChartPanel extends StatefulWidget {
  final String symbol;
  final String baseAsset;

  const PriceChartPanel({
    super.key,
    required this.symbol,
    required this.baseAsset,
  });

  @override
  State<PriceChartPanel> createState() => _PriceChartPanelState();
}

class _PriceChartPanelState extends State<PriceChartPanel> {
  String _selectedInterval = '1h';
  List<CandleData> _chartData = [];
  PriceStats? _stats;
  bool _isLoading = true;

  final List<String> _timeframes = ['1H', '4H', '1D', '1W', '1M'];
  final List<String> _intervals = ['1h', '4h', '1d', '1w', '1M'];

  @override
  void initState() {
    super.initState();
    _loadChartData();
  }

  Future<void> _loadChartData() async {
    setState(() => _isLoading = true);

    try {
      final stats = await BinanceApiService.get24hrStats(widget.symbol);
      final klineData = await BinanceApiService.getKlineData(
        widget.symbol,
        _selectedInterval,
        100,
      );

      setState(() {
        _stats = stats;
        _chartData = klineData;
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
      // Handle error
    }
  }

  void _onTimeframeChanged(int index) {
    setState(() {
      _selectedInterval = _intervals[index];
    });
    _loadChartData();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onVerticalDragEnd: (details) {
        if (details.primaryVelocity! > 0) {
          Navigator.pop(context);
        }
      },
      child: Container(
        decoration: BoxDecoration(
          color: AppTheme.surface,
          borderRadius: const BorderRadius.vertical(
            top: Radius.circular(24),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.5),
              blurRadius: 50,
              offset: const Offset(0, -20),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Handle
            _buildHandle(),

            // Header
            _buildHeader(),

            // Timeframe selector
            _buildTimeframeSelector(),

            // Chart
            SizedBox(
              height: 200,
              child: _isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : _buildChart(),
            ),

            // Stats
            _buildStats(),

            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildHandle() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Container(
        width: 48,
        height: 4,
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.2),
          borderRadius: BorderRadius.circular(2),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    final priceChange = _stats?.priceChangePercent ?? 0;
    final isPositive = priceChange >= 0;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                '${widget.baseAsset}/USDT',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontSize: 18,
                    ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 6,
                  vertical: 2,
                ),
                decoration: BoxDecoration(
                  color: AppTheme.success.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 6,
                      height: 6,
                      decoration: const BoxDecoration(
                        color: AppTheme.success,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      'LIVE',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            fontSize: 10,
                            color: AppTheme.success,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 1,
                          ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                '\$${_stats?.lastPrice.toStringAsFixed(2) ?? "..."}',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontFamily: 'Tomorrow',
                      fontSize: 32,
                      fontWeight: FontWeight.w700,
                    ),
              ),
              const SizedBox(width: 12),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 8,
                  vertical: 4,
                ),
                decoration: BoxDecoration(
                  color: (isPositive ? AppTheme.success : AppTheme.error)
                      .withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    Icon(
                      isPositive ? Icons.arrow_drop_up : Icons.arrow_drop_down,
                      size: 16,
                      color: isPositive ? AppTheme.success : AppTheme.error,
                    ),
                    Text(
                      '${isPositive ? "+" : ""}${priceChange.toStringAsFixed(2)}%',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            fontFamily: 'Tomorrow',
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: isPositive ? AppTheme.success : AppTheme.error,
                          ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTimeframeSelector() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.03),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: _timeframes.asMap().entries.map((entry) {
            final index = entry.key;
            final timeframe = entry.value;
            final isSelected = _selectedInterval == _intervals[index];

            return Expanded(
              child: GestureDetector(
                onTap: () => _onTimeframeChanged(index),
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  decoration: BoxDecoration(
                    color: isSelected
                        ? AppTheme.primary
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    timeframe,
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: isSelected
                              ? Colors.white
                              : AppTheme.textTertiary,
                        ),
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildChart() {
    if (_chartData.isEmpty) {
      return const Center(child: Text('No data available'));
    }

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: LineChart(
        LineChartData(
          gridData: const FlGridData(show: false),
          titlesData: const FlTitlesData(show: false),
          borderData: FlBorderData(show: false),
          lineBarsData: [
            LineChartBarData(
              spots: _chartData.asMap().entries.map((entry) {
                return FlSpot(
                  entry.key.toDouble(),
                  entry.value.close,
                );
              }).toList(),
              isCurved: true,
              color: AppTheme.primary,
              barWidth: 2,
              dotData: const FlDotData(show: false),
              belowBarData: BarAreaData(
                show: true,
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    AppTheme.primary.withOpacity(0.25),
                    AppTheme.primary.withOpacity(0),
                  ],
                ),
              ),
            ),
          ],
          lineTouchData: LineTouchData(
            touchTooltipData: LineTouchTooltipData(
              tooltipBgColor: AppTheme.surface,
              getTooltipItems: (touchedSpots) {
                return touchedSpots.map((spot) {
                  final candle = _chartData[spot.x.toInt()];
                  return LineTooltipItem(
                    '\$${candle.close.toStringAsFixed(2)}',
                    const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                  );
                }).toList();
              },
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildStats() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(
              color: Colors.white.withOpacity(0.05),
              width: 1,
            ),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildStatItem('High', '\$${_stats?.highPrice.toStringAsFixed(2) ?? "..."}'),
            _buildStatItem('Low', '\$${_stats?.lowPrice.toStringAsFixed(2) ?? "..."}'),
            _buildStatItem('Vol 24H', _formatVolume(_stats?.volume ?? 0)),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(String label, String value) {
    return Column(
      children: [
        Text(
          label.toUpperCase(),
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                fontSize: 10,
                letterSpacing: 1,
                color: AppTheme.textTertiary,
              ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontFamily: 'Tomorrow',
                fontWeight: FontWeight.w600,
              ),
        ),
      ],
    );
  }

  String _formatVolume(double volume) {
    if (volume >= 1000000000) {
      return '\$${(volume / 1000000000).toStringAsFixed(1)}B';
    } else if (volume >= 1000000) {
      return '\$${(volume / 1000000).toStringAsFixed(1)}M';
    } else if (volume >= 1000) {
      return '\$${(volume / 1000).toStringAsFixed(1)}K';
    }
    return '\$${volume.toStringAsFixed(0)}';
  }
}
