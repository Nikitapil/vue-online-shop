<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '../../../components/ui/AppButton.vue';
import AppInput from '../../../components/ui/AppInput/AppInput.vue';
import Modal from '../../../components/ui/Modal.vue';
import type { ChangePasswordDto } from '@/api/swagger/data-contracts';
import { useForm } from 'vee-validate';

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
    return 'Repeated password and new password should be equal';
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
    <h2 class="text-xl text-center font-bold mb-2">Change password</h2>
    <form @submit.prevent="onSubmit">
      <AppInput
        id="old-password"
        v-model="oldPassword"
        class="mb-2"
        name="old-password"
        type="password"
        label="Current password:"
        rules="required"
        :disabled="props.isLoading"
      />
      <AppInput
        id="new-password"
        v-model="newPassword"
        class="mb-2"
        name="new-password"
        type="password"
        label="New password:"
        rules="required|minLength:8"
        :disabled="props.isLoading"
      />
      <AppInput
        id="repeat-password"
        v-model="repeatPassword"
        class="mb-2"
        name="repeat-password"
        type="password"
        label="Repeat new password:"
        :rules="passwordMatchValidation"
        :disabled="props.isLoading"
      />
      <div class="flex gap-3 justify-end">
        <AppButton
          :disabled="props.isLoading"
          @click="isShowed = false"
        >
          Cancel
        </AppButton>
        <AppButton
          :disabled="props.isLoading"
          appearance="primary"
          type="submit"
        >
          Submit
        </AppButton>
      </div>
    </form>
  </Modal>
</template>
