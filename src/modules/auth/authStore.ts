import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserReturnDto } from '@/api/swagger/data-contracts';
import { api } from '@/api/apiInstance';
import { setTokenToStorage } from '@/helpers/token-helpers';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<UserReturnDto | null>(null);

  const refresh = async () => {
    try {
      const { user: userFromResponse, accessToken } = await api.refreshAuth();
      user.value = userFromResponse;
      setTokenToStorage(accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  return { user, refresh };
});
