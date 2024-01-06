<script lang="ts" setup>
const value = defineModel();

withDefaults(
  defineProps<{
    id: string;
    type?: 'text' | 'password';
    label?: string;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    type: 'text',
    label: '',
    disabled: false,
    placeholder: ''
  }
);
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      class="text-sm font-medium"
      :for="id"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="value"
      class="w-full border outline-0 focus-visible:border-black py-1 px-2 rounded-md disabled:bg-gray-100 transition duration-300"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>
