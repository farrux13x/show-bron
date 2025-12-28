<template>
  <div class="space-y-6">
    <section class="card p-6 sm:p-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="label">Weekly template</p>
          <h2 class="font-display text-2xl">Set your default hours</h2>
        </div>
        <div class="rounded-2xl bg-orange-50 px-4 py-2 text-sm text-orange-800">
          Auto-created on first launch
        </div>
      </div>

      <div class="mt-6 space-y-4">
        <div
          v-for="day in days"
          :key="day.key"
          class="flex flex-wrap items-center gap-3 rounded-2xl border border-fog bg-white px-4 py-3"
        >
          <label class="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              class="accent-orange-500"
              :checked="scheduleStore.template.days[day.key].enabled"
              @change="updateDay(day.key, { enabled: ($event.target as HTMLInputElement).checked })"
            />
            {{ day.label }}
          </label>
          <div class="flex flex-wrap items-center gap-2">
            <input
              type="time"
              class="input w-[120px]"
              :value="scheduleStore.template.days[day.key].start"
              @input="updateDay(day.key, { start: ($event.target as HTMLInputElement).value })"
            />
            <span class="text-xs text-slate-400">to</span>
            <input
              type="time"
              class="input w-[120px]"
              :value="scheduleStore.template.days[day.key].end"
              @input="updateDay(day.key, { end: ($event.target as HTMLInputElement).value })"
            />
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs text-slate-500">Break</span>
            <input
              type="time"
              class="input w-[120px]"
              :value="scheduleStore.template.days[day.key].breakStart"
              @input="updateDay(day.key, { breakStart: ($event.target as HTMLInputElement).value })"
            />
            <span class="text-xs text-slate-400">to</span>
            <input
              type="time"
              class="input w-[120px]"
              :value="scheduleStore.template.days[day.key].breakEnd"
              @input="updateDay(day.key, { breakEnd: ($event.target as HTMLInputElement).value })"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="card p-6 sm:p-8">
      <h3 class="font-display text-xl">Booking defaults</h3>
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <div class="space-y-2">
          <label class="label">Default service duration</label>
          <select
            class="input"
            :value="scheduleStore.template.defaultServiceMinutes"
            @change="scheduleStore.setDefaultServiceMinutes(Number(($event.target as HTMLSelectElement).value))"
          >
            <option :value="15">15 minutes</option>
            <option :value="30">30 minutes</option>
            <option :value="45">45 minutes</option>
            <option :value="60">60 minutes</option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="label">Booking rules</label>
          <div class="rounded-2xl border border-fog bg-white px-4 py-3 text-sm text-slate-600">
            Double bookings are blocked, with override warning enabled.
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useScheduleStore, type WeekdayKey, type ScheduleDay } from '@/entities/schedule/model/schedule.store';

const scheduleStore = useScheduleStore();

const days: { key: WeekdayKey; label: string }[] = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' }
];

const updateDay = (key: WeekdayKey, patch: Partial<ScheduleDay>) => {
  scheduleStore.updateDay(key, patch);
};
</script>
