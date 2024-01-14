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
  }>(),
  {
    options: () => [],
    placeholder: '',
    disabled: false,
    rules: ''
  }
);

const { errorMessage, validate } = useField<string>(props.name, props.rules, {
  //@ts-ignore todo check that type
  syncVModel: value,
  validateOnValueUpdate: false
});
</script>

<template>
  <select
    v-model="value"
    class="w-full border outline-0 focus-visible:border-black py-1.5 px-2 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-300"
    :name="name"
    :disabled="disabled"
    :class="{ 'text-gray-400': !value }"
    @change="() => validate()"
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
