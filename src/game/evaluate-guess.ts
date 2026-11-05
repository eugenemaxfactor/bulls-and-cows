export interface GuessResult {
  bulls: number;
  cows: number;
}

export function evaluateGuess(secret: string, guess: string): GuessResult {
  throw new Error(
    `evaluateGuess is not implemented for ${secret} and ${guess}`,
  );
}
