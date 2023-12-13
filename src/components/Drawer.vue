<script setup lang="ts">
import ArrowNext from '@/components/icons/ArrowNext.vue';
import CartItemList from '@/components/CartItemList.vue';
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col">
    <div class="flex items-center gap-5 mb-5">
      <button>
        <ArrowNext
          class="rotate-180 opacity-50 hover:-translate-x-0.5 hover:opacity-100 transition duration-300"
          color="black"
        />
      </button>
      <h2 class="text-2xl font-bold">Cart</h2>
    </div>

    <div class="flex-1">
      <CartItemList />
    </div>

    <div class="flex flex-col gap-4 my-7">
      <div class="flex gap-2">
        <span>Summary: </span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>12990 р</b>
      </div>

      <div class="flex gap-2">
        <span>Tax 5%: </span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>900 р</b>
      </div>
    </div>
    <button
      class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition duration-300 active:bg-lime-700 disabled:bg-slate-300"
    >
      Make an order
    </button>
  </div>
</template>
