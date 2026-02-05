<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">{{ t('appointment.label') }}</p>
        <h2 class="font-display text-2xl">{{ pageTitle }}</h2>
      </div>
      <AppButton variant="ghost" to="/calendar">
        {{ t('actions.backToCalendar') }}
      </AppButton>
    </div>

    <div class="mt-6">
      <div
        v-if="notFound"
        class="rounded-2xl border border-dashed border-fog bg-white/70 px-6 py-8 text-center"
      >
        <p class="text-sm text-slate-600">{{ t('appointment.notFound') }}</p>
        <AppButton variant="ghost" to="/calendar" class="mt-4">
          {{ t('actions.backToCalendar') }}
        </AppButton>
      </div>
      <AppointmentForm
        v-else-if="ready"
        :initial="initial"
        @save="handleSave"
        @cancel="router.push('/')"
        @delete="handleDelete"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import AppointmentForm from '@/features/appointment-form/AppointmentForm.vue';
import AppButton from '@/shared/ui/AppButton.vue';
import { useAppointmentFormPage } from './useAppointmentFormPage';

const {
  handleDelete,
  handleSave,
  initial,
  notFound,
  pageTitle,
  ready,
  router,
  t,
} = useAppointmentFormPage();
</script>
