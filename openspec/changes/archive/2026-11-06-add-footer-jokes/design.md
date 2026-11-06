# Design

## Context

- The app is still the create-next-app scaffold: `app/layout.tsx`, `app/page.tsx`, and the design tokens in `app/globals.css`. There is no `lib/`, no component folder and no test runner yet.
- `next.config.ts` enables `cacheComponents`. The local Next.js 16 docs (`node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`) say that `new Date()` during prerender fails the build. They also say that `instant = false` does not lift that restriction. Inside a `"use cache"` scope with an explicit `cacheLife`, reading the current time is allowed (`04-functions/cacheLife.md`).
- DESIGN.md › Footer jokes and `components/SiteFooter/README.md` fix the voice of the jokes and say that they come from a local list in `lib/`. Text placed directly on the sky uses `sky-ink-muted`.
- The fallow PostToolUse hook reports unused files and exports after every edit. A new file without a consumer is flagged until something wires it in.

## Goals / Non-Goals

**Goals:**
- Keep the date-to-joke rule a pure, unit-tested function that has no Next.js or React imports (TC-PURE-01).
- Serve the joke as part of the prerendered shell, with no client JavaScript and no request-time work.
- Introduce the smallest test setup that the later `dev-toolchain` change can extend.

**Non-Goals:**
- No `SiteFooter` with data credits (BC-BRAND-02), no sky layer and no responsive footer layout. Those belong to `app-shell`.
- No `lib/i18n/` structure. That belongs to `i18n-formats`.
- No E2E or Playwright coverage. `dev-toolchain` adds that later.

## Decisions

### 1. The joke is chosen by the UTC day index
The joke is `jokes[mod(floor(utcMidnight(date) / 86_400_000), jokes.length)]`, where `mod` always returns a non-negative result, so dates before 1970 work too. UTC makes the joke the same for every visitor and lets the server decide it without knowing anything about the visitor.

Alternatives:
- **Random choice.** Not deterministic.
- **A seed from the active location.** This depends on `location-state` and breaks independence.
- **The visitor's local date.** This needs the client and risks a hydration mismatch around midnight.

### 2. The picker is a pure function that receives the date
`lib/jokes/pick-joke.ts` exports `pickJoke(jokes, date)` and `utcDayIndex(date)`. The function never calls `Date.now()` itself, so tests pass fixed dates. It has no framework imports (TC-PURE-01).

### 3. The joke is rendered by a cached Server Component
`components/footer-joke.tsx` is an async Server Component. It contains `"use cache"` and `cacheLife('hours')`, reads `new Date()` and renders `pickJoke(JOKES, now)`. The joke becomes part of the static shell and is revalidated hourly, so it moves to the next joke within about an hour after UTC midnight.

Alternatives:
- **`connection()` with `<Suspense>`.** This turns the layout's footer into request-time work, which costs TTFB (NFR-PERF-01) for no benefit.
- **A Client Component.** It ships JavaScript and risks hydration warnings (NFR-OBS-01).
- **`cacheLife('days')`.** It could lag up to a day behind the date.

### 4. Jokes live in `lib/jokes/uk.ts`, apart from UI strings
The jokes are content, not interface chrome. `JOKES` is a `readonly string[]` constant. NFR-I18N-01 covers UI strings in `lib/i18n/uk.ts`, which does not exist yet. The footer adds no other UI string. When `i18n-formats` lands, it may re-export the list without changing this capability.

### 5. The content rules are enforced by tests
`lib/jokes/jokes.test.ts` checks every joke against the spec's content rules:
- at most 120 characters, and one or two sentences, counted by terminal `.`, `?` or `…`;
- no `!`;
- no emoji, checked with `\p{Extended_Pictographic}`;
- no ASCII `'` and no `"`;
- at least 14 distinct entries.

"About weather, no people or politics" is left to review.

### 6. Vitest is set up minimally
- `vitest` goes into devDependencies, with `"test": "vitest run"`.
- `vitest.config.mts` uses `environment: 'node'` and `include: ['lib/**/*.test.ts']`. The `.mts` extension is there because `package.json` has no `"type": "module"`, and Vite warns when a `.ts` config uses ESM syntax.

TC-STACK-05 names Vitest for `lib/`, and NFR-DX-01 already expects `npm test`. `node:test` was considered and rejected because it would be replaced again by `dev-toolchain`.

### 7. The markup is a `<footer>` in the root layout
In `app/layout.tsx`, after `{children}`, add `<footer className="mt-auto px-4 py-8 text-center"><FooterJoke /></footer>`. The joke is a `<p className="type-body text-sky-ink-muted">`. A top-level `<footer>` is the content-info landmark, and the existing `flex flex-col` body pins it to the bottom.

## Risks / Trade-offs

- [After UTC midnight the old joke can be served for up to about an hour (stale-while-revalidate)] → Accepted. The spec states this tolerance.
- [`app/layout.tsx` is shared with the future `app-shell` change] → The footer is one component and one line in the layout. `app-shell` moves `<FooterJoke />` into `SiteFooter`.
- [The fallow hook flags `lib/jokes/*` until the component imports them] → The tasks wire the component and the layout in the same group as the lib code. The hook should be clean when each group ends. If fallow does not treat Vitest files as entry points, the tests still import the picker, so exports used only by tests need checking during apply.
- [`dev-toolchain` will add Playwright and other settings to the Vitest setup] → It extends `vitest.config.mts` instead of replacing it.
- [Whether a joke is funny, or avoids people and politics, can't be machine-checked] → Human review in the PR, with CodeRabbit as a second reader.

## Migration Plan

Additive only. To roll back, remove the `<footer>` line from `app/layout.tsx` and delete `lib/jokes/` and `components/footer-joke.tsx`.

## Open Questions

- The exact joke texts are written during apply and reviewed in the PR. They don't change the specs or the approach.
