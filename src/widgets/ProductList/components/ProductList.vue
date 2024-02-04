<script setup lang="ts">
import RoundedLoader from '../../../components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import ProductListItem from './ProductListItem.vue';
import type { ProductReturnDto } from '@/api/swagger/data-contracts';

defineEmits<{
  clickAddToCart: [ProductReturnDto];
}>();

defineProps<{
  products: ProductReturnDto[];
  isLoading: boolean;
}>();
</script>

<template>
  <EmptyStateCentered v-if="isLoading">
    <RoundedLoader />
  </EmptyStateCentered>

  <EmptyStateCentered v-else-if="!products.length">
    <p class="text-2xl">Products not found</p>
  </EmptyStateCentered>

  <div
    v-else
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
