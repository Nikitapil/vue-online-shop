<script setup lang="ts">
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import { useLoadProductData } from '../composables/useLoadProductData';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

const { product, loadProduct } = useLoadProductData();

onMounted(() => {
  loadProduct(route.params.id as string);
});
</script>

<template>
  <AuthProtected>
    <h1>Edit page</h1>
  </AuthProtected>
</template>
