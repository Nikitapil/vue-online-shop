<script setup lang="ts">
import ArrowNext from '@/components/icons/ArrowNext.vue';
import CartItemList from '@/components/CartItemList.vue';
import type { IProduct } from '@/types/sneakers';
import { computed } from 'vue';
import EmptyState from '@/components/EmptyState.vue';

const props = defineProps<{
  products: IProduct[];
  cartPrice: number;
  isCreatOrderInProgress: boolean;
  isOpened: boolean;
}>();

defineEmits<{
  closeCart: [];
  removeFromCart: [IProduct];
  createOrder: [];
}>();

const tax = computed(() => props.cartPrice * 0.05);

const isMakeOrderDisabled = computed(() => !props.products.length || props.isCreatOrderInProgress);

const makeOrderButtonText = computed(() => (props.isCreatOrderInProgress ? 'Making new order...' : 'Make an order'));
</script>
<!-- TODO make this component universal and decompose cart logic in another component-->
<!--TODO закрытие по клику-->
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
      <div class="flex items-center gap-5 mb-5">
        <button @click="$emit('closeCart')">
          <ArrowNext
            class="rotate-180 opacity-50 hover:-translate-x-0.5 hover:opacity-100 transition duration-300"
            color="black"
          />
        </button>
        <h2 class="text-2xl font-bold">Cart</h2>
      </div>

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
          @click="$emit('createOrder')"
        >
          {{ makeOrderButtonText }}
        </button>
      </template>

      <EmptyState
        v-else
        title="Cart is empty"
        image-url="/package-icon.png"
        description="Add at least one product to make an order"
      />
    </div>
  </Transition>
</template>
