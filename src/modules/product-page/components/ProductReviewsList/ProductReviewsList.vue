<script setup lang="ts">
import EmptyStateCentered from '../../../../components/ui/EmptyStateCentered.vue';
import ProductReviewForm from './ProductReviewForm.vue';
import ProductsPagination from '@/components/products/ProductsPagination.vue';
import { onMounted, ref } from 'vue';
import { EPaginationLimits } from '@/domain/components';
import { useProductReviewsListStore } from './useProductReviewsListStore';

const store = useProductReviewsListStore();

const props = defineProps<{
  canAddReview: boolean;
  productId: string;
}>();

const page = ref(1);
const limitValue = ref(EPaginationLimits.TEN);

const onLoadReviews = () => {
  store.getProductReviews({ page: page.value, limit: +limitValue.value });
};

onMounted(() => {
  store.init(props.productId);
});
</script>

<template>
  <EmptyStateCentered v-if="store.isReviewsLoading">
    <RoundedLoader />
  </EmptyStateCentered>
  <div v-else>
    <ProductReviewForm
      v-if="props.canAddReview && !store.isReviewAdded"
      :is-loading="store.isAddReviewInProgress"
      @add-review="store.addProductReview"
    />
    <div
      v-for="review in store.reviews"
      :key="review.id"
    >
      {{ review.text }}
    </div>
    <ProductsPagination
      v-model:limit-value="limitValue"
      v-model:page="page"
      :total-count="store.totalCount"
      :is-loading="store.isReviewsLoading"
      @paginate="onLoadReviews"
    />
  </div>
</template>
