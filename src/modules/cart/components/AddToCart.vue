<script setup lang="ts">
import { useCartStore } from '../cartStore';

const store = useCartStore();

const props = defineProps<{
  productId: string;
}>();

const addToCart = () => {
  store.addToCart(props.productId);
};
</script>

<template>
  <slot
    :clickHandler="addToCart"
    :isLoading="store.isCartLoading || store.isAddToCartInProgress"
  />
</template>
