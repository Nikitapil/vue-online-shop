import { defineStore } from 'pinia';
import { computed, ref, watchEffect } from 'vue';
import type { FinanceSettingsReturnDto } from '@/api/swagger/data-contracts';
import { useApiMethod } from '@/api/useApiMethod';
import { api } from '@/api/apiInstance';
import { getCurrencyFromLocalStorage, setCurrencyToLocalStorage } from '@/helpers/localStorage-helpers';

export const useAppStore = defineStore('app', () => {
  const financeSettings = ref<FinanceSettingsReturnDto | null>(null);

  const { isLoading: isFinanceSettingsLoading, call: getFinanceSettingsApi } = useApiMethod(api.getFinanceSettings);
  const { isLoading: isSetTaxInProgress, call: setTaxValue } = useApiMethod(api.setTaxValue);
  const { isLoading: isSetDeliveryCostInProgress, call: setDeliveryCostApi } = useApiMethod(api.setDeliveryCost);
  const { isLoading: isSetOrderPriceWithFreeDeliveryCostInProgress, call: setOrderPriceWithFreeDeliveryCostApi } =
    useApiMethod(api.setOrderPriceWithFreeDeliveryCost);
  const { isLoading: isSetAvailableCurrenciesInProgress, call: setAvailableCurrenciesApi } = useApiMethod(
    api.setAvailableCurrencies
  );
  const { isLoading: isUpdateExchangeRatesInProgress, call: updateExchangeratesApi } = useApiMethod(
    api.updateExchangeRates
  );

  const baseCurrency = 'USD';
  const currentCurrency = ref<string>(getCurrencyFromLocalStorage() || baseCurrency);

  const currentCurrencyExchangeRate = computed(() => financeSettings.value?.exchangeRates[currentCurrency.value] || 1);

  const setCurrentCurrency = (currency: string) => {
    setCurrencyToLocalStorage(currency);
    currentCurrency.value = currency;
  };
  const getFinanceSettings = async () => {
    financeSettings.value = await getFinanceSettingsApi();
  };

  const setTax = async (tax: number) => {
    financeSettings.value = await setTaxValue({ tax });
  };

  const setDeliveryCost = async (deliveryCost: number) => {
    financeSettings.value = await setDeliveryCostApi({ deliveryCost });
  };

  const setOrderPriceWithFreeDeliveryCost = async (orderPriceWithFreeDelivery: number) => {
    financeSettings.value = await setOrderPriceWithFreeDeliveryCostApi({ orderPriceWithFreeDelivery });
  };

  const setAvailableCurrencies = async (availableCurrencies: string[]) => {
    financeSettings.value = await setAvailableCurrenciesApi({ availableCurrencies });
  };

  const updateExchangeRates = async () => {
    financeSettings.value = await updateExchangeratesApi();
  };

  watchEffect(() => {
    if (
      financeSettings.value?.availableCurrencies &&
      !financeSettings.value.availableCurrencies.includes(currentCurrency.value)
    ) {
      currentCurrency.value = baseCurrency;
    }
  });

  return {
    financeSettings,
    isFinanceSettingsLoading,
    isSetTaxInProgress,
    currentCurrency,
    currentCurrencyExchangeRate,
    baseCurrency,
    isSetAvailableCurrenciesInProgress,
    isUpdateExchangeRatesInProgress,
    isSetDeliveryCostInProgress,
    isSetOrderPriceWithFreeDeliveryCostInProgress,
    getFinanceSettings,
    setTax,
    setCurrentCurrency,
    setAvailableCurrencies,
    updateExchangeRates,
    setDeliveryCost,
    setOrderPriceWithFreeDeliveryCost
  };
});
