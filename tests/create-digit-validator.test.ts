import { describe, expect, it } from 'vitest';

import { createDigitValidator } from '../src/game/create-digit-validator.js';

function testBinaryDigits(): void {
  const isBinaryDigit = createDigitValidator(2);

  expect(isBinaryDigit('0')).toBe(true);
  expect(isBinaryDigit('1')).toBe(true);
  expect(isBinaryDigit('2')).toBe(false);
}

function testOctalDigits(): void {
  const isOctalDigit = createDigitValidator(8);

  expect(isOctalDigit('0')).toBe(true);
  expect(isOctalDigit('7')).toBe(true);
  expect(isOctalDigit('8')).toBe(false);
}

function testDecimalDigits(): void {
  const isDecimalDigit = createDigitValidator(10);

  expect(isDecimalDigit('0')).toBe(true);
  expect(isDecimalDigit('9')).toBe(true);
  expect(isDecimalDigit('a')).toBe(false);
}

function testHexadecimalDigits(): void {
  const isHexDigit = createDigitValidator(16);

  expect(isHexDigit('a')).toBe(true);
  expect(isHexDigit('F')).toBe(true);
  expect(isHexDigit('g')).toBe(false);
}

function defineCreateDigitValidatorTests(): void {
  it('accepts only zero and one for the binary system', testBinaryDigits);
  it('accepts octal digits from zero to seven', testOctalDigits);
  it('accepts decimal digits from zero to nine', testDecimalDigits);
  it(
    'accepts hexadecimal digits regardless of letter case',
    testHexadecimalDigits,
  );
}

describe('createDigitValidator', defineCreateDigitValidatorTests);
