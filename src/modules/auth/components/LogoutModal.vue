<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/authStore';

import ConfirmModal from '@/components/ui/ConfirmModal.vue';

const isOpen = defineModel<boolean>();

const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
  isOpen.value = false;
};
</script>

<template>
  <confirm-modal
    v-model="isOpen"
    :title="$t('logout_question')"
    @confirm="logout"
  />
</template>
