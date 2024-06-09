import { createPinia, setActivePinia } from 'pinia';
import { vi } from 'vitest';
import { useProductReviewsListStore } from '../modules/product-page/components/ProductReviewsList/useProductReviewsListStore';
import { api } from '../api/apiInstance';
import { getReviewsMock, reviewMock1 } from './mocks/reviews-mocks';
import { flushPromises } from '@vue/test-utils';

describe('useProductReviewsListStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Should have correct default values', () => {
    const store = useProductReviewsListStore();

    expect(store.reviews).toEqual([]);
    expect(store.totalCount).toEqual(0);
    expect(store.isReviewAdded).toEqual(false);
    expect(store.isReviewsLoading).toEqual(false);
    expect(store.isAddReviewInProgress).toEqual(false);
    expect(store.isDeleteReviewInProgress).toEqual(false);
  });

  test('should call getProductReviews correctly', async () => {
    const apiSpy = vi.spyOn(api, 'getReviews').mockImplementation(() => getReviewsMock);

    const store = useProductReviewsListStore();

    store.init('123');

    expect(store.isReviewsLoading).toBe(true);

    await flushPromises();

    expect(apiSpy).toHaveBeenCalled();
    expect(store.reviews).toEqual(getReviewsMock.reviews);
    expect(store.totalCount).toEqual(getReviewsMock.totalCount);
    expect(store.isReviewsLoading).toEqual(false);
  });

  test('should not call api if no productId', async () => {
    const apiSpy = vi.spyOn(api, 'getReviews').mockImplementation(() => getReviewsMock);

    const store = useProductReviewsListStore();

    await store.getProductReviews('123');

    expect(apiSpy).not.toHaveBeenCalled();
    expect(store.reviews).toEqual([]);
    expect(store.totalCount).toEqual(0);
  });

  test('should call addProductReview correctly', async () => {
    const createReviewSpy = vi.spyOn(api, 'createReview').mockImplementation(() => reviewMock1);
    const getReviewsSpy = vi.spyOn(api, 'getReviews').mockImplementation(() => reviewMock1);

    const store = useProductReviewsListStore();

    await store.init('123');

    store.addProductReview({});

    expect(store.isAddReviewInProgress).toBe(true);

    await flushPromises();

    expect(createReviewSpy).toHaveBeenCalled();
    expect(getReviewsSpy).toHaveBeenCalledTimes(2);
    expect(store.isAddReviewInProgress).toBe(false);
  });

  test('should not call createReview api method if no productId', async () => {
    const createReviewSpy = vi.spyOn(api, 'createReview').mockImplementation(() => reviewMock1);
    const getReviewsSpy = vi.spyOn(api, 'getReviews').mockImplementation(() => reviewMock1);

    const store = useProductReviewsListStore();

    await store.addProductReview({});

    expect(createReviewSpy).not.toHaveBeenCalled();
    expect(getReviewsSpy).toHaveBeenCalledTimes(0);
    expect(store.isAddReviewInProgress).toBe(false);
  });

  test('should call deleteProductReview correctly', async () => {
    const deleteReviewSpy = vi.spyOn(api, 'deleteReview').mockImplementation(() => {});
    const getReviewsSpy = vi.spyOn(api, 'getReviews').mockImplementation(() => reviewMock1);

    const store = useProductReviewsListStore();

    await store.init('123');

    store.deleteProductReview({});

    expect(store.isDeleteReviewInProgress).toBe(true);

    await flushPromises();

    expect(deleteReviewSpy).toHaveBeenCalled();
    expect(getReviewsSpy).toHaveBeenCalledTimes(2);
    expect(store.isDeleteReviewInProgress).toBe(false);
  });

  test('should not call deleteReview api method if no productId', async () => {
    const deleteReviewSpy = vi.spyOn(api, 'deleteReview').mockImplementation(() => {});
    const getReviewsSpy = vi.spyOn(api, 'getReviews').mockImplementation(() => reviewMock1);

    const store = useProductReviewsListStore();

    await store.deleteProductReview({});

    expect(deleteReviewSpy).not.toHaveBeenCalled();
    expect(getReviewsSpy).toHaveBeenCalledTimes(0);
    expect(store.isDeleteReviewInProgress).toBe(false);
  });
});
