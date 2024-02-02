<script setup lang="ts">
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import { useProduct } from '@/composables/useProduct';
import { ERoutesName } from '@/router';
import ToggleFavouritesButton from '@/widgets/ToggleFavouriteButton/ToggleFavouritesButton.vue';
import { toRefs } from 'vue';

defineEmits<{
  clickAddToCart: [];
}>();

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
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition duration-300"
  >
    <ToggleFavouritesButton
      v-model="product"
      class="absolute top-8 left-8"
    />

    <img
      v-if="productData.imageUrl"
      :src="productData.imageUrl"
      alt="Sneaker"
    />

    <p class="mt-2">{{ productData.name }}</p>

    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b v-price="product.price"></b>
      </div>
      <!--    TODO add to cart button-->
      <button @click.stop="$emit('clickAddToCart')">
        <img
          :src="'/plus.svg'"
          :alt="'Plus'"
        />
      </button>
    </div>
  </RouterLink>
</template>
