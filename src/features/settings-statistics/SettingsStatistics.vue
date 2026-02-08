<template>
  <div class="rounded-2xl border border-fog bg-white px-4 py-4">
    <p class="label">{{ t('settings.statistics') }}</p>
    <p class="mt-2 text-sm text-slate-600">
      {{ t('settings.statisticsText') }}
    </p>
    <AppButton variant="muted" to="/statistics" class="mt-4">
      {{ t('actions.viewStatistics') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppButton from '@/shared/ui/AppButton.vue';

const { t } = useI18n();
</script>
