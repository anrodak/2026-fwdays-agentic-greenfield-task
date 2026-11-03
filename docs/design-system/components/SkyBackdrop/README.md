# SkyBackdrop

One still frame of the animated background (FR-ANIM-01): the day or night gradient with clouds, rain or snow. In the app it is a single fixed canvas behind the page.

- Provide `mode` (`day` / `night`, from the selected place's sunrise and sunset, FR-ANIM-02), `condition` (`clear`, `cloud`, `rain`, `snow`), and an optional `seed`.
- `pointer-events: none`, `aria-hidden`, `z-sky` (FR-ANIM-04). Under `prefers-reduced-motion` only the gradient is drawn (FR-ANIM-03).
- Each gradient has light and dark versions, so text placed on the sky always reads with `sky-ink`.
- Map conditions from `weather_code`: 0–2 clear, 3 and 45–48 cloud, 51–67 and 80–82 rain, 71–77 and 85–86 snow, 95–99 rain.
