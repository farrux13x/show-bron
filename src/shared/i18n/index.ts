import { createI18n } from 'vue-i18n';
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';
import { messages } from '@/shared/i18n/messages';

export const SUPPORTED_LOCALES = ['uz', 'ru', 'en'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

const STORAGE_KEY = 'timetrack.locale';
const DEFAULT_LOCALE: AppLocale = 'uz';
const DATE_LOCALE_MAP: Record<AppLocale, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
  en: 'en-US'
};

const isAppLocale = (value: string | null | undefined): value is AppLocale =>
  SUPPORTED_LOCALES.includes(value as AppLocale);

const getInitialLocale = (): AppLocale => {
  const stored = loadFromStorage<string | null>(STORAGE_KEY, null);
  return isAppLocale(stored) ? stored : DEFAULT_LOCALE;
};

const initialLocale = getInitialLocale();

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages
});

export const getDateLocale = (locale?: string): string => {
  const resolved = isAppLocale(locale) ? locale : (i18n.global.locale.value as AppLocale);
  return DATE_LOCALE_MAP[resolved] ?? DATE_LOCALE_MAP[DEFAULT_LOCALE];
};

export const setLocale = (locale: AppLocale) => {
  if (!isAppLocale(locale)) {
    return;
  }
  i18n.global.locale.value = locale;
  saveToStorage(STORAGE_KEY, locale);
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
  }
};

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLocale;
}
