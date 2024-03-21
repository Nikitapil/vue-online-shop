<script setup lang="ts">
import ProductsPagination from '@/components/products/ProductsPagination.vue';
import ProductList from '../../../widgets/ProductList/components/ProductList.vue';
import { useProductList } from '@/widgets/ProductList/useProductList';
import { onMounted, ref } from 'vue';
import { EPaginationLimits } from '@/domain/components';

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
      v-model:page="page"
      :total-count="totalProductsCount"
      :is-loading="isLoading"
      @change-page="onChangePage"
      @change-limit="onChangeLimit"
    />
  </div>
</template>
