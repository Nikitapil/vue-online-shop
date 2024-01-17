<script setup lang="ts">
import type { ContentSwitcherOption } from '@/components/ui/ContentSwitcher/types';
import ContentSwitcherButton from '@/components/ui/ContentSwitcher/ContentSwitcherButton.vue';

const value = defineModel<string>();

defineProps<{
  options: ContentSwitcherOption[];
}>();

const onChange = (newValue: string) => {
  if (newValue === value.value) {
    return;
  }
  value.value = newValue;
};
</script>

<template>
  <div class="flex">
    <ContentSwitcherButton
      v-for="option in options"
      :key="option.value"
      :option="option"
      :current-value="value"
      @click="onChange(option.value)"
    />
  </div>
</template>
