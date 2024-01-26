import { toast } from 'vue3-toastify';
import { api } from '@/api/apiInstance';
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import { ref } from 'vue';
import { useProduct } from '@/composables/useProduct';

export const useLoadProductData = () => {
  const productRaw = ref<ProductReturnDto | null>(null);
  const isLoading = ref(false);

  const product = useProduct(productRaw);

  const loadProduct = async (id: string) => {
    try {
      isLoading.value = true;
      productRaw.value = await api.getProduct(id);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isLoading.value = false;
    }
  };

  return { product, isLoading, loadProduct };
};
