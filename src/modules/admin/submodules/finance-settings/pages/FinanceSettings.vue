<script setup lang="ts">
import { useAppStore } from '@/modules/app/appStore';
import EditableText from '@/components/ui/EditableText.vue';
import { computed, ref } from 'vue';
import MultiSelect from '@/components/ui/MultiSelect/MultiSelect.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';

const appStore = useAppStore();

const isTaxEditMode = ref(false);

const availableCurrencies = ref(['USD']);

const tax = computed(() => appStore.financeSettings?.tax?.toString());

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
</script>

<template>
  <div>
    <h2 class="text-center text-xl mb-3">Finance Settings</h2>
    <EmptyStateCentered v-if="appStore.isFinanceSettingsLoading">
      <RoundedLoader />
    </EmptyStateCentered>

    <EmptyStateCentered v-else-if="!appStore.financeSettings"> Something went wrong </EmptyStateCentered>

    <template v-else>
      <EditableText
        v-if="tax"
        id="tax"
        v-model="isTaxEditMode"
        name="tax"
        rules="required"
        mask="numberMask"
        label="Tax value %"
        :initial-value="tax"
        :is-loading="appStore.isSetTaxInProgress"
        @submit="setTax"
      />
      <MultiSelect
        v-model="availableCurrencies"
        class="max-w-xs mt-3"
        label="Available currencies:"
        :options="currenciesOptions"
      />
    </template>
  </div>
</template>
