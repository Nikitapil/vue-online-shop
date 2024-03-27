import { api } from '@/api/apiInstance';
import type { OrderReturnDto } from '@/api/swagger/data-contracts';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { type UpdateOrderStatusDto } from '../../../../api/swagger/data-contracts';
import { getStatusColor } from '../../helpers/utils';

export const useSingleOrderStore = defineStore('single-order', () => {
  const order = ref<OrderReturnDto | null>(null);
  const isLoading = ref(false);
  const isUpdateStatusInProgress = ref(false);
  const id = ref('');

  const statusColor = computed(() => (order.value?.status ? getStatusColor(order.value?.status) : ''));

  const loadOrder = async () => {
    try {
      isLoading.value = true;
      order.value = await api.getOrderById(id.value);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isLoading.value = false;
    }
  };

  const init = async (idFromRoute: string) => {
    id.value = idFromRoute;
    await loadOrder();
  };

  const updateOrderStatus = async ({ status, cancelReason }: Pick<UpdateOrderStatusDto, 'status' | 'cancelReason'>) => {
    if (!order.value) {
      return;
    }

    try {
      isUpdateStatusInProgress.value = true;
      await api.updateOrderStatus({ id: order.value.id, status, cancelReason });
      await loadOrder();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isUpdateStatusInProgress.value = false;
    }
  };

  return { order, isLoading, isUpdateStatusInProgress, statusColor, init, updateOrderStatus };
});
