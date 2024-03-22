<script setup lang="ts">
import AppTable from '@/components/ui/AppTable/AppTable.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import { onMounted, ref } from 'vue';
import { useOrdersStore } from './OrdersStore';
import type { IColumn } from '@/components/ui/AppTable/types';
import { OrderEnum, OrderReturnDtoStatusEnum, StatusEnum } from '@/api/swagger/data-contracts';
import type { ISelectOptions } from '@/components/ui/AppSelect/types';
import AppSelect from '@/components/ui/AppSelect/AppSelect.vue';
import Pagination from '@/components/ui/Pagination.vue';
import { ERoutesName } from '@/router';

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
    contentSlotName: 'statusContent',
    title: 'Status'
  }
];

const statusOptions: ISelectOptions<OrderReturnDtoStatusEnum | 'all'>[] = [
  {
    name: 'All',
    value: 'all'
  },
  {
    name: OrderReturnDtoStatusEnum.CREATED,
    value: OrderReturnDtoStatusEnum.CREATED
  },
  {
    name: OrderReturnDtoStatusEnum.INPROGRESS,
    value: OrderReturnDtoStatusEnum.INPROGRESS
  },
  {
    name: OrderReturnDtoStatusEnum.CLOSED,
    value: OrderReturnDtoStatusEnum.CLOSED
  },
  {
    name: OrderReturnDtoStatusEnum.CANCELED,
    value: OrderReturnDtoStatusEnum.CANCELED
  }
];

const order = ref<OrderEnum>(OrderEnum.CreatedAt);
const page = ref(1);
const limit = ref(10);
const status = ref<StatusEnum | 'all'>('all');

const loadOrders = () => {
  store.getOrders({
    page: page.value,
    limit: limit.value,
    order: order.value,
    status: status.value === 'all' ? undefined : status.value
  });
};

const onChangePage = (p: number) => {
  page.value = p;
  loadOrders();
};

const onChangeStatus = () => {
  page.value = 0;
  loadOrders();
};

onMounted(() => {
  loadOrders();
});
</script>

<template>
  <AuthProtected>
    <div class="mb-3 flex">
      <h1 class="ml-auto mr-auto text-2xl font-semibold">Orders list</h1>
      <AppSelect
        v-model="status"
        name="status"
        placeholder="Select status"
        :full="false"
        :options="statusOptions"
        @change="onChangeStatus"
      />
    </div>
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
            :to="{ name: ERoutesName.SINGLE_ORDER, params: { id: content.id } }"
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

      <template #statusContent="{ content }">
        <div :style="{ color: content.statusColor }">{{ content.status }}</div>
      </template>
    </AppTable>
    <Pagination
      class="mt-2"
      :items-count="store.totalOrdersCount"
      :current-page="page"
      :limit="limit"
      :disabled="store.isOrdersLoading"
      @set-page="onChangePage"
    />
  </AuthProtected>
</template>
