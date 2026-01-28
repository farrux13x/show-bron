<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 160"
    fill="none"
    v-bind="$attrs"
  >
    <polyline
      :points="points"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
    />
    <line
      x1="20"
      y1="140"
      x2="580"
      y2="140"
      stroke="#e2e8f0"
      stroke-width="2"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ points: string }>();
</script>
