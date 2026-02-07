<template>
  <div class="mt-6 space-y-4">
    <TodayAppointmentCard
      v-for="appointment in appointmentsStore.upcomingToday"
      :key="appointment.id"
      :appointment="appointment"
    />

    <div
      v-if="appointmentsStore.upcomingToday.length === 0"
      class="rounded-2xl border border-dashed border-fog bg-white/70 px-6 py-10 text-center"
    >
      <p class="text-sm text-slate-600">
        {{ t('today.empty', { action: t('actions.newBooking') }) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
import TodayAppointmentCard from '@/features/today-appointment-card/TodayAppointmentCard.vue';

const appointmentsStore = useAppointmentsStore();
const { t } = useI18n();
</script>
