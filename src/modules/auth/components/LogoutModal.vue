<script setup lang="ts">
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import { useAuthStore } from '@/modules/auth/authStore';
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
    title="Do you want to log out?"
    @confirm="logout"
  />
</template>
