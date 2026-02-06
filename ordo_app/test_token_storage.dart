import 'package:flutter_secure_storage/flutter_secure_storage.dart';

void main() async {
  print('🔵 Testing token storage...');
  
  const storage = FlutterSecureStorage();
  
  // Test write
  await storage.write(key: 'test_token', value: 'abc123');
  print('🔵 Token written');
  
  // Test read
  final token = await storage.read(key: 'test_token');
  print('🔵 Token read: $token');
  
  if (token == 'abc123') {
    print('✅ Token storage works!');
  } else {
    print('❌ Token storage FAILED!');
  }
  
  // Cleanup
  await storage.delete(key: 'test_token');
}
