<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';

import type { IDiscountParams } from '@/modules/discounts/types';

import Modal from '@/components/ui/Modal.vue';
import AppInput from '@/components/ui/AppInput/AppInput.vue';
import AppButton from '@/components/ui/AppButton.vue';

const isOpened = defineModel<boolean>();

const { validate } = useForm();

const props = defineProps<{
  title: string;
  isLoading: boolean;
  initialValues?: IDiscountParams;
}>();

const emit = defineEmits<{
  submit: [IDiscountParams];
}>();

const name = ref('');
const percentage = ref('');

const onSubmit = async () => {
  const { valid } = await validate();

  if (valid) {
    emit('submit', { name: name.value, percentage: +percentage.value });
  }
};

onMounted(() => {
  if (props.initialValues) {
    name.value = props.initialValues.name;
    percentage.value = props.initialValues.percentage.toString();
  }
});
</script>

<template>
  <Modal
    v-model="isOpened"
    size="md"
  >
    <h2 class="text-center text-xl font-semibold">{{ props.title }}</h2>

    <form @submit.prevent="onSubmit">
      <AppInput
        id="discount-name"
        v-model="name"
        name="discount-name"
        rules="required"
        :label="`${$t('discount_name')}:`"
        :placeholder="$t('item_name_placeholder')"
        :disabled="props.isLoading"
      />

      <AppInput
        id="discount-percentage"
        v-model="percentage"
        name="discount-percentage"
        rules="required"
        mask="numberMask"
        :label="`${$t('discount_percent')}:`"
        :placeholder="$t('percentage')"
        :disabled="props.isLoading"
      />

      <div class="flex gap-2 justify-end mt-2">
        <AppButton
          :disabled="props.isLoading"
          @click="isOpened = false"
        >
          {{ $t('cancel') }}
        </AppButton>

        <AppButton
          appearance="primary"
          type="submit"
          :disabled="props.isLoading"
        >
          {{ $t('save') }}
        </AppButton>
      </div>
    </form>
  </Modal>
</template>
