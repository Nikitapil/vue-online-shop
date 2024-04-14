<script setup lang="ts">
import { ref } from 'vue';

import Modal from '@/components/ui/Modal.vue';
import AppInput from '@/components/ui/AppInput/AppInput.vue';
import AppButton from '@/components/ui/AppButton.vue';
import type { CreateDiscountDto } from '@/api/swagger/data-contracts';
import { useForm } from 'vee-validate';

const isOpened = defineModel<boolean>();

const { validate } = useForm();

const props = defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  create: [CreateDiscountDto];
}>();

const name = ref('');
const percentage = ref('');

const onSubmit = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('create', { name: name.value, percentage: +percentage.value });
  }
};
</script>

<template>
  <Modal
    v-model="isOpened"
    size="md"
  >
    <h2 class="text-center text-xl font-semibold">Create Discount</h2>
    <form @submit.prevent="onSubmit">
      <AppInput
        id="discount-name"
        v-model="name"
        name="discount-name"
        rules="required"
        label="Discount name:"
        placeholder="Name..."
        :disabled="props.isLoading"
      />
      <AppInput
        id="discount-percentage"
        v-model="percentage"
        name="discount-percentage"
        rules="required"
        label="Discount percentage:"
        mask="numberMask"
        placeholder="percentage..."
        :disabled="props.isLoading"
      />
      <div class="flex gap-2 justify-end mt-2">
        <AppButton
          :disabled="props.isLoading"
          @click="isOpened = false"
        >
          Cancel
        </AppButton>
        <AppButton
          appearance="primary"
          type="submit"
          :disabled="props.isLoading"
        >
          Submit
        </AppButton>
      </div>
    </form>
  </Modal>
</template>
