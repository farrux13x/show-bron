<template>
  <RouterLink
    :to="to"
    class="group block rounded-2xl border border-fog bg-card px-4 py-4 transition hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-cinder"
    :aria-label="ariaLabel"
  >
    <p class="text-xs font-semibold uppercase tracking-[0.15em]">
      {{ title }}
    </p>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
      {{ description }}
    </p>
    <!-- <span
      class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 group-hover:underline"
    >
      {{ cta }}
      <span aria-hidden="true">&rarr;</span>
    </span> -->
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import { RouterLink } from 'vue-router';

defineProps<{
  to: RouteLocationRaw;
  title: string;
  description: string;
  cta: string;
  ariaLabel: string;
}>();
</script>
