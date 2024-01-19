<script setup lang="ts">
import { useProductPageStore } from '@/modules/product-page/useProductPageStore';
import { onMounted } from 'vue';
import ProductDetails from '@/components/products/ProductDetails.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import { Icon } from '@iconify/vue';
import { useProduct } from '@/composables/useProduct';
import { storeToRefs } from 'pinia';

const store = useProductPageStore();

const { product: productFromStore } = storeToRefs(store);

const product = useProduct(productFromStore);

onMounted(() => {
  store.init();
});
</script>

<template>
  <div>
    <EmptyStateCentered v-if="store.isProductLoading">
      <RoundedLoader />
    </EmptyStateCentered>

    <EmptyStateCentered
      v-else-if="!store.product"
      class="flex-col gap-2"
    >
      <h2 class="text-2xl font-bold">Product not found</h2>
      <Icon
        icon="nonicons:not-found-16"
        color="gray"
        width="100"
        height="100"
      />
    </EmptyStateCentered>

    <ProductDetails
      v-else-if="product"
      :product="product"
    />
  </div>
</template>

<style></style>
