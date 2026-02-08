<template>
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getInitialTheme, setTheme, type AppTheme } from '@/shared/theme';
import AppButton from '@/shared/ui/AppButton.vue';

const { t } = useI18n();
const theme = ref<AppTheme>(getInitialTheme());

watch(
  theme,
  (value) => {
    setTheme(value);
  },
  { immediate: true },
);
</script>
