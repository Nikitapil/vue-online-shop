<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue';
const isOpen = defineModel();
</script>

<template>
  <Modal v-model="isOpen"> Auth </Modal>
</template>
