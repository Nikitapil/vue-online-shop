import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import { api } from '@/api/apiInstance';
import { useRoute } from 'vue-router';

export const useProductPageStore = defineStore('ProductPage', () => {
  const product = ref<ProductReturnDto | null>(null);
  const isProductLoading = ref(false);

  const route = useRoute();

  const productIdFromRoute = computed(() => route.params.id as string);

  const loadProduct = async () => {
    try {
      isProductLoading.value = true;
      product.value = await api.getProduct(productIdFromRoute.value);
    } catch (e) {
      product.value = null;
    } finally {
      isProductLoading.value = false;
    }
  };

  const init = async () => {
    await loadProduct();
  };

  return { product, isProductLoading, init };
});
