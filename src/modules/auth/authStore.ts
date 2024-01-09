import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { AuthResponseDto, LoginDto, RegisterDto, UserReturnDto } from '@/api/swagger/data-contracts';
import { api } from '@/api/apiInstance';
import { setTokenToStorage } from '@/helpers/token-helpers';
import { toast } from 'vue3-toastify';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<UserReturnDto | null>(null);
  const isAuthLoading = ref(false);

  const isAuthenticated = computed(() => !!user.value);

  const authUnifiedMethod = async (method: () => Promise<AuthResponseDto>, errorHandler = console.error) => {
    try {
      isAuthLoading.value = true;
      const { user: userFromResponse, accessToken } = await method();
      user.value = userFromResponse;
      setTokenToStorage(accessToken);
    } catch (e: any) {
      errorHandler(e?.response?.data?.message || 'Error');
    } finally {
      isAuthLoading.value = false;
    }
  };

  const refresh = async () => {
    await authUnifiedMethod(api.refreshAuth);
  };

  const register = async (data: RegisterDto) => {
    await authUnifiedMethod(() => api.register(data), toast.error);
  };

  const login = async (data: LoginDto) => {
    await authUnifiedMethod(() => api.login(data), toast.error);
  };

  return { user, isAuthenticated, isAuthLoading, refresh, register, login };
});
