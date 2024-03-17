import type { OrderReturnDto } from '@/api/swagger/data-contracts';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { GetOrdersParams } from '../../api/swagger/data-contracts';
import { toast } from 'vue3-toastify';
import { api } from '@/api/apiInstance';

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<OrderReturnDto[]>([]);
  const totalOrdersCount = ref(0);

  const getOrders = async ({ page, limit, order, status }: GetOrdersParams) => {
    const request: GetOrdersParams = { page, limit, order };
    if (status) {
      request.status = status;
    }
    try {
      const { totalCount, orders: ordersResponse } = await api.getOrders(request);
      orders.value = ordersResponse;
      totalOrdersCount.value = totalCount;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    }
  };
  return { orders, totalOrdersCount, getOrders };
});
