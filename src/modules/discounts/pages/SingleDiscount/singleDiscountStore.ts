import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { DiscountReturnDto } from '@/api/swagger/data-contracts';
import { useApiMethod } from '@/api/useApiMethod';
import { api } from '@/api/apiInstance';

export const useSingleDiscountStore = defineStore('singleDiscount', () => {
  const { isLoading: isDiscountLoading, call: getDiscountApi } = useApiMethod(api.getSingleDiscount);
  const { isLoading: isDiscountDeleteInProgress, call: deleteDiscountApi } = useApiMethod(api.deleteDiscount);

  const discountId = ref('');
  const discount = ref<DiscountReturnDto | null>(null);

  const getDiscount = async () => {
    discount.value = await getDiscountApi(discountId.value);
  };

  const deleteDiscount = async () => {
    await deleteDiscountApi(discountId.value);
    discount.value = null;
  };

  const init = async (id: string) => {
    discountId.value = id;
    await getDiscount();
  };

  return { discount, isDiscountLoading, isDiscountDeleteInProgress, init, deleteDiscount };
});
