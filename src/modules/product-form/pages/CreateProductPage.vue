<script setup lang="ts">
import ProductForm from '@/modules/product-form/components/ProductForm.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import { useCreateProduct } from '@/modules/product-form/composables/useCreateProduct';
import type { CreateProductBody } from '@/api/swagger/data-contracts';
import { useRouter } from 'vue-router';
import { ERoutesName } from '@/router';

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
    <AuthProtected :admitted-roles="['ADMIN']">
      <ProductForm
        title="Create product"
        :is-loading="isLoading"
        @save="onCreateProduct"
      />
    </AuthProtected>
  </div>
</template>
