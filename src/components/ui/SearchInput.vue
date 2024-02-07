<script setup lang="ts">
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
    <img
      class="absolute left-3 top-3.5"
      src="/search.svg"
      alt="Search icon"
    />
    <input
      v-model="value"
      class="border rounded-md py-2 pl-10 h-11 pr-4 outline-none focus:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
      type="text"
      :disabled="disabled"
      placeholder="Search"
      @input="$emit('input', value)"
    />
  </div>
</template>
