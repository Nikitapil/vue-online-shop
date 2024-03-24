<script setup lang="ts">
import AppSelect from '../../../../components/ui/AppSelect/AppSelect.vue';
import OrderProduct from '../../components/OrderProduct.vue';
import RoundedLoader from '../../../../components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '../../../../components/ui/EmptyStateCentered.vue';
import { useRoute } from 'vue-router';
import { useSingleOrderStore } from './SingleOrderStore';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import { onMounted } from 'vue';
import { orderStatusOptions } from '../../constants';

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

    <section v-else>
      <h2 class="text-xl w-fit border-b pb-1 mb-5">Order id: {{ store.order.id }}</h2>
      <section class="w-fit border-b pb-1">
        <h3 class="text-lg">Requisites:</h3>
        <p><span class="font-bold">Address:</span> {{ store.order.address }}</p>
        <p><span class="font-bold">Phone:</span> {{ store.order.phone }}</p>
        <p><span class="font-bold">Username:</span> {{ store.order.user.name }}</p>
      </section>

      <section class="flex gap-3 items-center mt-3">
        <span>Change product status</span>
        <AppSelect
          name="order-status"
          placeholder="Status..."
          :full="false"
          :options="orderStatusOptions"
        />
      </section>

      <OrderProduct
        v-for="product in store.order.productsInOrder"
        :key="product.id"
        :product="product"
        class="mb-3"
      />

      <p class="ml-auto w-fit text-xl">
        <span class="font-bold">Total sum:</span> <span v-price="store.order.price"></span>
      </p>
    </section>
  </AuthProtected>
</template>
