#!/usr/bin/env node

/**
 * Ordo Setup Verification Script
 * 
 * This script verifies that the Ordo development environment is properly configured.
 * Run with: node scripts/verify-setup.js
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_ENV_VARS = [
  'BACKEND_API_URL',
  'HELIUS_API_KEY',
  'MISTRAL_API_KEY',
];

const OPTIONAL_ENV_VARS = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'X_CLIENT_ID',
  'X_CLIENT_SECRET',
  'TELEGRAM_BOT_TOKEN',
  'BRAVE_SEARCH_API_KEY',
  'SUPABASE_URL',
  'SUPABASE_KEY',
];

const REQUIRED_DIRECTORIES = [
  'app',
  'assets',
  'components',
  'constants',
  'hooks',
  'services',
  'utils',
  '__tests__',
];

const REQUIRED_FILES = [
  'app.json',
  'package.json',
  'tsconfig.json',
  '.env.example',
  'README.md',
];

let hasErrors = false;
let hasWarnings = false;

function checkmark() {
  return '✓';
}

function cross() {
  return '✗';
}

function warning() {
  return '⚠';
}

function log(message, type = 'info') {
  const prefix = {
    success: `${checkmark()} `,
    error: `${cross()} `,
    warning: `${warning()} `,
    info: '  ',
  }[type];
  
  console.log(prefix + message);
}

function checkEnvFile() {
  console.log('\n📋 Checking environment configuration...');
  
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', '.env.example');
  
  if (!fs.existsSync(envExamplePath)) {
    log('.env.example file not found', 'error');
    hasErrors = true;
    return;
  }
  
  log('.env.example exists', 'success');
  
  if (!fs.existsSync(envPath)) {
    log('.env file not found - copy .env.example to .env and configure', 'warning');
    hasWarnings = true;
    return;
  }
  
  log('.env file exists', 'success');
  
  // Parse .env file
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match) {
      envVars[match[1]] = match[2];
    }
  });
  
  // Check required variables
  REQUIRED_ENV_VARS.forEach(varName => {
    if (!envVars[varName] || envVars[varName].includes('your-') || envVars[varName].includes('-here')) {
      log(`${varName} not configured`, 'warning');
      hasWarnings = true;
    } else {
      log(`${varName} configured`, 'success');
    }
  });
  
  // Check optional variables
  let configuredOptional = 0;
  OPTIONAL_ENV_VARS.forEach(varName => {
    if (envVars[varName] && !envVars[varName].includes('your-') && !envVars[varName].includes('-here')) {
      configuredOptional++;
    }
  });
  
  log(`${configuredOptional}/${OPTIONAL_ENV_VARS.length} optional variables configured`, 'info');
}

function checkDirectories() {
  console.log('\n📁 Checking directory structure...');
  
  REQUIRED_DIRECTORIES.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (fs.existsSync(dirPath)) {
      log(`${dir}/ exists`, 'success');
    } else {
      log(`${dir}/ not found`, 'error');
      hasErrors = true;
    }
  });
}

function checkFiles() {
  console.log('\n📄 Checking required files...');
  
  REQUIRED_FILES.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      log(`${file} exists`, 'success');
    } else {
      log(`${file} not found`, 'error');
      hasErrors = true;
    }
  });
}

function checkDependencies() {
  console.log('\n📦 Checking dependencies...');
  
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredDeps = [
    '@solana-mobile/mobile-wallet-adapter-protocol',
    'expo-secure-store',
    'expo-notifications',
    'expo-local-authentication',
    'expo-av',
    'expo-speech',
    'expo-background-fetch',
    'expo-task-manager',
    '@react-native-community/netinfo',
    'expo-intent-launcher',
  ];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      log(`${dep} installed`, 'success');
    } else {
      log(`${dep} not installed`, 'error');
      hasErrors = true;
    }
  });
  
  // Check if node_modules exists
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    log('node_modules not found - run npm install', 'error');
    hasErrors = true;
  } else {
    log('node_modules exists', 'success');
  }
}

function checkAppConfig() {
  console.log('\n⚙️  Checking app configuration...');
  
  const appJsonPath = path.join(__dirname, '..', 'app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  
  if (appJson.expo.name === 'Ordo') {
    log('App name is "Ordo"', 'success');
  } else {
    log(`App name is "${appJson.expo.name}" (expected "Ordo")`, 'warning');
    hasWarnings = true;
  }
  
  if (appJson.expo.slug === 'ordo') {
    log('App slug is "ordo"', 'success');
  } else {
    log(`App slug is "${appJson.expo.slug}" (expected "ordo")`, 'warning');
    hasWarnings = true;
  }
  
  if (appJson.expo.ios?.bundleIdentifier === 'com.ordo.app') {
    log('iOS bundle identifier is "com.ordo.app"', 'success');
  } else {
    log('iOS bundle identifier not set to "com.ordo.app"', 'warning');
    hasWarnings = true;
  }
  
  if (appJson.expo.android?.package === 'com.ordo.app') {
    log('Android package is "com.ordo.app"', 'success');
  } else {
    log('Android package not set to "com.ordo.app"', 'warning');
    hasWarnings = true;
  }
}

function printSummary() {
  console.log('\n' + '='.repeat(50));
  
  if (hasErrors) {
    console.log(`\n${cross()} Setup verification FAILED`);
    console.log('\nPlease fix the errors above before continuing.');
    process.exit(1);
  } else if (hasWarnings) {
    console.log(`\n${warning()} Setup verification completed with warnings`);
    console.log('\nYour setup is functional but some optional features may not work.');
    console.log('Review the warnings above and configure as needed.');
  } else {
    console.log(`\n${checkmark()} Setup verification PASSED`);
    console.log('\nYour Ordo development environment is ready!');
    console.log('\nNext steps:');
    console.log('  1. Configure .env with your API keys');
    console.log('  2. Run: npm run dev');
    console.log('  3. Start building!');
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
}

// Run checks
console.log('\n🔍 Ordo Setup Verification\n');
console.log('Checking your development environment...\n');

checkDirectories();
checkFiles();
checkDependencies();
checkAppConfig();
checkEnvFile();
printSummary();
