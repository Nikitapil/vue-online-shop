<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue';

const isOpen = defineModel<boolean>();
</script>

<template>
  <Modal v-model="isOpen">
    <h2>Confirm order canceling</h2>
  </Modal>
</template>
