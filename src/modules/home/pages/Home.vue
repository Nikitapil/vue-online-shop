<script setup lang="ts">
import CategoriesSelect from '../../categories/components/CategoriesSelect.vue';
import ProductList from '../../../widgets/ProductList/components/ProductList.vue';
import { onMounted, ref } from 'vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useAuthStore } from '@/modules/auth/authStore';
import { ERoutesName } from '@/router';
import { useProductList } from '@/widgets/ProductList/useProductList';
import Pagination from '@/components/ui/Pagination.vue';
import AppSelect from '@/components/ui/AppSelect/AppSelect.vue';
import type { ISelectOptions } from '@/components/ui/AppSelect/types';
import SearchInput from '@/components/ui/SearchInput.vue';
import { useDebounce } from '@/helpers/useDebounce';

const authStore = useAuthStore();

const sortingOptions: ISelectOptions[] = [
  { value: '', name: 'By name' },
  { value: 'asc', name: 'By price(chip)' },
  { value: 'desc', name: 'By price(expensive)' }
];

const page = ref(1);
const limit = ref(10);
const categoryId = ref<string>('');
const priceSorting = ref<'asc' | 'desc' | ''>('');
const search = ref('');

const { loadProducts, products, totalProductsCount, isLoading } = useProductList();

const fetchProducts = async () => {
  await loadProducts({
    page: page.value,
    limit: limit.value,
    categoryId: categoryId.value,
    priceSorting: priceSorting.value || null,
    search: search.value
  });
};

const changePage = (newPage: number) => {
  page.value = newPage;
  fetchProducts();
};

const resetPagination = () => (page.value = 1);

const onSearch = useDebounce(() => {
  resetPagination();
  fetchProducts();
});

const onChangeCategory = () => {
  resetPagination();
  fetchProducts();
};

onMounted(async () => {
  await fetchProducts();
});

// TODO do it by change and use debounce for input
</script>

<template>
  <div class="flex flex-wrap gap-2 justify-between items-center mb-10">
    <h2 class="text-3xl font-bold">All products</h2>

    <div class="gap-4 flex flex-wrap">
      <AppButton
        v-if="authStore.isAdmin"
        appearance="secondary"
        :disabled="isLoading"
        @click="$router.push({ name: ERoutesName.CREATE_PRODUCT })"
      >
        Create Product
      </AppButton>

      <CategoriesSelect
        v-model="categoryId"
        :disabled="isLoading"
        @change="onChangeCategory"
      />

      <AppSelect
        v-model="priceSorting"
        :options="sortingOptions"
        :disabled="isLoading"
        :full="false"
        name="price-sorting"
        @change="fetchProducts"
      />

      <SearchInput
        v-model="search"
        :disabled="isLoading"
        @input="onSearch"
      />
    </div>
  </div>

  <ProductList
    :products="products"
    :is-loading="isLoading"
  />
  <!-- TODO переделать pagination на v-model -->
  <Pagination
    class="mt-4"
    :current-page="page"
    :limit="limit"
    :items-count="totalProductsCount"
    :disabled="isLoading"
    @set-page="changePage"
  />
</template>
