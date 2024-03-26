<script setup lang="ts">
import AppTextarea from '../../../components/ui/AppInput/AppTextarea.vue';
import AppInput from '../../../components/ui/AppInput/AppInput.vue';
import Modal from '../../../components/ui/Modal.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useAuthStore } from '@/modules/auth/authStore';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import type { CreateOrderDto } from '@/api/swagger/data-contracts';

const isOpened = defineModel<boolean>();
const authStore = useAuthStore();

const props = defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  create: [CreateOrderDto];
}>();

const { validate } = useForm();

const address = ref(authStore.user?.address || '');
const phone = ref(authStore.user?.phone || '');
const comment = ref('');

const onSubmit = async () => {
  const validationResult = await validate();
  if (validationResult.valid) {
    emit('create', {
      address: address.value,
      phone: phone.value,
      comment: comment.value
    });
  }
};
</script>

<template>
  <!-- TODO loaders -->
  <Modal
    v-model="isOpened"
    size="md"
    :prevent-close="props.isLoading"
  >
    <form
      class="flex flex-col gap-3"
      @submit.prevent="onSubmit"
    >
      <h1 class="text-center text-2xl font-bold">Order creation</h1>
      <AppInput
        id="address"
        v-model="address"
        name="address"
        label="Delivery address"
        placeholder="Enter delivery address"
        rules="required"
        :disabled="props.isLoading"
      />
      <AppInput
        id="phone"
        v-model="phone"
        name="phone"
        label="Your contact phone"
        placeholder="Enter contact phone"
        rules="required"
        :disabled="props.isLoading"
      />
      <AppTextarea
        id="commet"
        v-model="comment"
        label="Comment"
        name="comment"
        placeholder="Enter comment for order"
        :disabled="props.isLoading"
      />
      <div class="flex gap-3 justify-end">
        <AppButton
          :disabled="props.isLoading"
          @click="isOpened = false"
        >
          Cancel
        </AppButton>
        <AppButton
          appearance="success"
          type="submit"
          :disabled="props.isLoading"
        >
          Create
        </AppButton>
      </div>
    </form>
  </Modal>
</template>
