import { api } from '@/api/apiInstance';
import type { UpdateProductBody } from '@/api/swagger/data-contracts';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useEditProduct = () => {
  const isLoading = ref(false);

  const editProduct = async (data: UpdateProductBody) => {
    isLoading.value = true;
    try {
      const product = await api.editProduct(data);
      return product;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    editProduct
  };
};
