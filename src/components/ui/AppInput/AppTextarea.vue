<script setup lang="ts">
import { useField, type RuleExpression } from 'vee-validate';
import type { MaybeRef } from 'vue';

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
  //@ts-ignore todo check that type
  syncVModel: value,
  validateOnValueUpdate: false
});
</script>

<template>
  <div class="w-full">
    <label
      v-if="props.label"
      class="text-sm font-medium"
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

    <p
      v-if="errorMessage"
      class="text-sm text-red-500"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
