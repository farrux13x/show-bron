# 2026-02-08 styles-catalog design

## Summary
Add a static “Styles Catalog” page that lists haircut styles with images, name, and short description. The catalog is reachable via a button in Settings (not added to global nav). Data is static for now and can later be swapped to API.

## Goals
- Provide a visual catalog of haircut styles.
- Keep UI consistent with existing card-based layout.
- Make the page accessible via Settings.
- Keep implementation simple (static data, no search/filters).

## Non-goals
- Search, filters, or favorites.
- Admin CRUD for styles.
- Backend/API integration.

## Architecture
- **Route**: `/catalog` with lazy import and route name `StylesCatalogPage`.
- **Page**: `src/pages/catalog/StylesCatalogPage.vue` for layout and i18n title/subtitle.
- **Feature**: `src/features/styles-catalog/StylesCatalogGrid.vue` renders the grid.
- **Card**: `src/features/style-card/StyleCard.vue` renders a single style.
- **Data model**: `src/entities/style/model/styles.ts` exports static array with `id`, `name`, `description`, `imageUrl`.
- **Entry point**: Settings page adds a button linking to `/catalog`.

## Data Flow
- Page imports static styles list.
- Page passes list to grid as props.
- Grid maps to StyleCard components.
- Card displays image + name + description. Use `loading="lazy"` for images.

## UI Details
- Grid: `grid-cols-1` (mobile), `sm:grid-cols-2`, `lg:grid-cols-3`, `xl:grid-cols-4`, `gap-4`.
- Card: rounded container, top image with fixed aspect ratio (e.g., `aspect-[4/3]`), text below.
- Page header: label + title + subtitle (i18n).
- Settings: add a muted button to open catalog.

## Error Handling
- If an image fails, card still shows text; image container uses neutral background.

## Testing
Manual checks:
- `/catalog` loads and shows 12 cards.
- Images load or degrade gracefully.
- Settings button navigates to `/catalog`.
- Grid responsive on mobile/desktop.

## Future Work
- Add search/filter categories.
- Admin-managed styles.
- Replace static data with API.
