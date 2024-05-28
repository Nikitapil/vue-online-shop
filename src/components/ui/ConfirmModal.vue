<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue';
import AppButton from '@/components/ui/AppButton.vue';

const isOpened = defineModel<boolean>();

withDefaults(
  defineProps<{
    title: string;
    isLoading?: boolean;
  }>(),
  {
    isLoading: false
  }
);

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
    <div
      class="flex flex-col items-center w-full gap-8 min-h-[10rem]"
      data-testid="confirm-modal"
    >
      <h2 class="text-2xl font-bold flex-1">{{ title }}</h2>

      <div class="self-end flex gap-3">
        <AppButton
          appearance="transparent"
          :disabled="isLoading"
          @click="close"
        >
          {{ $t('cancel') }}
        </AppButton>

        <AppButton
          appearance="primary"
          data-testid="confirm-button"
          :disabled="isLoading"
          @click="$emit('confirm')"
        >
          {{ $t('confirm') }}
        </AppButton>
      </div>
    </div>
  </Modal>
</template>
