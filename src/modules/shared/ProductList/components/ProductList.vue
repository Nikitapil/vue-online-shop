<script setup lang="ts">
import type { ProductReturnDto } from '@/api/swagger/data-contracts';

import RoundedLoader from '../../../../components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import ProductListItem from './ProductListItem.vue';

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
    <p class="text-2xl">{{ $t('no_products') }}</p>
  </EmptyStateCentered>

  <div
    v-else
    class="grid gap-3 sm:grid-cols-[repeat(auto-fill,270px)] justify-between"
  >
    <ProductListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
