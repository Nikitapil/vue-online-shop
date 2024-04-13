<script setup lang="ts">
import { useDiscountsStore } from '@/modules/discounts/pages/Discounts/discountsStore';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import DiscountCard from '@/modules/discounts/pages/components/DiscountCard.vue';
import { onMounted } from 'vue';

const store = useDiscountsStore();

onMounted(() => {
  store.getDiscounts();
});
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-3">Discounts</h2>
    <EmptyStateCentered v-if="store.isDiscountsLoading">
      <RoundedLoader />
    </EmptyStateCentered>
    <EmptyStateCentered v-else-if="!store.discounts.length">
      <p>No discounts at that moment</p>
    </EmptyStateCentered>
    <div class="flex gap-3">
      <DiscountCard
        v-for="discount in store.discounts"
        :key="discount.id"
        :discount="discount"
      />
    </div>
  </div>
</template>
