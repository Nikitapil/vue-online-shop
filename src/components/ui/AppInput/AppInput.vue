<script lang="ts" setup>
import { type RuleExpression, useField } from 'vee-validate';
import { computed, type MaybeRef } from 'vue';
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
  //@ts-ignore todo check that type
  syncVModel: value,
  validateOnValueUpdate: false
});

const maskOptions = computed(() => masks[props.mask]);
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
      v-maska:[maskOptions]
      :name="name"
      class="input"
      :class="{ 'border-red-500': !!errorMessage }"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @blur="handleBlur($event, true)"
    />
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
