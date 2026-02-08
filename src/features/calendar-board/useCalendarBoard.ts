import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  useAppointmentsStore,
  type Appointment,
} from '@/entities/appointment/model/appointments.store';
import { useScheduleStore } from '@/entities/schedule/model/schedule.store';
import {
  formatTime,
  getWeekDays,
  isSameDay,
  startOfDay,
  toDateKey,
} from '@/shared/lib/date';
import { getDateLocale } from '@/shared/i18n';
import { translateService } from '@/shared/i18n/labels';

type ViewMode = 'day' | 'week';

type TimeSlot = {
  minutes: number;
  label: string;
  isHour: boolean;
};

export function useCalendarBoard() {
  const router = useRouter();
  const appointmentsStore = useAppointmentsStore();
  const scheduleStore = useScheduleStore();
  const { t, locale } = useI18n();

  const viewMode = ref<ViewMode>('week');
  const selectedDate = ref(startOfDay(new Date()));

  const weekDays = computed(() => getWeekDays(selectedDate.value));
  const visibleDays = computed(() =>
    viewMode.value === 'day' ? [selectedDate.value] : weekDays.value,
  );

  const dateLocale = computed(() => getDateLocale(locale.value));
  const todayDate = computed(() => new Date().getDate());

  const monthLabel = computed(() =>
    new Intl.DateTimeFormat(dateLocale.value, { month: 'long' }).format(
      selectedDate.value,
    ),
  );

  const weekRange = computed(() => {
    const days = weekDays.value;
    if (days.length === 0) {
      return '';
    }
    const start = days[0];
    const end = days[days.length - 1];
    const formatter = new Intl.DateTimeFormat(dateLocale.value, {
      weekday: 'short',
      day: 'numeric',
    });
    return `${formatter.format(start)} - ${formatter.format(end)}`;
  });

  const dayLabel = (date: Date) =>
    new Intl.DateTimeFormat(dateLocale.value, { weekday: 'short' }).format(
      date,
    );

  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours ?? 0) * 60 + (minutes ?? 0);
  };

  const scheduleRange = computed(() => {
    let start = 8 * 60;
    let end = 20 * 60;
    let found = false;

    weekDays.value.forEach((day) => {
      const template = scheduleStore.dayForDate(day);
      if (!template.enabled) {
        return;
      }
      const dayStart = toMinutes(template.start);
      const dayEnd = toMinutes(template.end);
      start = Math.min(start, dayStart);
      end = Math.max(end, dayEnd);
      found = true;
    });

    if (!found) {
      return { start: 8 * 60, end: 18 * 60 };
    }

    return { start, end };
  });

  const slotInterval = 30;

  const timeSlots = computed<TimeSlot[]>(() => {
    const localeValue = locale.value;
    const slots: TimeSlot[] = [];
    const { start, end } = scheduleRange.value;
    for (let minutes = start; minutes < end; minutes += slotInterval) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const slotDate = new Date(2000, 0, 1, hours, mins);
      slots.push({
        minutes,
        label: formatTime(slotDate, localeValue),
        isHour: mins === 0,
      });
    }
    return slots;
  });

  const gridStyle = computed(() => ({
    gridTemplateColumns: `72px repeat(${visibleDays.value.length}, minmax(0, 1fr))`,
  }));

  const isSelectedDay = (date: Date) => isSameDay(date, selectedDate.value);

  const isSlotDisabled = (date: Date, minutes: number) => {
    const template = scheduleStore.dayForDate(date);
    if (!template.enabled) {
      return true;
    }
    const start = toMinutes(template.start);
    const end = toMinutes(template.end);
    const breakStart = toMinutes(template.breakStart);
    const breakEnd = toMinutes(template.breakEnd);

    if (minutes < start || minutes >= end) {
      return true;
    }

    if (minutes >= breakStart && minutes < breakEnd) {
      return true;
    }

    return false;
  };

  const getSlotDate = (day: Date, minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      hours,
      mins,
    );
  };

  const appointmentLookup = computed(() => {
    const map = new Map<string, Appointment>();
    appointmentsStore.appointments.forEach((appointment) => {
      const date = new Date(appointment.startAt);
      const minutes = date.getHours() * 60 + date.getMinutes();
      map.set(`${toDateKey(date)}-${minutes}`, appointment);
    });
    return map;
  });

  const getAppointmentAtSlot = (day: Date, minutes: number) =>
    appointmentLookup.value.get(`${toDateKey(day)}-${minutes}`);

  const getCellClasses = (day: Date, minutes: number) => {
    const classes: string[] = [];
    if (isSlotDisabled(day, minutes)) {
      classes.push('day-cell-disabled');
    }
    if (isSelectedDay(day)) {
      classes.push('day-cell-selected');
    }
    return classes.join(' ');
  };

  const selectDay = (day: Date) => {
    selectedDate.value = startOfDay(day);
  };

  const handleCellClick = (day: Date, minutes: number) => {
    const appointment = getAppointmentAtSlot(day, minutes);
    if (appointment) {
      router.push(`/appointments/${appointment.id}`);
      return;
    }

    const date = getSlotDate(day, minutes);
    router.push({
      path: '/appointments/new',
      query: {
        date: date.toISOString(),
      },
    });
  };

  const goPrev = () => {
    const date = new Date(selectedDate.value);
    date.setDate(date.getDate() + (viewMode.value === 'day' ? -1 : -7));
    selectedDate.value = startOfDay(date);
  };

  const goNext = () => {
    const date = new Date(selectedDate.value);
    date.setDate(date.getDate() + (viewMode.value === 'day' ? 1 : 7));
    selectedDate.value = startOfDay(date);
  };

  const goToday = () => {
    selectedDate.value = startOfDay(new Date());
  };

  return {
    dayLabel,
    getAppointmentAtSlot,
    getCellClasses,
    goNext,
    goPrev,
    goToday,
    gridStyle,
    handleCellClick,
    isSelectedDay,
    isSlotDisabled,
    monthLabel,
    t,
    timeSlots,
    todayDate,
    translateService,
    viewMode,
    visibleDays,
    selectDay,
    weekRange,
  };
}
