import { useI18n } from 'vue-i18n';
import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
import { formatTime } from '@/shared/lib/date';
import { translateService, translateStatus } from '@/shared/i18n/labels';

export function useTodayPage() {
  const appointmentsStore = useAppointmentsStore();
  const { t } = useI18n();

  return {
    appointmentsStore,
    formatTime,
    t,
    translateService,
    translateStatus
  };
}
