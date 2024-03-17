<script setup lang="ts">
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
</script>

<template>
  <AuthProtected :admitted-roles="['ADMIN']">
    <h1>AdminOrders</h1>
  </AuthProtected>
</template>
