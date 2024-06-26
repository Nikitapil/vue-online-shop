import { computed } from 'vue';

import type { ComputedRef, Ref } from 'vue';
import type { ProductReturnDto } from '@/api/swagger/data-contracts';

export const useProduct = (product: Ref<ProductReturnDto | null>): ComputedRef<ProductReturnDto | null> => {
  return computed(() =>
    product.value
      ? {
          ...product.value,
          imageUrl: import.meta.env.VITE_API_BASE_URL + product.value?.imageUrl
        }
      : null
  );
};
