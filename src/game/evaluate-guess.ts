export interface GuessResult {
  bulls: number;
  cows: number;
}

export function evaluateGuess(secret: string, guess: string): GuessResult {
  const normalizedSecret = secret.toLowerCase();
  const normalizedGuess = guess.toLowerCase();
  const secretDigits = normalizedSecret.split('');

  function isBull(digit: string, index: number): boolean {
    return digit === normalizedGuess[index];
  }

  function isCow(digit: string, index: number): boolean {
    const isInGuess = normalizedGuess.includes(digit);
    const isInDifferentPosition = digit !== normalizedGuess[index];

    return isInGuess && isInDifferentPosition;
  }

  const bulls = secretDigits.filter(isBull).length;
  const cows = secretDigits.filter(isCow).length;

  return { bulls, cows };
}
