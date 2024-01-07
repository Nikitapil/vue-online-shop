<script lang="ts" setup>
import { type RuleExpression, useField } from 'vee-validate';
import { type MaybeRef } from 'vue';

const value = defineModel<string>();

const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    type?: 'text' | 'password';
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    rules?: MaybeRef<RuleExpression<any>>;
  }>(),
  {
    type: 'text',
    label: '',
    disabled: false,
    placeholder: '',
    rules: ''
  }
);

const { errorMessage, handleBlur } = useField<string>(props.name, props.rules, {
  //@ts-ignore todo check that type
  syncVModel: value,
  validateOnValueUpdate: false
});
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      class="text-sm font-medium"
      :for="id"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="value"
      :name="name"
      class="w-full border outline-0 focus-visible:border-black py-1 px-2 rounded-md disabled:bg-gray-100 transition duration-300"
      :type="type"
      :placeholder="placeholder"
      @blur="handleBlur($event, true)"
    />
    <p class="text-sm text-red-500">{{ errorMessage }}</p>
  </div>
</template>
