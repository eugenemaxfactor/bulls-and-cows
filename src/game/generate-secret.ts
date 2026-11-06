export type RandomSource = () => number;

export function generateSecret(
  length: number,
  base: number,
  random: RandomSource = Math.random,
): string {
  throw new Error(
    `generateSecret is not implemented for ${length}, ${base}, ${random}`,
  );
}
