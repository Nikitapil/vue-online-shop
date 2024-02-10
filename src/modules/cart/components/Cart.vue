<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import Drawer from '@/components/ui/Drawer.vue';

const cartPrice = 0;
const isOpened = ref(false);
</script>

<template>
  <div>
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
    />
  </div>
</template>
