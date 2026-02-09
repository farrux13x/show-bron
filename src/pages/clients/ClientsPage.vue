<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <!-- <p class="label">{{ t('clients.label') }}</p> -->
        <h2 class="font-display text-2xl">{{ t('clients.label') }}</h2>
      </div>
      <!-- <AppButton to="/appointments/new">
        {{ t('actions.newBooking') }}
      </AppButton> -->
    </div>

    <ClientsList />
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ClientsList from '@/features/clients-list/ClientsList.vue';
// import AppButton from '@/shared/ui/AppButton.vue';

const { t } = useI18n();
</script>
