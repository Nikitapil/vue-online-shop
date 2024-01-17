import { ref } from 'vue';
import { api } from '@/api/apiInstance';
import type { CreateProductBody } from '@/api/swagger/data-contracts';
import { toast } from 'vue3-toastify';

export const useCreateProduct = () => {
  const isLoading = ref(false);

  const createProduct = async (data: CreateProductBody) => {
    isLoading.value = true;
    try {
      const product = await api.createProduct(data);
      return product;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    createProduct
  };
};
