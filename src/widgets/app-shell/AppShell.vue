<template>
  <div class="min-h-screen app-background">
    <AppHeader />

    <main class="px-4 sm:px-8" :class="showMobileFooter ? 'pb-24' : 'pb-6'">
      <div class="mx-auto max-w-6xl">
        <slot />
      </div>
    </main>

    <AppFooter v-if="showMobileFooter" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppFooter from '@/features/footer/AppFooter.vue';
import AppHeader from '@/features/app-header/AppHeader.vue';

const route = useRoute();
const showMobileFooter = computed(() => route.meta.hideMobileFooter !== true);
</script>

<style scoped></style>
