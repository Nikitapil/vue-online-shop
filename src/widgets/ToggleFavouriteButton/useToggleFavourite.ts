import { api } from '@/api/apiInstance';
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import { ref, type Ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useToggleFavourite = (product: Ref<ProductReturnDto>) => {
  const isLoading = ref(false);

  const toggleFavourite = async () => {
    isLoading.value = true;
    try {
      const { isInFavorites } = await api.toggleFavorites({ productId: product.value.id });
      product.value.isInFavorites = isInFavorites;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, toggleFavourite };
};
