# WeatherIcon

The glyphs used across the system, drawn on lucide's 24px grid with a 1.75 stroke so previews match the app, which imports the same icons from lucide-react.

- Provide `name`, `size` (14, 16, 20 or 32: the `icon-*` tokens) and `label` when the icon stands without visible text; otherwise it is `aria-hidden`.
- `Wx.weatherFromCode(code, night)` returns `{ icon, label }` following the README's weather-code table.
- Icons take `currentColor`; don't colour condition icons.
