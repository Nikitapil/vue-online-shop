<script setup lang="ts">
const props = defineProps<{
  errorMessage: string;
}>();
</script>

<template>
  <p
    class="text-sm text-red-500"
    data-testid="error-message"
  >
    {{ props.errorMessage }}
  </p>
</template>
