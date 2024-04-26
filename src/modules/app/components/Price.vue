<script setup lang="ts">
import { useAppStore } from '@/modules/app/appStore';
import { computed } from 'vue';

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
  />
</template>
