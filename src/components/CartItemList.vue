<!-- TODO Переделать этот компонент просто в cart и добавить сюда стор и прочее и обернуть его Drawer который сделать чито юи-->
<script setup lang="ts">
import CartItem from '@/components/CartItem.vue';
import type { IProduct } from '@/types/sneakers';

defineProps<{
  products: IProduct[];
}>();

defineEmits<{
  removeFromCart: [IProduct];
}>();
</script>

<template>
  <div
    v-auto-animate
    class="flex flex-col gap-4"
  >
    <CartItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @remove-from-cart="$emit('removeFromCart', product)"
    />
  </div>
</template>
