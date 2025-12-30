<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">{{ t('clients.label') }}</p>
        <h2 class="font-display text-2xl">{{ t('clients.title') }}</h2>
      </div>
      <RouterLink to="/appointments/new" class="btn-primary">{{ t('actions.newBooking') }}</RouterLink>
    </div>

    <div class="mt-6 space-y-4">
      <div
        v-for="client in clients"
        :key="client.id"
        class="rounded-2xl border border-fog bg-white px-4 py-4"
      >
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ client.phone }}</p>
            <h3 class="font-display text-lg text-ink">{{ client.name }}</h3>
            <p class="text-sm text-slate-600">
              {{ t('clients.lastVisitSummary', {
                date: formatDate(new Date(client.lastVisit)),
                service: translateService(client.lastService, t)
              }) }}
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <RouterLink class="btn-ghost" :to="`/clients/${client.id}`">{{ t('actions.profile') }}</RouterLink>
            <RouterLink
              class="btn-primary"
              :to="{
                path: '/appointments/new',
                query: {
                  clientName: client.name,
                  phone: client.phone,
                  service: client.lastService
                }
              }"
            >
              {{ t('actions.rebook') }}
            </RouterLink>
          </div>
        </div>
      </div>

      <div v-if="clients.length === 0" class="rounded-2xl border border-dashed border-fog bg-white/70 px-6 py-10 text-center">
        <p class="text-sm text-slate-600">{{ t('clients.empty') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
import { buildClientSummaries } from '@/entities/client/model/clients';
import { formatDate } from '@/shared/lib/date';
import { translateService } from '@/shared/i18n/labels';

const appointmentsStore = useAppointmentsStore();
const clients = computed(() => buildClientSummaries(appointmentsStore.appointments));
const { t } = useI18n();
</script>
