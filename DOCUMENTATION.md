# Timetrack Barber - Project Documentation

## Overview
Timetrack Barber is an MVP barber scheduling console focused on fast, one-hand booking, clear daily plans, and a reusable weekly schedule template. It is a single-page app built with Vue 3 and stores all data in the browser.

## Tech Stack
- Vue 3 (Composition API)
- Vite
- TypeScript
- Pinia
- Vue Router
- Tailwind CSS
- vue-i18n
- PostHog (analytics)

## Project Structure
- `src/app`: app shell, router, and global styles.
- `src/pages`: route-level pages (today, calendar, clients, etc.).
- `src/features`: feature flows (appointment form).
- `src/entities`: domain state and models (appointments, schedule, services, clients).
- `src/widgets`: layout components (AppShell).
- `src/shared`: shared utilities, UI, i18n, and theme handling.
- `src/composables`: cross-cutting hooks (PostHog).

## State and Persistence
All data is stored in browser LocalStorage via `src/shared/lib/storage.ts`.

LocalStorage keys:
- `timetrack.appointments.v1`: appointment list.
- `timetrack.schedule.v1`: weekly schedule template and exceptions.
- `timetrack.services.v1`: services catalog.
- `timetrack.locale`: language preference.
- `timetrack.theme`: theme preference.

### Pinia Stores
Appointments (`src/entities/appointment/model/appointments.store.ts`)
- Getters: `byDate`, `byId`, `upcomingToday`.
- Actions: `add`, `update`, `remove`, `setStatus`, `hasConflict`, `seedDemo`.

Schedule (`src/entities/schedule/model/schedule.store.ts`)
- Weekly template with start/end and break windows.
- Actions: `updateDay`, `setDefaultServiceMinutes`, `addException`, `removeException`.

Services (`src/entities/service/model/services.store.ts`)
- Default service list plus custom additions.
- Actions: `addService`, `updateService`, `removeService`, lookup by name.

Clients (`src/entities/client/model/clients.ts`)
- Client summaries are derived from appointments by phone number.
- Includes last visit, last service, and total visits.

## Pages and Routes
- `/` and `/today`: Today list with status updates, quick edit, and call actions.
- `/calendar`: Day or week calendar grid with time slots and quick add/edit.
- `/appointments/new`: New appointment form (prefills from query params).
- `/appointments/:id`: Edit or delete an existing appointment.
- `/clients`: Client list built from appointment history, with one-tap rebook.
- `/clients/:id`: Client profile and appointment history.
- `/schedule-setup`: Weekly schedule template and default service duration.
- `/settings`: Language, theme, and shortcuts to services and statistics.
- `/services`: Manage services and prices.
- `/statistics`: KPIs and charts for week or month.

## Core Behaviors
- Calendar slots are generated from the weekly schedule template; break times and off days are disabled.
- Appointment conflicts are detected with time overlap checks in the appointments store.
- Statistics only count appointments with status `arrived`.
- Client identity is based on phone number, so multiple visits are grouped by phone.
- Demo data can be seeded from the Today page.

## Internationalization and Theme
- Supported locales: `uz`, `ru`, `en` (language and date formatting).
- Theme: `light` or `dark`, stored in LocalStorage and applied to the document.

## Analytics
- PostHog is initialized in the router (`src/app/router/index.ts`) via `usePostHog`.
