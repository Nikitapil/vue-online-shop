<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useCreateProduct } from '@/modules/product-form/composables/useCreateProduct';

import { type CreateProductBody, UserReturnDtoRolesEnum } from '@/api/swagger/data-contracts';
import { ERoutesName } from '@/router';

import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import ProductForm from '@/modules/product-form/components/ProductForm.vue';

const router = useRouter();

const { createProduct, isLoading } = useCreateProduct();

const onCreateProduct = async (productData: CreateProductBody) => {
  const product = await createProduct(productData);

  if (product) {
    await router.push({ name: ERoutesName.PRODUCT, params: { id: product.id } });
  }
};
</script>

<template>
  <div>
    <AuthProtected :admitted-roles="[UserReturnDtoRolesEnum.ADMIN]">
      <ProductForm
        :title="$t('create_product')"
        :is-loading="isLoading"
        @save="onCreateProduct"
      />
    </AuthProtected>
  </div>
</template>
