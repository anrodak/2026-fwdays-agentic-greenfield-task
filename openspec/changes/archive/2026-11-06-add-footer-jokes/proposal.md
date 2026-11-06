# Proposal

## Why

FR-JOKES-01 asks for a footer with deterministic Ukrainian weather-themed jokes, served without external APIs or tracking. It depends on nothing else in the product: no location, no forecast, no app shell. That makes it the smallest end-to-end slice for exercising the spec → design → tasks → apply → verify loop before the parallel waves start.

## What Changes

- Add a local list of calm Ukrainian weather jokes in `lib/`. Every joke follows the DESIGN.md content rules: one or two sentences, no exclamation marks, no emoji, `ʼ` (U+02BC) for the apostrophe, «» for quotes.
- Add a pure, framework-free function that picks one joke deterministically from a UTC calendar date (TC-PURE-01). The same date always gives the same joke, and consecutive dates walk through the list.
- Render the joke of the day in a minimal `<footer>` in `app/layout.tsx`, using a cached Server Component. It ships no client JavaScript, makes no network requests and sets no cookies or storage (BC-PRIVACY-01/03).
- Add Vitest as the minimal unit-test runner, with an `npm test` script, to verify the pure function and the content rules (TC-STACK-05). The later `dev-toolchain` change extends this setup rather than replacing it.
- Out of scope: the data credits in the footer (BC-BRAND-02), the sky backdrop behind the footer and the full `SiteFooter` layout. These belong to `app-shell`, which will absorb this footer.

## Capabilities

### New Capabilities
- `footer-jokes`: Which joke the footer shows, how it is chosen, what jokes may contain, and the privacy and runtime guarantees around them (FR-JOKES-01).

### Modified Capabilities

None.

## Impact

- **New code:**
  - `lib/jokes/` holds the joke list, the picker and their tests.
  - `components/footer-joke.tsx` is a new server component.
- **Changed code:** `app/layout.tsx` adds the footer below the page content.
- **Dependencies:** `vitest` (dev only), plus an `npm test` script in `package.json`. No runtime dependencies are added.
- **Config:** a `vitest.config.mts` with a Node environment, scoped to `lib/**/*.test.ts`.
- **Cache Components:** `next.config.ts` has `cacheComponents: true`. Reading the current date during prerender would fail the build, so the date is read inside a `"use cache"` scope with an explicit `cacheLife` (see design.md).
- **Other systems:** no APIs, data stores or environment variables are involved.
