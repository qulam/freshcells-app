import { parseJwtPayload, mayBeNull } from './helpers';

describe('parseJwtPayload function', () => {
  it('should parse jwt', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im15SWQiLCJleHAiOjE2OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw6c';
    const expectedId = 'myId';

    const result = parseJwtPayload(token);

    expect(result.id).toBe(expectedId);
  });

  it('should throw an error if token is invalid', () => {
    const invalidToken = 'not.jwt';

    expect(() => parseJwtPayload(invalidToken)).toThrow('Invalid JWT format.');
  });
});

describe('mayBeNull function', () => {
  it('should return value if it is not none', () => {
    const value = 'someValue';
    expect(mayBeNull(value)).toBe(value);
  });

  it('should return the passed symbol', () => {
    const symbol = '--';
    expect(mayBeNull(null, symbol)).toBe(symbol);
  });
});
