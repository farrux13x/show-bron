<template>
  <div class="rounded-2xl border border-fog bg-white px-4 py-4">
    <p class="label">{{ t('language.label') }}</p>
    <Select v-model="localeModel">
      <SelectTrigger
        class="mt-2 text-sm font-semibold text-slate-600"
        :aria-label="t('language.label')"
      >
        <SelectValue :placeholder="t('language.label')" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="option in localeOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale, type AppLocale } from '@/shared/i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

type LocaleOption = {
  value: AppLocale;
  label: string;
};

const { t, locale } = useI18n();

const localeModel = computed({
  get: () => locale.value,
  set: (value) => setLocale(value as AppLocale),
});

const localeOptions = computed<LocaleOption[]>(() => [
  { value: 'uz', label: t('language.uz') },
  { value: 'ru', label: t('language.ru') },
  { value: 'en', label: t('language.en') },
]);
</script>
