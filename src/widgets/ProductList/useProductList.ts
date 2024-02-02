import { api } from '@/api/apiInstance';
import type { GetProductsParams, ProductReturnDto } from '@/api/swagger/data-contracts';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useProductList = () => {
  const products = ref<ProductReturnDto[]>([]);
  const totalProductsCount = ref(0);
  const isLoading = ref(false);

  const loadProducts = async (params: GetProductsParams) => {
    try {
      isLoading.value = true;
      const response = await api.getProducts(params);
      products.value = response.products;
      totalProductsCount.value = response.totalCount;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isLoading.value = false;
    }
  };

  return { products, totalProductsCount, isLoading, loadProducts };
};
