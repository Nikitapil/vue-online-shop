<script setup lang="ts">
import type { IProduct } from '@/types/sneakers';

defineProps<{
  product: IProduct;
}>();

defineEmits<{
  removeFromCart: [];
}>();
</script>

<template>
  <div class="flex justify-between items-center gap-3 w-full border border-slate-200 p-4 rounded-xl">
    <img
      class="w-16 h-16"
      :src="product.imageUrl"
      alt="Sneaker"
    />
    <div class="flex flex-col gap-2">
      <p>{{ product.title }}</p>
      <!--      TODO buttons for increase count and decrease count-->
      <div class="flex justify-between">
        <b>{{ product.price }}₽</b>
        <button @click="$emit('removeFromCart')">
          <img
            class="opacity-50 hover:opacity-100 transition duration-300"
            src="/close.svg"
            alt="cross"
          />
        </button>
      </div>
    </div>
  </div>
</template>
