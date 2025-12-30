import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';

export type AppTheme = 'light' | 'dark';

const STORAGE_KEY = 'timetrack.theme';
const DEFAULT_THEME: AppTheme = 'light';

const isTheme = (value: string | null | undefined): value is AppTheme =>
  value === 'light' || value === 'dark';

export const getInitialTheme = (): AppTheme => {
  const stored = loadFromStorage<string | null>(STORAGE_KEY, null);
  return isTheme(stored) ? stored : DEFAULT_THEME;
};

const applyTheme = (theme: AppTheme) => {
  if (typeof document === 'undefined') {
    return;
  }
  document.documentElement.setAttribute('data-theme', theme);
  document.body.classList.toggle('theme-dark', theme === 'dark');
  document.body.classList.toggle('theme-light', theme === 'light');
};

export const setTheme = (theme: AppTheme) => {
  if (!isTheme(theme)) {
    return;
  }
  saveToStorage(STORAGE_KEY, theme);
  applyTheme(theme);
};

export const initTheme = () => {
  const theme = getInitialTheme();
  applyTheme(theme);
};
