<script setup lang="ts">
const value = defineModel<string>({ required: true });

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
      class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
      type="text"
      placeholder="Search"
      @input="$emit('input', value)"
    />
  </div>
</template>
