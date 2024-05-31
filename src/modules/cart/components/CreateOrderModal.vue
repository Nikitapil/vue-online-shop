<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';

import { useAuthStore } from '@/modules/auth/authStore';

import type { CreateOrderDto } from '@/api/swagger/data-contracts';

import AppTextarea from '../../../components/ui/AppInput/AppTextarea.vue';
import AppInput from '../../../components/ui/AppInput/AppInput.vue';
import Modal from '../../../components/ui/Modal.vue';
import AppButton from '@/components/ui/AppButton.vue';

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
  <Modal
    v-model="isOpened"
    size="md"
    :prevent-close="props.isLoading"
  >
    <form
      class="flex flex-col gap-3"
      @submit.prevent="onSubmit"
    >
      <h1 class="text-center text-2xl font-bold">{{ $t('order_creation') }}</h1>

      <AppInput
        id="address"
        v-model="address"
        name="address"
        rules="required"
        :label="$t('delivery_address')"
        :placeholder="$t('enter_delivery_address')"
        :disabled="props.isLoading"
      />

      <AppInput
        id="phone"
        v-model="phone"
        name="phone"
        rules="required"
        :placeholder="$t('enter_contact_phone')"
        :label="$t('your_contact_phone')"
        :disabled="props.isLoading"
      />

      <AppTextarea
        id="comment"
        v-model="comment"
        name="comment"
        :label="$t('comment')"
        :placeholder="$t('enter_comment_for_order')"
        :disabled="props.isLoading"
      />

      <div class="flex gap-3 justify-end">
        <AppButton
          :disabled="props.isLoading"
          @click="isOpened = false"
        >
          {{ $t('cancel') }}
        </AppButton>

        <AppButton
          appearance="success"
          type="submit"
          :disabled="props.isLoading"
        >
          {{ $t('create') }}
        </AppButton>
      </div>
    </form>
  </Modal>
</template>
