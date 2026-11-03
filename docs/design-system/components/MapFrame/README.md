# MapFrame

The frame, marker, popup and attribution around the Leaflet map (FR-MAP-01–05). In the preview, the tiles are a flat stand-in; the app shows real OSM tiles, unfiltered.

- Provide `name` for a searched city, or «Обрана точка» plus `coords` for a clicked point (FR-MAP-03), and `loading` for the SSR skeleton (FR-MAP-05).
- Marker: `L.divIcon({ className: 'wx-marker', iconSize: [16, 16] })`, a `primary` dot with a `card` ring.
- Popup: the name in `heading`, coordinates in `coord`.
- Attribution «© OpenStreetMap contributors» stays bottom-right and linked (FR-MAP-04, TC-MAP-01).
- Height `map-h` (`map-h-sm` below `bp-md`); the skeleton has the same footprint.
