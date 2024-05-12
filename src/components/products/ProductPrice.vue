<script setup lang="ts">
import type { ProductReturnDto } from '@/api/swagger/data-contracts';

import Price from '@/modules/app/components/Price.vue';

const props = defineProps<{
  product: Partial<ProductReturnDto>;
}>();
</script>

<template>
  <div
    v-if="props.product.discount"
    class="flex gap-2"
    data-testid="discount-block"
  >
    <Price
      v-if="props.product.price"
      class="text-slate-400 line-through"
      data-testid="original-price"
      :price="props.product.price"
    />

    <span
      class="text-red-900"
      data-testid="discount-percentage"
    >
      -{{ props.product.discount.percentage }}%
    </span>
  </div>

  <Price
    v-if="props.product.priceWithDiscount"
    tag="b"
    :price="props.product.priceWithDiscount"
  />
</template>
