<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="label">{{ t('servicesPage.label') }}</p>
        <h2 class="font-display text-2xl">{{ t('servicesPage.title') }}</h2>
        <p class="text-sm text-slate-600">{{ t('servicesPage.subtitle') }}</p>
      </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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

      <form
        class="rounded-2xl border border-fog bg-white px-4 py-5 sm:px-6"
        @submit.prevent="handleAdd"
      >
        <h3 class="font-display text-lg">{{ t('servicesPage.addTitle') }}</h3>
        <div class="mt-4 space-y-2">
          <label class="label">{{ t('servicesPage.nameLabel') }}</label>
          <Input
            v-model="newName"
            class="input"
            :placeholder="t('servicesPage.namePlaceholder')"
            required
          />
        </div>
        <div class="mt-4 space-y-2">
          <label class="label">{{ t('servicesPage.priceLabel') }}</label>
          <Input
            v-model="newPrice"
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { useServicesPage } from './useServicesPage';
import AppButton from '@/shared/ui/AppButton.vue';
import { Input } from '@/shared/ui/input';

const {
  formatPrice,
  handleAdd,
  newName,
  newPrice,
  servicesStore,
  t,
  translateService,
} = useServicesPage();
</script>
