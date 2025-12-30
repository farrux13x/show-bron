<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">{{ t('statistics.label') }}</p>
        <h2 class="font-display text-2xl">{{ t('statistics.title') }}</h2>
        <p class="text-sm text-slate-600">{{ t('statistics.subtitle') }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="btn-muted"
          :class="period === 'week' ? 'bg-amber-100 text-amber-900' : ''"
          @click="period = 'week'"
        >
          {{ t('statistics.period.week') }}
        </button>
        <button
          type="button"
          class="btn-muted"
          :class="period === 'month' ? 'bg-amber-100 text-amber-900' : ''"
          @click="period = 'month'"
        >
          {{ t('statistics.period.month') }}
        </button>
      </div>
    </div>

    <div class="mt-6 grid gap-4 lg:grid-cols-4">
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('statistics.kpi.customers') }}</p>
        <p class="mt-2 text-2xl font-semibold text-ink">{{ totalCustomers }}</p>
        <p class="text-xs text-slate-500">{{ periodLabel }}</p>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('statistics.kpi.revenue') }}</p>
        <p class="mt-2 text-2xl font-semibold text-ink">{{ formatCurrency(totalRevenue) }}</p>
        <p class="text-xs text-slate-500">{{ periodLabel }}</p>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('statistics.kpi.avgRevenue') }}</p>
        <p class="mt-2 text-2xl font-semibold text-ink">{{ formatCurrency(avgRevenue) }}</p>
        <p class="text-xs text-slate-500">{{ t('statistics.kpi.perCustomer') }}</p>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('statistics.kpi.topService') }}</p>
        <p class="mt-2 text-lg font-semibold text-ink">
          {{ topServiceName ? translateService(topServiceName, t) : t('statistics.none') }}
        </p>
        <p class="text-xs text-slate-500">
          {{ topServiceRevenue ? formatCurrency(topServiceRevenue) : t('statistics.noRevenue') }}
        </p>
      </div>
    </div>

    <div class="mt-8 grid gap-6 xl:grid-cols-2">
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <div class="flex items-center justify-between">
          <p class="label">{{ t('statistics.charts.customersPerDay') }}</p>
          <p class="text-xs text-slate-400">{{ periodLabel }}</p>
        </div>
        <div class="mt-3">
          <svg viewBox="0 0 600 160" class="h-40 w-full text-ember">
            <polyline :points="customerLinePoints" fill="none" stroke="currentColor" stroke-width="3" />
            <line x1="20" y1="140" x2="580" y2="140" stroke="#e2e8f0" stroke-width="2" />
          </svg>
        </div>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <div class="flex items-center justify-between">
          <p class="label">{{ t('statistics.charts.revenuePerDay') }}</p>
          <p class="text-xs text-slate-400">{{ periodLabel }}</p>
        </div>
        <div class="mt-3">
          <svg viewBox="0 0 600 160" class="h-40 w-full text-emerald-500">
            <polyline :points="revenueLinePoints" fill="none" stroke="currentColor" stroke-width="3" />
            <line x1="20" y1="140" x2="580" y2="140" stroke="#e2e8f0" stroke-width="2" />
          </svg>
        </div>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <div class="flex items-center justify-between">
          <p class="label">{{ t('statistics.charts.revenueByService') }}</p>
          <p class="text-xs text-slate-400">{{ t('statistics.kpi.revenue') }}</p>
        </div>
        <div class="mt-4 space-y-3">
          <div v-for="item in serviceStats" :key="item.name" class="space-y-1">
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span>{{ translateService(item.name, t) }}</span>
              <span>{{ formatCurrency(item.revenue) }}</span>
            </div>
            <div class="h-2 rounded-full bg-slate-100">
              <div class="h-2 rounded-full bg-emerald-400" :style="barStyle(item.revenue, maxRevenue)" />
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <div class="flex items-center justify-between">
          <p class="label">{{ t('statistics.charts.customersByService') }}</p>
          <p class="text-xs text-slate-400">{{ t('statistics.kpi.customers') }}</p>
        </div>
        <div class="mt-4 space-y-3">
          <div v-for="item in serviceStats" :key="item.name" class="space-y-1">
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span>{{ translateService(item.name, t) }}</span>
              <span>{{ item.customers }}</span>
            </div>
            <div class="h-2 rounded-full bg-slate-100">
              <div class="h-2 rounded-full bg-amber-400" :style="barStyle(item.customers, maxCustomers)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 rounded-2xl border border-fog bg-white px-4 py-4 sm:px-6">
      <p class="label">{{ t('statistics.table.title') }}</p>
      <div class="mt-4 overflow-x-auto">
        <table class="min-w-full text-left text-sm">
          <thead class="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th class="py-2 pr-6">{{ t('statistics.table.service') }}</th>
              <th class="py-2 pr-6">{{ t('statistics.table.customers') }}</th>
              <th class="py-2 pr-6">{{ t('statistics.table.revenue') }}</th>
              <th class="py-2">{{ t('statistics.table.avgTicket') }}</th>
            </tr>
          </thead>
          <tbody class="text-slate-700">
            <tr v-for="item in serviceStats" :key="item.name" class="border-t border-fog/60">
              <td class="py-3 pr-6 font-semibold text-ink">{{ translateService(item.name, t) }}</td>
              <td class="py-3 pr-6">{{ item.customers }}</td>
              <td class="py-3 pr-6">{{ formatCurrency(item.revenue) }}</td>
              <td class="py-3">{{ formatCurrency(item.avgTicket) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
import { useServicesStore } from '@/entities/service/model/services.store';
import { formatDate, fromISO, getWeekDays, startOfDay, toDateKey } from '@/shared/lib/date';
import { translateService } from '@/shared/i18n/labels';

const { t, locale } = useI18n();
const appointmentsStore = useAppointmentsStore();
const servicesStore = useServicesStore();

const period = ref<'week' | 'month'>('month');
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

const serviceStats = computed(() => {
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

const formatCurrency = (value: number) =>
  new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
</script>
