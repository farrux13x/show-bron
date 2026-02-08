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
      <SettingsServices />
      <SettingsStatistics />
      <SettingsLanguage />
      <SettingsTheme />
      <SettingsFaq />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppButton from '@/shared/ui/AppButton.vue';
import SettingsFaq from '@/features/settings-faq/SettingsFaq.vue';
import SettingsLanguage from '@/features/settings-language/SettingsLanguage.vue';
import SettingsServices from '@/features/settings-services/SettingsServices.vue';
import SettingsStatistics from '@/features/settings-statistics/SettingsStatistics.vue';
import SettingsTheme from '@/features/settings-theme/SettingsTheme.vue';

const { t } = useI18n();
</script>
