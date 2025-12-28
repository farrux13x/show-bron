import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';
import { addMinutes, fromISO, isSameDay, startOfDay, toISO } from '@/shared/lib/date';

export type AppointmentStatus = 'booked' | 'arrived' | 'cancelled' | 'no-show';

export type Appointment = {
  id: string;
  clientName: string;
  phone: string;
  service: string;
  durationMinutes: number;
  notes: string;
  status: AppointmentStatus;
  startAt: string;
  price?: number;
};

export type AppointmentInput = Omit<Appointment, 'id' | 'status'> & {
  id?: string;
  status?: AppointmentStatus;
};

const STORAGE_KEY = 'timetrack.appointments.v1';

const createId = () => Math.random().toString(36).slice(2, 10);

const sortByStart = (a: Appointment, b: Appointment) =>
  new Date(a.startAt).getTime() - new Date(b.startAt).getTime();

export const useAppointmentsStore = defineStore('appointments', {
  state: () => ({
    appointments: loadFromStorage<Appointment[]>(STORAGE_KEY, [])
  }),
  getters: {
    byDate: (state) => (date: Date) =>
      state.appointments
        .filter((item) => isSameDay(fromISO(item.startAt), date))
        .sort(sortByStart),
    byId: (state) => (id: string) => state.appointments.find((item) => item.id === id),
    upcomingToday: (state) => {
      const today = startOfDay(new Date());
      return state.appointments
        .filter((item) => isSameDay(fromISO(item.startAt), today))
        .sort(sortByStart);
    }
  },
  actions: {
    add(input: AppointmentInput) {
      const appointment: Appointment = {
        id: input.id ?? createId(),
        clientName: input.clientName,
        phone: input.phone,
        service: input.service,
        durationMinutes: input.durationMinutes,
        notes: input.notes,
        startAt: input.startAt,
        status: input.status ?? 'booked',
        price: input.price
      };

      this.appointments.push(appointment);
      this.persist();
      return appointment;
    },
    update(id: string, patch: Partial<Appointment>) {
      const index = this.appointments.findIndex((item) => item.id === id);
      if (index === -1) {
        return;
      }
      this.appointments[index] = { ...this.appointments[index], ...patch };
      this.persist();
    },
    remove(id: string) {
      this.appointments = this.appointments.filter((item) => item.id !== id);
      this.persist();
    },
    setStatus(id: string, status: AppointmentStatus) {
      this.update(id, { status });
    },
    hasConflict(candidate: AppointmentInput): boolean {
      const start = new Date(candidate.startAt);
      const end = addMinutes(start, candidate.durationMinutes);
      return this.appointments.some((item) => {
        if (item.id === candidate.id) {
          return false;
        }
        const itemStart = fromISO(item.startAt);
        const itemEnd = addMinutes(itemStart, item.durationMinutes);
        const overlap = start < itemEnd && end > itemStart;
        return overlap;
      });
    },
    persist() {
      saveToStorage(STORAGE_KEY, this.appointments);
    },
    seedDemo() {
      if (this.appointments.length > 0) {
        return;
      }
      const now = new Date();
      const sample = [
        {
          clientName: 'Omar Reed',
          phone: '555-2011',
          service: 'Haircut',
          durationMinutes: 30,
          notes: 'Fade + lineup',
          startAt: toISO(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0)),
          status: 'booked' as const
        },
        {
          clientName: 'Luis Carter',
          phone: '555-3388',
          service: 'Beard',
          durationMinutes: 30,
          notes: 'Short trim',
          startAt: toISO(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30)),
          status: 'arrived' as const
        }
      ];

      sample.forEach((item) => this.add(item));
    }
  }
});
