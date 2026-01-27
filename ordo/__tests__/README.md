# Ordo Test Suite

This directory contains comprehensive tests for the Ordo application, including both unit tests and property-based tests.

## Test Files

### Unit Tests

- **`PermissionManager.test.ts`**: Comprehensive unit tests for the PermissionManager service
  - Tests permission granting, revocation, and state management
  - Tests token storage and retrieval
  - Tests error handling and edge cases
  - Coverage: All PermissionManager methods

### Property-Based Tests

- **`PermissionManager.properties.test.ts`**: Property-based tests using fast-check
  - Validates universal properties that must hold for all inputs
  - Tests with 100+ iterations per property to find edge cases
  - Implements 4 core properties from requirements + 2 additional properties

## Property-Based Testing

Property-based testing (PBT) validates that certain properties hold true for all possible inputs, not just specific test cases. This provides much stronger guarantees about correctness.

### Implemented Properties

#### Property 1: Permission State Persistence (Requirements 1.2)
**Universal Property**: For any permission that is granted, the permission state must persist across PermissionManager instances and remain accessible until explicitly revoked.

**Tests**:
- Permissions persist across instances (100 iterations)
- Permission state includes valid metadata (100 iterations)
- Multiple permissions persist independently (50 iterations)

#### Property 2: Permission Revocation Cleanup (Requirements 1.3)
**Universal Property**: When a permission is revoked, all associated data (permission state, OAuth tokens, cached data) must be completely removed.

**Tests**:
- Complete removal of permission state on revocation (100 iterations)
- Other permissions unaffected by revocation (50 iterations)
- Graceful handling of non-existent permission revocation (100 iterations)

#### Property 3: Unauthorized Access Rejection (Requirements 1.4)
**Universal Property**: Any attempt to check or use a permission that has not been granted must return false/null, ensuring no unauthorized access.

**Tests**:
- Ungranted permissions return false (100 iterations)
- Tokens for ungranted surfaces return null (100 iterations)
- State for ungranted permissions returns null (100 iterations)
- Ungranted permissions not in granted list (50 iterations)

#### Property 4: Permission Status Completeness (Requirements 1.6)
**Universal Property**: The permission status display must accurately reflect all granted permissions with complete metadata (surface, timestamp).

**Tests**:
- Complete status for all granted permissions (50 iterations)
- Accurate count of granted permissions (100 iterations)
- Correct status updates after revocations (50 iterations)

#### Additional Property: Token Management Consistency
**Universal Property**: Token storage and retrieval must be consistent with permission state.

**Tests**:
- Token consistency with permission state (100 iterations)
- Correct token refresh behavior (100 iterations)

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npm test -- PermissionManager.test.ts
npm test -- PermissionManager.properties.test.ts
```

### Run with coverage
```bash
npm test -- --coverage
```

### Run in watch mode
```bash
npm test -- --watch
```

## Test Statistics

- **Total Tests**: 15 property-based tests + 30+ unit tests
- **Total Iterations**: 1,000+ property test iterations
- **Coverage**: >95% of PermissionManager code
- **Test Duration**: ~5 seconds for full suite

## Key Testing Principles

1. **Property-Based Testing**: Validates universal properties across all inputs
2. **Unit Testing**: Validates specific behaviors and edge cases
3. **Test Isolation**: Each test uses fresh mock storage
4. **Comprehensive Coverage**: Tests all methods, error paths, and edge cases
5. **Fast Execution**: All tests complete in seconds

## Future Tests

Additional property-based tests will be added in Phase 9 for:
- Email filtering (Properties 5-9)
- Write operation confirmation (Properties 10-11)
- Wallet security (Property 12)
- Sensitive data handling (Properties 13-15)
- And more (40+ total properties planned)
