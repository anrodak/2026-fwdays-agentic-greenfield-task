# TopBar

The header (FR-SHELL-01): the product name, the live clock (FR-CLOCK-01) and the theme indicator. It sits directly on the sky, so its text uses `sky-ink` and `sky-ink-muted`.

- Provide `time` («14:05»), `dateTime`, and `clockLabel` for the hidden prefix («Місцевий час»).
- The clock updates once a minute, renders only on the client (a placeholder on the server avoids hydration warnings) and is not a live region.
- The theme indicator renders both labels; CSS shows the one matching `prefers-color-scheme`.
- No logo mark exists; the name is set in `wordmark`.
