<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useLoadProductData } from '../composables/useLoadProductData';
import { useEditProduct } from '../composables/useEditProduct';
import { createFileFromString } from '@/helpers/files';

import type { IProductForm } from '../types';
import { type CreateProductBody, UserReturnDtoRolesEnum } from '@/api/swagger/data-contracts';
import { ERoutesName } from '@/router';

import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import ProductNotFound from '@/components/products/ProductNotFound.vue';
import ProductForm from '../components/ProductForm.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';

const route = useRoute();
const router = useRouter();

const { product, isLoading, loadProduct } = useLoadProductData();

const { editProduct, isLoading: isEditProductInProgress } = useEditProduct();

const initialImageFile = ref<File | null>(null);

const productId = computed(() => route.params.id as string);

const initialValues = computed<IProductForm>(() => ({
  name: product.value?.name || '',
  description: product.value?.description || '',
  categoryId: product.value?.categoryId || '',
  price: product.value?.price.toString() || '',
  image: initialImageFile.value
}));

const onEditProduct = async (data: CreateProductBody) => {
  const updatedProduct = await editProduct({ ...data, id: productId.value });

  if (updatedProduct) {
    router.push({ name: ERoutesName.PRODUCT, params: { id: updatedProduct.id } });
  }
};

onMounted(async () => {
  await loadProduct(productId.value);
  if (product.value) {
    initialImageFile.value = await createFileFromString(product.value.imageUrl);
  }
});
</script>

<template>
  <AuthProtected :admitted-roles="[UserReturnDtoRolesEnum.ADMIN]">
    <EmptyStateCentered v-if="isLoading">
      <RoundedLoader />
    </EmptyStateCentered>

    <ProductForm
      v-else-if="product && initialImageFile"
      title="Edit product"
      :is-loading="isEditProductInProgress"
      :initial-values="initialValues"
      @save="onEditProduct"
    />

    <ProductNotFound v-else />
  </AuthProtected>
</template>
