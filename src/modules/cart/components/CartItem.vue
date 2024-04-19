<script setup lang="ts">
import type { ProductInCartReturnDto } from '@/api/swagger/data-contracts';
import IconButton from '@/components/ui/IconButton.vue';
import { useProduct } from '@/composables/useProduct';
import { toRef } from 'vue';
import AddToCart from './AddToCart.vue';
import ProductPrice from '@/components/products/ProductPrice.vue';

const props = withDefaults(
  defineProps<{
    productInCart: ProductInCartReturnDto;
    isRemovingInProgress?: boolean;
  }>(),
  {
    isRemovingInProgress: false
  }
);

defineEmits<{
  removeFromCart: [];
}>();

const product = useProduct(toRef(props.productInCart.product));
</script>

<template>
  <div
    v-if="product"
    class="flex items-center gap-3 w-full border border-slate-200 p-4 rounded-xl"
  >
    <img
      class="w-16 h-16"
      :src="product.imageUrl"
      alt="product img"
    />

    <div class="flex flex-col gap-2">
      <p>{{ product.name }}</p>
      <div class="text-sm">
        <ProductPrice :product="product" />
      </div>
    </div>

    <div class="ml-auto flex gap-4">
      <AddToCart
        v-slot="{ clickHandler, isLoading }"
        :product-id="product.id"
      >
        <IconButton
          class="border"
          icon="mynaui:plus"
          :disabled="isLoading"
          @click="clickHandler"
        />
      </AddToCart>
      <p>{{ props.productInCart.count }}</p>
      <IconButton
        class="border"
        icon="mynaui:minus"
        :disabled="props.isRemovingInProgress"
        @click="$emit('removeFromCart')"
      />
    </div>
  </div>
</template>
