<script setup lang="ts" generic="T extends IColumn">
import type { IColumn } from './types';

const sort = defineModel<string>();

const props = defineProps<{
  columns: T[];
}>();

const emit = defineEmits<{
  sort: [string];
}>();

const onSort = (column: IColumn) => {
  if (column.sortable) {
    sort.value = column.key;
    emit('sort', column.key);
  }
};
</script>

<template>
  <table class="w-full shadow-lg border-separate border-spacing-0">
    <thead>
      <tr class="text-xl">
        <th
          v-for="column in props.columns"
          :key="column.key"
          class="border border-l-0 first-of-type:border first-of-type:rounded-tl-md last-of-type:rounded-tr-md transition-all duration-300"
          :class="{ 'hover:bg-blue-100 cursor-pointer': column.sortable, 'bg-blue-200': column.key === sort }"
          @click="onSort(column)"
        >
          <slot
            :name="column.columnSlotName || column.key"
            :column="column"
          >
            {{ column.title || '' }}
          </slot>
        </th>
      </tr>
    </thead>
  </table>
</template>
