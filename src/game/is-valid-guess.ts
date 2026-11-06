import { createDigitValidator } from './create-digit-validator.js';

export function isValidGuess(
  guess: string,
  length: number,
  base: number,
): boolean {
  const normalizedGuess = guess.toLowerCase();
  const guessDigits = normalizedGuess.split('');
  const isValidDigit = createDigitValidator(base);

  const hasCorrectLength = normalizedGuess.length === length;
  const hasOnlyValidDigits = guessDigits.every(isValidDigit);
  const hasUniqueDigits = new Set(guessDigits).size === guessDigits.length;

  return hasCorrectLength && hasOnlyValidDigits && hasUniqueDigits;
}
