import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FinanceSettingsReturnDto } from '@/api/swagger/data-contracts';
import { useApiMethod } from '@/api/useApiMethod';
import { api } from '@/api/apiInstance';

export const useAppStore = defineStore('app', () => {
  const financeSettings = ref<FinanceSettingsReturnDto | null>(null);

  const { isLoading: isFinanceSettingsLoading, call: getFinanceSettingsApi } = useApiMethod(api.getFinanceSettings);
  const { isLoading: isSetTaxInProgress, call: setTaxValue } = useApiMethod(api.setTaxValue);

  const getFinanceSettings = async () => {
    financeSettings.value = await getFinanceSettingsApi();
  };

  const setTax = async (tax: number) => {
    financeSettings.value = await setTaxValue({ tax });
  };

  return { financeSettings, isFinanceSettingsLoading, isSetTaxInProgress, getFinanceSettings, setTax };
});
