<script setup lang="ts">
import type { MaybeRef } from 'vue';

import { useField, type RuleExpression } from 'vee-validate';

import ErrorMessageText from '@/components/ui/ErrorMessageText.vue';

const value = defineModel<string>();

const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    rules?: MaybeRef<RuleExpression<any>>;
  }>(),
  {
    label: '',
    placeholder: '',
    rules: '',
    disabled: false
  }
);

const { errorMessage, handleBlur } = useField<string>(props.name, props.rules, {
  syncVModel: true,
  validateOnValueUpdate: false
});
</script>

<template>
  <div class="w-full">
    <label
      v-if="props.label"
      class="label"
      :for="id"
    >
      {{ props.label }}
    </label>

    <textarea
      :id="props.id"
      v-model="value"
      class="input resize-none"
      :class="{ 'border-red-500': !!errorMessage }"
      rows="4"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      @blur="handleBlur($event, true)"
    ></textarea>

    <ErrorMessageText
      v-if="errorMessage"
      :error-message="errorMessage"
    />
  </div>
</template>

<style scoped>
@import './style.css';
</style>
