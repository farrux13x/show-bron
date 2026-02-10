<template>
  <AppShell>
    <RouterView />
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { RouterView } from 'vue-router';
import AppShell from '@/widgets/app-shell/AppShell.vue';

const router = useRouter();

const tg = window.Telegram.WebApp;

onMounted(() => {
  if (window.Telegram?.WebApp) {
    tg.expand();

    tg.BackButton.onClick(() => {
      if (window.history.state && window.history.state.back) {
        router.back();
      } else {
        router.push('/');
      }
    });

    if (tg.requestFullscreen) {
      tg.requestFullscreen();
    }
  }
});
</script>
