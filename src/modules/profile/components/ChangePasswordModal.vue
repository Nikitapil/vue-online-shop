<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '../../../components/ui/AppButton.vue';
import AppInput from '../../../components/ui/AppInput/AppInput.vue';
import Modal from '../../../components/ui/Modal.vue';

const isShowed = defineModel<boolean>();

const props = defineProps<{
  isLoading: boolean;
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
</script>

<template>
  <Modal v-model="isShowed">
    <h2 class="text-xl text-center font-bold mb-2">Change password</h2>
    <form @submit.prevent>
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
        >
          Submit
        </AppButton>
      </div>
    </form>
  </Modal>
</template>
