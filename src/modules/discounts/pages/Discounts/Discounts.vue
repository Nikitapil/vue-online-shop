<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useDiscountsStore } from '@/modules/discounts/pages/Discounts/discountsStore';
import { useAuthStore } from '@/modules/auth/authStore';

import type { CreateDiscountDto } from '@/api/swagger/data-contracts';

import DiscountFormModal from '@/modules/discounts/components/DiscountFormModal.vue';
import AppButton from '@/components/ui/AppButton.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import DiscountCard from '@/modules/discounts/components/DiscountCard.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';

const store = useDiscountsStore();
const authStore = useAuthStore();

const isCreateModalShowed = ref(false);

const createDiscount = async (data: CreateDiscountDto) => {
  await store.createDiscount(data);
  isCreateModalShowed.value = false;
};

onMounted(() => {
  store.getDiscounts();
});
</script>

<template>
  <div>
    <div class="flex gap-2 items-center mb-3">
      <h2 class="text-xl font-bold">{{ $t('discounts') }}</h2>

      <AppButton
        v-if="authStore.isAdmin"
        appearance="secondary"
        @click="isCreateModalShowed = true"
      >
        {{ $t('create_discount') }}
      </AppButton>
    </div>

    <EmptyStateCentered v-if="store.isDiscountsLoading">
      <RoundedLoader />
    </EmptyStateCentered>

    <EmptyStateCentered v-else-if="!store.discounts.length">
      <p>{{ $t('no_discounts_yet') }}</p>
    </EmptyStateCentered>

    <div class="flex flex-wrap gap-3">
      <DiscountCard
        v-for="discount in store.discounts"
        :key="discount.id"
        :discount="discount"
      />
    </div>
  </div>

  <DiscountFormModal
    v-model="isCreateModalShowed"
    :title="$t('create_discount')"
    :is-loading="store.isDiscountCreateInProgress"
    @submit="createDiscount"
  />
</template>
