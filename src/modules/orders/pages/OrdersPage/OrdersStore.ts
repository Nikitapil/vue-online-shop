import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { getStatusColor } from '../../helpers/utils';
import { useApiMethod } from '@/api/useApiMethod';

import type { OrderReturnDto } from '@/api/swagger/data-contracts';
import type { GetOrdersParams } from '@/api/swagger/data-contracts';

import { api } from '@/api/apiInstance';

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<OrderReturnDto[]>([]);
  const totalOrdersCount = ref(0);

  const { call: getOrdersApi, isLoading: isOrdersLoading } = useApiMethod(api.getOrders);

  const dataSource = computed(() =>
    orders.value.map((order) => ({ ...order, key: order.id, statusColor: getStatusColor(order.status) }))
  );

  const getOrders = async ({ page, limit, order, status }: GetOrdersParams) => {
    const request: GetOrdersParams = { page, limit, order };
    if (status) {
      request.status = status;
    }
    const response = await getOrdersApi(request);

    if (response) {
      orders.value = response.orders;
      totalOrdersCount.value = response.totalCount;
    }
  };
  return { orders, totalOrdersCount, dataSource, isOrdersLoading, getOrders };
});
