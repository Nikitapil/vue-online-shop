<script setup lang="ts">
import ProductForm from '@/modules/product-form/components/ProductForm.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import { useCreateProduct } from '@/modules/product-form/composables/useCreateProduct';

const { createProduct, isLoading } = useCreateProduct();
</script>

<template>
  <div>
    <AuthProtected :admitted-roles="['ADMIN']">
      <ProductForm
        title="Create product"
        :is-loading="isLoading"
        @save="createProduct"
      />
    </AuthProtected>
  </div>
</template>
