<script setup lang="ts">
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import { useLoadProductData } from '../composables/useLoadProductData';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import type { IProductForm } from '../types';
import { createFileFromString } from '@/helpers/files';
import ProductForm from '../components/ProductForm.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import ProductNotFound from '@/components/products/ProductNotFound.vue';

const route = useRoute();

const { product, isLoading, loadProduct } = useLoadProductData();

const initialImageFile = ref<File | null>(null);

const initialValues = computed<IProductForm>(() => ({
  name: product.value?.name || '',
  description: product.value?.description || '',
  categoryId: product.value?.categoryId || '',
  price: product.value?.price.toString() || '',
  image: initialImageFile.value
}));

onMounted(async () => {
  await loadProduct(route.params.id as string);
  if (product.value) {
    initialImageFile.value = await createFileFromString(product.value.imageUrl);
  }
});
</script>

<template>
  <AuthProtected>
    <EmptyStateCentered v-if="isLoading">
      <RoundedLoader />
    </EmptyStateCentered>
    <ProductForm
      v-else-if="product"
      title="Edit product"
      :is-loading="isLoading"
      :initial-values="initialValues"
    />
    <ProductNotFound v-else />
  </AuthProtected>
</template>
