<script setup lang="ts">
import CartItemList from '@/components/CartItemList.vue';
import type { IProduct } from '@/types/sneakers';
import { computed, ref } from 'vue';
import EmptyState from '@/components/EmptyState.vue';
import axios from 'axios';
// TODO Delete this Component
const props = defineProps<{
  products: IProduct[];
  cartPrice: number;
  isOpened: boolean;
}>();

const emit = defineEmits<{
  closeCart: [];
  removeFromCart: [IProduct];
}>();

const isCreatOrderInProgress = ref(false);

const isOrderCreated = ref(false);

const tax = computed(() => props.cartPrice * 0.05);

const isMakeOrderDisabled = computed(() => !props.products.length || isCreatOrderInProgress.value);

const makeOrderButtonText = computed(() => (isCreatOrderInProgress.value ? 'Making new order...' : 'Make an order'));

const createOrder = async () => {
  try {
    isCreatOrderInProgress.value = true;
    await axios.post('https://497194416390c6fe.mokky.dev/orders', {
      items: props.products,
      totalPrice: props.cartPrice
    });

    props.products.forEach((item) => emit('removeFromCart', item));
    isOrderCreated.value = true;
  } catch (e) {
    console.log(e);
  } finally {
    isCreatOrderInProgress.value = false;
  }
};
</script>
<!-- TODO Delete this component -->
<template>
  <div
    v-if="isOpened"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50"
  ></div>
  <Transition
    enter-from-class="translate-x-[150%] opacity-0"
    enter-active-class="transition duration-300"
    leave-to-class="translate-x-[150%] opacity-0"
    leave-active-class="transition duration-300"
  >
    <div
      v-if="isOpened"
      class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col"
    >
      <template v-if="products.length">
        <div class="flex-1">
          <CartItemList
            :products="products"
            @remove-from-cart="($event) => $emit('removeFromCart', $event)"
          />
        </div>

        <div class="flex flex-col gap-4 my-7">
          <div class="flex gap-2">
            <span>Summary: </span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ cartPrice }} ₽</b>
          </div>

          <div class="flex gap-2">
            <span>Tax 5%: </span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ tax }} ₽</b>
          </div>
        </div>
        <button
          :disabled="isMakeOrderDisabled"
          class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition duration-300 active:bg-lime-700 disabled:bg-slate-300"
          @click="createOrder"
        >
          {{ makeOrderButtonText }}
        </button>
      </template>

      <EmptyState
        v-else-if="isOrderCreated"
        title="Your order is Created"
        image-url="/order-success-icon.png"
        description=""
      />

      <EmptyState
        v-else
        title="Cart is empty"
        image-url="/package-icon.png"
        description="Add at least one product to make an order"
      />
    </div>
  </Transition>
</template>
