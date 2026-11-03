# WeekendSummary

The highlighted weekend block at the top of the forecast (FR-COMFORT-05): the Saturday + Sunday average score, the tier word, the rationale and both days in brief.

- Provide `score` (the rounded average), `range` («сб 7 – нд 8 листопада»), `city`, `rationale` (one sentence ≤ 80 characters, FR-COMFORT-03), and `days` with `weekday`, `hi`, `lo`, `comfort`.
- `unavailable` renders the calm fallback «Прогноз на ці вихідні ще недоступний.» for when the upcoming weekend falls outside the forecast window.
- It is the only `radius-xl` block in the forecast and the only one on `sun-soft` besides weekend DayCards.
