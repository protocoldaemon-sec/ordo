import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import 'screens/command_screen.dart';
import 'screens/login_screen.dart';
import 'controllers/assistant_controller.dart';
import 'services/api_client.dart';
import 'services/auth_service.dart';
import 'services/voice_service.dart';
import 'services/context_service.dart';
import 'theme/app_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Color(0xFF0A0A0F),
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  
  // Lock to portrait mode
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  
  runApp(const OrdoApp());
}

class OrdoApp extends StatelessWidget {
  const OrdoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<AuthService>(
          create: (_) => AuthService(),
        ),
        ProxyProvider<AuthService, ApiClient>(
          update: (_, authService, __) => ApiClient(authService: authService),
        ),
        Provider<VoiceService>(
          create: (_) => VoiceService(),
        ),
        ChangeNotifierProvider<ContextService>(
          create: (_) => ContextService(),
        ),
        ChangeNotifierProxyProvider3<ApiClient, VoiceService, ContextService, AssistantController>(
          create: (context) => AssistantController(
            apiClient: context.read<ApiClient>(),
            voiceService: context.read<VoiceService>(),
            contextService: context.read<ContextService>(),
          ),
          update: (_, apiClient, voiceService, contextService, controller) {
            if (controller == null) {
              return AssistantController(
                apiClient: apiClient,
                voiceService: voiceService,
                contextService: contextService,
              );
            }
            return controller;
          },
        ),
      ],
      child: MaterialApp(
        title: 'Ordo',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.darkTheme,
        home: const AuthWrapper(), // Check auth first
      ),
    );
  }
}

// Auth wrapper to check if user is logged in
class AuthWrapper extends StatefulWidget {
  const AuthWrapper({super.key});

  @override
  State<AuthWrapper> createState() => _AuthWrapperState();
}

class _AuthWrapperState extends State<AuthWrapper> {
  bool _isInitialized = false;

  @override
  void initState() {
    super.initState();
    _initializeAuth();
  }

  Future<void> _initializeAuth() async {
    print('🔵 AuthWrapper: Starting initialization...');
    final authService = context.read<AuthService>();
    await authService.initialize();
    
    print('🔵 AuthWrapper: Initialization complete');
    print('🔵 AuthWrapper: isAuthenticated=${authService.isAuthenticated}');
    print('🔵 AuthWrapper: token exists=${authService.token != null}');
    
    if (mounted) {
      setState(() {
        _isInitialized = true;
      });
      print('🔵 AuthWrapper: State updated, will rebuild');
    }
  }

  @override
  Widget build(BuildContext context) {
    // Show loading while initializing
    if (!_isInitialized) {
      return const Scaffold(
        backgroundColor: Color(0xFF0A0A0F),
        body: Center(
          child: CircularProgressIndicator(
            color: Color(0xFF00D9FF),
          ),
        ),
      );
    }

    // After init, check auth status
    final authService = context.watch<AuthService>();
    
    print('🔵 Auth check: isAuthenticated=${authService.isAuthenticated}, token=${authService.token != null}');
    
    return authService.isAuthenticated 
        ? const CommandScreen() 
        : const LoginScreen();
  }
}
