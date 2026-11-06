import { describe, expect, it } from 'vitest';

import { evaluateGuess } from '../src/game/evaluate-guess.js';

function testCompleteMatch(): void {
  expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
}

function testAllDigitsInDifferentPositions(): void {
  expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
}

function testMixedResult(): void {
  expect(evaluateGuess('1234', '1562')).toEqual({ bulls: 1, cows: 1 });
}

function testNoMatchingDigits(): void {
  expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
}

function testHexDigitsRegardlessOfCase(): void {
  expect(evaluateGuess('aB09', 'Ab90')).toEqual({ bulls: 2, cows: 2 });
}

function defineEvaluateGuessTests(): void {
  it('counts a complete match as four bulls', testCompleteMatch);
  it(
    'counts digits in different positions as cows',
    testAllDigitsInDifferentPositions,
  );
  it('counts bulls and cows in the same guess', testMixedResult);
  it('returns zero bulls and cows when no digits match', testNoMatchingDigits);
  it(
    'compares hexadecimal letters without case sensitivity',
    testHexDigitsRegardlessOfCase,
  );
}

describe('evaluateGuess', defineEvaluateGuessTests);
