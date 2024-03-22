import type { OrderReturnDto } from '@/api/swagger/data-contracts';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { GetOrdersParams } from '../../../../api/swagger/data-contracts';
import { toast } from 'vue3-toastify';
import { api } from '@/api/apiInstance';
import { getStatusColor } from '../../helpers/utils';

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<OrderReturnDto[]>([]);
  const totalOrdersCount = ref(0);
  const isOrdersLoading = ref(false);

  const dataSource = computed(() =>
    orders.value.map((order) => ({ ...order, key: order.id, statusColor: getStatusColor(order.status) }))
  );

  const getOrders = async ({ page, limit, order, status }: GetOrdersParams) => {
    const request: GetOrdersParams = { page, limit, order };
    if (status) {
      request.status = status;
    }
    try {
      isOrdersLoading.value = true;
      const { totalCount, orders: ordersResponse } = await api.getOrders(request);
      orders.value = ordersResponse;
      totalOrdersCount.value = totalCount;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isOrdersLoading.value = false;
    }
  };
  return { orders, totalOrdersCount, dataSource, isOrdersLoading, getOrders };
});
