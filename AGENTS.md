<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design system

UI work follows [DESIGN.md](DESIGN.md) (BC-BRAND-01): copy, formats, colour, type, layout and motion rules. Tokens live in `docs/design-system/tokens.json` and are wired into `app/globals.css`; use the token utilities (`bg-card`, `text-sun-ink`, `type-heading`, `shadow-card`, `h-control-lg`) instead of raw colours and sizes. Component guidelines: `docs/design-system/components/<Name>/README.md`.
