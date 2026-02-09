<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <!-- <p class="label">{{ t('today.label') }}</p> -->
        <h2 class="font-display text-2xl">{{ t('today.label') }}</h2>
        <!-- <p class="text-sm text-slate-600">{{ t('today.subtitle') }}</p> -->
      </div>
      <!-- <AppButton variant="ghost" type="button" @click="appointmentsStore.seedDemo">
        {{ t('actions.loadSample') }}
      </AppButton> -->
    </div>

    <TodayAppointments />
  </section>
  <CalendarFab />
</template>

<script setup lang="ts">
import CalendarFab from '@/features/calendar-fab/CalendarFab.vue';
import { useI18n } from 'vue-i18n';
// import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
// import AppButton from '@/shared/ui/AppButton.vue';
import TodayAppointments from '@/features/today-appointments/TodayAppointments.vue';

// const appointmentsStore = useAppointmentsStore();
const { t } = useI18n();
</script>
