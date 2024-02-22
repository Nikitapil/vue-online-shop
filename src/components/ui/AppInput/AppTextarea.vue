<script setup lang="ts">
const value = defineModel<string>();

const props = withDefaults(
  defineProps<{
    id: string;
    label?: string;
    placeholder?: string;
  }>(),
  {
    label: '',
    placeholder: ''
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
    ></textarea>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
