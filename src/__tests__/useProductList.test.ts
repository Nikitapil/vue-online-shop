import { api } from '../api/apiInstance';
import { productsResponseMock } from './mocks/product-mocks';
import { useProductList } from '../modules/shared/ProductList/useProductList';
import { flushPromises } from '@vue/test-utils';
import { vi } from 'vitest';
import { toast } from 'vue3-toastify';

describe('useProductList tests', () => {
  test('Should load products correctly', async () => {
    api.getProducts = async () => productsResponseMock;

    const { products, totalProductsCount, isLoading, loadProducts } = useProductList();

    loadProducts({});

    expect(isLoading.value).toBe(true);

    await flushPromises();

    expect(products.value).toEqual(productsResponseMock.products);
    expect(totalProductsCount.value).toEqual(productsResponseMock.totalCount);
    expect(isLoading.value).toEqual(false);
  });

  test('Should show toast', async () => {
    const toastSpy = vi.spyOn(toast, 'error');
    api.getProducts = async () => {
      throw new Error();
    };

    const { products, totalProductsCount, isLoading, loadProducts } = useProductList();

    loadProducts({});

    expect(isLoading.value).toBe(true);

    await flushPromises();

    expect(products.value).toEqual([]);
    expect(totalProductsCount.value).toEqual(0);
    expect(isLoading.value).toEqual(false);
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledWith('Error');
  });

  test('Should show toast with error from response', async () => {
    const toastSpy = vi.spyOn(toast, 'error');
    api.getProducts = async () => {
      throw {
        response: {
          data: {
            message: 'response error'
          }
        }
      };
    };

    const { products, totalProductsCount, isLoading, loadProducts } = useProductList();

    loadProducts({});

    expect(isLoading.value).toBe(true);

    await flushPromises();

    expect(products.value).toEqual([]);
    expect(totalProductsCount.value).toEqual(0);
    expect(isLoading.value).toEqual(false);
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledWith('response error');
  });

  test('Should load favourites products correctly', async () => {
    api.getFavoriteProducts = async () => productsResponseMock;

    const { products, totalProductsCount, isLoading, loadFavoriteProducts } = useProductList();

    loadFavoriteProducts({});

    expect(isLoading.value).toBe(true);

    await flushPromises();

    expect(products.value).toEqual(productsResponseMock.products);
    expect(totalProductsCount.value).toEqual(productsResponseMock.totalCount);
    expect(isLoading.value).toEqual(false);
  });
});
