<script setut lang="ts">
import ProductsPagination from '../../../../components/products/ProductsPagination.vue';
import type { ProductReviewReturnDto } from '@/api/swagger/data-contracts';
import { ref } from 'vue';

const props = defineProps<{
  reviews: ProductReviewReturnDto[];
  totalCount: number;
}>();

const page = ref(1);
const limitValue = ref('10');
</script>

<template>
  <div></div>
</template>
