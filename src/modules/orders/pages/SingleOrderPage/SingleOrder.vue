<script setup lang="ts">
import OrderProduct from '../../components/OrderProduct.vue';
import RoundedLoader from '../../../../components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '../../../../components/ui/EmptyStateCentered.vue';
import { useRoute } from 'vue-router';
import { useSingleOrderStore } from './SingleOrderStore';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import { onMounted } from 'vue';

const store = useSingleOrderStore();

onMounted(() => {
  const route = useRoute();
  store.init(route.params.id as string);
});
</script>

<template>
  <AuthProtected>
    <EmptyStateCentered v-if="store.isLoading">
      <RoundedLoader />
    </EmptyStateCentered>
    <EmptyStateCentered v-else-if="!store.order">
      <p class="text-2xl font-bold">Order not found</p>
    </EmptyStateCentered>

    <div v-else>
      <h2 class="text-xl w-fit border-b pb-1 mb-5">Order id: {{ store.order.id }}</h2>
      <div class="w-fit border-b pb-1">
        <h3 class="text-lg">Requisites:</h3>
        <p><span class="font-bold">Address:</span> {{ store.order.address }}</p>
        <p><span class="font-bold">Phone:</span> {{ store.order.phone }}</p>
      </div>

      <OrderProduct
        v-for="product in store.order.productsInOrder"
        :key="product.id"
        :product="product"
        class="mb-3"
      />
    </div>
  </AuthProtected>
</template>
