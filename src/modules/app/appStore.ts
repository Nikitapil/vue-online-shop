import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { FinanceSettingsReturnDto } from '@/api/swagger/data-contracts';
import { useApiMethod } from '@/api/useApiMethod';
import { api } from '@/api/apiInstance';
import { getCurrencyFromLocalStorage, setCurrencyToLocalStorage } from '@/helpers/localStorage-helpers';

export const useAppStore = defineStore('app', () => {
  const financeSettings = ref<FinanceSettingsReturnDto | null>(null);

  const { isLoading: isFinanceSettingsLoading, call: getFinanceSettingsApi } = useApiMethod(api.getFinanceSettings);
  const { isLoading: isSetTaxInProgress, call: setTaxValue } = useApiMethod(api.setTaxValue);

  // Todo make configurable and return from backend
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

  return {
    financeSettings,
    isFinanceSettingsLoading,
    isSetTaxInProgress,
    currentCurrency,
    currentCurrencyExchangeRate,
    baseCurrency,
    getFinanceSettings,
    setTax,
    setCurrentCurrency
  };
});
