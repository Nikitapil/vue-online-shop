import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { api } from '@/api/apiInstance';

import type { CartReturnDto, CreateOrderDto } from '@/api/swagger/data-contracts';

import { useApiMethod } from '@/api/useApiMethod';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartReturnDto | null>(null);

  const { call: getCart, isLoading: isCartLoading } = useApiMethod(api.getCart);
  const { call: addToCartApi, isLoading: isAddToCartLoading } = useApiMethod(api.addToCart);
  const { call: removeFromCartApi, isLoading: isRemoveFromCartLoading } = useApiMethod(api.removeFromCart);
  const { call: createOrderApi, isLoading: isCreateOrderInProgress } = useApiMethod(api.createOrder);
  const { call: clearCartApi, isLoading: isClearCartInProgress } = useApiMethod(api.clearCart);

  const isChangeInCartCountInProgress = computed(
    () => isAddToCartLoading.value || isRemoveFromCartLoading.value || isClearCartInProgress.value
  );

  const loadCart = async () => {
    cart.value = await getCart();
  };

  const addToCart = async (productId: string) => {
    const response = await addToCartApi({ productId });
    if (response) {
      cart.value = response;
      return true;
    } else {
      return false;
    }
  };

  const removeFromCart = async (productInCartId: string) => {
    const response = await removeFromCartApi({ productInCartId });
    if (response) {
      cart.value = response;
      return true;
    } else {
      return false;
    }
  };

  const createOrder = async (orderData: CreateOrderDto) => {
    const response = await createOrderApi(orderData);
    if (response) {
      const { cart: cartResponse, order } = response;
      cart.value = cartResponse;
      return order.id;
    }
  };

  const clearCart = async () => {
    cart.value = await clearCartApi();
  };

  return {
    cart,
    isCartLoading,
    isChangeInCartCountInProgress,
    isCreateOrderInProgress,
    loadCart,
    addToCart,
    removeFromCart,
    createOrder,
    clearCart
  };
});
