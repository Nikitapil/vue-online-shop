import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { RegisterDto, UserReturnDto } from '@/api/swagger/data-contracts';
import { api } from '@/api/apiInstance';
import { setTokenToStorage } from '@/helpers/token-helpers';
import { toast } from 'vue3-toastify';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<UserReturnDto | null>(null);
  const isAuthLoading = ref(false);

  const refresh = async () => {
    try {
      isAuthLoading.value = true;
      const { user: userFromResponse, accessToken } = await api.refreshAuth();
      user.value = userFromResponse;
      setTokenToStorage(accessToken);
    } catch (e) {
      console.log(e);
    } finally {
      isAuthLoading.value = false;
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      isAuthLoading.value = true;
      const { user: userFromResponse, accessToken } = await api.register(data);
      user.value = userFromResponse;
      setTokenToStorage(accessToken);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isAuthLoading.value = false;
    }
  };

  const isAuthenticated = computed(() => !!user.value);

  return { user, isAuthenticated, isAuthLoading, refresh, register };
});
