<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">{{ t('clients.profile') }}</p>
        <h2 class="font-display text-2xl">
          {{ client?.name ?? t('clients.fallbackName') }}
        </h2>
        <p class="text-sm text-slate-600">{{ client?.phone }}</p>
      </div>
      <AppButton
        v-if="client"
        :to="{
          path: '/appointments/new',
          query: {
            clientName: client.name,
            phone: client.phone,
            service: client.lastService,
          },
        }"
      >
        {{ t('actions.rebook') }}
      </AppButton>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('clients.lastVisitLabel') }}</p>
        <p class="mt-2 text-lg font-semibold text-ink">
          {{ client ? formatDate(new Date(client.lastVisit)) : '-' }}
        </p>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('clients.lastService') }}</p>
        <p class="mt-2 text-lg font-semibold text-ink">
          {{ client ? translateService(client.lastService, t) : '-' }}
        </p>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('clients.visits') }}</p>
        <p class="mt-2 text-lg font-semibold text-ink">
          {{ client?.visits ?? 0 }}
        </p>
      </div>
    </div>

    <div class="mt-6 space-y-3">
      <h3 class="font-display text-lg">
        {{ t('clients.appointmentHistory') }}
      </h3>
      <div
        v-for="appointment in history"
        :key="appointment.id"
        class="rounded-2xl border border-fog bg-white px-4 py-3"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">
          {{ formatDate(new Date(appointment.startAt)) }} -
          {{ formatTime(new Date(appointment.startAt)) }}
        </p>
        <p class="font-semibold text-ink">
          {{ translateService(appointment.service, t) }}
        </p>
        <p class="text-sm text-slate-600">
          {{ translateStatus(appointment.status, t) }}
        </p>
      </div>
      <div v-if="history.length === 0" class="text-sm text-slate-600">
        {{ t('clients.noHistory') }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
import { buildClientSummaries } from '@/entities/client/model/clients';
import { formatDate, formatTime, fromISO } from '@/shared/lib/date';
import { translateService, translateStatus } from '@/shared/i18n/labels';
import AppButton from '@/shared/ui/AppButton.vue';

const route = useRoute();
const appointmentsStore = useAppointmentsStore();
const clientId = computed(() => route.params.id as string);
const { t } = useI18n();

const client = computed(() =>
  buildClientSummaries(appointmentsStore.appointments).find(
    (item) => item.id === clientId.value,
  ),
);

const history = computed(() =>
  appointmentsStore.appointments
    .filter((item) => item.phone === clientId.value)
    .sort(
      (a, b) => fromISO(b.startAt).getTime() - fromISO(a.startAt).getTime(),
    ),
);
</script>
