<template>
  <div class="rounded-2xl border border-fog bg-white px-4 py-4">
    <p class="label">{{ t('settings.catalog') }}</p>
    <p class="mt-2 text-sm text-slate-600">
      {{ t('settings.catalogText') }}
    </p>
    <AppButton variant="muted" to="/catalog" class="mt-4">
      {{ t('actions.openCatalog') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppButton from '@/shared/ui/AppButton.vue';

const { t } = useI18n();
</script>
