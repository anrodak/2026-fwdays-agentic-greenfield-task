# HourlyChart

The next 48 hours of temperature (FR-FORECAST-03) with sunrise and sunset under it (FR-FORECAST-04). The bundle draws a static SVG so the styling can be reviewed; the app renders the same spec with Recharts.

- Provide `points` (48 × `{ hour, day, temp }`, starting at the current hour), `sunrise`, `sunset` («07:02»).
- Line `chart-temp` 2px; horizontal grid `chart-grid`; ticks every 5° and every 6 h in `caption`; a vertical `input` rule and a day label at midnight; the current hour as a dashed `chart-now` line and a dot.
- The SVG is `aria-hidden`; a visually hidden sentence gives the warmest and coldest hour.
- Recharts: `LineChart` › `CartesianGrid vertical={false}`, `Line type="monotone" dot={false} strokeWidth={2}`, `XAxis` ticks formatted `HH`, `YAxis` ticks formatted with `formatTemp`, `ReferenceLine` for now and midnights. Load it with `next/dynamic` so it stays out of the initial bundle (NFR-PERF-03).
