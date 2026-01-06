<template>
  <nav
    class="app-dock fixed bottom-3 left-1/2 z-10 w-[92%] -translate-x-1/2 rounded-3xl border border-fog bg-white/90 px-3 py-2 shadow-soft backdrop-blur sm:hidden"
  >
    <div class="grid grid-cols-4 text-xs font-semibold text-slate-500">
      <RouterLink class="nav-link" to="/">{{ t('nav.today') }}</RouterLink>
      <RouterLink class="nav-link" to="/calendar">{{ t('nav.calendar') }}</RouterLink>
      <RouterLink class="nav-link" to="/clients">{{ t('nav.clients') }}</RouterLink>
      <RouterLink class="nav-link" to="/settings">{{ t('nav.settings') }}</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.app-dock {
  animation: drift-in 700ms cubic-bezier(0.2, 0.65, 0.2, 1) both;
  animation-delay: 220ms;
}

@keyframes drift-in {
  from {
    opacity: 0;
    transform: translate(-50%, 16px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
