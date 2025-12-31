<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">{{ t('settings.label') }}</p>
        <h2 class="font-display text-2xl">{{ t('settings.title') }}</h2>
      </div>
      <RouterLink to="/schedule-setup" class="btn-primary">{{ t('actions.editWeeklySchedule') }}</RouterLink>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('settings.services') }}</p>
        <p class="mt-2 text-sm text-slate-600">{{ t('settings.servicesText') }}</p>
        <RouterLink to="/services" class="btn-muted mt-4">{{ t('actions.manageServices') }}</RouterLink>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('settings.statistics') }}</p>
        <p class="mt-2 text-sm text-slate-600">{{ t('settings.statisticsText') }}</p>
        <RouterLink to="/statistics" class="btn-muted mt-4">{{ t('actions.viewStatistics') }}</RouterLink>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('language.label') }}</p>
        <select
          v-model="localeModel"
          class="input mt-2 text-sm font-semibold text-slate-600"
          :aria-label="t('language.label')"
        >
          <option v-for="option in localeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('theme.label') }}</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="btn-muted"
            :class="theme === 'light' ? 'bg-amber-100 text-amber-900' : ''"
            @click="theme = 'light'"
          >
            {{ t('theme.light') }}
          </button>
          <button
            type="button"
            class="btn-muted"
            :class="theme === 'dark' ? 'bg-amber-100 text-amber-900' : ''"
            @click="theme = 'dark'"
          >
            {{ t('theme.dark') }}
          </button>
        </div>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('settings.faq') }}</p>
        <a
          class="mt-3 inline-flex w-full items-center justify-between text-sm font-semibold text-ink"
          href="https://t.me/abdusalomoff_13"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{{ t('settings.faqCta') }}</span>
          <svg class="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M7 5h8v8" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13 5l-8 8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useSettingsPage } from './useSettingsPage';

const { t, localeModel, localeOptions, theme } = useSettingsPage();
</script>
