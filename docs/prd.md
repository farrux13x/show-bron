# Product Requirements Document (PRD)

## Project Overview

Timetrack is a single-page scheduling console for barbers. It focuses on fast, one-hand appointment booking, a clear daily plan, and a reusable weekly schedule template. The app runs entirely in the browser and stores data locally (no backend yet). It supports multiple languages (uz/ru/en) and light/dark themes.

## Core Features (Implemented)

- Today view: See today’s bookings, update status (arrived/cancelled/no-show), call client, or edit quickly.
- Calendar (day/week): Grid view with time slots; disabled slots respect working hours and breaks. Click to create or edit a booking.
- Appointment management: Create, edit, delete bookings; conflict detection warns on overlaps.
- Weekly schedule template: Set working days, start/end hours, and break windows; choose default service duration.
- Services catalog: Add/remove services and set prices; used for appointment defaults and stats.
- Client history: Client list inferred from appointments (phone as identity); profile shows visit history and quick rebook.
- Statistics dashboard: KPIs and charts for customers/revenue (week/month), plus revenue by service and avg ticket.
- Localization & theme: uz/ru/en language selection and light/dark themes persisted in localStorage.
- Demo data: Seed sample appointments from Today view.

## User Roles & Flows

### Primary user

- Barber / single-user operator
  - Onboarding flow: Set weekly schedule template -> add services/prices -> start booking.
  - Daily flow: Open Today -> update statuses -> call/edit -> add bookings quickly.
  - Planning flow: Use Calendar to view week/day -> click slot -> add appointment.
  - Client management: View client list -> open profile -> rebook.
  - Business insight: Check Statistics for revenue and service performance.
  - Preferences: Update language/theme; manage services and schedule.

### Secondary user (implicit)

- Client is not a system user; client data is captured via booking form and used for history.

## Future Potential (Gaps / Next)

- Authentication & multi-user accounts (currently single-user, local-only).
- Backend sync & multi-device support (currently localStorage).
- Reminders/notifications (labels exist; no implementation).
- Schedule exceptions UI (store supports exceptions but no UI to manage them).
- Export/backup (labels mention CSV; no export flow).
- Payments & receipts (price stored per appointment but no billing).
- Recurring bookings & search.
- Client profiles with notes/marketing opt-ins.
