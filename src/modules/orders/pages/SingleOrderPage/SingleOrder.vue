<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useSingleOrderStore } from './SingleOrderStore';
import { getAvailableStatusOptions } from '../../helpers/utils';

import { OrderStatusEnum } from '@/api/swagger/data-contracts';

import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import AppSelect from '../../../../components/ui/AppSelect/AppSelect.vue';
import EmptyStateCentered from '../../../../components/ui/EmptyStateCentered.vue';
import RoundedLoader from '../../../../components/ui/loaders/RoundedLoader.vue';
import OrderProduct from '../../components/OrderProduct.vue';
import Price from '@/modules/app/components/Price.vue';
import CancelOrderModal from '../../components/CancelOrderModal.vue';
import OrderRquisitesItem from '@/modules/orders/components/OrderRquisitesItem.vue';

const store = useSingleOrderStore();

const status = ref(OrderStatusEnum.CREATED);
const isShowCancelModal = ref(false);

const statusOptions = computed(() => (store.order ? getAvailableStatusOptions(store.order) : []));
const isShowStatusSelect = computed(() => !!statusOptions.value.length);

const onChangeStatus = () => {
  if (status.value !== OrderStatusEnum.CANCELED) {
    store.updateOrderStatus({ status: status.value });
  } else {
    isShowCancelModal.value = true;
  }
};

const onCancelOrder = async (cancelReason: string) => {
  await store.updateOrderStatus({ status: OrderStatusEnum.CANCELED, cancelReason });
  isShowCancelModal.value = false;
};

const onCancelOrderCanceling = () => {
  if (!store.order) {
    return;
  }
  status.value = store.order?.status;
  isShowCancelModal.value = false;
};

onMounted(async () => {
  const route = useRoute();
  await store.init(route.params.id as string);

  if (store.order?.status) {
    status.value = store.order?.status;
  }
});
</script>

<template>
  <AuthProtected>
    <EmptyStateCentered v-if="store.isLoading">
      <RoundedLoader />
    </EmptyStateCentered>

    <EmptyStateCentered v-else-if="!store.order">
      <p class="text-2xl font-bold">{{ $t('order_not_found') }}</p>
    </EmptyStateCentered>

    <section v-else>
      <h2 class="text-xl w-fit border-b pb-1 mb-5">{{ $t('order_id') }}: {{ store.order.id }}</h2>

      <section class="w-fit border-b pb-1">
        <h3 class="text-lg">{{ $t('requisites') }}:</h3>

        <OrderRquisitesItem
          :title="$t('address')"
          :value="store.order.address"
        />

        <OrderRquisitesItem
          :title="$t('phone')"
          :value="store.order.phone"
        />

        <OrderRquisitesItem
          :title="$t('username')"
          :value="store.order.user.name"
        />

        <OrderRquisitesItem
          v-if="store.order.comment"
          :title="$t('order_comment')"
          :value="store.order.comment"
        />
      </section>

      <section
        v-if="isShowStatusSelect"
        class="flex gap-3 items-center mt-3"
      >
        <span>{{ $t('change_order_status') }}</span>

        <AppSelect
          v-model="status"
          name="order-status"
          :placeholder="$t('status')"
          :disabled="store.isUpdateStatusInProgress"
          :full="false"
          :options="statusOptions"
          @change="onChangeStatus()"
        />
      </section>

      <section v-else>
        {{ $t('order_status') }}: <span :style="{ color: store.statusColor }">{{ store.order.status }}</span>
      </section>

      <section
        v-if="store.order.cancelReason"
        class="text-red-500"
      >
        <OrderRquisitesItem
          :title="$t('cancel_reason')"
          :value="store.order.cancelReason"
        />
      </section>

      <OrderProduct
        v-for="product in store.order.productsInOrder"
        :key="product.id"
        :product="product"
        class="mb-3"
      />

      <p class="ml-auto w-fit text-xl">
        <span class="font-bold">{{ $t('total_sum') }}:</span>

        <Price
          tag="span"
          :price="store.order.price"
        />
      </p>
    </section>

    <CancelOrderModal
      v-model="isShowCancelModal"
      :is-loading="store.isUpdateStatusInProgress"
      @cancel="onCancelOrderCanceling"
      @confirm="onCancelOrder"
    />
  </AuthProtected>
</template>
