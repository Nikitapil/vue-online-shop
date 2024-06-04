<script setup lang="ts">
const props = defineProps<{
  title: string;
  value: string;
}>();
</script>

<template>
  <p>
    <span class="font-bold">{{ props.title }}:</span> {{ props.value }}
  </p>
</template>
