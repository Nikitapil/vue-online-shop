<script setup lang="ts">
import AppTextarea from '@/components/ui/AppInput/AppTextarea.vue';
import Modal from '@/components/ui/Modal.vue';
import { ref } from 'vue';

const isOpen = defineModel<boolean>();

const cancelReason = ref('');
</script>

<template>
  <Modal v-model="isOpen">
    <h2>Confirm order canceling</h2>
    <AppTextarea
      id="cancel-reason"
      v-model="cancelReason"
      label="Cancel reason"
      name="cancel-reason"
      rules="required"
    />
  </Modal>
</template>
