import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppointmentsStore, type Appointment } from '@/entities/appointment/model/appointments.store';

export function useAppointmentFormPage() {
  const route = useRoute();
  const router = useRouter();
  const appointmentsStore = useAppointmentsStore();
  const { t } = useI18n();

  const isEdit = computed(() => typeof route.params.id === 'string');
  const pageTitle = computed(() => (isEdit.value ? t('appointment.edit') : t('appointment.add')));
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

  return {
    handleDelete,
    handleSave,
    initial,
    notFound,
    pageTitle,
    ready,
    router,
    t
  };
}
