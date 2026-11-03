# Weather Explorer design system

> **Source.** Mirrors the «Weather Explorer» design system artifact
> (<https://claude.ai/artifact/JZ1zVJx9nEAXrwZ9RdMKkX>, first version of
> 2026-11-03), built from `docs/requirements.md` and `docs/product-brief.md`.
> This is the brand book BC-BRAND-01 refers to; live component previews stay in
> the artifact.
>
> **Files.** The design-system files named below (`tokens.json`,
> `components/…`) live in `docs/design-system/`: `tokens.json` is the token
> source of truth, `components/<Name>/README.md` holds each component's
> guidelines, and `components/bundle.js` · `bundle.css` · `index.d.ts` are the
> React 18 reference implementations (`window.Wx`), never imported by the app.
> The tokens are wired into `app/globals.css` and the fonts are loaded in
> `app/layout.tsx`.

Weather Explorer helps a person pick the better day for a weekend trip: a 7-day forecast, a comfort score per day, a map and a side-by-side weekend comparison. The interface is Ukrainian-first and calm. Surfaces stay on shadcn/ui's neutral greys so the animated sky behind them carries the colour. One blue (`primary`) marks actions and focus, and amber (`sun`) marks the weekend. Token names match shadcn/ui's CSS variables, so `tokens.json` maps one-to-one onto `app/globals.css`.

## Content fundamentals

### Voice

- Calm and practical. Say what the weather is and what it means for the trip. No exclamation marks, no superlatives, no emoji (BC-BRAND-01, FR-COMFORT-03). Country flags in search suggestions are the only pictographs.
- Buttons are verbs in the infinitive: «Порівняти вихідні», «Спробувати ще раз», «Зробити активним». Sentences address the person as «ви», lowercase.
- Sentence case everywhere. Ukrainian weekday and month names are lowercase inside text («субота, 7 листопада»); a label that starts with one capitalises only the first letter («Сб, 7 лист.»).
- Ukrainian runs about 15% longer than English. Let labels wrap to a second line; never truncate a city name.

### Formats

| What | Write | Not |
| --- | --- | --- |
| Temperature | `+11°`, `−3°`, `0°`: explicit plus, true minus (U+2212), no «C» on cards | `11°C`, `-3°` |
| Wind | `4 м/с`: whole metres per second, no-break space. Request `wind_speed_unit=ms` from Open-Meteo | `14 km/h` |
| Precipitation probability | `40%` | `40 відсотків` |
| Comfort score | `74`; `74 з 100` where it stands alone | `74/100`, `74 бали` |
| Time | `07:02`, 24-hour, local time of the selected place | `7:02 AM` |
| Day, short | `Сб, 7 лист.` · weekdays `Пн Вт Ср Чт Пт Сб Нд` | `Sat`, `СБ` |
| Day, long | `субота, 7 листопада` | `7.11.2026` |
| Range | `сб 7 – нд 8 листопада`: en dash with spaces | `7-8.11` |
| Coordinates (FR-MAP-03) | `49,84° пн. ш., 24,03° сх. д.`: two decimals, decimal comma; `пд. ш.` / `зх. д.` for south and west | `49.8397, 24.0297` |
| Quotes and apostrophe | «Львів» · `пʼятниця`, `мʼякий` with U+02BC | "Львів", `п'ятниця` |

### Fixed copy

| Where | Copy |
| --- | --- |
| Empty state title (FR-SHELL-03) | Погода на вихідні |
| Empty state line | Знайдіть місто, щоб побачити прогноз на 7 днів і оцінку комфорту для поїздки. |
| Search placeholder · hidden label | Місто, наприклад Львів · Пошук міста |
| Geolocation button (FR-SEARCH-06) | Моє місцезнаходження. A denial or failure shows nothing. |
| No results (FR-SEARCH-05) | Нічого не знайдено |
| Forecast failed | Не вдалося завантажити прогноз. · Перевірте зʼєднання і спробуйте ще раз. · button «Спробувати ще раз» |
| Pin · unpin · limit (FR-COMPARE-01) | Закріпити · Відкріпити Львів · Можна закріпити до 3 міст |
| Compare (FR-COMPARE-02/03) | Порівняти вихідні · Зробити активним · Активне |
| Clicked map point (FR-MAP-03) | Обрана точка · 49,84° пн. ш., 24,03° сх. д. |
| Sunrise and sunset (FR-FORECAST-04) | Схід 07:02 · Захід 16:46 |
| Theme indicator (FR-SHELL-01) | Світла тема · Темна тема |
| Weekend outside the 7-day window | Прогноз на ці вихідні ще недоступний. |

### Comfort rationale (FR-COMFORT-03)

Write one sentence of at most 80 characters, ending with a full stop. Name the one or two factors that moved the score most. Tier words, used in badges and screen-reader labels: `сприятливо` (70–100), `помірно` (40–69), `несприятливо` (0–39).

- Сухо й сонячно, вітер слабкий, але вечори холодні.
- Тепло, але ймовірність дощу висока.
- Майже напевно буде дощ, вітер поривчастий.
- Not: «Супер погода для прогулянки!» (exclamation mark, superlative).

### Footer jokes (FR-JOKES-01)

One or two short sentences about weather or forecasts. Keep the humour gentle: no exclamation marks, no emoji, no people, no politics. Example: «Синоптики обіцяли сонце. Сонце нічого не обіцяло.»

## Visual foundations

### Colour

- Surfaces are neutral: `background`, `card`, `popover`, `muted`. Text is `foreground` or `muted-foreground`. Never tint a surface with a brand colour.
- `primary` is for the primary button, the pressed «Порівняти вихідні» toggle, the active city chip, the map marker, the chart's now-line and the focus `ring`. Use at most one primary button per view.
- `accent` / `accent-foreground` keep their shadcn meaning: a hover surface and the highlighted suggestion. They are not the brand colour.
- `sun`, `sun-soft` and `sun-ink` mean «weekend» and nothing else. Use them for WeekendSummary, the Saturday and Sunday DayCards, and the day rows of CompareTable. `sun` is a fill only; amber text is always `sun-ink`.
- Comfort has three tiers (FR-COMFORT-04): `comfort-good` from 70, `comfort-fair` 40–69, `comfort-poor` below 40, each with its `on-…` text token. Every badge shows the number and a 1–3 bar meter, so the tier never depends on hue alone. `comfort-good` is the only strong fill, dark in light theme and bright in dark theme, so the good days stand out.
- The sky gradients are `sky-day-*` and `sky-night-*`, with `rain`, `snow` and `cloud` particles (FR-ANIM-01). Day or night comes from the selected place's sunrise and sunset (FR-ANIM-02), independent of the UI theme. Each sky therefore has a light-theme and a dark-theme version that stays in that theme's lightness band. Text placed straight on the sky (top bar, empty-state title, footer) uses `sky-ink` and `sky-ink-muted`. Everything else sits on an opaque `card`.
- Chart colours: the line is `chart-temp`, gridlines are `chart-grid`, the current hour is `chart-now`.
- `destructive` stays only for shadcn primitives. Errors are calm: StatusMessage on `muted`, never red.
- Contrast (NFR-A11Y-02): every text pair named in a token's usage note holds 4.5:1 in both themes. `input`, `ring`, `chart-temp` and `chart-now` hold 3:1 on `card`. There are two deliberate departures from shadcn neutral: `muted-foreground` is darker, and `ring` is solid `primary` instead of grey at 50%.

### Theme

The theme follows `prefers-color-scheme`, with no toggle and no cookie (BC-PRIVACY-03). The top-bar indicator is CSS-only: render both labels and hide one with `dark:`, so server and client markup match and nothing logs a hydration warning (NFR-OBS-01). In Tailwind 4, delete the `@custom-variant dark (&:is(.dark *));` line that shadcn adds, so `dark:` follows the media query.

### Type

- `display` (Geologica) carries `score`, `title`, `temp` and `wordmark`: the large numbers and the single headline.
- `sans` (Onest) carries everything else. Both faces cover Cyrillic. Load them with `next/font/google`: `subsets: ['latin', 'cyrillic']`, variable weight, `display: 'swap'`, exposed as `--font-geologica` and `--font-onest`.
- `mono` is the system stack, for `coord` only.
- Temperatures, percentages, wind, times and scores set `font-variant-numeric: tabular-nums`.
- The search field uses `input` (16px).

### Layout (FR-SHELL-02)

- Below `bp-md`, one column in this order: top bar, search, pinned chips, WeekendSummary, seven DayCards, hourly chart with sunrise/sunset, map, footer. The gutter is `space-4`.
- From `bp-md`, two columns: WeekendSummary and DayCards on the left; chart and map on the right. Gutter and gap are `space-6`.
- From `bp-lg`, three columns: (1) WeekendSummary and DayCards, (2) chart and sunrise/sunset, (3) map. The gutter is `space-8`, the gap `space-6`, and the grid grows up to `content-max`.
- Search and chips span every column above the grid. The compare view replaces columns 1–2; the map stays.
- Empty state: the title, the line and the search panel (`card`, `radius-xl`) sit in one centred column, `space-12` below the top bar. Only the sky, top bar and footer surround it.
- Tailwind: use `md:` (768) and `xl:` (1280). Tailwind's `lg:` is 1024 and matches no breakpoint here.

### Shape and elevation

- `radius-lg` for cards, `radius-xl` for WeekendSummary and the empty-state panel, `radius-md` for controls, `radius-sm` for badges, `radius-full` for chips and the marker.
- Cards are opaque: no glass, no `backdrop-filter`. Lift them with `shadow-card` (a 1px ring in dark). The suggestions list, map popup and chart tooltip use `shadow-popover`.
- Every interactive element shows `focus-ring` on `:focus-visible` (NFR-A11Y-01). Replace shadcn's `focus-visible:ring-ring/50` with `focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none`.

### Motion (FR-ANIM-01–04)

- The sky is one fixed, full-viewport `<canvas>` at `z-sky`, with `pointer-events: none` and `aria-hidden`. Draw at most 120 rain streaks (60 below `bp-md`), 80 snowflakes, and 3–4 clouds that take 90–150 s to cross. Pause while `document.hidden`. Crossfade day and night over 600 ms when the location changes.
- Under `prefers-reduced-motion: reduce`, draw only the static gradient: no particles, no drifting clouds, no crossfade (FR-ANIM-03).
- UI transitions: 150 ms ease-out for hover and press colours, a 120 ms fade for the suggestions list. Nothing bounces or slides.

### Map (FR-MAP-01–05, TC-MAP-01)

- Show tiles exactly as OSM serves them; never CSS-filter them for dark mode. The frame (radius, shadow) follows the theme.
- Marker: a `L.divIcon` 16px `primary` dot with a 3px `card` ring. It avoids Leaflet's default PNG marker, whose image paths break under bundlers.
- Popup: the city name in `heading`; for a clicked point, the rounded coordinates in `coord`.
- Attribution stays bottom-right, readable and linked: «© OpenStreetMap contributors».
- Height is `map-h-sm` below `bp-md` and `map-h` above. The SSR skeleton (`muted`, the same height and radius) holds the space (FR-MAP-05).
- Leaflet controls sit at z-index 1000, so the top bar uses `z-header` and the suggestions use `z-popover`.

### Chart (FR-FORECAST-03/04)

- Recharts `LineChart` with 48 hourly points. The `chart-temp` line is 2px, with no dots except one at «зараз». Gridlines are horizontal only, in `chart-grid`. Ticks use `caption` in `muted-foreground`: one every 6 hours (`00 06 12 18`) and one every 5° (`+5°`). At each midnight, add a vertical `input` rule and a day label (`ср, 4`).
- Tooltip on `popover`: `ср, 4 лист. · 14:00 · +10°`.
- Give screen readers a one-sentence summary: «Найтепліше +10° (ср, 14:00), найхолодніше +2° (чт, 06:00).»
- Sunrise and sunset sit under the chart in `caption`.

## Iconography

The app uses lucide-react, the shadcn default, with `strokeWidth={1.75}`. Sizes: `icon-xs` inline with captions, `icon-sm` in buttons, `icon-md` in messages, `icon-lg` for the condition in DayCard. Icons take `currentColor` and are never tinted; colour is reserved for the weekend and comfort. An icon beside a text label is `aria-hidden`. A condition icon without visible text gets the Ukrainian label from the table below. A flag emoji in suggestions is `aria-hidden`, and the country is always written out, because Windows shows two letters instead of a flag.

| Open-Meteo `weather_code` | lucide icon (day / night) | Label |
| --- | --- | --- |
| 0 | `Sun` / `Moon` | Ясно |
| 1 | `CloudSun` / `CloudMoon` | Переважно ясно |
| 2 | `CloudSun` / `CloudMoon` | Мінлива хмарність |
| 3 | `Cloud` | Хмарно |
| 45, 48 | `CloudFog` | Туман |
| 51, 53, 55 | `CloudDrizzle` | Мряка |
| 56, 57 | `CloudDrizzle` | Крижана мряка |
| 61, 63, 65 | `CloudRain` | Дощ |
| 66, 67 | `CloudRain` | Крижаний дощ |
| 80, 81, 82 | `CloudRain` | Злива |
| 71, 73, 75, 77 | `CloudSnow` | Сніг |
| 85, 86 | `CloudSnow` | Снігопад |
| 95 | `CloudLightning` | Гроза |
| 96, 99 | `CloudLightning` | Гроза з градом |

Daily cards always use the day icon. Night icons are only for the current condition after sunset.

## Using this system

- Components in `components/bundle.js` (`window.Wx`, React 18) are reference implementations. In the Next.js app, rebuild them from shadcn/ui primitives with the same structure, tokens and copy.
- The helpers `Wx.formatTemp`, `Wx.formatWind`, `Wx.formatPrecip`, `Wx.formatCoords`, `Wx.comfortTier` and `Wx.weatherFromCode` define the formats above. Their app versions live in `lib/` (framework-free, TC-PURE-01), and all copy lives in `lib/i18n/uk.ts` (NFR-I18N-01).
- Wire the tokens into Tailwind 4 in `app/globals.css`:

```css
@import "tailwindcss";

:root { /* light values from tokens.json, e.g. --primary: #1f4e8c; */ }
@media (prefers-color-scheme: dark) {
  :root { /* dark values */ color-scheme: dark; }
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-sun-soft: var(--sun-soft);
  --color-sun-ink: var(--sun-ink);
  --color-comfort-good: var(--comfort-good);
  --color-on-comfort-good: var(--on-comfort-good);
  /* …one line per colour token */
  --font-sans: var(--font-onest);
  --font-display: var(--font-geologica);
  --radius-lg: 10px;
}
```
