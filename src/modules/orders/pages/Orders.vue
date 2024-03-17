<script setup lang="ts">
import AppTable from '@/components/ui/AppTable/AppTable.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';

const tableColumns = [
  {
    key: 'id',
    title: '#'
  },
  {
    key: 'createdAt',
    title: 'Created at',
    sortable: true
  },
  {
    key: 'updatedAt',
    title: 'Updated at',
    sortable: true
  },
  {
    key: 'price',
    title: 'Total price'
  },
  {
    key: 'status',
    title: 'Status'
  }
];

const dataSource = [
  {
    key: '1',
    id: 'qwerty',
    second: 'qaz',
    third: 'wsx'
  }
];
</script>

<template>
  <AuthProtected>
    <h1 class="text-center text-xl mb-2">Orders list</h1>
    <AppTable
      :columns="tableColumns"
      :data-source="dataSource"
    >
      <template #first="{ column }">
        <div class="text-red-500">
          {{ column.title }}
        </div>
      </template>
    </AppTable>
  </AuthProtected>
</template>
