<template>
  <div class="min-h-screen app-background">
    <header class="px-4 pt-6 pb-4 sm:px-8">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Timetrack</p>
          <h1 class="font-display text-2xl font-semibold text-ink">{{ t('app.consoleTitle') }}</h1>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <nav class="hidden items-center gap-2 text-sm font-semibold text-slate-500 sm:flex">
            <RouterLink class="nav-link" to="/">{{ t('nav.today') }}</RouterLink>
            <RouterLink class="nav-link" to="/calendar">{{ t('nav.calendar') }}</RouterLink>
            <RouterLink class="nav-link" to="/clients">{{ t('nav.clients') }}</RouterLink>
            <RouterLink class="nav-link" to="/settings">{{ t('nav.settings') }}</RouterLink>
          </nav>
          <select
            v-model="localeModel"
            class="input w-[140px] text-xs font-semibold text-slate-600"
            :aria-label="t('language.label')"
          >
            <option v-for="option in localeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <RouterLink to="/appointments/new" class="btn-primary">
            <span class="text-base">+ {{ t('actions.newBooking') }}</span>
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="px-4 pb-24 sm:px-8">
      <div class="mx-auto max-w-6xl">
        <slot />
      </div>
    </main>

    <nav
      class="fixed bottom-3 left-1/2 z-10 w-[92%] -translate-x-1/2 rounded-3xl border border-fog bg-white/90 px-3 py-2 shadow-soft backdrop-blur sm:hidden"
    >
      <div class="grid grid-cols-4 text-xs font-semibold text-slate-500">
        <RouterLink class="nav-link" to="/">{{ t('nav.today') }}</RouterLink>
        <RouterLink class="nav-link" to="/calendar">{{ t('nav.calendar') }}</RouterLink>
        <RouterLink class="nav-link" to="/clients">{{ t('nav.clients') }}</RouterLink>
        <RouterLink class="nav-link" to="/settings">{{ t('nav.settings') }}</RouterLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { setLocale, type AppLocale } from '@/shared/i18n';

const { t, locale } = useI18n();

const localeModel = computed({
  get: () => locale.value,
  set: (value) => setLocale(value as AppLocale)
});

const localeOptions = computed(() => [
  { value: 'uz', label: t('language.uz') },
  { value: 'ru', label: t('language.ru') },
  { value: 'en', label: t('language.en') }
]);
</script>

<style scoped>
.nav-link {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0.25rem;
  border-radius: 999px;
}
.nav-link.router-link-active {
  background: rgba(249, 115, 22, 0.15);
  color: #0f172a;
}
</style>
