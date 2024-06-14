import { product } from './mocks/product-mocks';
import { useToggleFavourite } from '../modules/shared/ToggleFavouriteButton/useToggleFavourite';
import { api } from '../api/apiInstance';
import { flushPromises } from '@vue/test-utils';

describe('useToggleFavorite tests', () => {
  test('should correctly toggle', async () => {
    api.toggleFavorites = async () => ({
      isInFavorites: true
    });
    const productRef = {
      value: product
    };

    const { isLoading, toggleFavourite } = useToggleFavourite(productRef as any);

    toggleFavourite();

    expect(isLoading.value).toBe(true);

    await flushPromises();

    expect(productRef.value.isInFavorites).toBe(true);
    expect(isLoading.value).toBe(false);
  });
});
