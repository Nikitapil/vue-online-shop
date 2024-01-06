<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  icon: string;
}>();
</script>

<template>
  <button class="hover:bg-gray-200 rounded transition duration-300">
    <Icon
      class="w-7 h-7"
      :icon="icon"
    />
  </button>
</template>
