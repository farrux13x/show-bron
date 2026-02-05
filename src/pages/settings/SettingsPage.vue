<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">{{ t('settings.label') }}</p>
        <h2 class="font-display text-2xl">{{ t('settings.title') }}</h2>
      </div>
      <AppButton to="/schedule-setup">
        {{ t('actions.editWeeklySchedule') }}
      </AppButton>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('settings.services') }}</p>
        <p class="mt-2 text-sm text-slate-600">
          {{ t('settings.servicesText') }}
        </p>
        <AppButton variant="muted" to="/services" class="mt-4">
          {{ t('actions.manageServices') }}
        </AppButton>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('settings.statistics') }}</p>
        <p class="mt-2 text-sm text-slate-600">
          {{ t('settings.statisticsText') }}
        </p>
        <AppButton variant="muted" to="/statistics" class="mt-4">
          {{ t('actions.viewStatistics') }}
        </AppButton>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('language.label') }}</p>
        <select
          v-model="localeModel"
          class="input mt-2 text-sm font-semibold text-slate-600"
          :aria-label="t('language.label')"
        >
          <option
            v-for="option in localeOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('theme.label') }}</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <AppButton
            variant="muted"
            type="button"
            :class="theme === 'light' ? 'bg-amber-100 text-amber-900' : ''"
            @click="theme = 'light'"
          >
            {{ t('theme.light') }}
          </AppButton>
          <AppButton
            variant="muted"
            type="button"
            :class="theme === 'dark' ? 'bg-amber-100 text-amber-900' : ''"
            @click="theme = 'dark'"
          >
            {{ t('theme.dark') }}
          </AppButton>
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
          <ExternalLinkIcon class="h-4 w-4 text-slate-400" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ExternalLinkIcon from '@/shared/ui/icons/ExternalLinkIcon.vue';
import AppButton from '@/shared/ui/AppButton.vue';
import { useSettingsPage } from './useSettingsPage';

const { t, localeModel, localeOptions, theme } = useSettingsPage();
</script>
