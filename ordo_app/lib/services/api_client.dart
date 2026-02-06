import 'dart:convert';
import 'dart:io';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'package:http/io_client.dart';
import 'auth_service.dart';

class ApiClient {
  // Production API - Railway backup
  static const String baseUrl = 'https://ordo-production.up.railway.app/api/v1';
  
  final AuthService authService;
  late final http.Client _client;
  
  ApiClient({required this.authService}) {
    // Create custom HTTP client that accepts all certificates
    final httpClient = HttpClient()
      ..badCertificateCallback = (X509Certificate cert, String host, int port) => true;
    
    _client = IOClient(httpClient);
  }
  
  // Get headers with auth token
  Map<String, String> _getHeaders() {
    final headers = {
      'Content-Type': 'application/json',
    };
    
    // Add auth token if available
    if (authService.token != null) {
      headers['Authorization'] = 'Bearer ${authService.token}';
    }
    
    return headers;
  }
  
  // POST request
  Future<Map<String, dynamic>> post(
    String endpoint,
    Map<String, dynamic> body,
  ) async {
    final url = Uri.parse('$baseUrl$endpoint');
    
    try {
      print('🔵 POST to: $url');
      print('🔵 Body: ${jsonEncode(body)}');
      
      final response = await _client.post(
        url,
        headers: _getHeaders(),
        body: jsonEncode(body),
      ).timeout(
        const Duration(seconds: 60),
        onTimeout: () {
          print('🔴 TIMEOUT after 60 seconds');
          throw Exception('Connection timeout after 60 seconds');
        },
      );
      
      print('🔵 Response status: ${response.statusCode}');
      print('🔵 Response body: ${response.body}');
      
      if (response.statusCode == 200 || response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        throw Exception('API Error: ${response.statusCode}');
      }
    } on SocketException catch (e) {
      print('🔴 SocketException: $e');
      print('🔴 Address: ${e.address}');
      print('🔴 Port: ${e.port}');
      throw Exception('Network Error: Cannot connect to server. Check your internet connection.');
    } on HandshakeException catch (e) {
      print('🔴 HandshakeException (SSL): $e');
      throw Exception('SSL Error: Cannot establish secure connection.');
    } on TimeoutException catch (e) {
      print('🔴 TimeoutException: $e');
      throw Exception('Timeout: Server took too long to respond.');
    } catch (e) {
      print('🔴 POST error: $e');
      print('🔴 Error type: ${e.runtimeType}');
      throw Exception('Network Error: $e');
    }
  }
  
  // GET request
  Future<Map<String, dynamic>> get(String endpoint) async {
    final url = Uri.parse('$baseUrl$endpoint');
    
    try {
      final response = await _client.get(
        url,
        headers: _getHeaders(),
      ).timeout(
        const Duration(seconds: 30),
        onTimeout: () {
          throw Exception('Connection timeout');
        },
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('API Error: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network Error: $e');
    }
  }
  
  // Chat endpoint - NON-STREAMING (fallback)
  Future<Map<String, dynamic>> sendMessage(String message) async {
    return await post('/chat', {
      'message': message,
    });
  }
  
  // Chat endpoint - STREAMING with SSE
  Stream<String> sendMessageStream(String message) async* {
    final url = Uri.parse('$baseUrl/chat/stream');
    
    try {
      print('🔵 SSE POST to: $url');
      print('🔵 Message: $message');
      
      final request = http.Request('POST', url);
      request.headers.addAll(_getHeaders());
      request.headers['Accept'] = 'text/event-stream';
      request.body = jsonEncode({'message': message});
      
      final streamedResponse = await _client.send(request).timeout(
        const Duration(seconds: 60),
        onTimeout: () {
          throw Exception('Connection timeout after 60 seconds');
        },
      );
      
      print('🔵 SSE Response status: ${streamedResponse.statusCode}');
      
      if (streamedResponse.statusCode != 200) {
        throw Exception('API Error: ${streamedResponse.statusCode}');
      }
      
      // Parse SSE stream
      await for (final chunk in streamedResponse.stream.transform(utf8.decoder)) {
        print('🔵 SSE Chunk: $chunk');
        
        // Parse SSE format: "data: {...}\n\n"
        final lines = chunk.split('\n');
        for (final line in lines) {
          if (line.startsWith('data: ')) {
            final data = line.substring(6).trim();
            
            // Skip empty data
            if (data.isEmpty) continue;
            
            try {
              final json = jsonDecode(data);
              final type = json['type']?.toString();
              
              // Handle different event types from backend
              if (type == 'token') {
                // Token streaming - yield content
                final content = json['content']?.toString();
                if (content != null && content.isNotEmpty) {
                  yield content;
                }
              } else if (type == 'tool_call') {
                // Tool call event - yield as marker
                final toolName = json['toolName']?.toString() ?? 'tool';
                yield '\n[Using $toolName...]\n';
              } else if (type == 'tool_result') {
                // Tool result - yield result
                final toolName = json['toolName']?.toString() ?? 'tool';
                yield '\n[✓ $toolName completed]\n';
              } else if (type == 'done') {
                // Stream complete
                print('🔵 SSE Stream completed');
                break;
              } else if (type == 'error') {
                // Error event - throw to be caught by controller
                final error = json['error']?.toString() ?? 'Unknown error';
                print('🔴 SSE Error event: $error');
                throw Exception(error);
              } else if (type == 'start') {
                // Start event - ignore
                continue;
              }
            } catch (e) {
              print('🔴 Failed to parse SSE data: $e');
              // If not JSON, skip
            }
          }
        }
      }
      
      print('🔵 SSE Stream finished');
      
    } on SocketException catch (e) {
      print('🔴 SocketException: $e');
      throw Exception('Network Error: Cannot connect to server');
    } on TimeoutException catch (e) {
      print('🔴 TimeoutException: $e');
      throw Exception('Timeout: Server took too long to respond');
    } catch (e) {
      print('🔴 SSE error: $e');
      throw Exception('Streaming Error: $e');
    }
  }
  
  // Auth endpoints
  Future<Map<String, dynamic>> login(String email, String password) async {
    return await post('/auth/login', {
      'email': email,
      'password': password,
    });
  }
  
  Future<Map<String, dynamic>> register(
    String email,
    String password,
    String name,
  ) async {
    return await post('/auth/register', {
      'email': email,
      'password': password,
      'name': name,
    });
  }
}
