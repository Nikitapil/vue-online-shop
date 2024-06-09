import { computed, ref } from 'vue';

import type { ISelectOptions } from '@/components/ui/AppSelect/types';
import type { DiscountReturnDto } from '@/api/swagger/data-contracts';

import { useApiMethod } from '@/api/useApiMethod';

import { api } from '@/api/apiInstance';
import { NO_DISCOUNTS } from '@/domain/discounts';
import { useI18n } from 'vue-i18n';

export const useDiscountOptions = () => {
  const { t } = useI18n();

  const discounts = ref<DiscountReturnDto[]>([]);

  const { isLoading, call: getDiscounts } = useApiMethod(api.getDiscounts);

  const options = computed<ISelectOptions[]>(() => {
    return [
      { value: NO_DISCOUNTS, name: t('without_discount') },
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
