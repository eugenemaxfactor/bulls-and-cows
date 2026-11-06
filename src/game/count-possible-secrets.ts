const resultsCache = new Map<string, number>();

export function countPossibleSecrets(length: number, base: number): number {
  const cacheKey = `${length}-${base}`;
  const cachedResult = resultsCache.get(cacheKey);

  if (cachedResult !== undefined) {
    return cachedResult;
  }

  if (length === 0) {
    return 1;
  }

  const result = base * countPossibleSecrets(length - 1, base - 1);
  resultsCache.set(cacheKey, result);

  return result;
}
