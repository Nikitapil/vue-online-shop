<script setup lang="ts">
import AppTable from '@/components/ui/AppTable/AppTable.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';

const tableColumns = [
  {
    key: 'id',
    title: '#'
  },
  {
    key: 'second',
    title: 'Second'
  },
  {
    key: 'third',
    title: 'Thirm'
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
  <AuthProtected :admitted-roles="['ADMIN']">
    <h1>AdminOrders</h1>
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
