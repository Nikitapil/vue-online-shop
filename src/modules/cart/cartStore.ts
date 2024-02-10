import { api } from '@/api/apiInstance';
import type { CartReturnDto } from '@/api/swagger/data-contracts';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartReturnDto | null>(null);
  const isCartLoading = ref(false);

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

  return { cart, loadCart };
});
