<template>
  <nav
    class="app-dock fixed bottom-3 left-1/2 z-10 w-[92%] rounded-3xl border border-fog bg-white/90 px-3 py-2 shadow-soft backdrop-blur sm:hidden"
  >
    <div class="grid grid-cols-4">
      <RouterLink class="footer-link" to="/">
        <CalendarCheck class="h-5 w-5" />
      </RouterLink>
      <RouterLink class="footer-link" to="/calendar">
        <Calendar class="h-5 w-5" />
      </RouterLink>
      <RouterLink class="footer-link" to="/clients">
        <Users class="h-5 w-5" />
      </RouterLink>
      <RouterLink class="footer-link" to="/settings">
        <Settings class="h-5 w-5" />
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Calendar, CalendarCheck, Settings, Users } from 'lucide-vue-next';

</script>
