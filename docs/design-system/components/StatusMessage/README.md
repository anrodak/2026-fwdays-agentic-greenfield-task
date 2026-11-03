# StatusMessage

A calm inline message for failures and limits, placed where the missing content would be.

- Provide `title` (one short sentence), optional `children` (what to do), `icon` (default `alert`), and `actionLabel` («Спробувати ще раз») for a retry.
- `role="status"` so it is announced politely. Never a toast, never red, never a blank area or a generic 500.
- Geolocation denial is the one failure with no message (FR-SEARCH-06).
