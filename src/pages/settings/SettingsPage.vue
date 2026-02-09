<template>
  <section class="rounded-2xl border border-border-soft-60 bg-card-soft-90 p-6 text-card-foreground shadow-soft backdrop-blur sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {{ t('settings.label') }}
        </p>
        <h2 class="font-display text-2xl">{{ t('settings.title') }}</h2>
      </div>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <RouterLink
        to="/schedule-setup"
        class="group block rounded-2xl border border-fog bg-card px-4 py-4 transition hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-cinder"
        :aria-label="t('actions.editWeeklySchedule')"
      >
        <p class="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {{ t('schedule.weeklyTemplate') }}
        </p>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {{ t('schedule.defaultHours') }}
        </p>
        <span
          class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 group-hover:underline"
        >
          {{ t('actions.editWeeklySchedule') }}
          <span aria-hidden="true">→</span>
        </span>
      </RouterLink>
      <SettingsServices />
      <SettingsStatistics />
      <SettingsCatalog />
      <SettingsLanguage />
      <SettingsTheme />
      <SettingsFaq />
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import SettingsFaq from '@/features/settings-faq/SettingsFaq.vue';
import SettingsCatalog from '@/features/settings-catalog/SettingsCatalog.vue';
import SettingsLanguage from '@/features/settings-language/SettingsLanguage.vue';
import SettingsServices from '@/features/settings-services/SettingsServices.vue';
import SettingsStatistics from '@/features/settings-statistics/SettingsStatistics.vue';
import SettingsTheme from '@/features/settings-theme/SettingsTheme.vue';

const { t } = useI18n();
</script>
