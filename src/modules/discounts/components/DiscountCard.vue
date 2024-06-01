<script setup lang="ts">
import type { DiscountReturnDto } from '@/api/swagger/data-contracts';
import { ERoutesName } from '@/router';

const props = defineProps<{
  discount: DiscountReturnDto;
}>();
</script>

<template>
  <RouterLink
    :to="{ name: ERoutesName.SINGLE_DISCOUNT, params: { id: discount.id } }"
    class="border block rounded-xl p-2 hover:bg-black/5 transition-all duration-300"
  >
    <h3 class="font-semibold mb-1">{{ props.discount.name }}</h3>

    <p>{{ $t('discount_percent') }}: {{ props.discount.percentage }}%</p>

    <p class="text-sm text-slate-600">{{ $t('products_count') }}: {{ props.discount.productsCount }}</p>
  </RouterLink>
</template>
