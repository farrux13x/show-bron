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
- App-level theme via data-theme + body class toggles.
- Date utilities centralized in src/shared/lib/date.ts.
- Currency formatting uses ru-RU formatting and labels prices as “so'm”.
