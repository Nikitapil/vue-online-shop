<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/modules/app/appStore';
import { useCartStore } from '../cartStore';

import type { CreateOrderDto } from '@/api/swagger/data-contracts';
import { ERoutesName } from '@/router';

import { Icon } from '@iconify/vue';
import CartItem from './CartItem.vue';
import RoundedLoaderVue from '@/components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import CreateOrderModal from './CreateOrderModal.vue';
import AppButton from '@/components/ui/AppButton.vue';
import Price from '@/modules/app/components/Price.vue';
import CartPriceItem from '@/modules/cart/components/CartPriceItem.vue';
import Drawer from '@/components/ui/Drawer.vue';

const { t } = useI18n();

const router = useRouter();

const store = useCartStore();
const appStore = useAppStore();

const isOpened = ref(false);
const isCreateOrderModalOpened = ref(false);

const cartPrice = computed(() => store.cart?.price || 0);
const deliveryCost = computed(() => store.cart?.deliveryCost || 0);
const tax = computed(() => store.cart?.taxSum || 0);
const products = computed(() => store.cart?.productInCart || []);
const isCartButtonsDisabled = computed(
  () => store.isChangeInCartCountInProgress || store.isCartLoading || store.isCreateOrderInProgress
);

const onCreateOrder = async (orderData: CreateOrderDto) => {
  const id = await store.createOrder(orderData);
  if (id) {
    isCreateOrderModalOpened.value = false;
    isOpened.value = false;
    toast.success(t('order_created'));
    await router.push({ name: ERoutesName.SINGLE_ORDER, params: { id } });
  }
};

onMounted(() => {
  store.loadCart();
});
</script>

<template>
  <RoundedLoaderVue
    v-if="store.isCartLoading"
    size="sm"
  />

  <div v-else>
    <button
      class="flex gap-1 items-center text-slate-500 cursor-pointer hover:text-black transition-all duration-300"
      @click="isOpened = true"
    >
      <Icon
        class="w-5 h-5"
        icon="ion:cart-outline"
      />

      <Price
        tag="b"
        :price="cartPrice"
      />
    </button>

    <Drawer
      v-model="isOpened"
      :title="$t('cart')"
    >
      <EmptyStateCentered v-if="!products.length">
        <div class="h-full flex flex-col justify-center items-center">
          <Icon
            class="w-96 h-96"
            icon="raphael:package"
            color="#dda61f"
          />
          <h2 class="mt-4 text-2xl font-medium">{{ $t('cart_is_empty') }}</h2>
          <p class="text-slate-500 text-center mt-2 px-0.5">{{ $t('add_product_to_make_order') }}</p>
        </div>
      </EmptyStateCentered>

      <template v-else>
        <div class="flex-1 max-h-full overflow-auto">
          <CartItem
            v-for="product in products"
            :key="product.id"
            :product-in-cart="product"
            :is-removing-in-progress="store.isChangeInCartCountInProgress"
            class="mb-3"
            @remove-from-cart="store.removeFromCart(product.id)"
          />
        </div>

        <div class="flex flex-col gap-4 my-7">
          <CartPriceItem
            :price="deliveryCost"
            :label="$t('delivery_cost')"
          />

          <p
            v-if="appStore.financeSettings"
            class="text-xs text-slate-400 flex gap-2"
          >
            {{ $t('free_delivery_at') }} <Price :price="appStore.financeSettings.orderPriceWithFreeDelivery" />
          </p>

          <CartPriceItem
            :price="tax"
            :label="$t('tax')"
          />

          <CartPriceItem
            :price="cartPrice"
            :label="$t('total_sum')"
          />
        </div>

        <AppButton
          class="mb-2"
          appearance="danger"
          :disabled="isCartButtonsDisabled"
          @click="store.clearCart"
        >
          {{ $t('remove_all_from_cart') }}
        </AppButton>

        <AppButton
          appearance="success"
          :disabled="isCartButtonsDisabled"
          @click="isCreateOrderModalOpened = true"
        >
          {{ $t('make_an_order') }}
        </AppButton>
      </template>
    </Drawer>

    <CreateOrderModal
      v-model="isCreateOrderModalOpened"
      :is-loading="store.isCreateOrderInProgress"
      @create="onCreateOrder"
    />
  </div>
</template>
