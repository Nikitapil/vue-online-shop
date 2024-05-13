<script lang="ts" setup>
import { computed, type MaybeRef } from 'vue';

import { type RuleExpression, useField } from 'vee-validate';

import { vMaska } from 'maska';
import { masks, type TMasks } from '@/components/ui/AppInput/masks';

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
    mask?: TMasks;
  }>(),
  {
    type: 'text',
    label: '',
    disabled: false,
    placeholder: '',
    rules: '',
    mask: 'noMask'
  }
);

const { errorMessage, handleBlur } = useField<string>(props.name, props.rules, {
  syncVModel: true,
  validateOnValueUpdate: false
});

const maskOptions = computed(() => masks[props.mask]);
</script>

<template>
  <div class="w-full">
    <label
      v-if="props.label"
      class="label"
      data-testid="input-label"
      :for="props.id"
    >
      {{ props.label }}
    </label>

    <input
      :id="props.id"
      v-model="value"
      v-maska:[maskOptions]
      :name="props.name"
      class="input"
      data-testid="app-input"
      :class="{ 'border-red-500': !!errorMessage }"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      @blur="handleBlur($event, true)"
    />

    <p
      v-if="errorMessage"
      class="error"
      data-testid="input-error"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
