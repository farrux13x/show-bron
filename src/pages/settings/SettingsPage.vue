<template>
  <section class="rounded-2xl border border-border-soft-60 bg-card-soft-90 p-6 text-card-foreground shadow-soft backdrop-blur sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h2 class="font-display text-2xl">{{ t('settings.label') }}</h2>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <SettingsNavCard
        v-for="card in navCards"
        :key="card.to"
        :to="card.to"
        :title="t(card.titleKey)"
        :description="t(card.descriptionKey)"
        :cta="t(card.ctaKey)"
        :aria-label="t(card.ctaKey)"
      />
      <SettingsLanguage />
      <SettingsTheme />
      <SettingsFaq />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SettingsFaq from '@/features/settings-faq/SettingsFaq.vue';
import SettingsLanguage from '@/features/settings-language/SettingsLanguage.vue';
import SettingsNavCard from '@/features/settings-nav-card/SettingsNavCard.vue';
import SettingsTheme from '@/features/settings-theme/SettingsTheme.vue';

const { t } = useI18n();

const navCards = [
  {
    to: '/catalog',
    titleKey: 'settings.catalog',
    descriptionKey: 'settings.catalogText',
    ctaKey: 'actions.openCatalog',
  },
  {
    to: '/statistics',
    titleKey: 'settings.statistics',
    descriptionKey: 'settings.statisticsText',
    ctaKey: 'actions.viewStatistics',
  },
  {
    to: '/services',
    titleKey: 'settings.services',
    descriptionKey: 'settings.servicesText',
    ctaKey: 'actions.manageServices',
  },
  {
    to: '/schedule-setup',
    titleKey: 'schedule.weeklyTemplate',
    descriptionKey: 'schedule.defaultHours',
    ctaKey: 'actions.editWeeklySchedule',
  },
] as const;
</script>
