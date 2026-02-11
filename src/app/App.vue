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
import posthog from 'posthog-js';

const router = useRouter();

const tg = window.Telegram.WebApp;
const user = tg?.initDataUnsafe?.user;

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

    if (user) {
      posthog.identify(
        String(user.id), 
        {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          language: user.language_code,
          is_premium: user.is_premium, 
          source: 'telegram_mini_app' 
        }
      );
    }
  }
});
</script>
