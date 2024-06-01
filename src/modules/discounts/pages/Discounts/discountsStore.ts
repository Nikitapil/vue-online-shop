import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useApiMethod } from '@/api/useApiMethod';

import type { CreateDiscountDto, DiscountReturnDto } from '@/api/swagger/data-contracts';

import { api } from '@/api/apiInstance';

export const useDiscountsStore = defineStore('discounts', () => {
  const discounts = ref<DiscountReturnDto[]>([]);

  const { isLoading: isDiscountsLoading, call: getDiscountsApi } = useApiMethod(api.getDiscounts);
  const { isLoading: isDiscountCreateInProgress, call: createDiscountApi } = useApiMethod(api.createDiscount);

  const getDiscounts = async () => {
    const discountsResponse = await getDiscountsApi();
    if (discountsResponse) {
      discounts.value = discountsResponse;
    }
  };

  const createDiscount = async (data: CreateDiscountDto) => {
    await createDiscountApi(data);
    await getDiscounts();
  };

  return { discounts, isDiscountsLoading, isDiscountCreateInProgress, getDiscounts, createDiscount };
});
