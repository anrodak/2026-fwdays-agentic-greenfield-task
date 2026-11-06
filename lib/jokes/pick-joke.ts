// Joke of the day (FR-JOKES-01): one joke per UTC calendar date, walking the
// list in order and wrapping after the last. Framework-free (TC-PURE-01).

const DAY_MS = 86_400_000;

/** Whole UTC days since 1970-01-01; negative before 1970. */
export function utcDayIndex(date: Date): number {
  return Math.floor(date.getTime() / DAY_MS);
}

export function pickJoke(jokes: readonly string[], date: Date): string {
  if (jokes.length === 0) {
    throw new RangeError("pickJoke needs at least one joke");
  }
  const day = utcDayIndex(date);
  if (Number.isNaN(day)) {
    throw new RangeError("pickJoke needs a valid date");
  }
  // Non-negative modulo, so dates before 1970 still land in the list.
  return jokes[((day % jokes.length) + jokes.length) % jokes.length];
}
