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
        <p class="label">{{ t('settings.bookingRules') }}</p>
        <p class="mt-2 text-sm text-slate-600">{{ t('settings.bookingRulesText') }}</p>
        <button class="btn-muted mt-4">{{ t('actions.configureRules') }}</button>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('settings.reminders') }}</p>
        <p class="mt-2 text-sm text-slate-600">{{ t('settings.remindersText') }}</p>
        <button class="btn-muted mt-4">{{ t('actions.setReminder') }}</button>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('settings.account') }}</p>
        <p class="mt-2 text-sm text-slate-600">{{ t('settings.accountText') }}</p>
        <button class="btn-muted mt-4">{{ t('actions.updateProfile') }}</button>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">{{ t('settings.data') }}</p>
        <p class="mt-2 text-sm text-slate-600">{{ t('settings.dataText') }}</p>
        <button class="btn-muted mt-4">{{ t('actions.exportCsv') }}</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { setLocale, type AppLocale } from '@/shared/i18n';

const { t, locale } = useI18n();

const localeModel = computed({
  get: () => locale.value,
  set: (value) => setLocale(value as AppLocale)
});

const localeOptions = computed(() => [
  { value: 'uz', label: t('language.uz') },
  { value: 'ru', label: t('language.ru') },
  { value: 'en', label: t('language.en') }
]);
</script>
