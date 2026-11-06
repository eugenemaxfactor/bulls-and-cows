import { describe, expect, it } from 'vitest';

import { generateSecret } from '../src/game/generate-secret.js';

function createDeterministicRandom(values: number[]): () => number {
  let index = 0;

  function getNextValue(): number {
    const value = values[index] ?? 0;
    index += 1;

    return value;
  }

  return getNextValue;
}

function testPredictableDecimalSecret(): void {
  const random = createDeterministicRandom([0, 0.1, 0.2, 0.3]);

  expect(generateSecret(4, 10, random)).toBe('0123');
}

function testRepeatedDigitsAreSkipped(): void {
  const random = createDeterministicRandom([0.1, 0.1, 0.2, 0.3]);

  expect(generateSecret(3, 10, random)).toBe('123');
}

function testHexadecimalDigits(): void {
  const random = createDeterministicRandom([0.625, 0.6875, 0.75]);

  expect(generateSecret(3, 16, random)).toBe('abc');
}

function defineGenerateSecretTests(): void {
  it('creates a predictable decimal secret', testPredictableDecimalSecret);
  it('skips repeated digits', testRepeatedDigitsAreSkipped);
  it('uses letters for hexadecimal digits', testHexadecimalDigits);
}

describe('generateSecret', defineGenerateSecretTests);
