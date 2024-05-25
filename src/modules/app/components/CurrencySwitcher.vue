<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '@/modules/app/appStore';
import DropdownSwitcher from '@/components/ui/DropdownSwitcher.vue';

const store = useAppStore();

const isOpened = ref(false);

const onChangeCurrency = (currency: string) => {
  store.setCurrentCurrency(currency);
  isOpened.value = false;
};
</script>

<template>
  <DropdownSwitcher
    v-if="store.financeSettings"
    v-model:open="isOpened"
    :model-value="store.currentCurrency"
    :options="store.financeSettings.availableCurrencies"
    icon="la:money-bill-wave"
    @select-option="onChangeCurrency"
  />
</template>
