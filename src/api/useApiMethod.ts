import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useApiMethod = <T extends (...args: any) => any>(apiMethod: T) => {
  const isLoading = ref(false);

  const call = async (...args: Parameters<T>): Promise<ReturnType<T> | null> => {
    try {
      isLoading.value = true;
      return await apiMethod(args);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
      return null
    } finally {
      isLoading.value = false;
    }
  };
  return { isLoading, call };
};
