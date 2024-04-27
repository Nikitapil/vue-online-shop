<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import type { IMultiSelectInternalOption, IMultiSelectOption } from '@/components/ui/MultiSelect/types';

const value = defineModel<string[]>();

const props = withDefaults(
  defineProps<{
    options: IMultiSelectOption[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
  }>(),
  {
    placeholder: '',
    label: '',
    disabled: false
  }
);

const emit = defineEmits<{
  close: [];
}>();

const isOpened = ref(false);

const text = computed(() => props.placeholder || `Selected ${value.value?.length} options`);
const icon = computed(() => (isOpened.value ? 'simple-line-icons:arrow-up' : 'simple-line-icons:arrow-down'));

const internalOptions = computed<IMultiSelectInternalOption[]>(() =>
  props.options
    .map((option) => ({ ...option, checked: !!value.value?.includes(option.value) }))
    .sort((option) => (option.checked ? -1 : 1))
);

const openSelect = () => {
  if (!props.disabled) {
    isOpened.value = true;
  }
};
const closeSelect = () => {
  if (isOpened.value) {
    isOpened.value = false;
    emit('close');
  }
};

const toggleSelect = () => (isOpened.value ? closeSelect() : openSelect());

const clickHandler = (option: IMultiSelectInternalOption) => {
  if (option.disabled || props.disabled) {
    return;
  }
  if (option.checked) {
    value.value = value.value?.filter((val) => val !== option.value);
  } else {
    value.value?.push(option.value);
  }
};
</script>

<template>
  <div>
    <p
      v-if="label"
      class="font-medium"
    >
      {{ label }}
    </p>
    <div
      v-click-outside="closeSelect"
      tabindex="0"
      class="border rounded-md focus:border-black outline-none pt-10 relative"
    >
      <div
        class="flex justify-between w-full items-center gap-5 py-2 px-4 cursor-pointer absolute top-0"
        :class="{ 'border-b border-b-black': isOpened, 'bg-slate-100 cursor-not-allowed': props.disabled }"
        @click="toggleSelect"
      >
        <p>{{ text }}</p>
        <Icon
          class="w-4 h-4"
          :icon="icon"
        />
      </div>
      <div
        v-if="isOpened"
        class="max-h-52 overflow-auto"
      >
        <div
          v-for="option in internalOptions"
          :key="option.value"
          class="py-2 px-4 flex items-center gap-3 accent-slate-300 hover:bg-slate-200 cursor-pointer"
          :class="{ 'cursor-not-allowed hover:bg-slate-100 bg-slate-100': option.disabled }"
          @click="clickHandler(option)"
        >
          <input
            class="w-4 h-4 p-5"
            type="checkbox"
            :disabled="option.disabled"
            :checked="option.checked"
          />
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>
