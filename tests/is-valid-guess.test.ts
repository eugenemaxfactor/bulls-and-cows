import { describe, expect, it } from 'vitest';

import { isValidGuess } from '../src/game/is-valid-guess.js';

function testValidGuesses(): void {
  expect(isValidGuess('01', 2, 2)).toBe(true);
  expect(isValidGuess('7012', 4, 8)).toBe(true);
  expect(isValidGuess('1234', 4, 10)).toBe(true);
  expect(isValidGuess('aF09', 4, 16)).toBe(true);
}

function testIncorrectLength(): void {
  expect(isValidGuess('123', 4, 10)).toBe(false);
  expect(isValidGuess('12345', 4, 10)).toBe(false);
}

function testInvalidDigit(): void {
  expect(isValidGuess('102', 3, 2)).toBe(false);
  expect(isValidGuess('1287', 4, 8)).toBe(false);
}

function testRepeatedDigits(): void {
  expect(isValidGuess('1123', 4, 10)).toBe(false);
}

function testRepeatedHexDigitsRegardlessOfCase(): void {
  expect(isValidGuess('aA12', 4, 16)).toBe(false);
}

function defineIsValidGuessTests(): void {
  it('accepts valid guesses in supported bases', testValidGuesses);
  it('rejects guesses with incorrect length', testIncorrectLength);
  it('rejects digits outside the selected base', testInvalidDigit);
  it('rejects repeated digits', testRepeatedDigits);
  it(
    'treats uppercase and lowercase hex digits as equal',
    testRepeatedHexDigitsRegardlessOfCase,
  );
}

describe('isValidGuess', defineIsValidGuessTests);
