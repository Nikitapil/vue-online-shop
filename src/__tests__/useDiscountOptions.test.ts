import { NO_DISCOUNTS } from '../domain/discounts';
import { useDiscountOptions } from '../modules/product-page/components/SetupDiscountModal/useDiscountOptions';
import { discountMocks } from './mocks/discount-mocks';
import { api } from '../api/apiInstance';
import { flushPromises } from '@vue/test-utils';

describe('useDiscountOptions test', async () => {
  test('should have correct default values in composition', () => {
    const defaultOption = { value: NO_DISCOUNTS, name: 'Without discount' };

    const { discounts, options, isLoading } = useDiscountOptions();

    expect(discounts.value).toEqual([]);
    expect(options.value).toEqual([defaultOption]);
    expect(isLoading.value).toEqual(false);
  });

  test('should correctly work getDiscounts options', async () => {
    api.getDiscounts = async () => [discountMocks];
    const defaultOption = { value: NO_DISCOUNTS, name: 'Without discount' };

    const { discounts, options, isLoading, getDiscountOptions } = useDiscountOptions();

    getDiscountOptions();

    expect(isLoading.value).toEqual(true);

    await flushPromises();

    expect(discounts.value).toEqual([discountMocks]);
    expect(options.value).toEqual([defaultOption, { value: discountMocks.id, name: discountMocks.name }]);
    expect(isLoading.value).toEqual(false);
  });
});
