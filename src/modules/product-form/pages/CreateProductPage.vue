<script setup lang="ts">
import ProductForm from '@/modules/product-form/components/ProductForm.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
</script>

<template>
  <div>
    <AuthProtected :admitted-roles="['ADMIN']">
      <ProductForm />
    </AuthProtected>
  </div>
</template>
