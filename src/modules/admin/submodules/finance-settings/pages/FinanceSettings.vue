<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

import { useAppStore } from '@/modules/app/appStore';

import EditableText from '@/components/ui/EditableText.vue';
import MultiSelect from '@/components/ui/MultiSelect/MultiSelect.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { Icon } from '@iconify/vue';

const appStore = useAppStore();

const isTaxEditMode = ref(false);
const isDeliveryCostEditMode = ref(false);
const isOrderPriceWithFreeDeliveryEditMode = ref(false);

const availableCurrencies = ref([appStore.baseCurrency]);

const tax = computed(() => appStore.financeSettings?.tax?.toString());
const deliveryCost = computed(() => appStore.financeSettings?.deliveryCost?.toString());
const orderPriceWithFreeDelivery = computed(() => appStore.financeSettings?.orderPriceWithFreeDelivery?.toString());

const currenciesOptions = computed(() =>
  (appStore.financeSettings?.allCurrencies || []).map((currency) => {
    return {
      name: currency,
      value: currency,
      disabled: currency === appStore.baseCurrency
    };
  })
);

const setTax = async (newTaxValue: string) => {
  await appStore.setTax(+newTaxValue);
  isTaxEditMode.value = false;
};

const setDeliveryCost = async (newDeliveryCost: string) => {
  await appStore.setDeliveryCost(+newDeliveryCost);
  isDeliveryCostEditMode.value = false;
};

const setOrderPriceWithFreeDelivery = async (newOrderPriceWithFreeDelivery: string) => {
  await appStore.setOrderPriceWithFreeDeliveryCost(+newOrderPriceWithFreeDelivery);
  isOrderPriceWithFreeDeliveryEditMode.value = false;
};

const setAvailableCurrencies = () => {
  appStore.setAvailableCurrencies(availableCurrencies.value);
};

watchEffect(() => {
  availableCurrencies.value = [...(appStore.financeSettings?.availableCurrencies || [appStore.baseCurrency])];
});
</script>

<template>
  <div>
    <h2 class="text-center text-xl mb-3">{{ $t('finance_settings') }}</h2>

    <EmptyStateCentered v-if="appStore.isFinanceSettingsLoading">
      <RoundedLoader />
    </EmptyStateCentered>

    <EmptyStateCentered v-else-if="!appStore.financeSettings"> {{ $t('something_went_wrong') }} </EmptyStateCentered>

    <template v-else>
      <EditableText
        v-if="tax"
        id="tax"
        v-model="isTaxEditMode"
        name="tax"
        rules="required"
        mask="numberMask"
        :label="`${$t('tax_value')}, %`"
        :initial-value="tax"
        :is-loading="appStore.isSetTaxInProgress"
        @submit="setTax"
      />

      <hr class="mt-1" />

      <EditableText
        v-if="deliveryCost"
        id="deliveryCost"
        v-model="isDeliveryCostEditMode"
        class="mt-2"
        name="deliveryCost"
        rules="required"
        mask="numberMask"
        :label="`${$t('delivery_cost')}, $`"
        :initial-value="deliveryCost"
        :is-loading="appStore.isSetDeliveryCostInProgress"
        @submit="setDeliveryCost"
      />

      <EditableText
        v-if="orderPriceWithFreeDelivery"
        id="orderPriceWithFreeDelivery"
        v-model="isOrderPriceWithFreeDeliveryEditMode"
        class="mt-2"
        name="orderPriceWithFreeDelivery"
        rules="required"
        mask="numberMask"
        :label="`${$t('order_price_with_delivery_cost')}, $`"
        :initial-value="orderPriceWithFreeDelivery"
        :is-loading="appStore.isSetOrderPriceWithFreeDeliveryCostInProgress"
        @submit="setOrderPriceWithFreeDelivery"
      />

      <hr class="mt-1" />

      <MultiSelect
        v-model="availableCurrencies"
        class="max-w-xs mt-3"
        :label="`${$t('available_currencies')}:`"
        :options="currenciesOptions"
        :disabled="appStore.isSetAvailableCurrenciesInProgress"
        @close="setAvailableCurrencies"
      />

      <div class="flex gap-3 items-center mt-3">
        <AppButton
          appearance="primary"
          :disabled="appStore.isUpdateExchangeRatesInProgress"
          @click="appStore.updateExchangeRates"
        >
          {{ $t('update_exchange_rates') }}
        </AppButton>

        <div v-tooltip="$t('exchange_rates_update_tooltip')">
          <Icon
            class="w-6 h-6 cursor-pointer"
            icon="ph:question-light"
          />
        </div>
      </div>
    </template>
  </div>
</template>
