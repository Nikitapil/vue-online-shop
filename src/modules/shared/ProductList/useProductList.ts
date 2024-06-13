import { api } from '@/api/apiInstance';
import type {
  GetFavoriteProductsParams,
  GetProductsParams,
  GetProductsReturnDto,
  ProductReturnDto
} from '@/api/swagger/data-contracts';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useProductList = () => {
  const products = ref<ProductReturnDto[]>([]);
  const totalProductsCount = ref(0);
  const isLoading = ref(false);

  const callGetProductsMethod = async (method: () => Promise<GetProductsReturnDto>) => {
    try {
      isLoading.value = true;
      const response = await method();
      products.value = response.products;
      totalProductsCount.value = response.totalCount;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isLoading.value = false;
    }
  };

  const loadProducts = async (params: GetProductsParams) => {
    await callGetProductsMethod(() => api.getProducts(params));
  };

  const loadFavoriteProducts = async (params: GetFavoriteProductsParams) => {
    await callGetProductsMethod(() => api.getFavoriteProducts(params));
  };

  return { products, totalProductsCount, isLoading, loadProducts, loadFavoriteProducts };
};
