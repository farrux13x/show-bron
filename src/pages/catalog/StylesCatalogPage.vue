<template>
  <section class="card p-6 sm:p-8">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div class="flex items-center gap-3">
        <!-- <p class="label">{{ t('catalog.label') }}</p> -->
        <h2 class="font-display text-2xl">{{ t('catalog.title') }}</h2>
        <!-- <p class="text-sm text-slate-600">{{ t('catalog.subtitle') }}</p> -->
      </div>
    </div>

    <div class="mt-6">
      <StylesCatalogGrid :styles="styleCatalog" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { styleCatalog } from '@/entities/style/model/styles';
import StylesCatalogGrid from '@/features/styles-catalog/StylesCatalogGrid.vue';

const { t } = useI18n();
</script>
