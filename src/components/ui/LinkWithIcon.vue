<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  icon: string;
  label: string;
  to: RouteLocationRaw;
}>();
</script>

<template>
  <RouterLink
    :to="to"
    class="flex gap-2 items-center text-slate-500 cursor-pointer hover:text-black"
  >
    <Icon
      class="w-6 h-6"
      :icon="props.icon"
    />
    <span class="hidden xl:block">{{ props.label }}</span>
  </RouterLink>
</template>
