<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="label">Today</p>
        <h2 class="font-display text-2xl">Run the day</h2>
        <p class="text-sm text-slate-600">Tap to update status, call, or edit in seconds.</p>
      </div>
      <button class="btn-ghost" @click="appointmentsStore.seedDemo">Load sample</button>
    </div>

    <div class="mt-6 space-y-4">
      <div
        v-for="appointment in appointmentsStore.upcomingToday"
        :key="appointment.id"
        class="rounded-2xl border border-fog bg-white px-4 py-4 shadow-sm"
      >
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">
              {{ formatTime(new Date(appointment.startAt)) }} - {{ appointment.durationMinutes }} min
            </p>
            <h3 class="font-display text-lg text-ink">{{ appointment.clientName }}</h3>
            <p class="text-sm text-slate-600">{{ appointment.service }} - {{ appointment.phone }}</p>
          </div>
          <div class="pill bg-slate-100 text-slate-600">{{ appointment.status }}</div>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <button class="btn-muted" @click="appointmentsStore.setStatus(appointment.id, 'arrived')">
            Arrived
          </button>
          <button class="btn-muted" @click="appointmentsStore.setStatus(appointment.id, 'cancelled')">
            Cancelled
          </button>
          <button class="btn-muted" @click="appointmentsStore.setStatus(appointment.id, 'no-show')">
            No-show
          </button>
          <RouterLink class="btn-ghost" :to="`/appointments/${appointment.id}`">Edit</RouterLink>
          <a class="btn-ghost" :href="`tel:${appointment.phone}`">Call</a>
        </div>
      </div>

      <div v-if="appointmentsStore.upcomingToday.length === 0" class="rounded-2xl border border-dashed border-fog bg-white/70 px-6 py-10 text-center">
        <p class="text-sm text-slate-600">No bookings yet. Tap 'New booking' to fill the day.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAppointmentsStore } from '@/entities/appointment/model/appointments.store';
import { formatTime } from '@/shared/lib/date';

const appointmentsStore = useAppointmentsStore();
</script>
