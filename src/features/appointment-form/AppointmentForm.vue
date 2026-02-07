<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="grid gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <label class="label">{{ t('form.clientName') }}</label>
        <Input
          v-model="clientName"
          class="input"
          :placeholder="t('form.placeholder.name')"
          required
        />
      </div>
      <div class="space-y-2">
        <label class="label">{{ t('form.phone') }}</label>
        <Input
          v-model="phone"
          class="input"
          :placeholder="t('form.placeholder.phone')"
          required
          type="numer"
          inputmode="numeric"
        />
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="space-y-2">
        <label class="label">{{ t('form.service') }}</label>
        <Select v-model="service">
          <SelectTrigger class="input">
            <SelectValue :placeholder="t('form.service')" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="name in serviceOptions" :key="name" :value="name">
              {{ translateService(name, t) }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="space-y-2">
        <label class="label">{{ t('form.duration') }}</label>
        <Select v-model="duration">
          <SelectTrigger class="input">
            <SelectValue :placeholder="t('form.duration')" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in durationOptions"
              :key="option"
              :value="option"
            >
              {{ t('time.minutesShort', { count: option }) }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="space-y-2">
        <label class="label">{{ t('form.price') }}</label>
        <Input
          v-model="price"
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
        <Input v-model="startDate" type="date" class="input" />
      </div>
      <div class="space-y-2">
        <label class="label">{{ t('form.time') }}</label>
        <Input v-model="startTime" type="time" class="input" step="300" />
      </div>
    </div>

    <div class="space-y-2">
      <label class="label">{{ t('form.notes') }}</label>
      <Textarea
        v-model="notes"
        rows="3"
        class="input"
        :placeholder="t('form.placeholder.notes')"
      />
    </div>

    <div
      v-if="validationErrors.length"
      class="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900"
    >
      <p class="font-semibold">{{ t('validation.title') }}</p>
      <ul class="mt-2 space-y-1">
        <li v-for="(message, index) in validationErrors" :key="index">
          {{ message }}
        </li>
      </ul>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <AppButton type="submit">
        {{ t('actions.saveBooking') }}
      </AppButton>
      <AppButton variant="ghost" type="button" @click="emit('cancel')">
        {{ t('actions.cancel') }}
      </AppButton>
      <AppButton v-if="isEdit" variant="muted" type="button" @click="emit('delete')">
        {{ t('actions.delete') }}
      </AppButton>
      <span v-if="isEdit" class="pill bg-slate-100 text-slate-600">{{
        statusLabel
      }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useScheduleStore } from '@/entities/schedule/model/schedule.store';
import {
  useAppointmentsStore,
  type Appointment,
} from '@/entities/appointment/model/appointments.store';
import { useServicesStore } from '@/entities/service/model/services.store';
import { toISO } from '@/shared/lib/date';
import { translateService, translateStatus } from '@/shared/i18n/labels';
import AppButton from '@/shared/ui/AppButton.vue';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';

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

const initialDate = props.initial?.startAt
  ? new Date(props.initial.startAt)
  : roundToStep(new Date(), 30);

const toDateInput = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;

const toTimeInput = (date: Date) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const clientName = ref(props.initial?.clientName ?? '');
const phone = ref(props.initial?.phone ?? '');
const fallbackServiceName = computed(
  () => servicesStore.services[0]?.name ?? 'Haircut',
);
const service = ref(props.initial?.service ?? fallbackServiceName.value);
const duration = ref(
  props.initial?.durationMinutes ?? scheduleStore.defaultServiceMinutes,
);
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

const selectedServicePrice = computed(
  () => servicesStore.byName(service.value)?.price,
);

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
  { immediate: true },
);

const parseTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }
  return { hours, minutes };
};

const toMinutes = (time: string) => {
  const parsed = parseTime(time);
  if (!parsed) {
    return null;
  }
  return parsed.hours * 60 + parsed.minutes;
};

const startDateTime = computed(() => {
  if (!startDate.value || !startTime.value) {
    return null;
  }
  const [year, month, day] = startDate.value.split('-').map(Number);
  const parsedTime = parseTime(startTime.value);
  if (
    !parsedTime ||
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day)
  ) {
    return null;
  }
  return new Date(year, month - 1, day, parsedTime.hours, parsedTime.minutes);
});

const startAt = computed(() => {
  const date = startDateTime.value ?? new Date();
  return toISO(date);
});

const conflict = computed(() => {
  if (!startDateTime.value) {
    return false;
  }
  return appointmentsStore.hasConflict({
    id: props.initial?.id,
    clientName: clientName.value,
    phone: phone.value,
    service: service.value,
    durationMinutes: duration.value,
    notes: notes.value,
    startAt: startAt.value,
    status: status.value as Appointment['status'],
    price: price.value,
  });
});

const validationErrors = computed(() => {
  const errors: string[] = [];
  const date = startDateTime.value;
  if (!date) {
    errors.push(t('validation.dateTimeRequired'));
    return errors;
  }

  const template = scheduleStore.dayForDate(date);
  if (!template.enabled) {
    errors.push(t('validation.nonWorkingDay'));
  } else {
    const minutes = date.getHours() * 60 + date.getMinutes();
    const startMinutes = toMinutes(template.start);
    const endMinutes = toMinutes(template.end);
    const breakStart = toMinutes(template.breakStart);
    const breakEnd = toMinutes(template.breakEnd);
    const appointmentEnd = minutes + duration.value;

    if (
      startMinutes == null ||
      endMinutes == null ||
      breakStart == null ||
      breakEnd == null
    ) {
      errors.push(t('validation.outsideWorkingHours'));
    } else {
      if (minutes < startMinutes || appointmentEnd > endMinutes) {
        errors.push(t('validation.outsideWorkingHours'));
      }
      if (minutes < breakEnd && appointmentEnd > breakStart) {
        errors.push(t('validation.duringBreak'));
      }
    }
  }

  if (conflict.value) {
    errors.push(t('validation.conflict'));
  }

  return errors;
});

const statusLabel = computed(() =>
  t('appointment.status', { status: translateStatus(status.value, t) }),
);

const handleSubmit = () => {
  if (validationErrors.value.length > 0) {
    return;
  }
  const payload = {
    id: props.initial?.id,
    clientName: clientName.value,
    phone: phone.value,
    service: service.value,
    durationMinutes: duration.value,
    notes: notes.value,
    startAt: startAt.value,
    status: status.value as Appointment['status'],
    price: price.value,
  };

  emit('save', payload);
};
</script>
