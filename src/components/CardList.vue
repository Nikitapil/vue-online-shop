<script setup lang="ts">
import Card from '@/components/Card.vue';
import type { IProduct } from '@/types/sneakers';

defineEmits<{
  clickFavourite: [IProduct];
  clickAddToCart: [IProduct];
}>();

defineProps<{
  products: IProduct[];
}>();
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="product in products"
      :key="product.id"
      :image-url="product.imageUrl"
      :title="product.title"
      :price="product.price"
      :is-added="product.isAdded"
      :is-favorite="product.isFavorite"
      @click-favourite="$emit('clickFavourite', product)"
      @click-add-to-cart="$emit('clickAddToCart', product)"
    />
  </div>
</template>
