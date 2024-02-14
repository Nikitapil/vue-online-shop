<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { useCartStore } from '../cartStore';

const store = useCartStore();

const props = withDefaults(
  defineProps<{
    productId: string;
    needToNotify?: boolean;
  }>(),
  {
    needToNotify: false
  }
);

const addToCart = async () => {
  const isAdded = await store.addToCart(props.productId);
  if (isAdded && props.needToNotify) {
    toast.success('Added to cart');
  }
};
</script>

<template>
  <slot
    :clickHandler="addToCart"
    :isLoading="store.isCartLoading || store.isAddToCartInProgress"
  />
</template>
