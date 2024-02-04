<script setup lang="ts">
import type { ISelectOptions } from '@/components/ui/AppSelect/types';
import { type RuleExpression, useField } from 'vee-validate';
import type { MaybeRef } from 'vue';

const value = defineModel({ default: '' });

const props = withDefaults(
  defineProps<{
    options: ISelectOptions[];
    placeholder?: string;
    disabled?: boolean;
    name: string;
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
  //@ts-ignore todo check that type
  syncVModel: value,
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
    class="border outline-0 focus-visible:border-black cursor-pointer rounded-md focus:border-gray-400 py-2 px-4"
    :name="name"
    :disabled="disabled"
    :class="{ 'text-gray-400': !value, 'w-full': full, 'border-red-400': errorMessage }"
    @change="onChange"
  >
    <option
      v-if="placeholder && !value"
      value=""
      disabled
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
  <p
    v-if="errorMessage"
    class="text-sm text-red-500"
  >
    {{ errorMessage }}
  </p>
</template>
