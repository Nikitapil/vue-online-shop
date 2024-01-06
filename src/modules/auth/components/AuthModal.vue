<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue';
import AuthForm from '@/modules/auth/components/AuthForm.vue';
const isOpen = defineModel();

withDefaults(
  defineProps<{
    initialType?: 'login' | 'register';
  }>(),
  {
    initialType: 'login'
  }
);
</script>

<template>
  <Modal v-model="isOpen">
    <AuthForm :initial-type="initialType" />
  </Modal>
</template>
