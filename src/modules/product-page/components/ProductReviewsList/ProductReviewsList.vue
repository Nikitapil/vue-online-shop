<script setup lang="ts">
import ProductsPagination from '@/components/products/ProductsPagination.vue';
import type { ProductReviewReturnDto } from '@/api/swagger/data-contracts';
import { ref } from 'vue';

const props = defineProps<{
  reviews: ProductReviewReturnDto[];
  totalCount: number;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  loadReviews: [{ page: number; limit: number }];
}>();

const page = ref(1);
const limitValue = ref('10');

const onPaginate = () => {
  emit('loadReviews', { page: page.value, limit: +limitValue.value });
};

const onChangePage = (newPage: number) => {
  page.value = newPage;
  onPaginate();
};

const onChangeLimit = () => {
  page.value = 1;
  onPaginate();
};
</script>

<template>
  <div>
    <ProductsPagination
      v-model:limit-value="limitValue"
      :current-page="page"
      :total-products-count="props.totalCount"
      :is-loading="props.isLoading"
      @change-page="onChangePage"
      @change-limit="onChangeLimit"
    />
  </div>
</template>
