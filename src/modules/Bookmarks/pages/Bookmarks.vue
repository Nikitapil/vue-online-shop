<script setup lang="ts">
import ProductsPagination from '@/components/products/ProductsPagination.vue';
import ProductList from '../../../widgets/ProductList/components/ProductList.vue';
import { useProductList } from '@/widgets/ProductList/useProductList';
import { onMounted, ref } from 'vue';

const { loadFavoriteProducts, isLoading, products, totalProductsCount } = useProductList();

const page = ref(1);
const limitValue = ref('10');

const fetchProducts = () => {
  loadFavoriteProducts({
    page: page.value,
    limit: +limitValue.value
  });
};

onMounted(() => {
  fetchProducts();
});

const onChangePage = (value: number) => {
  page.value = value;
  fetchProducts();
};

const onChangeLimit = () => {
  page.value = 1;
  fetchProducts();
};
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold mb-5">Bookmarks</h2>
    <ProductList
      :products="products"
      :is-loading="isLoading"
    />
    <ProductsPagination
      v-model:limitValue="limitValue"
      :total-products-count="totalProductsCount"
      :is-loading="isLoading"
      :current-page="page"
      @change-page="onChangePage"
      @change-limit="onChangeLimit"
    />
  </div>
</template>
