import { computed, ref } from 'vue';

import type { ISelectOptions } from '@/components/ui/AppSelect/types';
import type { DiscountReturnDto } from '@/api/swagger/data-contracts';

import { useApiMethod } from '@/api/useApiMethod';

import { api } from '@/api/apiInstance';
import { NO_DISCOUNTS } from '@/domain/discounts';
import { i18n } from '@/plugins/i18n';

export const useDiscountOptions = () => {
  const discounts = ref<DiscountReturnDto[]>([]);

  const { isLoading, call: getDiscounts } = useApiMethod(api.getDiscounts);

  const options = computed<ISelectOptions[]>(() => {
    return [
      { value: NO_DISCOUNTS, name: i18n.global.t('without_discount') },
      ...discounts.value.map((discount) => ({ value: discount.id, name: discount.name }))
    ];
  });

  const getDiscountOptions = async () => {
    const discountsResponse = await getDiscounts();

    if (discountsResponse) {
      discounts.value = discountsResponse;
    }
  };

  return { discounts, options, isLoading, getDiscountOptions };
};
