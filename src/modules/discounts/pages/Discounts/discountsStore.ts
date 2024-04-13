import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { DiscountReturnDto } from '@/api/swagger/data-contracts';
import { useApiMethod } from '@/api/useApiMethod';
import { api } from '@/api/apiInstance';

export const useDiscountsStore = defineStore('discounts', () => {
  const discounts = ref<DiscountReturnDto[]>([]);

  const { isLoading: isDiscountsLoading, call: getDiscountsApi } = useApiMethod(api.getDiscounts);

  const getDiscounts = async () => {
    const discountsResponse = await getDiscountsApi();
    if (discountsResponse) {
      discounts.value = discountsResponse;
    }
  };

  return { discounts, isDiscountsLoading, getDiscounts };
});
