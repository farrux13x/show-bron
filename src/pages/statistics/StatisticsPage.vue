<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">{{ t('statistics.label') }}</p>
        <h2 class="font-display text-2xl">{{ t('statistics.title') }}</h2>
        <p class="text-sm text-slate-600">{{ t('statistics.subtitle') }}</p>
      </div>
      <div class="flex items-center gap-2">
        <AppButton
          variant="muted"
          type="button"
          :class="period === 'week' ? 'bg-amber-100 text-amber-900' : ''"
          @click="period = 'week'"
        >
          {{ t('statistics.period.week') }}
        </AppButton>
        <AppButton
          variant="muted"
          type="button"
          :class="period === 'month' ? 'bg-amber-100 text-amber-900' : ''"
          @click="period = 'month'"
        >
          {{ t('statistics.period.month') }}
        </AppButton>
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
        <p class="mt-2 text-2xl font-semibold text-ink">
          {{ formatCurrency(totalRevenue) }}
        </p>
        <p class="text-xs text-slate-500">{{ periodLabel }}</p>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('statistics.kpi.avgRevenue') }}</p>
        <p class="mt-2 text-2xl font-semibold text-ink">
          {{ formatCurrency(avgRevenue) }}
        </p>
        <p class="text-xs text-slate-500">
          {{ t('statistics.kpi.perCustomer') }}
        </p>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('statistics.kpi.topService') }}</p>
        <p class="mt-2 text-lg font-semibold text-ink">
          {{
            topServiceName
              ? translateService(topServiceName, t)
              : t('statistics.none')
          }}
        </p>
        <p class="text-xs text-slate-500">
          {{
            topServiceRevenue
              ? formatCurrency(topServiceRevenue)
              : t('statistics.noRevenue')
          }}
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
          <LineChartIcon
            class="h-40 w-full text-ember"
            :points="customerLinePoints"
          />
        </div>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <div class="flex items-center justify-between">
          <p class="label">{{ t('statistics.charts.revenuePerDay') }}</p>
          <p class="text-xs text-slate-400">{{ periodLabel }}</p>
        </div>
        <div class="mt-3">
          <LineChartIcon
            class="h-40 w-full text-emerald-500"
            :points="revenueLinePoints"
          />
        </div>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <div class="flex items-center justify-between">
          <p class="label">{{ t('statistics.charts.revenueByService') }}</p>
          <p class="text-xs text-slate-400">
            {{ t('statistics.kpi.revenue') }}
          </p>
        </div>
        <div class="mt-4 space-y-3">
          <div v-for="item in serviceStats" :key="item.name" class="space-y-1">
            <div
              class="flex items-center justify-between text-xs text-slate-500"
            >
              <span>{{ translateService(item.name, t) }}</span>
              <span>{{ formatCurrency(item.revenue) }}</span>
            </div>
            <div class="h-2 rounded-full bg-slate-100">
              <div
                class="h-2 rounded-full bg-emerald-400"
                :style="barStyle(item.revenue, maxRevenue)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <div class="flex items-center justify-between">
          <p class="label">{{ t('statistics.charts.customersByService') }}</p>
          <p class="text-xs text-slate-400">
            {{ t('statistics.kpi.customers') }}
          </p>
        </div>
        <div class="mt-4 space-y-3">
          <div v-for="item in serviceStats" :key="item.name" class="space-y-1">
            <div
              class="flex items-center justify-between text-xs text-slate-500"
            >
              <span>{{ translateService(item.name, t) }}</span>
              <span>{{ item.customers }}</span>
            </div>
            <div class="h-2 rounded-full bg-slate-100">
              <div
                class="h-2 rounded-full bg-amber-400"
                :style="barStyle(item.customers, maxCustomers)"
              />
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
            <tr
              v-for="item in serviceStats"
              :key="item.name"
              class="border-t border-fog/60"
            >
              <td class="py-3 pr-6 font-semibold text-ink">
                {{ translateService(item.name, t) }}
              </td>
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
import LineChartIcon from '@/shared/ui/icons/LineChartIcon.vue';
import AppButton from '@/shared/ui/AppButton.vue';
import { useStatisticsPage } from './useStatisticsPage';

const {
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
  translateService,
} = useStatisticsPage();
</script>
