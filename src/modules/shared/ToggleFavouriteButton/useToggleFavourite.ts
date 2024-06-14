import { type Ref } from 'vue';

import { api } from '@/api/apiInstance';

import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import { useApiMethod } from '@/api/useApiMethod';

export const useToggleFavourite = (product: Ref<ProductReturnDto>) => {
  const { isLoading, call: toggleFavorites } = useApiMethod(api.toggleFavorites);

  const toggleFavourite = async () => {
    const response = await toggleFavorites({ productId: product.value.id });
    if (response) {
      product.value.isInFavorites = response.isInFavorites;
    }
  };

  return { isLoading, toggleFavourite };
};
