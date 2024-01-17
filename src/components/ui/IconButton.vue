<script setup lang="ts">
import { Icon } from '@iconify/vue';

withDefaults(
  defineProps<{
    icon: string;
    color?: string;
    disabled?: boolean;
  }>(),
  {
    color: 'black',
    disabled: false
  }
);
</script>

<template>
  <button
    class="hover:bg-gray-200 rounded transition duration-300 disabled:opacity-60"
    :disabled="disabled"
  >
    <Icon
      class="w-7 h-7"
      :color="color"
      :icon="icon"
    />
  </button>
</template>
