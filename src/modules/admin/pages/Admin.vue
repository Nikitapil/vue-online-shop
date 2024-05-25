<script setup lang="ts">
import { UserReturnDtoRolesEnum } from '@/api/swagger/data-contracts';

import AdminNav from '@/modules/admin/components/AdminNav.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
</script>

<template>
  <AuthProtected :admitted-roles="[UserReturnDtoRolesEnum.ADMIN]">
    <div class="flex">
      <AdminNav />

      <div class="px-8 flex-1">
        <RouterView />
      </div>
    </div>
  </AuthProtected>
</template>
