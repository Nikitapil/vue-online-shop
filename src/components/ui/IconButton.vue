<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = withDefaults(
  defineProps<{
    icon: string;
    color?: string;
    disabled?: boolean;
    type?: 'button' | 'submit';
  }>(),
  {
    color: 'black',
    disabled: false,
    type: 'button'
  }
);
</script>

<template>
  <button
    class="hover:bg-gray-200 rounded transition duration-300 disabled:opacity-60"
    :type="props.type"
    :disabled="disabled"
  >
    <Icon
      class="w-7 h-7"
      :color="color"
      :icon="icon"
    />
  </button>
</template>
