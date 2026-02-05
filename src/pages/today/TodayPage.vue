<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">{{ t('today.label') }}</p>
        <h2 class="font-display text-2xl">{{ t('today.title') }}</h2>
        <p class="text-sm text-slate-600">{{ t('today.subtitle') }}</p>
      </div>
      <AppButton variant="ghost" type="button" @click="appointmentsStore.seedDemo">
        {{ t('actions.loadSample') }}
      </AppButton>
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
              {{
                t('time.minutesShort', { count: appointment.durationMinutes })
              }}
            </p>
            <h3 class="font-display text-lg text-ink">
              {{ appointment.clientName }}
            </h3>
            <p class="text-sm text-slate-600">
              {{ translateService(appointment.service, t) }} -
              {{ appointment.phone }}
            </p>
          </div>
          <div class="pill bg-slate-100 text-slate-600">
            {{ translateStatus(appointment.status, t) }}
          </div>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <AppButton
            variant="muted"
            type="button"
            @click="appointmentsStore.setStatus(appointment.id, 'arrived')"
          >
            {{ t('status.arrived') }}
          </AppButton>
          <AppButton
            variant="muted"
            type="button"
            @click="appointmentsStore.setStatus(appointment.id, 'cancelled')"
          >
            {{ t('status.cancelled') }}
          </AppButton>
          <AppButton
            variant="muted"
            type="button"
            @click="appointmentsStore.setStatus(appointment.id, 'no-show')"
          >
            {{ t('status.noShow') }}
          </AppButton>
          <AppButton variant="ghost" :to="`/appointments/${appointment.id}`">
            {{ t('actions.edit') }}
          </AppButton>
          <AppButton variant="ghost" :href="`tel:${appointment.phone}`">
            {{ t('actions.call') }}
          </AppButton>
        </div>
      </div>

      <div
        v-if="appointmentsStore.upcomingToday.length === 0"
        class="rounded-2xl border border-dashed border-fog bg-white/70 px-6 py-10 text-center"
      >
        <p class="text-sm text-slate-600">
          {{ t('today.empty', { action: t('actions.newBooking') }) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTodayPage } from './useTodayPage';
import AppButton from '@/shared/ui/AppButton.vue';

const { appointmentsStore, formatTime, t, translateService, translateStatus } =
  useTodayPage();
</script>
