import 'package:flutter/material.dart';

class BouncingProgress extends StatefulWidget {
  final Color color;

  const BouncingProgress({
    super.key,
    required this.color,
  });

  @override
  State<BouncingProgress> createState() => _BouncingProgressState();
}

class _BouncingProgressState extends State<BouncingProgress>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    
    // Fast bouncing animation (800ms per cycle)
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    )..repeat(reverse: true); // Reverse = bouncing effect
    
    // Smooth curve
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return CustomPaint(
          painter: BouncingProgressPainter(
            progress: _animation.value,
            color: widget.color,
          ),
          size: const Size(double.infinity, 2),
        );
      },
    );
  }
}

class BouncingProgressPainter extends CustomPainter {
  final double progress; // 0.0 to 1.0
  final Color color;

  BouncingProgressPainter({
    required this.progress,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    // Line width (20% of total width)
    final lineWidth = size.width * 0.2;

    // Calculate position (0 to size.width - lineWidth)
    final maxPosition = size.width - lineWidth;
    final position = progress * maxPosition;

    // Draw the moving line
    final rect = Rect.fromLTWH(
      position,
      0,
      lineWidth,
      size.height,
    );

    canvas.drawRect(rect, paint);
  }

  @override
  bool shouldRepaint(BouncingProgressPainter oldDelegate) {
    return oldDelegate.progress != progress;
  }
}
