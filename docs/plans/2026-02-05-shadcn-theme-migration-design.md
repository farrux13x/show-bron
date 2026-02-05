# 2026-02-05 shadcn-theme-migration design

## Summary
Migrate the app's theming foundation to shadcn-vue standard tokens (new-york, baseColor neutral) and class-based dark mode. Keep existing UI classes intact for now to avoid layout regressions while enabling future refactors to shadcn components.

## Goals
- Replace data-theme attribute usage with class-based dark mode.
- Align theme tokens with shadcn defaults using CSS variables.
- Keep current UI structure and custom classes working.
- Make all custom UI colors token-driven for consistent light/dark behavior.

## Non-goals
- Full UI refactor to shadcn components.
- Changing layouts or interaction behavior.
- Introducing new components beyond existing usage.

## Approach Options
1. Minimal shadcn foundation (recommended): update tokens, switch dark mode class, map custom classes to tokens.
2. Token-only swap: update tokens only, leave custom classes unchanged.
3. Hybrid foundation: update tokens and adjust only the most-used classes.

Chosen: Option 1 for minimal regression risk and clean future migration path.

## Architecture
- Theme source of truth: `src/app/styles/tailwind.css` defines `:root` and `.dark` variables per shadcn defaults.
- Theme toggling: `src/shared/theme.ts` toggles `dark` class on `document.documentElement` and persists in localStorage.
- Default theme: light (no class on `html`).
- Existing classnames (`.btn`, `.card`, `.input`, `.label`, etc.) remain but switch to shadcn token utilities.

## Data Flow
- `initTheme()` reads localStorage and applies the theme class on app startup in `src/main.ts`.
- `setTheme()` updates storage and applies the class on user selection in settings.
- Settings page binds the theme ref to the UI controls with no new state store.

## Error Handling
- Invalid theme values are rejected via existing guards.
- DOM access happens after app start, consistent with current usage.

## Testing
- Manual smoke check:
  - Default load is light mode (no `dark` class on `html`).
  - Toggling theme adds/removes `dark` class and persists on reload.
  - Visual check for cards, inputs, buttons in both modes.

## Future Work
- Replace custom classes with shadcn components (`Button`, `Card`, `Input`, etc.).
- Optional: add storage event listener for cross-tab theme sync.
