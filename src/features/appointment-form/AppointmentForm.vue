<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="grid gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <label class="label">Client name</label>
        <input v-model.trim="clientName" class="input" placeholder="Name" required />
      </div>
      <div class="space-y-2">
        <label class="label">Phone</label>
        <input v-model.trim="phone" class="input" placeholder="Phone" required />
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="space-y-2">
        <label class="label">Service</label>
        <select v-model="service" class="input">
          <option>Haircut</option>
          <option>Beard</option>
          <option>Haircut + Beard</option>
          <option>Kids</option>
        </select>
      </div>
      <div class="space-y-2">
        <label class="label">Duration</label>
        <select v-model.number="duration" class="input">
          <option :value="15">15 min</option>
          <option :value="30">30 min</option>
          <option :value="45">45 min</option>
          <option :value="60">60 min</option>
        </select>
      </div>
      <div class="space-y-2">
        <label class="label">Price</label>
        <input v-model.number="price" type="number" min="0" class="input" placeholder="Optional" />
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <label class="label">Date</label>
        <input v-model="startDate" type="date" class="input" />
      </div>
      <div class="space-y-2">
        <label class="label">Time</label>
        <input v-model="startTime" type="time" class="input" step="300" />
      </div>
    </div>

    <div class="space-y-2">
      <label class="label">Notes</label>
      <textarea v-model.trim="notes" rows="3" class="input" placeholder="Notes"></textarea>
    </div>

    <div v-if="conflict" class="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
      Conflict warning: this overlaps another booking. You can still save if you want to override.
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <button type="submit" class="btn-primary">Save booking</button>
      <button type="button" class="btn-ghost" @click="emit('cancel')">Cancel</button>
      <button
        v-if="isEdit"
        type="button"
        class="btn-muted"
        @click="emit('delete')"
      >
        Delete
      </button>
      <span v-if="isEdit" class="pill bg-slate-100 text-slate-600">Status: {{ status }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useScheduleStore } from '@/entities/schedule/model/schedule.store';
import { useAppointmentsStore, type Appointment } from '@/entities/appointment/model/appointments.store';
import { toISO } from '@/shared/lib/date';

const props = defineProps<{ initial?: Partial<Appointment> }>();
const emit = defineEmits<{
  (event: 'save', payload: Omit<Appointment, 'id'> & { id?: string }): void;
  (event: 'cancel'): void;
  (event: 'delete'): void;
}>();

const scheduleStore = useScheduleStore();
const appointmentsStore = useAppointmentsStore();

const isEdit = computed(() => Boolean(props.initial?.id));

const roundToStep = (date: Date, stepMinutes: number) => {
  const ms = date.getTime();
  const stepMs = stepMinutes * 60 * 1000;
  return new Date(Math.ceil(ms / stepMs) * stepMs);
};

const initialDate = props.initial?.startAt ? new Date(props.initial.startAt) : roundToStep(new Date(), 30);

const toDateInput = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;

const toTimeInput = (date: Date) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const clientName = ref(props.initial?.clientName ?? '');
const phone = ref(props.initial?.phone ?? '');
const service = ref(props.initial?.service ?? 'Haircut');
const duration = ref(props.initial?.durationMinutes ?? scheduleStore.defaultServiceMinutes);
const notes = ref(props.initial?.notes ?? '');
const price = ref(props.initial?.price ?? undefined);
const status = ref(props.initial?.status ?? 'booked');
const startDate = ref(toDateInput(initialDate));
const startTime = ref(toTimeInput(initialDate));

const startAt = computed(() => {
  const [year, month, day] = startDate.value.split('-').map(Number);
  const [hours, minutes] = startTime.value.split(':').map(Number);
  const date = new Date(year ?? 0, (month ?? 1) - 1, day ?? 1, hours ?? 0, minutes ?? 0);
  return toISO(date);
});

const conflict = computed(() =>
  appointmentsStore.hasConflict({
    id: props.initial?.id,
    clientName: clientName.value,
    phone: phone.value,
    service: service.value,
    durationMinutes: duration.value,
    notes: notes.value,
    startAt: startAt.value,
    status: status.value as Appointment['status'],
    price: price.value
  })
);

const handleSubmit = () => {
  const payload = {
    id: props.initial?.id,
    clientName: clientName.value,
    phone: phone.value,
    service: service.value,
    durationMinutes: duration.value,
    notes: notes.value,
    startAt: startAt.value,
    status: status.value as Appointment['status'],
    price: price.value
  };

  emit('save', payload);
};
</script>
