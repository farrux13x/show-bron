import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
import { useServicesStore } from '@/entities/service/model/services.store';
import { formatDate, fromISO, getWeekDays, startOfDay, toDateKey } from '@/shared/lib/date';
import { translateService } from '@/shared/i18n/labels';

type Period = 'week' | 'month';

type ServiceStat = {
  name: string;
  customers: number;
  revenue: number;
  avgTicket: number;
};

export function useStatisticsPage() {
  const { t, locale } = useI18n();
  const appointmentsStore = useAppointmentsStore();
  const servicesStore = useServicesStore();

  const period = ref<Period>('month');
  const today = startOfDay(new Date());

  const periodDays = computed(() => {
    if (period.value === 'week') {
      return getWeekDays(today);
    }

    const year = today.getFullYear();
    const month = today.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const days: Date[] = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      days.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return days;
  });

  const periodKeys = computed(() => new Set(periodDays.value.map((date) => toDateKey(date))));

  const appointmentsInPeriod = computed(() =>
    appointmentsStore.appointments.filter((appointment) => {
      if (appointment.status !== 'arrived') {
        return false;
      }
      const dateKey = toDateKey(fromISO(appointment.startAt));
      return periodKeys.value.has(dateKey);
    })
  );

  const getAppointmentRevenue = (service: string, price?: number) =>
    price ?? servicesStore.byName(service)?.price ?? 0;

  const totalCustomers = computed(() => appointmentsInPeriod.value.length);

  const totalRevenue = computed(() =>
    appointmentsInPeriod.value.reduce((sum, item) => sum + getAppointmentRevenue(item.service, item.price), 0)
  );

  const avgRevenue = computed(() => (totalCustomers.value ? totalRevenue.value / totalCustomers.value : 0));

  const periodLabel = computed(() => {
    const days = periodDays.value;
    if (days.length === 0) {
      return '';
    }
    const start = days[0];
    const end = days[days.length - 1];
    return `${formatDate(start, locale.value)} - ${formatDate(end, locale.value)}`;
  });

  const serviceStats = computed<ServiceStat[]>(() => {
    const map = new Map<string, { name: string; customers: number; revenue: number }>();
    servicesStore.services.forEach((service) => {
      map.set(service.name, { name: service.name, customers: 0, revenue: 0 });
    });

    appointmentsInPeriod.value.forEach((appointment) => {
      const name = appointment.service;
      if (!map.has(name)) {
        map.set(name, { name, customers: 0, revenue: 0 });
      }
      const entry = map.get(name);
      if (!entry) {
        return;
      }
      entry.customers += 1;
      entry.revenue += getAppointmentRevenue(appointment.service, appointment.price);
    });

    return Array.from(map.values())
      .map((item) => ({
        ...item,
        avgTicket: item.customers ? item.revenue / item.customers : 0
      }))
      .sort((a, b) => b.revenue - a.revenue);
  });

  const topService = computed(() => serviceStats.value.find((item) => item.revenue > 0));
  const topServiceName = computed(() => topService.value?.name ?? '');
  const topServiceRevenue = computed(() => topService.value?.revenue ?? 0);

  const customersByDay = computed(() => {
    const counts = new Map<string, number>();
    appointmentsInPeriod.value.forEach((appointment) => {
      const key = toDateKey(fromISO(appointment.startAt));
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
    return periodDays.value.map((day) => counts.get(toDateKey(day)) ?? 0);
  });

  const revenueByDay = computed(() => {
    const totals = new Map<string, number>();
    appointmentsInPeriod.value.forEach((appointment) => {
      const key = toDateKey(fromISO(appointment.startAt));
      totals.set(key, (totals.get(key) ?? 0) + getAppointmentRevenue(appointment.service, appointment.price));
    });
    return periodDays.value.map((day) => totals.get(toDateKey(day)) ?? 0);
  });

  const maxRevenue = computed(() => Math.max(0, ...serviceStats.value.map((item) => item.revenue)));
  const maxCustomers = computed(() => Math.max(0, ...serviceStats.value.map((item) => item.customers)));

  const barStyle = (value: number, max: number) => ({
    width: `${max > 0 ? (value / max) * 100 : 0}%`
  });

  const buildLinePoints = (values: number[]) => {
    const width = 600;
    const height = 160;
    const padding = 20;
    if (!values.length) {
      return '';
    }
    const max = Math.max(1, ...values);
    const step = values.length > 1 ? (width - padding * 2) / (values.length - 1) : 0;
    return values
      .map((value, index) => {
        const x = padding + step * index;
        const y = height - padding - (value / max) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const customerLinePoints = computed(() => buildLinePoints(customersByDay.value));
  const revenueLinePoints = computed(() => buildLinePoints(revenueByDay.value));

  const formatCurrency = (value: number) => {
    const formatted = new Intl.NumberFormat(locale.value, {
      maximumFractionDigits: 0
    }).format(value);
    return `${formatted} so'm`;
  };

  return {
    avgRevenue,
    barStyle,
    customerLinePoints,
    formatCurrency,
    maxCustomers,
    maxRevenue,
    period,
    periodLabel,
    revenueLinePoints,
    serviceStats,
    t,
    topServiceName,
    topServiceRevenue,
    totalCustomers,
    totalRevenue,
    translateService
  };
}
