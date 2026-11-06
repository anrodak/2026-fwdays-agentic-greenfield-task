import { describe, expect, it } from "vitest";
import { pickJoke, utcDayIndex } from "./pick-joke";

const DAY_MS = 86_400_000;
const JOKES: readonly string[] = ["a", "b", "c"];

describe("utcDayIndex", () => {
  it("counts whole UTC days since 1970-01-01", () => {
    expect(utcDayIndex(new Date("1970-01-01T00:00:00Z"))).toBe(0);
    expect(utcDayIndex(new Date("1970-01-02T23:59:59.999Z"))).toBe(1);
    expect(utcDayIndex(new Date("1969-12-31T12:00:00Z"))).toBe(-1);
  });
});

describe("pickJoke", () => {
  it("gives the same joke at any time of one UTC date", () => {
    const start = new Date("2026-11-07T00:00:00Z");
    const end = new Date("2026-11-07T23:59:59.999Z");
    expect(pickJoke(JOKES, start)).toBe(pickJoke(JOKES, end));
  });

  it("follows the UTC date, not the local one", () => {
    // 23:30 in New York on 7 November is already 8 November in UTC.
    const lateInNewYork = new Date("2026-11-07T23:30:00-05:00");
    expect(pickJoke(JOKES, lateInNewYork)).toBe(pickJoke(JOKES, new Date("2026-11-08T12:00:00Z")));
  });

  it("moves to the next joke on each following date", () => {
    const start = new Date("2026-11-07T12:00:00Z");
    const first = JOKES.indexOf(pickJoke(JOKES, start));
    for (let days = 1; days <= 5; days++) {
      const later = new Date(start.getTime() + days * DAY_MS);
      expect(pickJoke(JOKES, later)).toBe(JOKES[(first + days) % JOKES.length]);
    }
  });

  it("wraps from the last joke to the first", () => {
    expect(pickJoke(JOKES, new Date("1970-01-03T00:00:00Z"))).toBe("c");
    expect(pickJoke(JOKES, new Date("1970-01-04T00:00:00Z"))).toBe("a");
  });

  it("maps dates before 1970 to a joke in the list", () => {
    for (const iso of ["1969-12-31T00:00:00Z", "1900-02-28T08:00:00Z", "0001-01-01T00:00:00Z"]) {
      expect(JOKES).toContain(pickJoke(JOKES, new Date(iso)));
    }
  });

  it("throws a RangeError for an empty list", () => {
    expect(() => pickJoke([], new Date("2026-11-07T12:00:00Z"))).toThrow(RangeError);
  });

  it("throws a RangeError for an invalid date", () => {
    expect(() => pickJoke(JOKES, new Date("not a date"))).toThrow(RangeError);
  });
});
