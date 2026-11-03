# ComfortBadge

Shows a 0–100 comfort score as a coloured badge with a 1–3 bar meter (FR-COMFORT-04): `comfort-good` from 70, `comfort-fair` 40–69, `comfort-poor` below 40.

- Provide `value` (0–100). `show`: `number` (default, in DayCard and CompareTable), `word` (tier word, beside the big weekend score), `both`. `size="lg"` for WeekendSummary.
- The badge is one `role="img"` with the label «Комфорт 74 з 100, сприятливо», so screen readers hear one phrase.
- The meter and number carry the tier; never show a badge as a bare coloured dot.
- Thresholds live in `lib/scoring` next to `comfortScore`; the badge only reads `comfortTier(value)`.
