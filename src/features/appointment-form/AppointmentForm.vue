<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="grid gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <label class="label">{{ t('form.clientName') }}</label>
        <input v-model.trim="clientName" class="input" :placeholder="t('form.placeholder.name')" required />
      </div>
      <div class="space-y-2">
        <label class="label">{{ t('form.phone') }}</label>
        <input v-model.trim="phone" class="input" :placeholder="t('form.placeholder.phone')" required />
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="space-y-2">
        <label class="label">{{ t('form.service') }}</label>
        <select v-model="service" class="input">
          <option v-for="name in serviceOptions" :key="name" :value="name">
            {{ translateService(name, t) }}
          </option>
        </select>
      </div>
      <div class="space-y-2">
        <label class="label">{{ t('form.duration') }}</label>
        <select v-model.number="duration" class="input">
          <option v-for="option in durationOptions" :key="option" :value="option">
            {{ t('time.minutesShort', { count: option }) }}
          </option>
        </select>
      </div>
      <div class="space-y-2">
        <label class="label">{{ t('form.price') }}</label>
        <input
          v-model.number="price"
          type="number"
          min="0"
          class="input"
          :placeholder="t('form.placeholder.price')"
        />
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <label class="label">{{ t('form.date') }}</label>
        <input v-model="startDate" type="date" class="input" />
      </div>
      <div class="space-y-2">
        <label class="label">{{ t('form.time') }}</label>
        <input v-model="startTime" type="time" class="input" step="300" />
      </div>
    </div>

    <div class="space-y-2">
      <label class="label">{{ t('form.notes') }}</label>
      <textarea v-model.trim="notes" rows="3" class="input" :placeholder="t('form.placeholder.notes')"></textarea>
    </div>

    <div v-if="conflict" class="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
      {{ t('appointment.conflict') }}
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <button type="submit" class="btn-primary">{{ t('actions.saveBooking') }}</button>
      <button type="button" class="btn-ghost" @click="emit('cancel')">{{ t('actions.cancel') }}</button>
      <button
        v-if="isEdit"
        type="button"
        class="btn-muted"
        @click="emit('delete')"
      >
        {{ t('actions.delete') }}
      </button>
      <span v-if="isEdit" class="pill bg-slate-100 text-slate-600">{{ statusLabel }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useScheduleStore } from '@/entities/schedule/model/schedule.store';
import { useAppointmentsStore, type Appointment } from '@/entities/appointment/model/appointments.store';
import { useServicesStore } from '@/entities/service/model/services.store';
import { toISO } from '@/shared/lib/date';
import { translateService, translateStatus } from '@/shared/i18n/labels';

const props = defineProps<{ initial?: Partial<Appointment> }>();
const emit = defineEmits<{
  (event: 'save', payload: Omit<Appointment, 'id'> & { id?: string }): void;
  (event: 'cancel'): void;
  (event: 'delete'): void;
}>();

const scheduleStore = useScheduleStore();
const appointmentsStore = useAppointmentsStore();
const servicesStore = useServicesStore();
const { t } = useI18n();

const durationOptions = [15, 30, 45, 60];

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
const fallbackServiceName = computed(() => servicesStore.services[0]?.name ?? 'Haircut');
const service = ref(props.initial?.service ?? fallbackServiceName.value);
const duration = ref(props.initial?.durationMinutes ?? scheduleStore.defaultServiceMinutes);
const notes = ref(props.initial?.notes ?? '');
const price = ref(props.initial?.price ?? undefined);
const status = ref(props.initial?.status ?? 'booked');
const startDate = ref(toDateInput(initialDate));
const startTime = ref(toTimeInput(initialDate));
const lastAutoPrice = ref<number | undefined>(undefined);

const serviceOptions = computed(() => {
  const options = servicesStore.services.map((item) => item.name);

  if (service.value && !servicesStore.byName(service.value)) {
    options.unshift(service.value);
  }

  return options;
});

const selectedServicePrice = computed(() => servicesStore.byName(service.value)?.price);

watch(
  () => service.value,
  () => {
    const nextPrice = selectedServicePrice.value;
    if (nextPrice == null) {
      return;
    }
    if (price.value == null || price.value === lastAutoPrice.value) {
      price.value = nextPrice;
      lastAutoPrice.value = nextPrice;
    }
  },
  { immediate: true }
);

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

const statusLabel = computed(() =>
  t('appointment.status', { status: translateStatus(status.value, t) })
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
