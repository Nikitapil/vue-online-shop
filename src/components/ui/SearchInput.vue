<script setup lang="ts">
import { Icon } from '@iconify/vue';

const value = defineModel<string>({ required: true });

withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false
  }
);

defineEmits<{
  input: [string];
}>();
</script>

<template>
  <div class="relative">
    <Icon
      class="absolute left-3 top-3 w-5 h-5"
      color="#E4E4E4"
      icon="fluent:search-12-filled"
    />

    <input
      v-model="value"
      class="border rounded-md py-2 pl-10 h-11 pr-4 outline-none focus:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
      type="text"
      data-testid="search-input"
      :disabled="disabled"
      :placeholder="$t('search')"
      @input="$emit('input', value)"
    />
  </div>
</template>
