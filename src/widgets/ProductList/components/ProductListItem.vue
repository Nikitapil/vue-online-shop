<script setup lang="ts">
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import IconButton from '@/components/ui/IconButton.vue';
import { useProduct } from '@/composables/useProduct';
import AddToCart from '@/modules/cart/components/AddToCart.vue';
import { ERoutesName } from '@/router';
import ToggleFavouritesButton from '@/widgets/ToggleFavouriteButton/ToggleFavouritesButton.vue';
import { toRefs } from 'vue';

const props = defineProps<{
  product: ProductReturnDto;
}>();

const { product } = toRefs(props);

const productData = useProduct(product);
</script>

<template>
  <RouterLink
    v-if="productData"
    :to="{ name: ERoutesName.PRODUCT, params: { id: product.id } }"
    class="relative flex flex-col bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition duration-300"
  >
    <ToggleFavouritesButton
      v-model="product"
      class="absolute top-3 left-3"
      @click.prevent
    />

    <img
      v-if="productData.imageUrl"
      :src="productData.imageUrl"
      alt="Sneaker"
    />

    <h3 class="mt-auto text-xl font-bold">{{ productData.name }}</h3>

    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b v-price="product.price"></b>
      </div>
      <AddToCart
        v-slot="{ clickHandler, isLoading }"
        :product-id="product.id"
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
