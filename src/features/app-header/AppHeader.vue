<template>
  <header class="app-header px-4 pt-6 pb-4 sm:px-8">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-6">
      <div>
        <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Timetrack</p>
        <h1 class="font-display text-2xl font-semibold text-ink">{{ t('app.consoleTitle') }}</h1>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <nav class="app-topnav hidden items-center gap-2 text-sm font-semibold text-slate-500 sm:flex">
          <RouterLink class="nav-link" to="/">{{ t('nav.today') }}</RouterLink>
          <RouterLink class="nav-link" to="/calendar">{{ t('nav.calendar') }}</RouterLink>
          <RouterLink class="nav-link" to="/clients">{{ t('nav.clients') }}</RouterLink>
          <RouterLink class="nav-link" to="/settings">{{ t('nav.settings') }}</RouterLink>
        </nav>
        <RouterLink to="/appointments/new" class="btn-primary">
          <span class="text-base">+ {{ t('actions.newBooking') }}</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(16px);
  animation: drift-in 700ms cubic-bezier(0.2, 0.65, 0.2, 1) both;
}

.app-topnav {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  padding: 0.4rem 0.6rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
}

:global([data-theme='dark']) .app-header {
  background: rgba(10, 12, 14, 0.82);
  border-bottom-color: rgba(63, 70, 78, 0.7);
}

:global([data-theme='dark']) .app-topnav {
  background: rgba(15, 23, 42, 0.9);
  border-color: #334155;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4);
}

@keyframes drift-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
[data-theme='dark'] .nav-link.router-link-active {
  background: rgba(249, 115, 22, 0.3);
  color: #f8fafc;
}
</style>
