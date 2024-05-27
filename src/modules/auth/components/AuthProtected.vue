<script setup lang="ts">
import { computed } from 'vue';

import { useAuthStore } from '@/modules/auth/authStore';

import { UserReturnDtoRolesEnum } from '@/api/swagger/data-contracts';

import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import AuthForm from '@/modules/auth/components/AuthForm.vue';

const props = withDefaults(
  defineProps<{
    admittedRoles?: UserReturnDtoRolesEnum[];
  }>(),
  {
    admittedRoles: () => []
  }
);

const authStore = useAuthStore();

const isUserRoleAdmitted = computed(() => {
  if (!props.admittedRoles.length) {
    return true;
  } else {
    return authStore.user?.roles.some((role) => props.admittedRoles.includes(role));
  }
});
</script>

<template>
  <div
    v-if="authStore.isAuthLoading"
    class="flex min-h-[310px] justify-center items-center"
  >
    <RoundedLoader />
  </div>

  <div v-else-if="!authStore.isAuthenticated">
    <AuthForm />
  </div>

  <div
    v-else-if="!isUserRoleAdmitted"
    class="text-2xl font-bold min-h-[310px] flex justify-center items-center tracking-wider"
  >
    {{ $t('page_is_not_allowed') }}
  </div>

  <slot v-else />
</template>
