<script setup lang="ts">
import HorizontalLoader from '../../../../components/ui/loaders/HorizontalLoader.vue';
import CancelOrderModal from '../../components/CancelOrderModal.vue';
import AppSelect from '../../../../components/ui/AppSelect/AppSelect.vue';
import OrderProduct from '../../components/OrderProduct.vue';
import RoundedLoader from '../../../../components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '../../../../components/ui/EmptyStateCentered.vue';
import { useRoute } from 'vue-router';
import { useSingleOrderStore } from './SingleOrderStore';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import { computed, onMounted, ref } from 'vue';
import { getAvailableStatusOptions } from '../../helpers/utils';
import { OrderStatusEnum } from '@/api/swagger/data-contracts';

const store = useSingleOrderStore();

const status = ref(OrderStatusEnum.CREATED);
const isShowCancelModal = ref(false);

const statusOptions = computed(() => (store.order ? getAvailableStatusOptions(store.order) : []));
const isShowStatusSelect = computed(
  () => statusOptions.value.length > 1 || statusOptions.value[0]?.value !== store.order?.status
);

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
      <p class="text-2xl font-bold">Order not found</p>
    </EmptyStateCentered>

    <section v-else>
      <h2 class="text-xl w-fit border-b pb-1 mb-5">Order id: {{ store.order.id }}</h2>
      <section class="w-fit border-b pb-1">
        <h3 class="text-lg">Requisites:</h3>
        <p><span class="font-bold">Address:</span> {{ store.order.address }}</p>
        <p><span class="font-bold">Phone:</span> {{ store.order.phone }}</p>
        <p><span class="font-bold">Username:</span> {{ store.order.user.name }}</p>
        <p v-if="store.order.comment"><span class="font-bold">Order comment:</span> {{ store.order.comment }}</p>
      </section>

      <section
        v-if="isShowStatusSelect"
        class="flex gap-3 items-center mt-3"
      >
        <span>Change product status</span>
        <AppSelect
          v-model="status"
          name="order-status"
          placeholder="Status..."
          :disabled="store.isUpdateStatusInProgress"
          :full="false"
          :options="statusOptions"
          @change="onChangeStatus()"
        />
      </section>

      <section v-else>
        Order status: <span :style="{ color: store.statusColor }">{{ store.order.status }}</span>
      </section>

      <section
        v-if="store.order.cancelReason"
        class="text-red-500"
      >
        <p><span class="font-bold text-black mt-2">Cancel reason:</span> {{ store.order.cancelReason }}</p>
      </section>

      <OrderProduct
        v-for="product in store.order.productsInOrder"
        :key="product.id"
        :product="product"
        class="mb-3"
      />

      <p class="ml-auto w-fit text-xl">
        <span class="font-bold">Total sum:</span> <span v-price="store.order.price"></span>
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
