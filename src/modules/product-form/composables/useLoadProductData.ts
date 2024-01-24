import { toast } from 'vue3-toastify';
import { api } from '@/api/apiInstance';
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import { ref } from 'vue';

export const useLoadProductData = () => {
  const product = ref<ProductReturnDto | null>(null);

  const loadProduct = async (id: string) => {
    try {
      product.value = await api.getProduct(id);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    }
  };

  return { product, loadProduct };
};
