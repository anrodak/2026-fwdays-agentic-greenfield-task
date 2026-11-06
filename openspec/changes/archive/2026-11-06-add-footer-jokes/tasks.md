# Tasks

## 1. Unit-test runner

- [x] 1.1 Add `vitest` to devDependencies and a `"test": "vitest run"` script in `package.json`. Vitest 5 needs `@types/node` 22 or later as a peer, so also raise `@types/node` from `^20` to `^22`, which matches the Node 22 runtime. Verify that `npx vitest --version` prints the installed version.
- [x] 1.2 Add `vitest.config.mts` with `environment: 'node'` and `include: ['lib/**/*.test.ts']`. Verify that `npx tsc --noEmit` passes and that `npx fallow` does not report the config as unused.

## 2. Joke picker and content (`lib/jokes/`, framework-free)

- [x] 2.1 Implement `utcDayIndex(date)` and `pickJoke(jokes, date)` in `lib/jokes/pick-joke.ts`, with no `next/*`, `react` or DOM imports. Verify with `lib/jokes/pick-joke.test.ts`:
  - two times on the same UTC date give the same joke;
  - consecutive dates give consecutive positions;
  - the list wraps after the last joke;
  - a date before 1970 still gives a joke from the list;
  - an empty list throws a `RangeError`.
- [x] 2.2 Write at least 14 jokes in `lib/jokes/uk.ts` as a `readonly string[]`, following the voice rules in DESIGN.md › Footer jokes. Verify with `lib/jokes/jokes.test.ts` that every joke:
  - is at most 120 characters and has one or two sentences;
  - has no `!`, no emoji (`\p{Extended_Pictographic}`), no ASCII `'` and no `"`;
  - and that the list has at least 14 distinct entries.

  Then confirm that `npm test` passes.

## 3. Footer rendering

- [x] 3.1 Create `components/footer-joke.tsx`, an async Server Component with `"use cache"` and `cacheLife('hours')` that renders `pickJoke(JOKES, new Date())` in `<p className="type-body text-sky-ink-muted">`. Verify that `npm run build` succeeds with no prerender error about the current time.
- [x] 3.2 Add `<footer className="mt-auto px-4 py-8 text-center"><FooterJoke /></footer>` after `{children}` in `app/layout.tsx`. Verify that `npm run lint` passes and that `npx fallow` exits 0, with no unused files or exports under `lib/jokes/` or `components/`.

## 4. Integration checks

- [x] 4.1 Run `npm run lint && npx tsc --noEmit && npm test && npm run build` on the change. Verify that everything passes in under 60 s (NFR-DX-01).
- [x] 4.2 Start the production server (`npm run start`) and check every spec scenario:
  - `curl -s localhost:3000` contains today's joke, which is the `pickJoke(JOKES, today)` result. This covers the JavaScript-disabled scenario.
  - In the browser, the footer is the content-info landmark and shows that joke.
  - The console has no warnings or errors.
  - The network panel shows no request for the joke, and no cookie or storage entry is created.

## Workflow follow-up

- The user reviews the planning artifacts before `/opsx:apply` starts.
- After implementation and review, archive with `/opsx:archive` so `openspec/specs/footer-jokes/spec.md` is created from the delta.
