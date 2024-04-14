<script setup lang="ts">
import type { DiscountReturnDto } from '@/api/swagger/data-contracts';

const props = defineProps<{
  discount: DiscountReturnDto;
}>();
</script>

<template>
  <div class="border rounded-xl p-2">
    <h3 class="font-semibold mb-1">{{ props.discount.name }}</h3>
    <p>Discount percent: {{ props.discount.percentage }}%</p>
    <p class="text-sm text-slate-600">Products count: {{ props.discount.productsCount }}</p>
  </div>
</template>
