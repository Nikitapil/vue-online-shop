<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, onMounted, computed } from 'vue';
import Drawer from '@/components/ui/Drawer.vue';
import { useCartStore } from '../cartStore';
import RoundedLoaderVue from '@/components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import CartItem from './CartItem.vue';
import CreateOrderModal from './CreateOrderModal.vue';
import AppButton from '@/components/ui/AppButton.vue';

const store = useCartStore();

const isOpened = ref(false);
const isCreateOrderModalOpened = ref(false);

const cartPrice = computed(() => store.cart?.price || 0);
const tax = computed(() => store.cart?.taxSum);
const products = computed(() => store.cart?.productInCart || []);

onMounted(() => {
  store.loadCart();
});
</script>

<template>
  <RoundedLoaderVue
    v-if="store.isCartLoading"
    size="sm"
  />
  <div v-else>
    <button
      class="flex gap-1 items-center text-slate-500 cursor-pointer hover:text-black transition-all duration-300"
      @click="isOpened = true"
    >
      <Icon
        class="w-5 h-5"
        icon="ion:cart-outline"
      />
      <b v-price="cartPrice"></b>
    </button>

    <Drawer
      v-model="isOpened"
      title="Cart"
    >
      <EmptyStateCentered v-if="!products.length">
        <div class="h-full flex flex-col justify-center items-center">
          <Icon
            class="w-96 h-96"
            icon="raphael:package"
            color="#dda61f"
          />
          <h2 class="mt-4 text-2xl font-medium">Cart is empty</h2>
          <p class="text-slate-500 mt-2">Add at least one product to make an order</p>
        </div>
      </EmptyStateCentered>

      <template v-else-if="products.length">
        <div class="flex-1">
          <CartItem
            v-for="product in products"
            :key="product.id"
            :product-in-cart="product"
            class="mb-3"
            @remove-from-cart="store.removeFromCart(product.id)"
          />
        </div>

        <div class="flex flex-col gap-4 my-7">
          <div class="flex gap-2">
            <span>Summary: </span>
            <div class="flex-1 border-b border-dashed"></div>
            <b v-price="cartPrice"></b>
          </div>

          <div class="flex gap-2">
            <!-- TODO add tax setting from backend -->
            <span>Tax 5%: </span>
            <div class="flex-1 border-b border-dashed"></div>
            <b v-price="tax"></b>
          </div>
        </div>
        <AppButton
          appearance="success"
          :disabled="false"
          @click="isCreateOrderModalOpened = true"
        >
          Make an order
        </AppButton>
      </template>
    </Drawer>
    <CreateOrderModal v-model="isCreateOrderModalOpened" />
  </div>
</template>
