import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import {
  UserReturnDtoRolesEnum,
  type AuthResponseDto,
  type LoginDto,
  type RegisterDto,
  type UserReturnDto,
  type UpdateUserDataDto
} from '@/api/swagger/data-contracts';
import type { ChangePasswordDto } from '@/api/swagger/data-contracts';

import { api } from '@/api/apiInstance';

import { removeTokenFromStorage, setTokenToStorage } from '@/helpers/localStorage-helpers';
import { toast } from 'vue3-toastify';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<UserReturnDto | null>(null);
  const isAuthLoading = ref(false);

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => !!user.value?.roles?.includes(UserReturnDtoRolesEnum.ADMIN));

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

  const logout = async () => {
    try {
      isAuthLoading.value = true;
      await api.logout();
      user.value = null;
      removeTokenFromStorage();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    } finally {
      isAuthLoading.value = false;
    }
  };

  const updateUserData = async (data: UpdateUserDataDto) => {
    await authUnifiedMethod(() => api.updateUserData(data), toast.error);
  };

  const changePassword = async (data: ChangePasswordDto) => {
    await authUnifiedMethod(() => api.changePassword(data), toast.error);
  };

  return {
    user,
    isAuthenticated,
    isAuthLoading,
    isAdmin,
    refresh,
    register,
    login,
    logout,
    updateUserData,
    changePassword
  };
});
