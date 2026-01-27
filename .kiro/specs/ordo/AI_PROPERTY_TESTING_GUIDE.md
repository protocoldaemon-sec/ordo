# Property-Based Testing Guide for Ordo

Complete guide for implementing property-based tests (PBT) in Ordo using Hypothesis (Python) and fast-check (TypeScript).

## Why Property-Based Testing?

Property-based testing verifies that your code satisfies universal properties across ALL possible inputs, not just specific examples. This is critical for security-sensitive applications like Ordo.

### Example: Traditional vs Property-Based Testing

**Traditional Unit Test** (tests specific examples):
```python
def test_otp_filtering():
    email = "Your code is: 123456"
    assert policy_engine.is_sensitive(email) == True
```

**Property-Based Test** (tests universal property):
```python
@given(email_body=st.text())
def test_all_otps_filtered(email_body):
    """ANY email with OTP pattern MUST be filtered"""
    email_with_otp = f"{email_body}\nCode: 123456"
    assert policy_engine.is_sensitive(email_with_otp) == True
```

The property test will generate 100+ random email bodies and verify the property holds for ALL of them.

## Ordo's 46 Security Properties

All properties are defined in `.kiro/specs/ordo/design.md`. Here are the critical ones:

### Permission System Properties (1-4)

**Property 1: Permission state persistence**
```typescript
// fast-check test
import fc from 'fast-check';

fc.assert(
  fc.asyncProperty(
    fc.constantFrom(...Object.values(Permission)),
    async (permission) => {
      const manager = PermissionManager.getInstance();
      
      // Grant permission
      await manager.requestPermission(permission);
      
      // Verify persistence after app restart (simulate)
      const hasPermission = await manager.hasPermission(permission);
      
      return hasPermission === true;
    }
  ),
  { numRuns: 100 }
);
```

**Property 2: Permission revocation cleanup**
```typescript
fc.assert(
  fc.asyncProperty(
    fc.constantFrom(...Object.values(Permission)),
    async (permission) => {
      const manager = PermissionManager.getInstance();
      
      // Grant then revoke
      await manager.requestPermission(permission);
      await manager.revokePermission(permission);
      
      // Verify token deleted
      const surface = getSurfaceFromPermission(permission);
      const token = await manager.getToken(surface);
      
      return token === null;
    }
  )
);
```

### Content Filtering Properties (5-9)

**Property 5: Universal content scanning**
```python
from hypothesis import given, strategies as st

@given(
    email_subject=st.text(min_size=1, max_size=200),
    email_body=st.text(min_size=1, max_size=2000)
)
def test_property_all_content_scanned(email_subject, email_body):
    """
    Property 5: Universal content scanning (Requirements 2.1)
    
    ALL emails MUST be scanned before returning to user
    """
    email = {
        'subject': email_subject,
        'body': email_body,
        'id': 'test-123'
    }
    
    # Process through policy engine
    filtered, blocked = await policy_engine.filter_emails([email])
    
    # Property: Either filtered or blocked, never unscanned
    assert len(filtered) + blocked == 1, "Email must be either filtered or blocked"
```

**Property 6: Sensitive content filtering**
```python
@given(
    prefix=st.text(max_size=100),
    otp_code=st.integers(min_value=1000, max_value=99999999),
    suffix=st.text(max_size=100)
)
def test_property_otp_always_blocked(prefix, otp_code, suffix):
    """
    Property 6: Sensitive content filtering (Requirements 2.2, 2.3, 6.3)
    
    ANY content with OTP pattern MUST be blocked
    """
    # Generate email with OTP in various formats
    otp_formats = [
        f"{prefix} Your code is: {otp_code} {suffix}",
        f"{prefix} OTP: {otp_code} {suffix}",
        f"{prefix} Verification code {otp_code} {suffix}",
    ]
    
    for email_text in otp_formats:
        scan_result = policy_engine.scan_content(email_text)
        
        assert scan_result.is_sensitive, \
            f"OTP pattern should be detected: {email_text}"
        
        assert any(p in ['OTP_CODE', 'VERIFICATION_CODE'] for p in scan_result.patterns_found), \
            f"Should identify OTP pattern, found: {scan_result.patterns_found}"
```

**Property 7: Pattern-based blocking**
```python
@given(
    email_body=st.text(min_size=10, max_size=1000),
    pattern_type=st.sampled_from([
        'OTP_CODE',
        'VERIFICATION_CODE',
        'RECOVERY_PHRASE',
        'PASSWORD',
        'BANK_STATEMENT',
        'TAX_DOCUMENT',
        'SSN',
        'CREDIT_CARD'
    ])
)
def test_property_pattern_blocking(email_body, pattern_type):
    """
    Property 7: Pattern-based blocking (Requirements 2.4)
    
    ALL defined patterns MUST be blocked
    """
    # Inject pattern into email
    pattern_examples = {
        'OTP_CODE': f"{email_body}\nYour code: 123456",
        'VERIFICATION_CODE': f"{email_body}\nVerification code: 8765",
        'RECOVERY_PHRASE': f"{email_body}\nSeed phrase: word 1 word 2 word 3",
        'PASSWORD': f"{email_body}\nPassword: mypassword123",
        'BANK_STATEMENT': f"{email_body}\nBank statement attached",
        'TAX_DOCUMENT': f"{email_body}\nYour W-2 tax form",
        'SSN': f"{email_body}\nSSN: 123-45-6789",
        'CREDIT_CARD': f"{email_body}\nCard: 4532-1234-5678-9010"
    }
    
    email_with_pattern = pattern_examples[pattern_type]
    scan_result = policy_engine.scan_content(email_with_pattern)
    
    assert scan_result.is_sensitive, \
        f"Pattern {pattern_type} should be detected"
    
    assert pattern_type in scan_result.patterns_found, \
        f"Should identify {pattern_type}, found: {scan_result.patterns_found}"
```

### Write Operation Properties (10-11)

**Property 10: Write operation confirmation requirement**
```typescript
fc.assert(
  fc.asyncProperty(
    fc.emailAddress(),
    fc.string({ minLength: 1, maxLength: 100 }),
    fc.string({ minLength: 1, maxLength: 500 }),
    async (to, subject, body) => {
      // Attempt to send email
      const result = await sendEmailWithConfirmation(to, subject, body);
      
      // Property: MUST require confirmation
      // If not confirmed, should return cancelled: true
      if (!result.success && result.cancelled) {
        return true; // User cancelled, property holds
      }
      
      // If successful, confirmation MUST have been shown
      return result.confirmed === true;
    }
  )
);
```

**Property 11: Confirmation cancellation**
```typescript
fc.assert(
  fc.asyncProperty(
    fc.record({
      to: fc.emailAddress(),
      subject: fc.string(),
      body: fc.string()
    }),
    async (emailData) => {
      // Mock user cancelling confirmation
      mockUserCancelsConfirmation();
      
      const result = await sendEmailWithConfirmation(
        emailData.to,
        emailData.subject,
        emailData.body
      );
      
      // Property: Cancelled operations MUST NOT execute
      return result.success === false && result.cancelled === true;
    }
  )
);
```

### Wallet Security Properties (12)

**Property 12: Private key isolation**
```typescript
fc.assert(
  fc.asyncProperty(
    fc.constantFrom('transfer', 'swap', 'stake', 'sign'),
    async (operation) => {
      // Perform wallet operation
      const result = await performWalletOperation(operation);
      
      // Property: MUST use Seed Vault, NEVER access private keys
      const codeUsedSeedVault = result.usedMWA === true;
      const codeAccessedPrivateKey = result.accessedPrivateKey === true;
      
      return codeUsedSeedVault && !codeAccessedPrivateKey;
    }
  )
);
```

### Response Properties (13-15)

**Property 13: Sensitive data exclusion from responses**
```python
@given(
    query=st.text(min_size=5, max_size=100),
    email_with_otp=st.text(min_size=10, max_size=500).map(
        lambda t: f"{t}\nYour OTP: {random.randint(1000, 9999)}"
    )
)
async def test_property_no_sensitive_in_response(query, email_with_otp):
    """
    Property 13: Sensitive data exclusion from responses (Requirements 10.2)
    
    LLM responses MUST NEVER contain sensitive data
    """
    # Simulate query that would access email with OTP
    response = await ordo_agent.process_query(query, {
        'user_id': 'test-user',
        'permissions': {'READ_GMAIL': True},
        'tokens': {'gmail': 'test-token'}
    })
    
    # Property: Response must not contain OTP pattern
    scan_result = policy_engine.scan_content(response['response'])
    
    assert not scan_result.is_sensitive, \
        f"Response contains sensitive data: {scan_result.patterns_found}"
```

## Writing New Property Tests

### Step 1: Identify the Property

Ask yourself: "What MUST be true for ALL inputs?"

Examples:
- "ALL emails with OTP codes MUST be filtered"
- "ALL write operations MUST require confirmation"
- "ALL wallet operations MUST use Seed Vault"

### Step 2: Choose Test Framework

**Python (Backend)**: Use Hypothesis
```python
from hypothesis import given, strategies as st, settings

@given(input_data=st.text())
@settings(max_examples=100)
def test_property_name(input_data):
    # Test implementation
    pass
```

**TypeScript (Frontend)**: Use fast-check
```typescript
import fc from 'fast-check';

fc.assert(
  fc.property(
    fc.string(),
    (inputData) => {
      // Test implementation
      return true; // or false
    }
  ),
  { numRuns: 100 }
);
```

### Step 3: Generate Test Data

Use appropriate strategies/arbitraries:

**Hypothesis Strategies**:
```python
st.text()                    # Random strings
st.integers(min_value=0)     # Random integers
st.emails()                  # Random email addresses
st.lists(st.text())          # Lists of strings
st.dictionaries(keys=st.text(), values=st.integers())  # Dicts
st.sampled_from(['a', 'b'])  # Pick from list
```

**fast-check Arbitraries**:
```typescript
fc.string()                  // Random strings
fc.integer()                 // Random integers
fc.emailAddress()            // Random emails
fc.array(fc.string())        // Arrays of strings
fc.record({ key: fc.integer() })  // Objects
fc.constantFrom('a', 'b')    // Pick from list
```

### Step 4: Write Assertion

Assert the property holds:

```python
@given(email=st.text())
def test_property(email):
    result = function_under_test(email)
    
    # Assert property
    assert result.satisfies_property(), \
        f"Property violated for input: {email}"
```

### Step 5: Run Tests

```bash
# Python
pytest tests/test_properties.py -v

# TypeScript
npm test -- --testPathPattern=properties
```

## Common Pitfalls

### ❌ Don't: Test specific examples
```python
def test_otp_filtering():
    assert policy_engine.is_sensitive("Code: 123456") == True
```

### ✅ Do: Test universal properties
```python
@given(otp=st.integers(min_value=1000, max_value=9999))
def test_all_otps_filtered(otp):
    assert policy_engine.is_sensitive(f"Code: {otp}") == True
```

### ❌ Don't: Assume specific input format
```python
@given(email=st.text())
def test_email_parsing(email):
    # Assumes email is valid format
    parsed = parse_email(email)  # May crash!
```

### ✅ Do: Handle all possible inputs
```python
@given(email=st.text())
def test_email_parsing(email):
    try:
        parsed = parse_email(email)
        assert parsed is not None
    except ValueError:
        # Invalid email format is acceptable
        pass
```

## Running Property Tests in CI/CD

Add to your CI pipeline:

```yaml
# .github/workflows/test.yml
- name: Run Property-Based Tests
  run: |
    pytest tests/test_properties.py --hypothesis-show-statistics
    npm test -- --testPathPattern=properties
```

## Debugging Failed Properties

When a property test fails, it will show the counterexample:

```
Falsifying example: test_property_otp_filtering(
    email_body='Hello\nYour code is: 1234\nThanks'
)
```

Use this to:
1. Understand why the property failed
2. Fix the bug in your code
3. Add the counterexample as a regression test

## Summary

Property-based testing is MANDATORY for Ordo's security-critical components:
- ✅ All 46 properties must have tests
- ✅ Run 100+ iterations per property
- ✅ Test with random, edge case, and malicious inputs
- ✅ Verify properties hold for ALL possible inputs

This ensures Ordo's privacy guarantees are mathematically sound, not just "probably correct".
