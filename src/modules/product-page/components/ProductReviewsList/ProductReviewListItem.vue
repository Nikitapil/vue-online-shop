<script setup lang="ts">
import type { ProductReviewReturnDto } from '@/api/swagger/data-contracts';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { computed } from 'vue';

const props = defineProps<{
  review: ProductReviewReturnDto;
}>();

const date = computed(() => new Date(props.review.createdAt).toLocaleDateString());
</script>

<template>
  <div class="border-b">
    <h2 class="font-bold">
      <span class="font-normal italic">{{ date }}</span> {{ props.review.authorName }}:
    </h2>
    <div class="flex items-center pl-2">
      <p>{{ review.rating }}</p>
      <Icon
        class="w-7 h-7"
        icon="ant-design:star-filled"
        color="#e4d828"
      />
    </div>
    <p class="pl-2">{{ props.review.text }}</p>
  </div>
</template>
