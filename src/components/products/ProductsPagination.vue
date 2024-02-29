<script setup lang="ts">
import { computed } from 'vue';
import AppSelect from '../ui/AppSelect/AppSelect.vue';
import type { ISelectOptions } from '../ui/AppSelect/types';
import Pagination from '../ui/Pagination.vue';

const limitOptions: ISelectOptions[] = [
  { value: '10', name: '10' },
  { value: '20', name: '20' },
  { value: '50', name: '50' }
];

const limitValue = defineModel<string>('limitValue', { required: true });

const props = defineProps<{
  currentPage: number;
  totalProductsCount: number;
  isLoading: boolean;
}>();

defineEmits<{
  changePage: [number];
  changeLimit: [string];
}>();

const limit = computed(() => +limitValue.value);
</script>

<template>
  <div class="flex justify-between items-center mt-2">
    <Pagination
      class="mt-4"
      :current-page="props.currentPage"
      :limit="limit"
      :items-count="props.totalProductsCount"
      :disabled="props.isLoading"
      @set-page="$emit('changePage', $event)"
    />

    <div
      v-if="totalProductsCount > 10"
      class="flex items-center gap-2 ml-auto"
    >
      <span class="min-w-fit">Products per page</span>
      <AppSelect
        v-model="limitValue"
        :options="limitOptions"
        :disabled="isLoading"
        name="limit"
        @change="$emit('changeLimit', $event)"
      />
    </div>
  </div>
</template>
