<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useProductList } from '@/widgets/ProductList/useProductList';

import { EPaginationLimits } from '@/domain/components';

import ProductsPagination from '@/components/products/ProductsPagination.vue';
import ProductList from '../../../widgets/ProductList/components/ProductList.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';

const { loadFavoriteProducts, isLoading, products, totalProductsCount } = useProductList();

const page = ref(1);
const limitValue = ref(EPaginationLimits.TEN);

const fetchProducts = () => {
  loadFavoriteProducts({
    page: page.value,
    limit: +limitValue.value
  });
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <AuthProtected>
    <h2 class="text-3xl font-bold mb-5">{{ $t('bookmarks') }}</h2>

    <ProductList
      :products="products"
      :is-loading="isLoading"
    />

    <ProductsPagination
      v-model:limitValue="limitValue"
      v-model:page="page"
      :total-count="totalProductsCount"
      :is-loading="isLoading"
      @paginate="fetchProducts"
    />
  </AuthProtected>
</template>
