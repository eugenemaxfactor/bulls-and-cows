import { describe, expect, it } from 'vitest';

import { createDigitValidator } from '../src/game/create-digit-validator.js';

describe('createDigitValidator', () => {
  it('accepts only zero and one for the binary system', () => {
    const isBinaryDigit = createDigitValidator(2);

    expect(isBinaryDigit('0')).toBe(true);
    expect(isBinaryDigit('1')).toBe(true);
    expect(isBinaryDigit('2')).toBe(false);
  });

  it('accepts decimal digits from zero to nine', () => {
    const isDecimalDigit = createDigitValidator(10);

    expect(isDecimalDigit('0')).toBe(true);
    expect(isDecimalDigit('9')).toBe(true);
    expect(isDecimalDigit('a')).toBe(false);
  });

  it('accepts hexadecimal digits regardless of letter case', () => {
    const isHexDigit = createDigitValidator(16);

    expect(isHexDigit('a')).toBe(true);
    expect(isHexDigit('F')).toBe(true);
    expect(isHexDigit('g')).toBe(false);
  });
});
