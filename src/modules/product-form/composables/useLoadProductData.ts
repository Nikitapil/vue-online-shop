import { toast } from 'vue3-toastify';
import { api } from '@/api/apiInstance';
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import { ref } from 'vue';

export const useLoadProductData = () => {
  const product = ref<ProductReturnDto | null>(null);
  const isLoading = ref(false);

  const loadProduct = async (id: string) => {
    try {
      isLoading.value = true;
      product.value = await api.getProduct(id);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isLoading.value = false;
    }
  };

  return { product, isLoading, loadProduct };
};
