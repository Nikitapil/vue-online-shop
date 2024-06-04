import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { useApiMethod } from '@/api/useApiMethod';
import { getStatusColor } from '../../helpers/utils';

import type { OrderReturnDto } from '@/api/swagger/data-contracts';
import type { UpdateOrderStatusDto } from '@/api/swagger/data-contracts';

import { api } from '@/api/apiInstance';

export const useSingleOrderStore = defineStore('single-order', () => {
  const order = ref<OrderReturnDto | null>(null);
  const id = ref('');

  const { call: getOrderById, isLoading } = useApiMethod(api.getOrderById);
  const { call: updateOrderStatusApi, isLoading: isUpdateStatusInProgress } = useApiMethod(api.updateOrderStatus);

  const statusColor = computed(() => (order.value?.status ? getStatusColor(order.value?.status) : ''));

  const loadOrder = async () => {
    order.value = await getOrderById(id.value);
  };

  const init = async (idFromRoute: string) => {
    id.value = idFromRoute;
    await loadOrder();
  };

  const updateOrderStatus = async ({ status, cancelReason }: Pick<UpdateOrderStatusDto, 'status' | 'cancelReason'>) => {
    if (!order.value) {
      return;
    }
    await updateOrderStatusApi({ id: order.value.id, status, cancelReason });
    await loadOrder();
  };

  return { order, isLoading, isUpdateStatusInProgress, statusColor, init, updateOrderStatus };
});
