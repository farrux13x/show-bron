<template>
  <div class="min-h-screen app-background mt-[87px]">
    <AppHeader />

    <main class="px-4 pb-24 sm:px-8">
      <div class="mx-auto max-w-6xl">
        <slot />
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/features/footer/AppFooter.vue';
import AppHeader from '@/features/app-header/AppHeader.vue';
</script>

<style scoped></style>
