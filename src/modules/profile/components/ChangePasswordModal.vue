<script setup lang="ts">
import { ref } from 'vue';

import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';

import type { ChangePasswordDto } from '@/api/swagger/data-contracts';

import AppInput from '../../../components/ui/AppInput/AppInput.vue';
import Modal from '../../../components/ui/Modal.vue';
import AppButton from '../../../components/ui/AppButton.vue';

const { t } = useI18n();

const { validate } = useForm();

const isShowed = defineModel<boolean>();

const props = defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  confirm: [ChangePasswordDto];
}>();

const oldPassword = ref('');
const newPassword = ref('');
const repeatPassword = ref('');

const passwordMatchValidation = () => {
  if (repeatPassword.value !== newPassword.value) {
    return t('repeated_password_should_be_equal');
  }

  return true;
};

const onSubmit = async () => {
  const { valid } = await validate();

  if (valid) {
    emit('confirm', {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      confirmPassword: repeatPassword.value
    });
  }
};
</script>

<template>
  <Modal
    v-model="isShowed"
    size="md"
  >
    <h2 class="text-xl text-center font-bold mb-2">{{ $t('change_password') }}</h2>

    <form @submit.prevent="onSubmit">
      <AppInput
        id="old-password"
        v-model="oldPassword"
        class="mb-2"
        name="old-password"
        type="password"
        rules="required"
        :label="`${$t('current_password')}:`"
        :disabled="props.isLoading"
      />

      <AppInput
        id="new-password"
        v-model="newPassword"
        class="mb-2"
        name="new-password"
        type="password"
        rules="required|minLength:8"
        :label="`${$t('new_password')}:`"
        :disabled="props.isLoading"
      />

      <AppInput
        id="repeat-password"
        v-model="repeatPassword"
        class="mb-2"
        name="repeat-password"
        type="password"
        :label="`${$t('repeat_new_password')}:`"
        :rules="passwordMatchValidation"
        :disabled="props.isLoading"
      />

      <div class="flex gap-3 justify-end">
        <AppButton
          :disabled="props.isLoading"
          @click="isShowed = false"
        >
          {{ $t('cancel') }}
        </AppButton>

        <AppButton
          :disabled="props.isLoading"
          appearance="primary"
          type="submit"
        >
          {{ $t('submit') }}
        </AppButton>
      </div>
    </form>
  </Modal>
</template>
