import { createPinia, setActivePinia } from 'pinia';
import { vi } from 'vitest';
import { useOrdersStore } from '../modules/orders/pages/OrdersPage/OrdersStore';
import { getOrdersResponseMock, mockOrder } from './mocks/order-mocks';
import { api } from '../api/apiInstance';
import { flushPromises } from '@vue/test-utils';
import { getStatusColor } from '../modules/orders/helpers/utils';
import { OrderEnum, OrderStatusEnum } from '../api/swagger/data-contracts';

describe('OrdersStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should be default store values', async () => {
    const store = useOrdersStore();

    expect(store.orders).toEqual([]);
    expect(store.totalOrdersCount).toBe(0);
    expect(store.dataSource).toEqual([]);
    expect(store.isOrdersLoading).toBe(false);
  });

  test('should setValues by getOrders method correctly', async () => {
    api.getOrders = async () => getOrdersResponseMock;
    const store = useOrdersStore();

    store.getOrders({});

    expect(store.isOrdersLoading).toBe(true);

    await flushPromises();

    const datasource = [
      {
        ...mockOrder,
        key: mockOrder.id,
        statusColor: getStatusColor(mockOrder.status)
      }
    ];

    expect(store.orders).toEqual([mockOrder]);
    expect(store.totalOrdersCount).toBe(1);
    expect(store.dataSource).toEqual(datasource);
    expect(store.isOrdersLoading).toBe(false);
  });

  test('should call getOrders method with status correctly', async () => {
    const apiCallSpy = vi.spyOn(api, 'getOrders').mockImplementation(async () => getOrdersResponseMock);
    const store = useOrdersStore();

    const request = {
      page: 1,
      limit: 10,
      order: OrderEnum.UpdatedAt,
      status: OrderStatusEnum.CANCELED
    };

    await store.getOrders(request);

    expect(apiCallSpy).toHaveBeenCalledWith(request);
  });
});
