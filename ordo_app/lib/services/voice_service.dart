// import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:permission_handler/permission_handler.dart';

class VoiceService {
  // final stt.SpeechToText _speech = stt.SpeechToText();
  bool _isInitialized = false;
  bool _isListening = false;

  bool get isListening => _isListening;
  bool get isInitialized => _isInitialized;

  /// Initialize speech recognition
  Future<bool> initialize() async {
    if (_isInitialized) return true;

    try {
      // Request microphone permission
      final status = await Permission.microphone.request();
      if (!status.isGranted) {
        return false;
      }

      // TODO: Initialize speech recognition when package is fixed
      _isInitialized = true;
      return _isInitialized;
    } catch (e) {
      print('Failed to initialize speech recognition: $e');
      return false;
    }
  }

  /// Start listening for voice input
  Future<void> startListening({
    required Function(String) onResult,
    Function(String)? onPartialResult,
  }) async {
    if (!_isInitialized) {
      final initialized = await initialize();
      if (!initialized) {
        throw Exception('Failed to initialize speech recognition');
      }
    }

    if (_isListening) {
      await stopListening();
    }

    try {
      _isListening = true;
      
      // TODO: Implement actual speech recognition
      // For now, simulate voice input after 3 seconds
      await Future.delayed(const Duration(seconds: 3));
      onResult('swap 1 sol to usdc'); // Mock result
      _isListening = false;
    } catch (e) {
      print('Failed to start listening: $e');
      _isListening = false;
      rethrow;
    }
  }

  /// Stop listening
  Future<void> stopListening() async {
    if (_isListening) {
      // await _speech.stop();
      _isListening = false;
    }
  }

  /// Cancel listening
  Future<void> cancelListening() async {
    if (_isListening) {
      // await _speech.cancel();
      _isListening = false;
    }
  }

  /// Check if speech recognition is available
  Future<bool> isAvailable() async {
    // return await _speech.initialize();
    return true; // Mock for now
  }

  /// Dispose resources
  void dispose() {
    // _speech.stop();
    _isInitialized = false;
    _isListening = false;
  }
}
