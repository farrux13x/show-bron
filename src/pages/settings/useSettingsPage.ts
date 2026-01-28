import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale, type AppLocale } from '@/shared/i18n';
import { getInitialTheme, setTheme, type AppTheme } from '@/shared/theme';

type LocaleOption = {
  value: AppLocale;
  label: string;
};

export function useSettingsPage() {
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

  const theme = ref<AppTheme>(getInitialTheme());

  watch(
    theme,
    (value) => {
      setTheme(value);
    },
    { immediate: true },
  );

  return {
    t,
    localeModel,
    localeOptions,
    theme,
  };
}
