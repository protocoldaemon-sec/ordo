// Jest setup file for global test configuration

// Mock react-native Platform
jest.mock('react-native', () => ({
  Platform: {
    OS: 'android',
    select: jest.fn((obj) => obj.android || obj.default),
  },
}));

// Suppress console errors during tests (optional)
// global.console = {
//   ...console,
//   error: jest.fn(),
//   warn: jest.fn(),
// };
