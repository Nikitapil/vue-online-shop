<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import type { ContentSwitcherOption } from '@/components/ui/ContentSwitcher/types';
import { computed } from 'vue';

const props = defineProps<{
  currentValue: string;
  option: ContentSwitcherOption;
}>();

const appearance = computed(() => (props.option.value === props.currentValue ? 'secondary' : 'transparent'));
</script>

<template>
  <AppButton
    class="switcher-btn"
    :appearance="appearance"
  >
    {{ option.name }}
  </AppButton>
</template>

<style scoped>
.switcher-btn:first-child {
  @apply rounded-r-none;
}

.switcher-btn:last-child {
  @apply rounded-l-none;
}
</style>
