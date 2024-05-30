<script setup lang="ts">
import { toRef } from 'vue';

import { useProduct } from '@/composables/useProduct';

import type { ProductInCartReturnDto } from '@/api/swagger/data-contracts';

import IconButton from '@/components/ui/IconButton.vue';
import AddToCart from './AddToCart.vue';
import ProductPrice from '@/components/products/ProductPrice.vue';
import { ERoutesName } from '@/router';

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
      <RouterLink
        :to="{ name: ERoutesName.PRODUCT, params: { id: product.id } }"
        class="hover:underline"
      >
        {{ product.name }}
      </RouterLink>

      <div class="text-sm">
        <ProductPrice :product="product" />
      </div>
    </div>

    <div class="ml-auto flex gap-4">
      <IconButton
        class="border"
        icon="mynaui:minus"
        :disabled="props.isRemovingInProgress"
        @click="$emit('removeFromCart')"
      />

      <p>{{ props.productInCart.count }}</p>

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
    </div>
  </div>
</template>
