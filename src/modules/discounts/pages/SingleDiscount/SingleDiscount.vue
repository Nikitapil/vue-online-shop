<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useSingleDiscountStore } from '@/modules/discounts/pages/SingleDiscount/singleDiscountStore';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import ProductList from '@/widgets/ProductList/components/ProductList.vue';

const route = useRoute();

const store = useSingleDiscountStore();

onMounted(() => {
  store.init(route.params.id as string);
});
</script>

<template>
  <EmptyStateCentered v-if="store.isDiscountLoading">
    <RoundedLoader />
  </EmptyStateCentered>
  <EmptyStateCentered v-else-if="!store.discount">
    <p class="text-2xl font-bold">Discount not found</p>
  </EmptyStateCentered>
  <div v-else>
    <h2 class="text-center text-xl font-bold">{{ store.discount.name }}</h2>
    <p class="mb-2">Discount percent: {{ store.discount.percentage }}</p>
    <ProductList
      :is-loading="store.isDiscountLoading"
      :products="store.discount.products"
    />
  </div>
</template>
