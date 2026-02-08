<template>
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
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ExternalLinkIcon from '@/shared/ui/icons/ExternalLinkIcon.vue';

const { t } = useI18n();
</script>
