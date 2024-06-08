import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useApiMethod } from '@/api/useApiMethod';

import { api } from '@/api/apiInstance';

import type { ProductReviewReturnDto } from '@/api/swagger/data-contracts';

interface IAddReviewParams {
  rating: number;
  comment: string;
}

interface IGetProductReviewsParams {
  page: number;
  limit: number;
}

export const useProductReviewsListStore = defineStore('ProductReviews', () => {
  const productId = ref<string | null>(null);
  const reviews = ref<ProductReviewReturnDto[]>([]);
  const totalCount = ref(0);
  const isReviewAdded = ref(false);

  const { call: getReviews, isLoading: isReviewsLoading } = useApiMethod(api.getReviews);
  const { call: addReview, isLoading: isAddReviewInProgress } = useApiMethod(api.createReview);
  const { call: deleteReview, isLoading: isDeleteReviewInProgress } = useApiMethod(api.deleteReview);

  const getProductReviews = async ({ page, limit }: IGetProductReviewsParams) => {
    if (productId.value === null) {
      return;
    }

    const response = await getReviews({
      productId: productId.value,
      page,
      limit
    });

    reviews.value = response?.reviews || [];
    totalCount.value = response?.totalCount || 0;
  };

  const addProductReview = async ({ comment, rating }: IAddReviewParams) => {
    if (productId.value === null) {
      return;
    }
    const review = await addReview({ productId: productId.value, text: comment, rating });

    if (review) {
      isReviewAdded.value = true;
    }

    await getProductReviews({ page: 1, limit: 10 });
  };

  const deleteProductReview = async (id: string) => {
    if (productId.value === null) {
      return;
    }

    await deleteReview(id);
    await getProductReviews({ page: 1, limit: 10 });

    isReviewAdded.value = false;
  };

  const init = (productIdParam: string) => {
    productId.value = productIdParam;
    getProductReviews({ page: 1, limit: 10 });
  };

  return {
    reviews,
    totalCount,
    isReviewsLoading,
    isAddReviewInProgress,
    isDeleteReviewInProgress,
    isReviewAdded,
    init,
    getProductReviews,
    addProductReview,
    deleteProductReview
  };
});
