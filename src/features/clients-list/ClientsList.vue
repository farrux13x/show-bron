<template>
  <div class="mt-6 space-y-4">
    <ClientCard 
      v-for="client in clients" 
      :key="client.id" 
      :client="client" 
      @click="router.push(`/clients/${client.id}`)"/>
    <div
      v-if="clients.length === 0"
      class="rounded-2xl border border-dashed border-fog bg-white/70 px-6 py-10 text-center"
    >
      <p class="text-sm text-slate-600">{{ t('clients.empty') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
import { buildClientSummaries } from '@/entities/client/model/clients';
import ClientCard from '@/features/client-card/ClientCard.vue';

const appointmentsStore = useAppointmentsStore();
const clients = computed(() =>
  buildClientSummaries(appointmentsStore.appointments),
);
const { t } = useI18n();
const router = useRouter();
</script>
