<script setup lang="ts">
import ProductListItem from './ProductListItem.vue';
import type { ProductReturnDto } from '@/api/swagger/data-contracts';

defineEmits<{
  clickAddToCart: [ProductReturnDto];
}>();

defineProps<{
  products: ProductReturnDto[];
}>();
</script>

<template>
  <div
    v-auto-animate
    class="grid grid-cols-4 gap-5"
  >
    <ProductListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @click-add-to-cart="$emit('clickAddToCart', product)"
    />
  </div>
</template>
