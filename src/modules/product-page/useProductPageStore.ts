import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import { api } from '@/api/apiInstance';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { type CreateReviewDto } from '../../api/swagger/data-contracts';

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

  const addProductReview = async (params: CreateReviewDto) => {
    if (!product.value) {
      return;
    }
    try {
      isAddProductReviewInProgress.value = true;
      await api.createReview(params);
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
