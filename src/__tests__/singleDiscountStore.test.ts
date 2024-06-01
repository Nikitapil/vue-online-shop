import { vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useSingleDiscountStore } from '../modules/discounts/pages/SingleDiscount/singleDiscountStore';
import { discountMocks } from './mocks/discount-mocks';
import { api } from '../api/apiInstance';

describe('SingleDiscountStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Should be correct default values to store', () => {
    const store = useSingleDiscountStore();

    expect(store.discount).toBe(null);
  });

  test('Should work init method correctly', async () => {
    api.getSingleDiscount = async () => discountMocks;
    const store = useSingleDiscountStore();

    await store.init('123');

    expect(store.discount).toEqual(discountMocks);
  });

  test('Should work deleteDiscount method correctly', async () => {
    api.deleteDiscount = async () => {};
    const store = useSingleDiscountStore();

    store.discount = discountMocks;

    await store.deleteDiscount();

    expect(store.discount).toEqual(null);
  });

  test('Should work editDiscount method correctly', async () => {
    api.editDiscount = async () => discountMocks;
    const store = useSingleDiscountStore();

    await store.editDiscount({});

    expect(store.discount).toEqual(discountMocks);
  });
});
