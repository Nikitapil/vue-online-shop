import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useApiMethod } from '@/api/useApiMethod';

import type { DiscountReturnDto } from '@/api/swagger/data-contracts';
import type { IDiscountParams } from '@/modules/discounts/types';

import { api } from '@/api/apiInstance';

export const useSingleDiscountStore = defineStore('singleDiscount', () => {
  const { isLoading: isDiscountLoading, call: getDiscountApi } = useApiMethod(api.getSingleDiscount);
  const { isLoading: isDiscountDeleteInProgress, call: deleteDiscountApi } = useApiMethod(api.deleteDiscount);
  const { isLoading: isEditDiscountInProgress, call: editDiscountApi } = useApiMethod(api.editDiscount);

  const discountId = ref('');
  const discount = ref<DiscountReturnDto | null>(null);

  const getDiscount = async () => {
    discount.value = await getDiscountApi(discountId.value);
  };

  const deleteDiscount = async () => {
    await deleteDiscountApi(discountId.value);
    discount.value = null;
  };

  const editDiscount = async (data: IDiscountParams) => {
    discount.value = await editDiscountApi({ id: discountId.value, ...data });
  };

  const init = async (id: string) => {
    discountId.value = id;
    await getDiscount();
  };

  return {
    discount,
    isDiscountLoading,
    isDiscountDeleteInProgress,
    isEditDiscountInProgress,
    init,
    deleteDiscount,
    editDiscount
  };
});
