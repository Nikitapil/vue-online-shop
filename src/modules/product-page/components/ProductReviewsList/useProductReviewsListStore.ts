import { defineStore } from 'pinia';
import { api } from '@/api/apiInstance';
import { toast } from 'vue3-toastify';
import { ref } from 'vue';
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
  const isReviewsLoading = ref(false);
  const isAddReviewInProgress = ref(false);
  const isDeleteReviewInProgress = ref(false);
  const reviews = ref<ProductReviewReturnDto[]>([]);
  const totalCount = ref(0);
  const isReviewAdded = ref(false);

  const getProductReviews = async ({ page, limit }: IGetProductReviewsParams) => {
    if (productId.value === null) {
      return;
    }
    try {
      isReviewsLoading.value = true;
      const { reviews: reviewsResponse, totalCount: totalCountResponse } = await api.getReviews({
        productId: productId.value,
        page,
        limit
      });
      reviews.value = reviewsResponse;
      totalCount.value = totalCountResponse;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isReviewsLoading.value = false;
    }
  };

  const addProductReview = async ({ comment, rating }: IAddReviewParams) => {
    if (productId.value === null) {
      return;
    }
    try {
      isAddReviewInProgress.value = true;
      const review = await api.createReview({ productId: productId.value, text: comment, rating });
      if (review) {
        isReviewAdded.value = true;
      }
      await getProductReviews({ page: 1, limit: 10 });
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isAddReviewInProgress.value = false;
    }
  };

  const deleteProductReview = async (id: string) => {
    if (productId.value === null) {
      return;
    }
    try {
      isDeleteReviewInProgress.value = true;
      await api.deleteReview(id);
      await getProductReviews({ page: 1, limit: 10 });
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isDeleteReviewInProgress.value = false;
    }
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
