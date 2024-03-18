<script setup lang="ts">
import AppTable from '@/components/ui/AppTable/AppTable.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import { onMounted, ref } from 'vue';
import { useOrdersStore } from '../OrdersStore';
import type { IColumn } from '@/components/ui/AppTable/types';

const store = useOrdersStore();

const tableColumns: IColumn[] = [
  {
    key: 'id',
    title: '#',
    contentSlotName: 'idContent'
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

const order = ref<'createdAt' | 'updatedAt'>('createdAt');
const page = ref(1);
const limit = ref(10);
const status = ref(null);

const loadOrders = () => {
  store.getOrders({
    page: page.value,
    limit: limit.value,
    order: order.value,
    status: status.value
  });
};

onMounted(() => {
  loadOrders();
});
</script>

<template>
  <AuthProtected>
    <h1 class="text-center text-xl mb-2">Orders list</h1>
    <AppTable
      v-model:sort="order"
      :columns="tableColumns"
      :data-source="store.dataSource"
      @sort="loadOrders"
    >
      <template #idContent="{ content }">
        <RouterLink
          :to="`/orders/${content.id}`"
          class="text-md block underline max-w-[100px] truncate"
        >
          {{ content.id }}
        </RouterLink>
      </template>
    </AppTable>
  </AuthProtected>
</template>
