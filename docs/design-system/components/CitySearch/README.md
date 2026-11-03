# CitySearch

The single city field with debounced suggestions (FR-SEARCH-01/02) and the opt-in geolocation button (FR-SEARCH-06).

- Provide `query`, `suggestions` (`name`, `admin`, `country`, optional `flag`), `active` (highlighted index), and `empty` when the geocoder returned nothing.
- ARIA combobox pattern: the input owns `role="combobox"`, `aria-expanded`, `aria-controls` and `aria-activedescendant`; the list is `role="listbox"`. Arrow keys move `active`, Enter picks it (with a single suggestion, Enter picks that one, FR-SEARCH-04), Escape closes.
- No results: «Нічого не знайдено» in `caption` under the field, announced through `role="status"`. No toast (FR-SEARCH-05).
- The typed prefix is bold in each name. The flag is `aria-hidden`; region and country are always written out.
- «Моє місцезнаходження» asks for location only when pressed; a denial or failure leaves the field as it was, with no message.
- The list sits at `z-popover` so it covers the map's controls.
