<script setup lang="ts">
import Card from '@/components/Card.vue';
import type { IProduct } from '@/types/sneakers';

const onClickAdd = () => alert(111);

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
      :is-added="true"
      :is-favorite="true"
      @click-add="onClickAdd"
    />
  </div>
</template>
