import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import { api } from '@/api/apiInstance';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';

interface IAddReviewParams {
  rating: number;
  comment: string;
}

export const useProductPageStore = defineStore('ProductPage', () => {
  const product = ref<ProductReturnDto | null>(null);
  const isProductLoading = ref(false);
  const isDeleteInProgress = ref(false);
  const isAddProductReviewInProgress = ref(false);

  const route = useRoute();

  const productIdFromRoute = computed(() => route.params.id as string);

  const loadProduct = async () => {
    try {
      isProductLoading.value = true;
      product.value = await api.getProduct(productIdFromRoute.value);
    } catch (e) {
      product.value = null;
    } finally {
      isProductLoading.value = false;
    }
  };

  const deleteProduct = async () => {
    if (!product.value) {
      return;
    }
    try {
      isDeleteInProgress.value = true;
      await api.deleteProduct(product.value?.id);
      product.value = null;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isDeleteInProgress.value = false;
    }
  };

  const addProductReview = async ({ comment, rating }: IAddReviewParams) => {
    if (!product.value) {
      return;
    }
    try {
      isAddProductReviewInProgress.value = true;
      const review = await api.createReview({ productId: product.value.id, text: comment, rating });
      if (review) {
        product.value.canAddReview = false;
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isAddProductReviewInProgress.value = false;
    }
  };

  const init = async () => {
    await loadProduct();
  };

  return {
    product,
    isProductLoading,
    isDeleteInProgress,
    isAddProductReviewInProgress,
    init,
    deleteProduct,
    addProductReview
  };
});
