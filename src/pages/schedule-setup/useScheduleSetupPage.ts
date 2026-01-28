import { useI18n } from 'vue-i18n';
import {
  useScheduleStore,
  type WeekdayKey,
  type ScheduleDay,
} from '@/entities/schedule/model/schedule.store';

export function useScheduleSetupPage() {
  const scheduleStore = useScheduleStore();
  const { t } = useI18n();

  const days: { key: WeekdayKey }[] = [
    { key: 'mon' },
    { key: 'tue' },
    { key: 'wed' },
    { key: 'thu' },
    { key: 'fri' },
    { key: 'sat' },
    { key: 'sun' },
  ];

  const updateDay = (key: WeekdayKey, patch: Partial<ScheduleDay>) => {
    scheduleStore.updateDay(key, patch);
  };

  return {
    days,
    scheduleStore,
    t,
    updateDay,
  };
}
