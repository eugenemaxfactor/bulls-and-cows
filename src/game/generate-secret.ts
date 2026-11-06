export type RandomSource = () => number;

export function generateSecret(
  length: number,
  base: number,
  random: RandomSource = Math.random,
): string {
  const digits = '0123456789abcdef';
  const availableDigits = digits.slice(0, base);
  let secret = '';

  while (secret.length < length) {
    const randomIndex = Math.floor(random() * base);
    const digit = availableDigits[randomIndex];

    if (!secret.includes(digit)) {
      secret += digit;
    }
  }

  return secret;
}
