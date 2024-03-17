<script setup lang="ts">
import AppTable from '@/components/ui/AppTable/AppTable.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';

const tableColumns = [
  {
    key: 'first',
    title: 'First',
    sortable: true
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
</script>

<template>
  <AuthProtected :admitted-roles="['ADMIN']">
    <h1>AdminOrders</h1>
    <AppTable :columns="tableColumns">
      <template #first="{ column }">
        <div class="text-red-500">
          {{ column.title }}
        </div>
      </template>
    </AppTable>
  </AuthProtected>
</template>
