<script setup lang="ts">
import AppTable from '@/components/ui/AppTable/AppTable.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import { onMounted, ref } from 'vue';
import { useOrdersStore } from '../OrdersStore';
import type { IColumn } from '@/components/ui/AppTable/types';
import { OrderEnum } from '@/api/swagger/data-contracts';

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
    contentSlotName: 'dateContent',
    sortable: true
  },
  {
    key: 'updatedAt',
    title: 'Updated at',
    contentSlotName: 'dateContent',
    sortable: true
  },
  {
    key: 'price',
    contentSlotName: 'priceContent',
    title: 'Total price'
  },
  {
    key: 'status',
    title: 'Status'
  }
];

const order = ref<OrderEnum>(OrderEnum.CreatedAt);
const page = ref(1);
const limit = ref(10);
const status = ref(null);

const loadOrders = () => {
  store.getOrders({
    page: page.value,
    limit: limit.value,
    order: order.value,
    status: status.value || undefined
  });
};

onMounted(() => {
  loadOrders();
});
</script>

<template>
  <AuthProtected>
    <h1 class="text-center text-2xl font-semibold mb-3">Orders list</h1>
    <AppTable
      v-model:sort="order"
      :columns="tableColumns"
      :data-source="store.dataSource"
      @sort="loadOrders"
    >
      <template #idContent="{ content }">
        <div
          v-tooltip="content.id"
          class="max-w-[100px]"
        >
          <RouterLink
            :to="`/orders/${content.id}`"
            class="text-md block underline max-w-full truncate"
          >
            {{ content.id }}
          </RouterLink>
        </div>
      </template>

      <template #dateContent="{ content, columnKey }">
        <div v-date="{ date: content[columnKey] }"></div>
      </template>

      <template #priceContent="{ content }">
        <div v-price="content.price"></div>
      </template>
    </AppTable>
  </AuthProtected>
</template>
