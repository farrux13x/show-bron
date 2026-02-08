<template>
  <form
    class="rounded-2xl border border-fog bg-white px-4 py-5 sm:px-6"
    @submit.prevent="handleAdd"
  >
    <h3 class="font-display text-lg">{{ t('servicesPage.addTitle') }}</h3>
    <div class="mt-4 space-y-2">
      <label class="label">{{ t('servicesPage.nameLabel') }}</label>
      <Input
        v-model.trim="newName"
        class="input"
        :placeholder="t('servicesPage.namePlaceholder')"
        required
      />
    </div>
    <div class="mt-4 space-y-2">
      <label class="label">{{ t('servicesPage.priceLabel') }}</label>
      <Input
        v-model.number="newPrice"
        type="number"
        min="0"
        class="input"
        :placeholder="t('servicesPage.pricePlaceholder')"
        required
      />
    </div>
    <AppButton type="submit" class="mt-6 w-full">
      {{ t('actions.addService') }}
    </AppButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useServicesStore } from '@/entities/service/model/services.store';
import AppButton from '@/shared/ui/AppButton.vue';
import { Input } from '@/shared/ui/input';

const { t } = useI18n();
const servicesStore = useServicesStore();

const newName = ref('');
const newPrice = ref<number | null>(null);

const handleAdd = () => {
  const name = newName.value.trim();
  const price = newPrice.value ?? 0;

  if (!name || Number.isNaN(price) || price < 0) {
    return;
  }

  const existing = servicesStore.byName(name);
  if (existing) {
    servicesStore.updateService(existing.id, { name, price });
  } else {
    servicesStore.addService({ name, price });
  }

  newName.value = '';
  newPrice.value = null;
};
</script>
