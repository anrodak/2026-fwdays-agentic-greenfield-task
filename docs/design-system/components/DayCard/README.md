# DayCard

One day of the 7-day forecast as a single row (FR-FORECAST-02): weekday and date, condition icon, high and low, precipitation probability, wind, comfort badge.

- Provide `weekday` («Сб») or `today`, `date` («7 лист.»), `longLabel` for the article's accessible name («Субота, 7 листопада»), `code` (Open-Meteo `weather_code`), `hi`, `lo`, `precip`, `wind` (m/s), `comfort`, and `weekend` for Saturday and Sunday.
- Weekend days sit on `sun-soft` with the weekday in `sun-ink`; nothing else changes.
- The row shape works in every layout: the single mobile column and the narrow first desktop column. Stack seven of them with `space-3` between.
- Don't: horizontal scrolling strips of day tiles, coloured condition icons, °C after each number.
