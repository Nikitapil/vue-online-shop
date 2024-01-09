<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue';
import AppButton from '@/components/ui/AppButton.vue';
const isOpened = defineModel();

defineProps<{
  title: string;
}>();

defineEmits<{
  confirm: [];
}>();

const close = () => (isOpened.value = false);
</script>

<template>
  <Modal
    v-model="isOpened"
    size="md"
  >
    <div class="flex flex-col items-center w-full gap-8 min-h-[10rem]">
      <h2 class="text-2xl font-bold flex-1">{{ title }}</h2>
      <div class="self-end flex gap-3">
        <AppButton
          appearance="transparent"
          @click="close"
        >
          Cancel
        </AppButton>
        <AppButton
          appearance="primary"
          @click="$emit('confirm')"
        >
          Confirm
        </AppButton>
      </div>
    </div>
  </Modal>
</template>
