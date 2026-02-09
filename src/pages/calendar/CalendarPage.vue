<template>
  <section class="card relative overflow-hidden">
    <CalendarBoard />
  </section>
  <CalendarFab />
</template>

<script setup lang="ts">
import CalendarBoard from '@/features/calendar-board/CalendarBoard.vue';
import CalendarFab from '@/features/calendar-fab/CalendarFab.vue';
</script>
