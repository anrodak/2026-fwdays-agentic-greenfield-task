import { cacheLife } from "next/cache";
import { pickJoke } from "@/lib/jokes/pick-joke";
import { JOKES } from "@/lib/jokes/uk";

// Joke of the day (FR-JOKES-01). The cached scope makes reading the date legal
// under cacheComponents, so the joke ships in the static shell and refreshes hourly.
export async function FooterJoke() {
  "use cache";
  cacheLife("hours");
  return <p className="type-body text-sky-ink-muted">{pickJoke(JOKES, new Date())}</p>;
}
