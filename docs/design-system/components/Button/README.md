# Button

The one button shape: `primary` for the single main action in a view, `secondary` for everything else, `ghost` inside tables and chip rows.

- Provide `children` (an infinitive verb: «Спробувати ще раз»), optionally `icon` (a glyph name), `size` (`md` default, `sm`, `icon`), and the usual button props.
- `size="icon"` hides the label visually but keeps it as the accessible name: always pass the full phrase («Закріпити Львів»).
- A toggle (the compare switch) passes `aria-pressed`; pressed paints `primary`.
- Do: one `primary` per view. Don't: tint a button with `sun` or a comfort colour.
- In the app: shadcn `Button` with `variant` default/outline/ghost and the `focus-ring` override from the README.
