import { vi } from 'vitest';
import { api } from '../api/apiInstance';
import { useCreateProduct } from '../modules/product-form/composables/useCreateProduct';
import { flushPromises } from '@vue/test-utils';

describe('useCreateProduct tests', async () => {
  test('should call createProduct Api method correctly', async () => {
    const apiFnSpy = vi.spyOn(api, 'createProduct').mockImplementation(() => {});
    const { createProduct, isLoading } = useCreateProduct();

    createProduct({});

    expect(isLoading.value).toBe(true);

    await flushPromises();

    expect(apiFnSpy).toHaveBeenCalledTimes(1);
    expect(isLoading.value).toBe(false);
  });
});
