<template>
  <div class="rounded-2xl border border-fog bg-white px-4 py-4 shadow-sm">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">
          {{ formatTime(new Date(appointment.startAt)) }} -
          {{ t('time.minutesShort', { count: appointment.durationMinutes }) }}
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
    <div class="mt-4 space-y-2">
      <div class="flex flex-wrap items-center gap-2">
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
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <AppButton
          variant="ghost"
          :to="`/appointments/${appointment.id}`"
          aria-label="Edit"
          class="h-9 w-9 rounded-full border border-fog bg-white p-0 text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Pencil class="h-4 w-4" />
        </AppButton>
        <AppButton
          variant="ghost"
          :href="`tel:${appointment.phone}`"
          aria-label="Call"
          class="h-9 w-9 rounded-full border border-fog bg-white p-0 text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Phone class="h-4 w-4" />
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Appointment } from '@/entities/appointment/model/appointments.store';
import { formatTime } from '@/shared/lib/date';
import { translateService, translateStatus } from '@/shared/i18n/labels';
import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
import AppButton from '@/shared/ui/AppButton.vue';
import { Pencil, Phone } from 'lucide-vue-next';

defineProps<{
  appointment: Appointment;
}>();

const appointmentsStore = useAppointmentsStore();
const { t } = useI18n();
</script>
