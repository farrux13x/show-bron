<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">Settings</p>
        <h2 class="font-display text-2xl">Barber preferences</h2>
      </div>
      <RouterLink to="/schedule-setup" class="btn-primary">Edit weekly schedule</RouterLink>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">Booking rules</p>
        <p class="mt-2 text-sm text-slate-600">Double booking warning is enabled.</p>
        <button class="btn-muted mt-4">Configure rules</button>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">Reminders</p>
        <p class="mt-2 text-sm text-slate-600">Next appointment reminder for the barber.</p>
        <button class="btn-muted mt-4">Set reminder</button>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">Account</p>
        <p class="mt-2 text-sm text-slate-600">Single-user barber profile.</p>
        <button class="btn-muted mt-4">Update profile</button>
      </div>
      <div class="rounded-2xl border border-fog bg-white px-4 py-4">
        <p class="label">Data</p>
        <p class="mt-2 text-sm text-slate-600">Export or wipe local demo data.</p>
        <button class="btn-muted mt-4">Export CSV</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
