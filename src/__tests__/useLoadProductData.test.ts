import { vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';

import { useLoadProductData } from '../modules/product-form/composables/useLoadProductData';

import { api } from '../api/apiInstance';
import { product as productMock } from './mocks/product-mocks';

describe('useLoadProductData tests', async () => {
  test('should call loadProduct Api method correctly', async () => {
    const apiFnSpy = vi.spyOn(api, 'getProduct').mockImplementation(() => productMock);
    const { loadProduct, isLoading, product } = useLoadProductData();

    loadProduct('');

    expect(isLoading.value).toBe(true);

    await flushPromises();

    expect(apiFnSpy).toHaveBeenCalledTimes(1);
    expect(product.value).toEqual({
      ...productMock,
      imageUrl: process.env.VITE_API_BASE_URL + productMock.imageUrl
    });
    expect(isLoading.value).toBe(false);
  });
});
