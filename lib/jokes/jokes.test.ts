import { describe, expect, it } from "vitest";
import { JOKES } from "./uk";

// A sentence ends with . ? or … followed by a space or the end of the joke.
const SENTENCE_END = /[.?…](?=\s|$)/g;

describe("JOKES", () => {
  it("holds at least 14 distinct jokes, so none repeats within two weeks", () => {
    expect(JOKES.length).toBeGreaterThanOrEqual(14);
    expect(new Set(JOKES).size).toBe(JOKES.length);
  });

  it.each(JOKES)("follows the voice rules: %s", (joke) => {
    expect(joke.length).toBeLessThanOrEqual(120);
    expect(joke).toMatch(/[.?…]$/);
    const sentences = joke.match(SENTENCE_END)?.length ?? 0;
    expect(sentences).toBeGreaterThanOrEqual(1);
    expect(sentences).toBeLessThanOrEqual(2);
    expect(joke).not.toContain("!");
    expect(joke).not.toMatch(/\p{Extended_Pictographic}/u);
    // Apostrophe is ʼ (U+02BC) and quotes are «», never the ASCII forms.
    expect(joke).not.toMatch(/['"]/);
  });

  it.each(JOKES)("is written in Ukrainian: %s", (joke) => {
    expect(joke).toMatch(/\p{Script=Cyrillic}/u);
    expect(joke).not.toMatch(/[ыэъёЫЭЪЁ]/);
  });
});
