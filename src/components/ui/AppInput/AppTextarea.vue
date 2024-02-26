<script setup lang="ts">
const value = defineModel<string>();

const props = withDefaults(
  defineProps<{
    id: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    label: '',
    placeholder: '',
    disabled: false
  }
);
</script>

<template>
  <div class="w-full">
    <label
      v-if="props.label"
      class="text-sm font-medium"
      :for="id"
    >
      {{ props.label }}
    </label>

    <textarea
      :id="props.id"
      v-model="value"
      class="input resize-none"
      rows="4"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    ></textarea>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
