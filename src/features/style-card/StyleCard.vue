<template>
  <article class="overflow-hidden rounded-2xl border border-fog bg-card shadow-sm dark:border-cinder">
    <div class="relative aspect-[4/3] w-full bg-slate-100">
      <Carousel
        v-if="photos.length"
        class="w-full"
        :opts="{ loop: photos.length > 1 }"
        v-slot="{ canScrollNext, canScrollPrev }"
      >
        <CarouselContent class="-ml-0">
          <CarouselItem v-for="(url, index) in photos" :key="`${url}-${index}`" class="pl-0">
            <img
              :src="url"
              :alt="name"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious
          v-if="photos.length > 1 && canScrollPrev"
          class="left-2 top-1/2 -translate-y-1/2 border-white/30 bg-white/70 text-slate-900 backdrop-blur hover:bg-white/90"
        />
        <CarouselNext
          v-if="photos.length > 1 && canScrollNext"
          class="right-2 top-1/2 -translate-y-1/2 border-white/30 bg-white/70 text-slate-900 backdrop-blur hover:bg-white/90"
        />
      </Carousel>

      <div
        v-else
        class="grid h-full w-full place-items-center text-sm text-slate-500"
      >
        No photo
      </div>
    </div>
    <div class="px-4 py-3">
      <h3 class="font-semibold text-foreground">{{ name }}</h3>
      <p v-if="description" class="mt-1 text-sm text-slate-600 dark:text-slate-300">
        {{ description }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel';

defineProps<{
  name: string;
  description?: string;
  photos: string[];
}>();
</script>
