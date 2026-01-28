import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';
import {
  addMinutes,
  fromISO,
  isSameDay,
  startOfDay,
  toISO,
} from '@/shared/lib/date';

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
    appointments: loadFromStorage<Appointment[]>(STORAGE_KEY, []),
  }),
  getters: {
    byDate: (state) => (date: Date) =>
      state.appointments
        .filter((item) => isSameDay(fromISO(item.startAt), date))
        .sort(sortByStart),
    byId: (state) => (id: string) =>
      state.appointments.find((item) => item.id === id),
    upcomingToday: (state) => {
      const today = startOfDay(new Date());
      return state.appointments
        .filter((item) => isSameDay(fromISO(item.startAt), today))
        .sort(sortByStart);
    },
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
        price: input.price,
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
      const dayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const makeDate = (
        base: Date,
        dayOffset: number,
        hour: number,
        minute: number,
      ) =>
        toISO(
          new Date(
            base.getFullYear(),
            base.getMonth(),
            base.getDate() + dayOffset,
            hour,
            minute,
          ),
        );
      const sample: AppointmentInput[] = [
        {
          clientName: 'Ava Stone',
          phone: '555-1001',
          service: 'Haircut',
          durationMinutes: 30,
          notes: 'Skin fade',
          startAt: makeDate(monthStart, 1, 9, 0),
          status: 'arrived',
          price: 50,
        },
        {
          clientName: 'Noah Finch',
          phone: '555-1002',
          service: 'Beard',
          durationMinutes: 30,
          notes: 'Shape up',
          startAt: makeDate(monthStart, 5, 11, 30),
          status: 'arrived',
          price: 30,
        },
        {
          clientName: 'Mia Clarke',
          phone: '555-1003',
          service: 'Haircut + Beard',
          durationMinutes: 60,
          notes: 'Full service',
          startAt: makeDate(monthStart, 9, 13, 0),
          status: 'arrived',
          price: 70,
        },
        {
          clientName: 'Eli Carter',
          phone: '555-1004',
          service: 'Kids',
          durationMinutes: 30,
          notes: 'First haircut',
          startAt: makeDate(monthStart, 13, 10, 0),
          status: 'booked',
          price: 25,
        },
        {
          clientName: 'Zoe Price',
          phone: '555-1005',
          service: 'Haircut',
          durationMinutes: 45,
          notes: 'Textured crop',
          startAt: makeDate(monthStart, 17, 14, 0),
          status: 'arrived',
          price: 50,
        },
        {
          clientName: 'Liam Woods',
          phone: '555-1006',
          service: 'Beard',
          durationMinutes: 30,
          notes: 'Hot towel',
          startAt: makeDate(monthStart, 21, 16, 30),
          status: 'cancelled',
          price: 30,
        },
        {
          clientName: 'Aria Miles',
          phone: '555-1007',
          service: 'Haircut + Beard',
          durationMinutes: 60,
          notes: 'Beard blend',
          startAt: makeDate(monthStart, 25, 18, 0),
          status: 'arrived',
          price: 70,
        },
        {
          clientName: 'Omar Reed',
          phone: '555-2011',
          service: 'Haircut',
          durationMinutes: 30,
          notes: 'Fade + lineup',
          startAt: makeDate(dayStart, -6, 9, 30),
          status: 'arrived',
          price: 50,
        },
        {
          clientName: 'Luis Carter',
          phone: '555-3388',
          service: 'Beard',
          durationMinutes: 30,
          notes: 'Short trim',
          startAt: makeDate(dayStart, -4, 12, 0),
          status: 'arrived',
          price: 30,
        },
        {
          clientName: 'Nora Diaz',
          phone: '555-1208',
          service: 'Kids',
          durationMinutes: 30,
          notes: '',
          startAt: makeDate(dayStart, -2, 15, 0),
          status: 'no-show',
          price: 25,
        },
        {
          clientName: 'Wyatt Hale',
          phone: '555-1209',
          service: 'Haircut + Beard',
          durationMinutes: 60,
          notes: 'Scissor finish',
          startAt: makeDate(dayStart, -1, 11, 0),
          status: 'arrived',
          price: 70,
        },
        {
          clientName: 'Luna Scott',
          phone: '555-1210',
          service: 'Haircut',
          durationMinutes: 30,
          notes: 'Skin fade',
          startAt: makeDate(dayStart, 0, 10, 30),
          status: 'booked',
          price: 50,
        },
        {
          clientName: 'Mason Hill',
          phone: '555-1211',
          service: 'Beard',
          durationMinutes: 30,
          notes: 'Clean line',
          startAt: makeDate(dayStart, 1, 13, 30),
          status: 'arrived',
          price: 30,
        },
        {
          clientName: 'Ruby James',
          phone: '555-1212',
          service: 'Kids',
          durationMinutes: 30,
          notes: 'Trim only',
          startAt: makeDate(dayStart, 2, 9, 0),
          status: 'booked',
          price: 25,
        },
        {
          clientName: 'Owen Brooks',
          phone: '555-1213',
          service: 'Haircut',
          durationMinutes: 45,
          notes: 'Low fade',
          startAt: makeDate(dayStart, 4, 16, 0),
          status: 'arrived',
          price: 50,
        },
      ];

      sample.forEach((item) => this.add(item));
    },
  },
});
