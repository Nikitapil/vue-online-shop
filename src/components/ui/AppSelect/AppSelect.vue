<script setup lang="ts">
import type { MaybeRef } from 'vue';
import type { ISelectOptions } from '@/components/ui/AppSelect/types';

import { type RuleExpression, useField } from 'vee-validate';
import ErrorMessageText from '@/components/ui/ErrorMessageText.vue';

const value = defineModel<string>({ default: '' });

const props = withDefaults(
  defineProps<{
    options: ISelectOptions[];
    name: string;
    placeholder?: string;
    disabled?: boolean;
    rules?: MaybeRef<RuleExpression<any>>;
    full?: boolean;
  }>(),
  {
    options: () => [],
    placeholder: '',
    disabled: false,
    rules: '',
    full: true
  }
);

const emit = defineEmits<{
  change: [string];
}>();

const { errorMessage, validate } = useField<string>(props.name, props.rules, {
  syncVModel: true,
  validateOnValueUpdate: false
});

const onChange = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('change', value.value);
  }
};
</script>

<template>
  <select
    v-model="value"
    class="border outline-0 focus-visible:border-black h-11 cursor-pointer rounded-md focus:border-gray-400 py-2 px-4 disabled:cursor-not-allowed"
    data-testid="app-select"
    :name="name"
    :disabled="disabled"
    :class="{ 'text-gray-400': !value, 'w-full': full, 'border-red-400': errorMessage }"
    @change="onChange"
  >
    <option
      v-if="placeholder && !value"
      value=""
      disabled
      data-testid="app-select-placeholder"
    >
      {{ placeholder }}
    </option>

    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>

  <ErrorMessageText
    v-if="errorMessage"
    :error-message="errorMessage"
  />
</template>
