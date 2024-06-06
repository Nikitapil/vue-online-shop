import { ref } from 'vue';

import { useProduct } from '@/composables/useProduct';
import { useApiMethod } from '@/api/useApiMethod';

import type { ProductReturnDto } from '@/api/swagger/data-contracts';

import { api } from '@/api/apiInstance';

export const useLoadProductData = () => {
  const productRaw = ref<ProductReturnDto | null>(null);

  const { call: getProduct, isLoading } = useApiMethod(api.getProduct);

  const product = useProduct(productRaw);

  const loadProduct = async (id: string) => {
    productRaw.value = await getProduct(id);
  };

  return { product, isLoading, loadProduct };
};
