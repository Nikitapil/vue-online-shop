import { api } from '@/api/apiInstance';
import type { CartReturnDto } from '@/api/swagger/data-contracts';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartReturnDto | null>(null);
  const isCartLoading = ref(false);
  const isAddToCartInProgress = ref(false);

  const loadCart = async () => {
    try {
      isCartLoading.value = true;
      cart.value = await api.getCart();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isCartLoading.value = false;
    }
  };

  const addToCart = async (productId: string) => {
    try {
      isAddToCartInProgress.value = true;
      cart.value = await api.addToCart({ productId });
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isAddToCartInProgress.value = false;
    }
  };

  return { cart, isCartLoading, isAddToCartInProgress, loadCart, addToCart };
});
