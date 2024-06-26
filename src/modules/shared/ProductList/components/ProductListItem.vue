<script setup lang="ts">
import { computed } from 'vue';

import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import { ERoutesName } from '@/router';

import { useProduct } from '@/composables/useProduct';

import AddToCart from '@/modules/cart/components/AddToCart.vue';
import StarIcon from '@/components/ui/icons/StarIcon.vue';
import IconButton from '@/components/ui/IconButton.vue';
import ToggleFavouritesButton from '@/modules/shared/ToggleFavouriteButton/ToggleFavouritesButton.vue';
import ProductPrice from '@/components/products/ProductPrice.vue';

const props = defineProps<{
  product: ProductReturnDto;
}>();

const product = computed(() => props.product);

const productData = useProduct(product);
</script>

<template>
  <RouterLink
    v-if="productData"
    :to="{ name: ERoutesName.PRODUCT, params: { id: product.id } }"
    class="relative flex flex-col bg-white border border-slate-100 rounded-3xl p-8 pt-10 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition duration-300"
  >
    <div
      v-if="product.canAddToFavourites"
      class="absolute top-3 left-3"
    >
      <ToggleFavouritesButton
        v-if="product.canAddToFavourites"
        v-model="product"
        @click.prevent
      />
    </div>

    <div
      v-if="product.rating"
      class="absolute top-3 right-3 flex"
    >
      {{ product.rating }}
      <StarIcon />
    </div>

    <img
      v-if="productData.imageUrl"
      :src="productData.imageUrl"
      alt="product logo"
    />

    <h3 class="mt-auto text-xl font-bold">{{ productData.name }}</h3>

    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-slate-400">{{ $t('price') }}:</span>
        <ProductPrice :product="product" />
      </div>

      <AddToCart
        v-slot="{ clickHandler, isLoading }"
        :product-id="product.id"
        need-to-notify
      >
        <IconButton
          class="self-center border rounded-lg hover:border-black transition-all duration-300 hover:bg-transparent"
          icon="heroicons:plus"
          color="gray"
          :disabled="isLoading"
          @click.prevent="clickHandler"
        />
      </AddToCart>
    </div>
  </RouterLink>
</template>
