<script setup lang="ts">
import { Icon } from '@iconify/vue';

withDefaults(
  defineProps<{
    icon: string;
    color?: string;
  }>(),
  {
    color: 'black'
  }
);
</script>

<template>
  <button class="hover:bg-gray-200 rounded transition duration-300">
    <Icon
      class="w-7 h-7"
      :color="color"
      :icon="icon"
    />
  </button>
</template>
