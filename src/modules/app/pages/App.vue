<script setup lang="ts">
// TODO adaptive
// TODO real backend
import Drawer from '@/components/Drawer.vue';
import { computed, onMounted, ref } from 'vue';
import type { IProduct } from '@/types/sneakers';
import AppHeader from '@/modules/app/components/AppHeader.vue';
import { useAuthStore } from '@/modules/auth/authStore';

const authStore = useAuthStore();

const cartProducts = ref<IProduct[]>([]);

const isCartOpened = ref(false);

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

const openCart = () => (isCartOpened.value = true);
const closeCart = () => (isCartOpened.value = false);

onMounted(async () => {
  await authStore.refresh();
});
</script>

<template>
  <Drawer
    :is-opened="isCartOpened"
    :products="cartProducts"
    :cart-price="totalCartPrice"
    @close-cart="closeCart"
    @remove-from-cart="removeFromCart"
  />

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl my-10">
    <AppHeader
      :cart-price="totalCartPrice"
      :is-authenticated="authStore.isAuthenticated"
      :is-auth-loading="authStore.isAuthLoading"
      @open-cart="openCart"
    />

    <div class="px-8 py-5">
      <router-view @toggle-added-to-cart="toggleAddedToCart" />
    </div>
  </div>
</template>
