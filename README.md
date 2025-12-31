# Timetrack Barber

MVP barber scheduling app (Vue 3 + Vite + TypeScript). Built for fast, one-hand booking, clear day plans, and a weekly schedule template.

## Stack
- Vue 3 (Composition API)
- Vite
- TypeScript
- Pinia
- Vue Router
- Tailwind CSS

## Features (M1 + M2)
- Weekly schedule template with default hours + breaks
- Day/week calendar view with time grid and slot selection
- Fast add/edit appointment flow with conflict warning
- Today list with status updates (arrived/cancelled/no-show)
- Client history + one-tap rebook
- LocalStorage persistence

## Routes
- `/today` Today list
- `/calendar` Calendar (day/week)
- `/appointments/new` Add appointment
- `/appointments/:id` Edit appointment
- `/clients` Client list
- `/clients/:id` Client profile
- `/schedule-setup` Weekly schedule
- `/settings` Settings

## Scripts
- `npm run dev` start dev server
- `npm run build` production build
- `npm run preview` preview build
- `npm run typecheck` TypeScript check

## Quick start
```bash
npm install
npm run dev
```

## Notes
- Data is stored in browser LocalStorage for the MVP.
- Calendar grid respects schedule hours + break windows.

