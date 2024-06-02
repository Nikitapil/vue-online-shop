<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';

import AppButton from '@/components/ui/AppButton.vue';
import AppTextarea from '@/components/ui/AppInput/AppTextarea.vue';
import Modal from '@/components/ui/Modal.vue';

const { validate } = useForm();

const isOpen = defineModel<boolean>();

const props = defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  cancel: [];
  confirm: [string];
}>();

const cancelReason = ref('');

const onConfirm = async () => {
  const { valid } = await validate();

  if (valid) {
    emit('confirm', cancelReason.value);
  }
};
</script>

<template>
  <Modal
    v-model="isOpen"
    :prevent-close="props.isLoading"
  >
    <h2 class="text-xl font-bold text-center mb-3">{{ $t('confirm_order_canceling') }}</h2>

    <AppTextarea
      id="cancel-reason"
      v-model="cancelReason"
      :label="`${$t('cancel_reason')}:`"
      name="cancel-reason"
      rules="required"
      :disabled="props.isLoading"
    />

    <div class="flex gap-3 justify-end">
      <AppButton
        :disabled="props.isLoading"
        @click="$emit('cancel')"
      >
        {{ $t('cancel') }}
      </AppButton>

      <AppButton
        appearance="primary"
        :disabled="props.isLoading"
        @click="onConfirm"
      >
        {{ $t('confirm') }}
      </AppButton>
    </div>
  </Modal>
</template>
