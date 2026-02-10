<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div class="flex items-center gap-3">
        <h2 class="font-display text-2xl">{{ t('servicesPage.title') }}</h2>
      </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <ServicesList />
      <ServicesForm />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ServicesForm from '@/features/services-form/ServicesForm.vue';
import ServicesList from '@/features/services-list/ServicesList.vue';

const { t } = useI18n();
</script>
