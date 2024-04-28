<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
const value = defineModel<number>({ required: true });

const props = withDefaults(
  defineProps<{
    count?: number;
    name: string;
    disabled?: boolean;
  }>(),
  {
    count: 5,
    disabled: false
  }
);

defineEmits<{
  change: [number];
}>();
</script>

<template>
  <div class="flex gap-2">
    <template
      v-for="radio in count"
      :key="radio"
    >
      <label
        class="star"
        :for="`${props.name}_${radio}`"
      >
        <Icon
          class="w-7 h-7"
          icon="ion:star-outline"
          color="#e4d828"
        />
      </label>
      <input
        :id="`${props.name}_${radio}`"
        v-model="value"
        :name="props.name"
        :disabled="props.disabled"
        :value="radio"
        type="radio"
        hidden
        @input="$emit('change', value)"
      />
    </template>
  </div>
</template>

<style scoped>
.star {
  cursor: pointer;
}
.star:hover ::v-deep(path),
.star:has(~ .star:hover) ::v-deep(path),
.star:has(~ input:checked) ::v-deep(path) {
  fill: #e4d828;
}

.star:hover ~ .star ::v-deep(path) {
  fill: transparent;
}

.star:has(+ input:disabled) {
  pointer-events: none;
  cursor: not-allowed;
}
</style>
