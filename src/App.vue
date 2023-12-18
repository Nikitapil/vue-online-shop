<script setup lang="ts">
// TODO adaptive
// TODO real backend
import Drawer from '@/components/Drawer.vue';
import { computed, ref } from 'vue';
import type { IProduct } from '@/types/sneakers';
import axios from 'axios';
import AppHeader from '@/components/AppHeader.vue';

const cartProducts = ref<IProduct[]>([]);

const isCartOpened = ref(false);
const isCreatOrderInProgress = ref(false);

const totalCartPrice = computed(() => cartProducts.value.reduce((acc, item) => acc + item.price, 0));

const addToCart = (item: IProduct) => {
  cartProducts.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item: IProduct) => {
  cartProducts.value = cartProducts.value.filter((product) => product.id !== item.id);
  item.isAdded = false;
};

const toggleAddedToCart = (item: IProduct) => {
  // TODO хранить данные корзины каждого пользователя на бэке
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const createOrder = async () => {
  try {
    isCreatOrderInProgress.value = true;
    const { data } = await axios.post('https://497194416390c6fe.mokky.dev/orders', {
      items: cartProducts.value,
      totalPrice: totalCartPrice.value
    });

    cartProducts.value.forEach((item) => removeFromCart(item));
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    isCreatOrderInProgress.value = false;
  }
};

const openCart = () => (isCartOpened.value = true);
const closeCart = () => (isCartOpened.value = false);
</script>

<template>
  <Drawer
    :is-opened="isCartOpened"
    :products="cartProducts"
    :cart-price="totalCartPrice"
    :is-creat-order-in-progress="isCreatOrderInProgress"
    @close-cart="closeCart"
    @remove-from-cart="removeFromCart"
    @create-order="createOrder"
  />

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl my-10">
    <AppHeader
      :cart-price="totalCartPrice"
      @open-cart="openCart"
    />

    <div class="px-8 py-5">
      <router-view @toggle-added-to-cart="toggleAddedToCart" />
    </div>
  </div>
</template>
