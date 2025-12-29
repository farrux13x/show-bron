<template>
  <div class="min-h-screen app-background">
    <header class="px-4 pt-6 pb-4 sm:px-8">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Timetrack</p>
          <h1 class="font-display text-2xl font-semibold text-ink">Barber Console</h1>
        </div>
        <nav class="hidden items-center gap-2 text-sm font-semibold text-slate-500 sm:flex">
          <RouterLink class="nav-link" to="/">Today</RouterLink>
          <RouterLink class="nav-link" to="/calendar">Calendar</RouterLink>
          <RouterLink class="nav-link" to="/clients">Clients</RouterLink>
          <RouterLink class="nav-link" to="/settings">Settings</RouterLink>
        </nav>
        <RouterLink to="/appointments/new" class="btn-primary">
          <span class="text-base">+ New booking</span>
        </RouterLink>
      </div>
    </header>

    <main class="px-4 pb-24 sm:px-8">
      <div class="mx-auto max-w-6xl">
        <slot />
      </div>
    </main>

    <nav
      class="fixed bottom-3 left-1/2 z-10 w-[92%] -translate-x-1/2 rounded-3xl border border-fog bg-white/90 px-3 py-2 shadow-soft backdrop-blur sm:hidden"
    >
      <div class="grid grid-cols-4 text-xs font-semibold text-slate-500">
        <RouterLink class="nav-link" to="/">Today</RouterLink>
        <RouterLink class="nav-link" to="/calendar">Calendar</RouterLink>
        <RouterLink class="nav-link" to="/clients">Clients</RouterLink>
        <RouterLink class="nav-link" to="/settings">Settings</RouterLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.nav-link {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0.25rem;
  border-radius: 999px;
}
.nav-link.router-link-active {
  background: rgba(249, 115, 22, 0.15);
  color: #0f172a;
}
</style>
