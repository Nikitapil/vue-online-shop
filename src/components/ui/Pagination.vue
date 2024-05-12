<script setup lang="ts">
import { computed } from 'vue';
import AppButton from './AppButton.vue';

const props = withDefaults(
  defineProps<{
    itemsCount: number;
    currentPage: number;
    limit: number;
    disabled?: boolean;
  }>(),
  {
    disabled: false
  }
);

defineEmits<{
  setPage: [number];
}>();

const pagesCount = computed(() => Math.ceil(props.itemsCount / props.limit));
</script>

<template>
  <div
    v-if="pagesCount > 1"
    class="flex gap-2"
  >
    <AppButton
      v-for="page in pagesCount"
      :key="page"
      :appearance="page === currentPage ? 'secondary' : 'transparent'"
      :disabled="disabled"
      data-testid="pagination-button"
      @click="$emit('setPage', page)"
    >
      {{ page }}
    </AppButton>
  </div>
</template>
