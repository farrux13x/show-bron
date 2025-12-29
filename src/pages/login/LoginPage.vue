<template>
  <div class="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
    <section class="card p-6 sm:p-8">
      <p class="label">Welcome back</p>
      <h2 class="font-display text-3xl text-ink">Log in to your chair.</h2>
      <p class="mt-2 text-sm text-slate-600">
        Keep your day tight with fast bookings and a clean plan.
      </p>
      <form class="mt-6 space-y-4">
        <div class="space-y-2">
          <label class="label">Phone or email</label>
          <input class="input" placeholder="you@shop.com" />
        </div>
        <div class="space-y-2">
          <label class="label">Passcode</label>
          <input class="input" type="password" placeholder="******" />
        </div>
        <button type="button" class="btn-primary w-full">Sign in</button>
      </form>
      <RouterLink to="/" class="mt-4 inline-flex text-sm font-semibold text-ember">
        Continue to the dashboard
      </RouterLink>
    </section>

    <section class="card-muted p-6 sm:p-8">
      <h3 class="font-display text-xl">Why barbers stick with Timetrack</h3>
      <ul class="mt-4 space-y-3 text-sm text-slate-600">
        <li>Set your weekly template once, tweak as needed.</li>
        <li>Book a client in under 10 seconds with defaults.</li>
        <li>Run the day from a clean Today list.</li>
      </ul>
      <div class="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Live preview</p>
        <p class="mt-2 text-sm text-slate-700">
          12:30 PM - Luis Carter - Beard - Arrived
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
