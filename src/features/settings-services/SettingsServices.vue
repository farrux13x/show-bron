<template>
  <RouterLink
    to="/services"
    class="group block rounded-2xl border border-fog bg-card px-4 py-4 transition hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-cinder"
    :aria-label="t('actions.manageServices')"
  >
    <p class="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
      {{ t('settings.services') }}
    </p>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
      {{ t('settings.servicesText') }}
    </p>
    <span
      class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 group-hover:underline"
    >
      {{ t('actions.manageServices') }}
      <span aria-hidden="true">→</span>
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
