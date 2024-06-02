<script setup lang="ts">
import { computed } from 'vue';

import { useProduct } from '@/composables/useProduct';

import type { ProductInOrderReturnDto } from '@/api/swagger/data-contracts';

import ProductDetails from '../../../components/products/ProductDetails.vue';

const props = defineProps<{
  product: ProductInOrderReturnDto;
}>();

const productRaw = computed(() => props.product.product);

const nativeProduct = useProduct(productRaw);
</script>

<template>
  <div class="border-b-2 border-black pb-2">
    <ProductDetails
      v-if="nativeProduct"
      :product="nativeProduct"
    />

    <p v-else>{{ $t('product_not_found') }}</p>

    <hr class="mb-2 mt-1 border-1" />

    <div class="flex">
      <p class="ml-auto font-bold">{{ $t('count') }}: {{ props.product.count }}</p>
    </div>
  </div>
</template>
