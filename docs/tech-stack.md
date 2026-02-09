# Tech Stack

## Core Stack

- Vue 3 (Composition API, <script setup>)
- Vite (build tool)
- TypeScript
- Pinia (state management)
- Vue Router (routing)
- Tailwind CSS (styling)
- vue-i18n (localization)
- PostHog (analytics)

## Architecture

- Feature-Sliced Design (FSD)-style structure:
  - src/app (shell, router, global styles)
  - src/pages (route-level UI)
  - src/widgets (layout)
  - src/features (appointment form flow)
  - src/entities (domain models/stores)
  - src/shared (utilities, i18n, theme)

## Key Libraries / Services

- State: Pinia stores for appointments, services, schedule.
- Routing: Vue Router with page components under src/pages.
- i18n: vue-i18n with persisted locale and date localization.
- Analytics: PostHog initialized on router load.
- Storage: Browser localStorage via shared storage helper.

## Conventions & Patterns

- Composition API + <script setup> everywhere.
- TypeScript with tsc --noEmit typecheck script.
- Local-only persistence (localStorage) for all domain data.
- App-level theme via `dark` class on the document element.
- Date utilities centralized in src/shared/lib/date.ts.
- Currency formatting uses ru-RU formatting and labels prices as “so'm”.

## UI Layering Rules

- `src/shared/ui` only for reusable, domain-agnostic UI primitives (Button, Input, Select, Card wrappers).
- `src/features/**` for domain-specific UI and behavior (settings cards, service flows, statistics blocks).
- `src/widgets/**` for page composition/layout blocks used by multiple pages (shell, header, footer, nav containers).
- If a component has settings-specific text/logic/events, keep it under `features/settings/**`, not `shared/ui`.
- Promote from `features` to `shared/ui` only after it is reused across multiple domains without business coupling.

## Common Mistakes To Avoid

- Do not hardcode domain UI blocks directly inside `src/pages/**` when they belong to a business feature.
- Anti-pattern: page-level inline markup for repeated feature cards/items that differ only by text/path/data.
- FSD-compliant approach: move that block into `src/features/**` (or `src/widgets/**` for layout-level composition) and render via props/data mapping from the page.
- `src/pages/**` should primarily orchestrate composition, not own reusable feature markup.
