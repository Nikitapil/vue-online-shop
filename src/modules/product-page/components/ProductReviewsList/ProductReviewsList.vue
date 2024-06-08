<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useProductReviewsListStore } from './useProductReviewsListStore';

import { EPaginationLimits } from '@/domain/components';

import ProductReviewListItem from './ProductReviewListItem.vue';
import RoundedLoader from '../../../../components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '../../../../components/ui/EmptyStateCentered.vue';
import ProductReviewForm from './ProductReviewForm.vue';
import ProductsPagination from '@/components/products/ProductsPagination.vue';

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
      class="mb-2"
      :is-loading="store.isAddReviewInProgress"
      @add-review="store.addProductReview"
    />

    <div
      v-if="store.reviews.length"
      class="p-3 bg-gray-100 rounded-md mb-2"
    >
      <ProductReviewListItem
        v-for="review in store.reviews"
        :key="review.id"
        :review="review"
        :is-delete-review-in-progress="store.isDeleteReviewInProgress"
        class="mb-3"
        @delete="store.deleteProductReview(review.id)"
      />
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
