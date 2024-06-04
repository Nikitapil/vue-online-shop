import { vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useSingleOrderStore } from '../modules/orders/pages/SingleOrderPage/SingleOrderStore';
import { api } from '../api/apiInstance';
import { mockOrder } from './mocks/order-mocks';
import { flushPromises } from '@vue/test-utils';

describe('SingleOrderStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should has correct default values', () => {
    const store = useSingleOrderStore();

    expect(store.order).toBe(null);
    expect(store.isLoading).toBe(false);
    expect(store.isUpdateStatusInProgress).toBe(false);
    expect(store.statusColor).toBe('');
  });

  test('should set order value by loadOrder method', async () => {
    api.getOrderById = async () => mockOrder;
    const store = useSingleOrderStore();

    store.init();

    expect(store.isLoading).toBe(true);

    await flushPromises();

    expect(store.order).toEqual(mockOrder);
    expect(store.isLoading).toBe(false);
    expect(store.statusColor).toBe('#4ade80');
  });

  test('should not update orderStatus if no order', async () => {
    const apiSpy = vi.spyOn(api, 'updateOrderStatus').mockImplementation(() => {});
    const store = useSingleOrderStore();

    store.updateOrderStatus({});

    expect(apiSpy).toHaveBeenCalledTimes(0);
    expect(store.order).toEqual(null);
    expect(store.isLoading).toBe(false);
    expect(store.statusColor).toBe('');
  });

  test('should not update orderStatus if order', async () => {
    const apiSpyUpdateOrderStatus = vi.spyOn(api, 'updateOrderStatus').mockImplementation(() => {});
    const apiSpyGetOrder = vi.spyOn(api, 'getOrderById').mockImplementation(() => mockOrder);
    const store = useSingleOrderStore();

    store.order = mockOrder;

    store.updateOrderStatus({});

    expect(store.isUpdateStatusInProgress).toBe(true);

    await flushPromises();

    expect(apiSpyUpdateOrderStatus).toHaveBeenCalledTimes(1);
    expect(apiSpyGetOrder).toHaveBeenCalledTimes(1);
    expect(store.order).toEqual(mockOrder);
    expect(store.isLoading).toBe(false);
    expect(store.isUpdateStatusInProgress).toBe(false);
    expect(store.statusColor).toBe('#4ade80');
  });
});
