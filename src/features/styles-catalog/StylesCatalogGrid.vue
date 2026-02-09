<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <StyleCard
      v-for="style in styles"
      :key="style.id"
      :name="style.name"
      :description="style.description"
      :photos="style.photos"
    />
  </div>
</template>

<script setup lang="ts">
import type { StyleCatalogItem } from '@/entities/style/model/styles';
import StyleCard from '@/features/style-card/StyleCard.vue';

defineProps<{
  styles: StyleCatalogItem[];
}>();
</script>
