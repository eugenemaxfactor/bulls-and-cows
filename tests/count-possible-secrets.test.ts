import { describe, expect, it } from 'vitest';

import { countPossibleSecrets } from '../src/game/count-possible-secrets.js';

function testBinarySecrets(): void {
  expect(countPossibleSecrets(2, 2)).toBe(2);
}

function testOctalSecrets(): void {
  expect(countPossibleSecrets(3, 8)).toBe(336);
}

function testDecimalSecrets(): void {
  expect(countPossibleSecrets(4, 10)).toBe(5040);
}

function defineCountPossibleSecretsTests(): void {
  it('counts two-digit binary secrets', testBinarySecrets);
  it('counts three-digit octal secrets', testOctalSecrets);
  it('counts four-digit decimal secrets', testDecimalSecrets);
}

describe('countPossibleSecrets', defineCountPossibleSecretsTests);
