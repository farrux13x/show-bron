<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { computed, useAttrs } from 'vue';
import { RouterLink } from 'vue-router';
import { Button } from '@/shared/ui/button';

type LegacyVariant = 'primary' | 'muted' | 'ghost';

const props = withDefaults(
  defineProps<{
    variant?: LegacyVariant;
    size?: 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
    to?: RouteLocationRaw;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    class?: HTMLAttributes['class'];
    target?: string;
    rel?: string;
  }>(),
  {
    variant: 'primary',
    type: 'button',
  },
);

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();
const isLink = computed(() => Boolean(props.to || props.href));

const shadcnVariant = computed(() => {
  switch (props.variant) {
    case 'muted':
      return 'secondary';
    case 'ghost':
      return 'ghost';
    case 'primary':
    default:
      return 'default';
  }
});

const buttonAttrs = computed(() => ({
  ...attrs,
  ...(isLink.value ? {} : { type: props.type }),
}));
</script>

<template>
  <Button
    :variant="shadcnVariant"
    :size="props.size"
    :as-child="isLink"
    :class="props.class"
    v-bind="buttonAttrs"
  >
    <RouterLink v-if="props.to" :to="props.to">
      <slot />
    </RouterLink>
    <a
      v-else-if="props.href"
      :href="props.href"
      :target="props.target"
      :rel="props.rel"
    >
      <slot />
    </a>
    <slot v-else />
  </Button>
</template>
