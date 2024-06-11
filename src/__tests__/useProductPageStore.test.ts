import { createApp } from 'vue';
import { vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useProductPageStore } from '../modules/product-page/useProductPageStore';
import { api } from '../api/apiInstance';
import { product } from './mocks/product-mocks';
import { flushPromises } from '@vue/test-utils';
import { router } from '../router';
import { NO_DISCOUNTS } from '../domain/discounts';

describe('useProductPageStore tests', () => {
  beforeEach(() => {
    const pinia = createPinia();
    const app = createApp({});
    app.use(router);
    app.use(pinia);
    setActivePinia(pinia);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should return the initial state', () => {
    const store = useProductPageStore();

    expect(store.product).toBe(null);
    expect(store.isProductLoading).toBe(false);
    expect(store.isDeleteInProgress).toBe(false);
    expect(store.isEditProductDiscountInProgress).toBe(false);
  });

  test('should load product correctly', async () => {
    api.getProduct = async () => product;

    const store = useProductPageStore();

    store.init({});

    expect(store.isProductLoading).toBe(true);

    await flushPromises();

    expect(store.product).toEqual(product);
    expect(store.isProductLoading).toBe(false);
  });

  test('should delete product correctly', async () => {
    api.getProduct = async () => product;
    const apiSpy = vi.spyOn(api, 'deleteProduct').mockImplementation(() => {});

    const store = useProductPageStore();

    await store.init({});

    store.deleteProduct();

    expect(store.isDeleteInProgress).toBe(true);

    await flushPromises();

    expect(apiSpy).toHaveBeenCalledTimes(1);
    expect(store.product).toBe(null);
    expect(store.isDeleteInProgress).toBe(false);
  });

  test('should not delete product if no product', async () => {
    const apiSpy = vi.spyOn(api, 'deleteProduct').mockImplementation(() => {});

    const store = useProductPageStore();

    store.deleteProduct();

    await flushPromises();

    expect(apiSpy).toHaveBeenCalledTimes(0);
    expect(store.product).toBe(null);
    expect(store.isDeleteInProgress).toBe(false);
  });

  test('should not edit product discount if no product', async () => {
    const apiSpy = vi.spyOn(api, 'editProductDiscount').mockImplementation(() => {});

    const store = useProductPageStore();

    store.editProductDiscount();

    await flushPromises();

    expect(apiSpy).toHaveBeenCalledTimes(0);
    expect(store.product).toBe(null);
    expect(store.isDeleteInProgress).toBe(false);
  });

  test('should correctly edit product discount', async () => {
    api.getProduct = async () => product;
    const apiSpy = vi.spyOn(api, 'editProductDiscount').mockImplementation(() => {});

    const store = useProductPageStore();

    await store.init({});

    store.editProductDiscount();

    expect(store.isEditProductDiscountInProgress).toBe(true);

    await flushPromises();

    expect(apiSpy).toHaveBeenCalledTimes(1);
    expect(store.isDeleteInProgress).toBe(false);
  });

  test('should correctly edit product discount', async () => {
    api.getProduct = async () => product;
    const apiSpy = vi.spyOn(api, 'editProductDiscount').mockImplementation(() => {});

    const store = useProductPageStore();

    await store.init({});

    store.editProductDiscount();

    expect(store.isEditProductDiscountInProgress).toBe(true);

    await flushPromises();

    expect(apiSpy).toHaveBeenCalledTimes(1);
    expect(store.isDeleteInProgress).toBe(false);
  });

  test('should edit product discount with null value', async () => {
    api.getProduct = async () => product;
    const apiSpy = vi.spyOn(api, 'editProductDiscount').mockImplementation(() => {});

    const store = useProductPageStore();

    await store.init({});

    store.editProductDiscount(NO_DISCOUNTS);

    expect(store.isEditProductDiscountInProgress).toBe(true);

    await flushPromises();

    expect(apiSpy).toHaveBeenCalledWith({ productId: product.id, discountId: null });
    expect(store.isDeleteInProgress).toBe(false);
  });
});
