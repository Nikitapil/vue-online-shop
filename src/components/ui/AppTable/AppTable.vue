<script setup lang="ts" generic="C extends IColumn, D extends IDataSource">
import type { IColumn, IDataSource } from './types';

const sort = defineModel<string>('sort');

const props = defineProps<{
  columns: C[];
  dataSource: D[];
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
      <tr>
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

    <tbody>
      <tr
        v-for="data in props.dataSource"
        :key="data.key"
      >
        <td
          v-for="dataCol in props.columns"
          :key="data.key + dataCol.key"
          class="border border-l-0 first-of-type:border p-2"
        >
          <slot
            :name="dataCol.contentSlotName"
            :content="data"
            :columnKey="dataCol.key as keyof D"
          >
            {{ data[dataCol.key as keyof D] || '' }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
