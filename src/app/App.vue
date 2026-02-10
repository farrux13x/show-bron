<template>
  <AppShell>
    <RouterView />
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { RouterView } from 'vue-router';
import AppShell from '@/widgets/app-shell/AppShell.vue';

const router = useRouter();
const route = useRoute();

const tg = window.Telegram.WebApp;

watch(
  () => route.path,
  (newPath) => {
    if (!tg) return;

    // Agar asosiy sahifada bo'lsak ('/'), BackButton ni yashiramiz
    if (newPath === '/') {
      tg.BackButton.hide();
    } else {
      // Boshqa har qanday sahifada bo'lsak, BackButton ni ko'rsatamiz
      tg.BackButton.show();
    }
  }
);

onMounted(() => {
  if (window.Telegram?.WebApp) {
    tg.expand();

    tg.BackButton.onClick(() => {
      // Agar tarixda orqaga qaytish imkoni bo'lsa, qaytamiz
      router.back(); 
    });

    if (tg.requestFullscreen) {
      tg.requestFullscreen();
    }
  }
});
</script>
