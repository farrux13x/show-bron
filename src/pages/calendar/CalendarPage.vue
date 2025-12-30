<template>
  <section class="card relative overflow-hidden">
    <div class="border-b border-fog bg-white/80 px-6 py-5 sm:px-8">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-ember text-lg font-semibold text-white">
          {{ todayDate }}
        </div>
        <div class="min-w-[160px] flex-1">
          <div class="flex items-center gap-2">
            <h2 class="font-display text-2xl text-ink">{{ monthLabel }}</h2>
            <button class="icon-btn" type="button" @click="goToday" :aria-label="t('calendar.goToday')">
              <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 8l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-slate-500">{{ weekRange }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button
            class="icon-btn"
            :class="viewMode === 'day' ? 'icon-btn-active' : ''"
            type="button"
            @click="viewMode = 'day'"
            :aria-label="t('calendar.dayView')"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="3" />
              <path d="M7 2v4M17 2v4" stroke-linecap="round" />
              <path d="M3 10h18" stroke-linecap="round" />
            </svg>
          </button>
          <button
            class="icon-btn"
            :class="viewMode === 'week' ? 'icon-btn-active' : ''"
            type="button"
            @click="viewMode = 'week'"
            :aria-label="t('calendar.weekView')"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="3" />
              <path d="M8 4v16M16 4v16" />
            </svg>
          </button>
          <button class="icon-btn" type="button" @click="goPrev" :aria-label="t('calendar.previous')">
            <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 6l-4 4 4 4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button class="icon-btn" type="button" @click="goNext" :aria-label="t('calendar.next')">
            <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 6l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="calendar-scroll bg-white/70">
      <div class="calendar-header" :style="gridStyle">
        <div></div>
        <button
          v-for="day in visibleDays"
          :key="day.toISOString()"
          class="day-pill"
          type="button"
          :class="isSelectedDay(day) ? 'day-pill-active' : ''"
          @click="selectDay(day)"
        >
          <span class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ dayLabel(day) }}</span>
          <span class="day-date">{{ day.getDate() }}</span>
        </button>
      </div>

      <div class="calendar-grid" :style="gridStyle">
        <template v-for="slot in timeSlots" :key="slot.minutes">
          <div class="time-cell">
            <span v-if="slot.isHour">{{ slot.label }}</span>
          </div>
          <button
            v-for="day in visibleDays"
            :key="`${day.toISOString()}-${slot.minutes}`"
            class="day-cell"
            :class="getCellClasses(day, slot.minutes)"
            type="button"
            :disabled="isSlotDisabled(day, slot.minutes)"
            @click="handleCellClick(day, slot.minutes)"
          >
            <div v-if="getAppointmentAtSlot(day, slot.minutes)" class="appointment-pill">
              <p class="text-xs font-semibold text-ink">
                {{ getAppointmentAtSlot(day, slot.minutes)?.clientName }}
              </p>
              <p class="text-[11px] text-slate-600">
                {{ translateService(getAppointmentAtSlot(day, slot.minutes)?.service ?? '', t) }}
              </p>
            </div>
          </button>
        </template>
      </div>
    </div>

    <RouterLink
      to="/appointments/new"
      class="calendar-fab"
      :aria-label="t('calendar.addBooking')"
    >
      +
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppointmentsStore, type Appointment } from '@/entities/appointment/model/appointments.store';
import { useScheduleStore } from '@/entities/schedule/model/schedule.store';
import { formatTime, getWeekDays, isSameDay, startOfDay, toDateKey } from '@/shared/lib/date';
import { getDateLocale } from '@/shared/i18n';
import { translateService } from '@/shared/i18n/labels';

const router = useRouter();
const appointmentsStore = useAppointmentsStore();
const scheduleStore = useScheduleStore();
const { t, locale } = useI18n();

const viewMode = ref<'day' | 'week'>('week');
const selectedDate = ref(startOfDay(new Date()));

const weekDays = computed(() => getWeekDays(selectedDate.value));
const visibleDays = computed(() => (viewMode.value === 'day' ? [selectedDate.value] : weekDays.value));

const dateLocale = computed(() => getDateLocale(locale.value));
const todayDate = computed(() => new Date().getDate());

const monthLabel = computed(() =>
  new Intl.DateTimeFormat(dateLocale.value, { month: 'long' }).format(selectedDate.value)
);

const weekRange = computed(() => {
  const days = weekDays.value;
  if (days.length === 0) {
    return '';
  }
  const start = days[0];
  const end = days[days.length - 1];
  const formatter = new Intl.DateTimeFormat(dateLocale.value, { weekday: 'short', day: 'numeric' });
  return `${formatter.format(start)} - ${formatter.format(end)}`;
});

const dayLabel = (date: Date) =>
  new Intl.DateTimeFormat(dateLocale.value, { weekday: 'short' }).format(date);

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

const timeSlots = computed(() => {
  const localeValue = locale.value;
  const slots: { minutes: number; label: string; isHour: boolean }[] = [];
  const { start, end } = scheduleRange.value;
  for (let minutes = start; minutes < end; minutes += slotInterval) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const slotDate = new Date(2000, 0, 1, hours, mins);
    slots.push({
      minutes,
      label: formatTime(slotDate, localeValue),
      isHour: mins === 0
    });
  }
  return slots;
});

const gridStyle = computed(() => ({
  gridTemplateColumns: `72px repeat(${visibleDays.value.length}, minmax(0, 1fr))`
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
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), hours, mins);
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
      date: date.toISOString()
    }
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
</script>

<style scoped>
.calendar-scroll {
  overflow: auto;
}

.calendar-header {
  display: grid;
  min-width: 720px;
  border-bottom: 1px solid #e2e8f0;
  background: #ffffff;
}

.calendar-grid {
  display: grid;
  min-width: 720px;
  background: #ffffff;
}

.day-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 0 14px;
}

.day-date {
  display: inline-flex;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f172a;
  background: #ffffff;
}

.day-pill-active .day-date {
  background: #f97316;
  border-color: transparent;
  color: #ffffff;
}

.time-cell {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 8px 10px 0 0;
  font-size: 0.75rem;
  color: #64748b;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  min-height: 42px;
}

.day-cell {
  position: relative;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  min-height: 42px;
  padding: 6px;
  text-align: left;
  background: #ffffff;
  transition: background 0.2s ease;
}

.day-cell:hover {
  background: #fff7ed;
}

.day-cell-selected {
  background: #fff7ed;
}

.day-cell-disabled {
  background: repeating-linear-gradient(
    135deg,
    #f1f5f9,
    #f1f5f9 6px,
    #e2e8f0 6px,
    #e2e8f0 12px
  );
  color: #94a3b8;
}

.day-cell:disabled {
  cursor: not-allowed;
}

.appointment-pill {
  border-radius: 12px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  padding: 6px 8px;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  width: 34px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #0f172a;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  border-color: #fed7aa;
  color: #c2410c;
}

.icon-btn-active {
  background: #fff7ed;
  border-color: #f97316;
  color: #c2410c;
}

.calendar-fab {
  position: absolute;
  right: 24px;
  bottom: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 54px;
  border-radius: 999px;
  background: #f97316;
  color: #ffffff;
  font-size: 28px;
  box-shadow: 0 12px 28px -12px rgba(15, 23, 42, 0.35);
}
</style>
