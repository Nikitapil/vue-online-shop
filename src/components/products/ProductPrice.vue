<script setup lang="ts">
import type { ProductReturnDto } from '@/api/swagger/data-contracts';

const props = defineProps<{
  product: Partial<ProductReturnDto>;
}>();
</script>

<template>
  <div
    v-if="props.product.discount"
    class="flex gap-2"
  >
    <p
      v-price="props.product.price"
      class="text-slate-400 line-through"
    ></p>
    <span class="text-red-900">-{{ props.product.discount.percentage }}%</span>
  </div>
  <b v-price="props.product.priceWithDiscount"></b>
</template>
