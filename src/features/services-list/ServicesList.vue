<template>
  <div class="space-y-3">
    <div
      v-for="service in servicesStore.services"
      :key="service.id"
      class="rounded-2xl border border-fog bg-white px-4 py-4"
    >
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="font-semibold text-ink">
            {{ translateService(service.name, t) }}
          </p>
          <p class="text-sm text-slate-500">
            {{ formatPrice(service.price) }}
          </p>
        </div>
        <AppButton
          variant="muted"
          type="button"
          @click="servicesStore.removeService(service.id)"
        >
          {{ t('actions.delete') }}
        </AppButton>
      </div>
    </div>

    <div
      v-if="servicesStore.services.length === 0"
      class="rounded-2xl border border-dashed border-fog bg-white/70 px-6 py-8 text-center text-sm text-slate-600"
    >
      {{ t('servicesPage.empty') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useServicesStore } from '@/entities/service/model/services.store';
import { translateService } from '@/shared/i18n/labels';
import AppButton from '@/shared/ui/AppButton.vue';

const { t } = useI18n();
const servicesStore = useServicesStore();

const formatPrice = (value: number) => {
  const formatted = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\u00A0/g, ' ');
  return `${formatted} so'm`;
};
</script>
