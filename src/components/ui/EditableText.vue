<script setup lang="ts">
import IconButton from './IconButton.vue';
import { ref, type MaybeRef } from 'vue';
import AppInput from './AppInput/AppInput.vue';
import { useForm, type RuleExpression } from 'vee-validate';
import type { TMasks } from '@/components/ui/AppInput/masks';

const isEditMode = defineModel<boolean>();

const { validate } = useForm();

const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    initialValue: string;
    label?: string;
    rules?: MaybeRef<RuleExpression<any>>;
    mask?: TMasks;
    isLoading: boolean;
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
    <h3
      v-if="label"
      class="font-bold text-xl"
    >
      {{ label }}
    </h3>
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
        icon="line-md:circle-to-confirm-circle-transition"
        type="submit"
        color="#1fe425"
        :disabled="props.isLoading"
      />
      <IconButton
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
        icon="ic:outline-edit"
        :disabled="props.isLoading"
        @click="openEditMode"
      />
    </div>
  </div>
</template>
