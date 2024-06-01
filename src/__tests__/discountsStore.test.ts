import { createPinia, setActivePinia } from 'pinia';
import { vi } from 'vitest';
import { useDiscountsStore } from '../modules/discounts/pages/Discounts/discountsStore';
import { api } from '../api/apiInstance';
import { discountMocks } from './mocks/discount-mocks';

describe('discountsStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Should be an empty array value for discounts by default', () => {
    const store = useDiscountsStore();

    expect(store.discounts).toEqual([]);
  });

  test('Should work getDiscounts method', async () => {
    const discounts = [discountMocks];
    api.getDiscounts = async () => discounts;
    const store = useDiscountsStore();

    await store.getDiscounts();

    expect(store.discounts).toEqual(discounts);
  });

  test('Should work createDiscount method', async () => {
    const discounts = [discountMocks];
    api.createDiscount = async () => {};

    const getDiscountsSpy = vi.spyOn(api, 'getDiscounts').mockImplementation(() => discounts);

    const store = useDiscountsStore();

    await store.createDiscount();

    expect(store.discounts).toEqual(discounts);
    expect(getDiscountsSpy).toHaveBeenCalledTimes(1);
  });
});
