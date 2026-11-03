# CompareTable

Saturday and Sunday for up to three pinned cities side by side (FR-COMPARE-02): high/low, precipitation probability, comfort.

- Provide `cities` (each with `id`, `name`, `sat` and `sun` holding `hi`, `lo`, `precip`, `comfort`), `activeId`, and `satLabel` / `sunLabel` («Субота, 7 листопада»).
- One column per city. Each header holds the city name and «Зробити активним», or «Активне» for the current one (FR-COMPARE-03).
- Headers are sticky inside the table's own scroll box (`max-height: 70vh`), so they stay visible while the table scrolls; on phones the box also scrolls sideways.
- Day rows use `sun-soft` / `sun-ink`, the weekend colours.
