<script setup lang="ts">
import { EAuthModalTypes } from '@/domain/components';

import Modal from '@/components/ui/Modal.vue';
import AuthForm from '@/modules/auth/components/AuthForm.vue';

const isOpen = defineModel<boolean>();

withDefaults(
  defineProps<{
    initialType?: EAuthModalTypes;
  }>(),
  {
    initialType: EAuthModalTypes.LOGIN
  }
);
</script>

<template>
  <Modal v-model="isOpen">
    <AuthForm
      :initial-type="initialType"
      @success="isOpen = false"
    />
  </Modal>
</template>
