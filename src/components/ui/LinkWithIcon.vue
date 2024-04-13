<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { RouteLocationRaw } from 'vue-router';

const props = withDefaults(
  defineProps<{
    icon: string;
    label: string;
    to: RouteLocationRaw;
    activeClassName?: string;
  }>(),
  {
    activeClassName: ''
  }
);
</script>

<template>
  <RouterLink
    :to="to"
    class="flex gap-2 items-center text-slate-500 cursor-pointer hover:text-black transition-all duration-300"
    :exact-active-class="props.activeClassName"
  >
    <span v-tooltip="props.label">
      <Icon
        class="w-6 h-6"
        :icon="props.icon"
      />
    </span>
    <span class="hidden xl:block">{{ props.label }}</span>
  </RouterLink>
</template>
