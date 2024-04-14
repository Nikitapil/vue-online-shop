import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { EditProductDiscountDto, ProductReturnDto } from '@/api/swagger/data-contracts';
import { api } from '@/api/apiInstance';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useApiMethod } from '@/api/useApiMethod';
import { NO_DISCOUNTS } from '@/domain/discounts';

export const useProductPageStore = defineStore('ProductPage', () => {
  const { isLoading: isEditProductDiscountInProgress, call: editProductDiscountApi } = useApiMethod(
    api.editProductDiscount
  );

  const product = ref<ProductReturnDto | null>(null);
  const isProductLoading = ref(false);
  const isDeleteInProgress = ref(false);

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

  const editProductDiscount = async (discountIdFromForm: string) => {
    if (!product.value) {
      return;
    }
    const discountId = discountIdFromForm === NO_DISCOUNTS ? null : discountIdFromForm;
    await editProductDiscountApi({ productId: product.value.id, discountId });
    await loadProduct();
  };

  const init = async () => {
    await loadProduct();
  };

  return {
    product,
    isProductLoading,
    isDeleteInProgress,
    isEditProductDiscountInProgress,
    init,
    deleteProduct,
    editProductDiscount
  };
});
