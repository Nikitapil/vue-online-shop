<script setup lang="ts">
import AdminNav from '@/modules/admin/components/AdminNav.vue';
</script>

<template>
  <div class="flex">
    <AdminNav />
    <div class="px-8 flex-1">
      <RouterView />
    </div>
  </div>
</template>
