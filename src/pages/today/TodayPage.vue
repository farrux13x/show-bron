<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">{{ t('today.label') }}</p>
        <h2 class="font-display text-2xl">{{ t('today.title') }}</h2>
        <p class="text-sm text-slate-600">{{ t('today.subtitle') }}</p>
      </div>
      <button class="btn-ghost" @click="appointmentsStore.seedDemo">{{ t('actions.loadSample') }}</button>
    </div>

    <div class="mt-6 space-y-4">
      <div
        v-for="appointment in appointmentsStore.upcomingToday"
        :key="appointment.id"
        class="rounded-2xl border border-fog bg-white px-4 py-4 shadow-sm"
      >
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">
              {{ formatTime(new Date(appointment.startAt)) }} -
              {{ t('time.minutesShort', { count: appointment.durationMinutes }) }}
            </p>
            <h3 class="font-display text-lg text-ink">{{ appointment.clientName }}</h3>
            <p class="text-sm text-slate-600">
              {{ translateService(appointment.service, t) }} - {{ appointment.phone }}
            </p>
          </div>
          <div class="pill bg-slate-100 text-slate-600">{{ translateStatus(appointment.status, t) }}</div>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <button class="btn-muted" @click="appointmentsStore.setStatus(appointment.id, 'arrived')">
            {{ t('status.arrived') }}
          </button>
          <button class="btn-muted" @click="appointmentsStore.setStatus(appointment.id, 'cancelled')">
            {{ t('status.cancelled') }}
          </button>
          <button class="btn-muted" @click="appointmentsStore.setStatus(appointment.id, 'no-show')">
            {{ t('status.noShow') }}
          </button>
          <RouterLink class="btn-ghost" :to="`/appointments/${appointment.id}`">{{ t('actions.edit') }}</RouterLink>
          <a class="btn-ghost" :href="`tel:${appointment.phone}`">{{ t('actions.call') }}</a>
        </div>
      </div>

      <div v-if="appointmentsStore.upcomingToday.length === 0" class="rounded-2xl border border-dashed border-fog bg-white/70 px-6 py-10 text-center">
        <p class="text-sm text-slate-600">
          {{ t('today.empty', { action: t('actions.newBooking') }) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
import { formatTime } from '@/shared/lib/date';
import { translateService, translateStatus } from '@/shared/i18n/labels';

const appointmentsStore = useAppointmentsStore();
const { t } = useI18n();
</script>
