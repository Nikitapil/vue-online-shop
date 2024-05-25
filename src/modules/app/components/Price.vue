<script setup lang="ts">
import { computed } from 'vue';

import { useAppStore } from '@/modules/app/appStore';

const props = withDefaults(
  defineProps<{
    price: number;
    tag?: string;
  }>(),
  {
    tag: 'p'
  }
);

const store = useAppStore();

const options = computed(() => ({
  style: 'currency',
  currency: store.currentCurrency
}));

const finalPrice = computed(() => props.price * store.currentCurrencyExchangeRate);
</script>

<template>
  <i18n-n
    :tag="props.tag"
    :value="finalPrice"
    :format="options"
    scope="global"
  />
</template>
