import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';

import { useApiMethod } from '@/api/useApiMethod';

import type { ProductReturnDto } from '@/api/swagger/data-contracts';

import { NO_DISCOUNTS } from '@/domain/discounts';
import { api } from '@/api/apiInstance';

export const useProductPageStore = defineStore('ProductPage', () => {
  const { isLoading: isEditProductDiscountInProgress, call: editProductDiscountApi } = useApiMethod(
    api.editProductDiscount
  );
  const { isLoading: isProductLoading, call: getProduct } = useApiMethod(api.getProduct);
  const { isLoading: isDeleteInProgress, call: deleteProductApi } = useApiMethod(api.deleteProduct);

  const product = ref<ProductReturnDto | null>(null);

  const route = useRoute();

  const productIdFromRoute = computed(() => route.params.id as string);

  const loadProduct = async () => {
    product.value = await getProduct(productIdFromRoute.value);
  };

  const deleteProduct = async () => {
    if (!product.value) {
      return;
    }
    await deleteProductApi(product.value?.id);
    product.value = null;
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
