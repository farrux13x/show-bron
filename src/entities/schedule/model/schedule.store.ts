import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';

export type WeekdayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type ScheduleDay = {
  enabled: boolean;
  start: string;
  end: string;
  breakStart: string;
  breakEnd: string;
};

export type ScheduleTemplate = {
  days: Record<WeekdayKey, ScheduleDay>;
  defaultServiceMinutes: number;
};

export type ScheduleException = {
  id: string;
  date: string;
  type: 'off' | 'custom' | 'block';
  start?: string;
  end?: string;
  note?: string;
};

const STORAGE_KEY = 'timetrack.schedule.v1';

const defaultTemplate: ScheduleTemplate = {
  defaultServiceMinutes: 30,
  days: {
    mon: {
      enabled: true,
      start: '10:00',
      end: '20:00',
      breakStart: '14:00',
      breakEnd: '15:00',
    },
    tue: {
      enabled: true,
      start: '10:00',
      end: '20:00',
      breakStart: '14:00',
      breakEnd: '15:00',
    },
    wed: {
      enabled: true,
      start: '10:00',
      end: '20:00',
      breakStart: '14:00',
      breakEnd: '15:00',
    },
    thu: {
      enabled: true,
      start: '10:00',
      end: '20:00',
      breakStart: '14:00',
      breakEnd: '15:00',
    },
    fri: {
      enabled: true,
      start: '10:00',
      end: '20:00',
      breakStart: '14:00',
      breakEnd: '15:00',
    },
    sat: {
      enabled: true,
      start: '10:00',
      end: '20:00',
      breakStart: '14:00',
      breakEnd: '15:00',
    },
    sun: {
      enabled: false,
      start: '10:00',
      end: '20:00',
      breakStart: '14:00',
      breakEnd: '15:00',
    },
  },
};

const weekdayMap: WeekdayKey[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

const getWeekdayKey = (date: Date): WeekdayKey =>
  weekdayMap[date.getDay()] ?? 'mon';

const createId = () => Math.random().toString(36).slice(2, 10);

export const useScheduleStore = defineStore('schedule', {
  state: () => {
    const saved = loadFromStorage<{
      template: ScheduleTemplate;
      exceptions: ScheduleException[];
    }>(STORAGE_KEY, { template: defaultTemplate, exceptions: [] });

    return {
      template: saved.template ?? defaultTemplate,
      exceptions: saved.exceptions ?? [],
    };
  },
  getters: {
    defaultServiceMinutes: (state) => state.template.defaultServiceMinutes,
    dayTemplate: (state) => (key: WeekdayKey) => state.template.days[key],
    dayForDate: (state) => (date: Date) =>
      state.template.days[getWeekdayKey(date)],
  },
  actions: {
    updateDay(key: WeekdayKey, patch: Partial<ScheduleDay>) {
      this.template.days[key] = { ...this.template.days[key], ...patch };
      this.persist();
    },
    setDefaultServiceMinutes(minutes: number) {
      this.template.defaultServiceMinutes = minutes;
      this.persist();
    },
    addException(exception: Omit<ScheduleException, 'id'>) {
      this.exceptions.push({ ...exception, id: createId() });
      this.persist();
    },
    removeException(id: string) {
      this.exceptions = this.exceptions.filter((item) => item.id !== id);
      this.persist();
    },
    persist() {
      saveToStorage(STORAGE_KEY, {
        template: this.template,
        exceptions: this.exceptions,
      });
    },
  },
});
