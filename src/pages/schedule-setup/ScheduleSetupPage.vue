<template>
  <div class="space-y-6">
    <section class="card p-6 sm:p-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="label">{{ t('schedule.weeklyTemplate') }}</p>
          <h2 class="font-display text-2xl">
            {{ t('schedule.defaultHours') }}
          </h2>
        </div>
        <div class="rounded-2xl bg-orange-50 px-4 py-2 text-sm text-orange-800">
          {{ t('schedule.autoCreated') }}
        </div>
      </div>

      <div class="mt-6 space-y-4">
        <div
          v-for="day in days"
          :key="day.key"
          class="flex flex-wrap items-center gap-3 rounded-2xl border border-fog bg-white px-4 py-3"
        >
          <label
            class="flex items-center gap-2 text-sm font-semibold text-slate-700"
            :for="`day-${day.key}`"
          >
            <Checkbox
              :id="`day-${day.key}`"
              :model-value="scheduleStore.template.days[day.key].enabled"
              @update:modelValue="
                updateDay(day.key, {
                  enabled: $event === true,
                })
              "
            />
            {{ t(`days.${day.key}`) }}
          </label>
          <div class="flex flex-wrap items-center gap-2">
            <Input
              type="time"
              class="input w-[120px]"
              :model-value="scheduleStore.template.days[day.key].start"
              @update:modelValue="
                updateDay(day.key, {
                  start: String($event ?? ''),
                })
              "
            />
            <span class="text-xs text-slate-400">{{ t('time.to') }}</span>
            <Input
              type="time"
              class="input w-[120px]"
              :model-value="scheduleStore.template.days[day.key].end"
              @update:modelValue="
                updateDay(day.key, {
                  end: String($event ?? ''),
                })
              "
            />
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs text-slate-500">{{ t('time.break') }}</span>
            <Input
              type="time"
              class="input w-[120px]"
              :model-value="scheduleStore.template.days[day.key].breakStart"
              @update:modelValue="
                updateDay(day.key, {
                  breakStart: String($event ?? ''),
                })
              "
            />
            <span class="text-xs text-slate-400">{{ t('time.to') }}</span>
            <Input
              type="time"
              class="input w-[120px]"
              :model-value="scheduleStore.template.days[day.key].breakEnd"
              @update:modelValue="
                updateDay(day.key, {
                  breakEnd: String($event ?? ''),
                })
              "
            />
          </div>
        </div>
      </div>
    </section>

    <section class="card p-6 sm:p-8">
      <h3 class="font-display text-xl">{{ t('schedule.bookingDefaults') }}</h3>
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <div class="space-y-2">
          <label class="label">{{
            t('schedule.defaultServiceDuration')
          }}</label>
          <Select v-model="defaultServiceMinutes">
            <SelectTrigger class="input">
              <SelectValue :placeholder="t('schedule.defaultServiceDuration')" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="15">
                {{ t('time.minutesLong', { count: 15 }) }}
              </SelectItem>
              <SelectItem :value="30">
                {{ t('time.minutesLong', { count: 30 }) }}
              </SelectItem>
              <SelectItem :value="45">
                {{ t('time.minutesLong', { count: 45 }) }}
              </SelectItem>
              <SelectItem :value="60">
                {{ t('time.minutesLong', { count: 60 }) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="space-y-2">
          <label class="label">{{ t('schedule.bookingRules') }}</label>
          <div
            class="rounded-2xl border border-fog bg-white px-4 py-3 text-sm text-slate-600"
          >
            {{ t('schedule.bookingRulesText') }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Checkbox } from '@/shared/ui/checkbox';
import { useScheduleSetupPage } from './useScheduleSetupPage';

const { days, scheduleStore, t, updateDay } = useScheduleSetupPage();

const defaultServiceMinutes = computed({
  get: () => scheduleStore.template.defaultServiceMinutes,
  set: (value) => scheduleStore.setDefaultServiceMinutes(Number(value)),
});
</script>
