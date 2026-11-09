const DIGITS = '0123456789abcdef';

export function createDigitValidator(base: number): (char: string) => boolean {
  const availableDigits = DIGITS.slice(0, base);

  function isValidDigit(char: string): boolean {
    return availableDigits.includes(char.toLowerCase());
  }

  return isValidDigit;
}
