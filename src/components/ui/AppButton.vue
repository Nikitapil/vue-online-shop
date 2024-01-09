<script setup lang="ts">
withDefaults(
  defineProps<{
    appearance?: 'primary' | 'secondary' | 'success' | 'transparent' | 'danger';
    type?: 'button' | 'submit';
    disabled?: boolean;
  }>(),
  {
    appearance: 'transparent',
    type: 'button',
    disabled: false
  }
);
</script>

<template>
  <button
    class="py-1.5 px-4 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 rounded-md transition duration-300"
    :class="appearance"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.primary {
  @apply bg-blue-500 text-white;
}

.secondary {
  @apply bg-black text-white;
}

.success {
  @apply bg-green-500 text-white;
}

.transparent {
  @apply bg-transparent border border-black hover:bg-gray-100;
}

.danger {
  @apply bg-red-600 text-white;
}
</style>
