<script setup lang="ts">
import Price from '@/modules/app/components/Price.vue';

const props = defineProps<{
  label: string;
  price: number;
}>();
</script>

<template>
  <div class="flex gap-2">
    <span>{{ props.label }}: </span>
    <div class="flex-1 border-b border-dashed"></div>
    <Price
      tag="b"
      :price="props.price"
    />
  </div>
</template>
