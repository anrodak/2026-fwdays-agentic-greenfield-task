# CityChips

The row of pinned cities above the forecast (FR-COMPARE-01) with the compare toggle (FR-COMPARE-02).

- Provide `cities` (`id`, `name`), `activeId`, `max` (3), `comparing`, and `pinName` when the active city can still be pinned.
- A chip is two buttons: the name (makes it active, `aria-current` when it is) and the close button «Відкріпити Львів».
- When three are pinned, the counter becomes «Можна закріпити до 3 міст» and the pin button disappears.
- «Порівняти вихідні» is a pressed/unpressed toggle and is disabled below two pinned cities.
- Pinned cities are client state only: no cookies (BC-PRIVACY-03).
