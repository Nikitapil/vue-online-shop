<script setup lang="ts">
import { ref, type MaybeRef } from 'vue';

import { useForm, type RuleExpression } from 'vee-validate';

import type { TMasks } from '@/components/ui/AppInput/masks';

import AppInput from './AppInput/AppInput.vue';
import IconButton from './IconButton.vue';

const isEditMode = defineModel<boolean>();

const { validate } = useForm();

const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    initialValue: string;
    isLoading?: boolean;
    label?: string;
    rules?: MaybeRef<RuleExpression<any>>;
    mask?: TMasks;
  }>(),
  {
    rules: '',
    label: '',
    mask: 'noMask',
    isLoading: false
  }
);

const emit = defineEmits<{
  submit: [value: string];
}>();

const value = ref<string>(props.initialValue);

const openEditMode = () => (isEditMode.value = true);
const closeEditMode = () => {
  value.value = props.initialValue;
  isEditMode.value = false;
};

const onSubmit = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('submit', value.value);
  }
};
</script>

<template>
  <div class="flex flex-wrap gap-2 items-center">
    <label
      v-if="label"
      class="font-bold text-xl"
      :for="id"
    >
      {{ label }}
    </label>

    <form
      v-if="isEditMode"
      class="flex gap-2"
      @submit.prevent="onSubmit"
    >
      <AppInput
        :id="props.id"
        v-model="value"
        :name="props.name"
        :rules="props.rules"
        :disabled="props.isLoading"
        :mask="props.mask"
      />

      <IconButton
        v-tooltip="$t('save')"
        icon="line-md:circle-to-confirm-circle-transition"
        type="submit"
        color="#1fe425"
        :disabled="props.isLoading"
      />

      <IconButton
        v-tooltip="$t('cancel')"
        icon="carbon:close-outline"
        color="#e30b1a"
        :disabled="props.isLoading"
        @click="closeEditMode"
      />
    </form>

    <div
      v-else
      class="flex gap-2 text-xl"
    >
      <p>{{ value }}</p>

      <IconButton
        v-tooltip="$t('edit')"
        icon="ic:outline-edit"
        :disabled="props.isLoading"
        @click="openEditMode"
      />
    </div>
  </div>
</template>
