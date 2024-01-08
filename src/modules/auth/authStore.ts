import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { UserReturnDto } from '@/api/swagger/data-contracts';
import { api } from '@/api/apiInstance';
import { setTokenToStorage } from '@/helpers/token-helpers';

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

  const register = async () => {
    try {
      
    } catch (e) {
      
    }
  }

  const isAuthenticated = computed(() => !!user.value);

  return { user, isAuthenticated, isAuthLoading, refresh };
});
