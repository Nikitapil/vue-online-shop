<script setup lang="ts">
defineProps<{
  title: string;
  imageUrl: string;
  description: string;
}>();
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <img
      class="h-40"
      :src="imageUrl"
      alt="empty state icon"
    />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-slate-500 mt-2">{{ description }}</p>
  </div>
</template>
