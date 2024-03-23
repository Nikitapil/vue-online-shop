import { api } from '@/api/apiInstance';
import type { OrderReturnDto } from '@/api/swagger/data-contracts';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useSingleOrderStore = defineStore('single-order', () => {
  const order = ref<OrderReturnDto | null>(null);
  const isLoading = ref(false);
  const id = ref('');

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

  const init = (idFromRoute: string) => {
    id.value = idFromRoute;
    loadOrder();
  };

  return { order, isLoading, init };
});
