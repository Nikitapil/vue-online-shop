import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FinanceSettingsReturnDto } from '@/api/swagger/data-contracts';

export const useAppStore = defineStore('app', () => {
  const financeSettings = ref<FinanceSettingsReturnDto | null>(null);

  const getFinanceSettings = async () => {};

  return { financeSettings };
});
