# Data Model (Inferred)

> The app is fully local and persists data in localStorage. There is no backend schema yet; this is inferred from TypeScript types and stores.

## Appointment

Stored in: timetrack.appointments.v1

Fields:

- id (string)
- clientName (string)
- phone (string) - also used as client identity
- service (string) - service name
- durationMinutes (number)
- notes (string)
- status (enum: booked | arrived | cancelled | no-show)
- startAt (ISO string)
- price (number, optional)

## Service

Stored in: timetrack.services.v1

Fields:

- id (string)
- name (string)
- price (number)

## Schedule Template

Stored in: timetrack.schedule.v1

### ScheduleTemplate

- defaultServiceMinutes (number)
- days (record keyed by weekday)

### ScheduleDay

- enabled (boolean)
- start (string, HH:mm)
- end (string, HH:mm)
- breakStart (string, HH:mm)
- breakEnd (string, HH:mm)

### ScheduleException

- id (string)
- date (string, ISO or YYYY-MM-DD)
- type (off | custom | block)
- start (string, optional)
- end (string, optional)
- note (string, optional)

> Exceptions are supported in the store but not yet surfaced in UI.

## Client Summary (Derived)

Derived from appointments; not stored directly.

Fields:

- id = phone
- name
- phone
- lastVisit (ISO string)
- lastService (string)
- visits (number)

## User Preferences

Stored in:

- timetrack.locale -> uz | ru | en
- timetrack.theme -> light | dark
