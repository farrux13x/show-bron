<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">Booking</p>
        <h2 class="font-display text-2xl">{{ isEdit ? 'Edit appointment' : 'Add appointment' }}</h2>
      </div>
      <RouterLink to="/calendar" class="btn-ghost">Back to calendar</RouterLink>
    </div>

    <div class="mt-6">
      <div v-if="notFound" class="rounded-2xl border border-dashed border-fog bg-white/70 px-6 py-8 text-center">
        <p class="text-sm text-slate-600">We could not find that appointment.</p>
        <RouterLink to="/calendar" class="btn-ghost mt-4">Back to calendar</RouterLink>
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
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import AppointmentForm from '@/features/appointment-form/AppointmentForm.vue';
import { useAppointmentsStore, type Appointment } from '@/entities/appointment/model/appointments.store';

const route = useRoute();
const router = useRouter();
const appointmentsStore = useAppointmentsStore();

const isEdit = computed(() => typeof route.params.id === 'string');
const ready = ref(false);
const initial = ref<Partial<Appointment> | undefined>(undefined);
const notFound = computed(() => isEdit.value && ready.value && !initial.value);

watchEffect(() => {
  ready.value = false;
  const id = route.params.id as string | undefined;

  if (id) {
    initial.value = appointmentsStore.byId(id);
    ready.value = true;
    return;
  }

  const queryDate = route.query.date as string | undefined;
  const queryName = route.query.clientName as string | undefined;
  const queryPhone = route.query.phone as string | undefined;
  const queryService = route.query.service as string | undefined;

  initial.value = queryDate || queryName || queryPhone
    ? {
        clientName: queryName ?? '',
        phone: queryPhone ?? '',
        service: queryService ?? 'Haircut',
        durationMinutes: 30,
        notes: '',
        startAt: queryDate,
        status: 'booked'
      }
    : undefined;
  ready.value = true;
});

const handleSave = (payload: Omit<Appointment, 'id'> & { id?: string }) => {
  if (isEdit.value && payload.id) {
    appointmentsStore.update(payload.id, payload);
  } else {
    appointmentsStore.add({ ...payload, durationMinutes: payload.durationMinutes ?? 30 });
  }
  router.push('/');
};

const handleDelete = () => {
  const id = route.params.id as string | undefined;
  if (!id) {
    return;
  }
  appointmentsStore.remove(id);
  router.push('/');
};
</script>
