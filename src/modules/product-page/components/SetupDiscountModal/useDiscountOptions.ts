import { computed, ref } from 'vue';
import type { ISelectOptions } from '@/components/ui/AppSelect/types';
import { useApiMethod } from '@/api/useApiMethod';
import { api } from '@/api/apiInstance';
import type { DiscountReturnDto } from '@/api/swagger/data-contracts';
import { NO_DISCOUNTS } from '@/domain/discounts';

export const useDiscountOptions = () => {
  const discounts = ref<DiscountReturnDto[]>([]);

  const { isLoading, call } = useApiMethod(api.getDiscounts);

  const options = computed<ISelectOptions[]>(() => {
    return [
      { value: NO_DISCOUNTS, name: 'Without discount' },
      ...discounts.value.map((discount) => ({ value: discount.id, name: discount.name }))
    ];
  });

  const getDiscountOptions = async () => {
    const discountsResponse = await call();
    if (discountsResponse) {
      discounts.value = discountsResponse;
    }
  };

  return { options, isLoading, getDiscountOptions };
};
