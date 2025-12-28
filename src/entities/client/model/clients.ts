import type { Appointment } from '@/entities/appointment/model/appointments.store';
import { fromISO } from '@/shared/lib/date';

export type ClientSummary = {
  id: string;
  name: string;
  phone: string;
  lastVisit: string;
  lastService: string;
  visits: number;
};

export const buildClientSummaries = (appointments: Appointment[]): ClientSummary[] => {
  const map = new Map<string, ClientSummary>();

  appointments.forEach((appointment) => {
    const key = appointment.phone.trim();
    const existing = map.get(key);
    const lastVisit = appointment.startAt;
    const candidateDate = fromISO(lastVisit);

    if (!existing) {
      map.set(key, {
        id: key,
        name: appointment.clientName,
        phone: appointment.phone,
        lastVisit,
        lastService: appointment.service,
        visits: 1
      });
      return;
    }

    existing.visits += 1;
    const existingDate = fromISO(existing.lastVisit);
    if (candidateDate > existingDate) {
      existing.lastVisit = lastVisit;
      existing.lastService = appointment.service;
      existing.name = appointment.clientName;
    }
  });

  return Array.from(map.values()).sort((a, b) =>
    fromISO(b.lastVisit).getTime() - fromISO(a.lastVisit).getTime()
  );
};
