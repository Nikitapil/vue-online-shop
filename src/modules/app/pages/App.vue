<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from '@/modules/app/components/AppHeader.vue';
import { useAuthStore } from '@/modules/auth/authStore';
import { useAppStore } from '../appStore';

const authStore = useAuthStore();
const appStore = useAppStore();

onMounted(async () => {
  await authStore.refresh();
  await appStore.getFinanceSettings();
});
</script>

<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl my-10">
    <AppHeader
      :is-authenticated="authStore.isAuthenticated"
      :is-auth-loading="authStore.isAuthLoading"
      :is-admin="authStore.isAdmin"
    />

    <div class="px-8 py-5">
      <router-view />
    </div>
  </div>
</template>
