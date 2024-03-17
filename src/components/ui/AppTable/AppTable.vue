<script setup lang="ts">
import type { IColumn } from './types';

const props = defineProps<{
  columns: IColumn[];
}>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="column in props.columns"
          :key="column.key"
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
