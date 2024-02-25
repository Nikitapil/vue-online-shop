import { api } from '@/api/apiInstance';
import type { CartReturnDto, CreateOrderDto } from '@/api/swagger/data-contracts';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartReturnDto | null>(null);
  const isCartLoading = ref(false);
  const isChangeInCartCountInProgress = ref(false);
  const isCreateOrderInProgress = ref(false);

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
      isChangeInCartCountInProgress.value = true;
      cart.value = await api.addToCart({ productId });
      return true;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
      return false;
    } finally {
      isChangeInCartCountInProgress.value = false;
    }
  };

  const removeFromCart = async (productInCartId: string) => {
    try {
      isChangeInCartCountInProgress.value = true;
      cart.value = await api.removeFromCart({ productInCartId });
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isChangeInCartCountInProgress.value = false;
    }
  };

  const createOrder = async (orderData: CreateOrderDto) => {
    try {
      isCreateOrderInProgress.value = true;
      const { cart: cartResponse } = await api.createOrder(orderData);
      cart.value = cartResponse;
      return true;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
      return false;
    } finally {
      isCreateOrderInProgress.value = false;
    }
  };

  return {
    cart,
    isCartLoading,
    isChangeInCartCountInProgress,
    isCreateOrderInProgress,
    loadCart,
    addToCart,
    removeFromCart,
    createOrder
  };
});
