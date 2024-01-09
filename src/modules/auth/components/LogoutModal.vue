<script setup lang="ts">
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import { useAuthStore } from '@/modules/auth/authStore';
const isOpen = defineModel();

const authStore = useAuthStore();
</script>

<template>
  <confirm-modal
    v-model="isOpen"
    title="Do you want to log out?"
    @confirm="authStore.logout"
  />
</template>
