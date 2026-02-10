<template>
  <AppShell>
    <RouterView />
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import AppShell from '@/widgets/app-shell/AppShell.vue';

onMounted(() => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;

    tg.expand();

    if (tg.requestFullscreen) {
      tg.requestFullscreen();
    }
  }
});
</script>
