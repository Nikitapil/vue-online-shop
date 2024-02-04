<script setup lang="ts">
import ProductList from '../../../widgets/ProductList/components/ProductList.vue';
import { onMounted, ref } from 'vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useAuthStore } from '@/modules/auth/authStore';
import { ERoutesName } from '@/router';
import { useProductList } from '@/widgets/ProductList/useProductList';
import type { GetProductsParams } from '@/api/swagger/data-contracts';

const authStore = useAuthStore();

const page = ref(1);
const limit = ref(10);
const categoryId = ref<GetProductsParams['categoryId']>(null);
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

onMounted(async () => {
  await fetchProducts();
});

// TODO do it by change and use debounce for input
</script>

<template>
  <div class="flex justify-between items-center mb-10">
    <h2 class="text-3xl font-bold">All products</h2>

    <div class="flex gap-4">
      <AppButton
        v-if="authStore.isAdmin"
        appearance="secondary"
        @click="$router.push({ name: ERoutesName.CREATE_PRODUCT })"
      >
        Create Product
      </AppButton>

      <!--          TODO custom select-->
      <select
        v-model="priceSorting"
        class="cursor-pointer border rounded-md focus:border-gray-400 py-2 px-4"
      >
        <option value="">By name</option>
        <option value="asc">By price(chip)</option>
        <option value="desc">By price(expensive)</option>
      </select>

      <div class="relative">
        <img
          class="absolute left-3 top-3.5"
          src="/search.svg"
          alt="Search icon"
        />
        <input
          v-model="search"
          class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  </div>

  <ProductList
    :products="products"
    :is-loading="isLoading"
  />
</template>
