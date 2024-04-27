<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from '@/modules/app/components/AppHeader.vue';
import { useAuthStore } from '@/modules/auth/authStore';
import { useAppStore } from '../appStore';
import LanguageSwitcher from '@/modules/app/components/LanguageSwitcher.vue';
import CurrencySwitcher from '@/modules/app/components/CurrencySwitcher.vue';

const authStore = useAuthStore();
const appStore = useAppStore();

onMounted(async () => {
  await authStore.refresh();
  await appStore.getFinanceSettings();
});
</script>

<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl my-10 flex-1">
    <AppHeader
      :is-authenticated="authStore.isAuthenticated"
      :is-auth-loading="authStore.isAuthLoading"
      :is-admin="authStore.isAdmin"
    />

    <div class="flex justify-end py-1 px-2 border">
      <CurrencySwitcher class="mr-3" />
      <LanguageSwitcher />
    </div>

    <div class="px-8 py-5">
      <router-view />
    </div>
  </div>
</template>
