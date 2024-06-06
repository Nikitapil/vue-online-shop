import { vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';

import { useEditProduct } from '../modules/product-form/composables/useEditProduct';
import { api } from '../api/apiInstance';

describe('useEditProduct tests', async () => {
  test('should call editProduct Api method correctly', async () => {
    const apiFnSpy = vi.spyOn(api, 'editProduct').mockImplementation(() => {});
    const { editProduct, isLoading } = useEditProduct();

    editProduct({});

    expect(isLoading.value).toBe(true);

    await flushPromises();

    expect(apiFnSpy).toHaveBeenCalledTimes(1);
    expect(isLoading.value).toBe(false);
  });
});
