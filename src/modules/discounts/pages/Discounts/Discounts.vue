<script setup lang="ts">
import { useDiscountsStore } from '@/modules/discounts/pages/Discounts/discountsStore';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import DiscountCard from '@/modules/discounts/pages/components/DiscountCard.vue';
import { onMounted, ref } from 'vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useAuthStore } from '@/modules/auth/authStore';
import CreateDiscountModal from '@/modules/discounts/pages/components/CreateDiscountModal.vue';
import type { CreateDiscountDto } from '@/api/swagger/data-contracts';

const store = useDiscountsStore();
const authStore = useAuthStore();

const isCreateModalShowed = ref(false);

onMounted(() => {
  store.getDiscounts();
});

const createDiscount = async (data: CreateDiscountDto) => {
  await store.createDiscount(data);
  isCreateModalShowed.value = false;
};
</script>

<template>
  <div>
    <div class="flex gap-2 items-center mb-3">
      <h2 class="text-xl font-bold">Discounts</h2>
      <AppButton
        v-if="authStore.isAdmin"
        appearance="secondary"
        @click="isCreateModalShowed = true"
      >
        Create discount
      </AppButton>
    </div>
    <EmptyStateCentered v-if="store.isDiscountsLoading">
      <RoundedLoader />
    </EmptyStateCentered>
    <EmptyStateCentered v-else-if="!store.discounts.length">
      <p>No discounts at that moment</p>
    </EmptyStateCentered>
    <div class="flex flex-wrap gap-3">
      <DiscountCard
        v-for="discount in store.discounts"
        :key="discount.id"
        :discount="discount"
      />
    </div>
  </div>
  <CreateDiscountModal
    v-model="isCreateModalShowed"
    :is-loading="store.isDiscountCreateInProgress"
    @create="createDiscount"
  />
</template>
