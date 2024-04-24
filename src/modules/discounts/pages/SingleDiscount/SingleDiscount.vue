<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useSingleDiscountStore } from '@/modules/discounts/pages/SingleDiscount/singleDiscountStore';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import ProductList from '@/widgets/ProductList/components/ProductList.vue';
import AppButton from '@/components/ui/AppButton.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import DiscountFormModal from '@/modules/discounts/components/DiscountFormModal.vue';
import type { IDiscountParams } from '@/modules/discounts/types';

const route = useRoute();

const store = useSingleDiscountStore();

const isDeleteModalOpened = ref(false);
const isEditModalOpened = ref(false);

const editDiscount = async (params: IDiscountParams) => {
  await store.editDiscount(params);
  isEditModalOpened.value = false;
};

const discountInitialEditData = computed(() => ({
  name: store.discount?.name || '',
  percentage: store.discount?.percentage || 0
}));

onMounted(() => {
  store.init(route.params.id as string);
});
</script>

<template>
  <EmptyStateCentered v-if="store.isDiscountLoading">
    <RoundedLoader />
  </EmptyStateCentered>
  <EmptyStateCentered v-else-if="!store.discount">
    <p class="text-2xl font-bold">Discount not found</p>
  </EmptyStateCentered>
  <div v-else>
    <div class="flex justify-center items-center gap-3">
      <h2 class="text-center text-xl font-bold">{{ store.discount.name }}</h2>
      <AppButton
        v-if="store.discount.canDelete"
        appearance="danger"
        @click="isDeleteModalOpened = true"
      >
        Delete
      </AppButton>
      <AppButton
        v-if="store.discount.canEdit"
        appearance="primary"
        @click="isEditModalOpened = true"
      >
        Edit
      </AppButton>
    </div>
    <p class="mb-2">Discount percent: {{ store.discount.percentage }}</p>
    <ProductList
      :is-loading="store.isDiscountLoading"
      :products="store.discount.products"
    />
    <ConfirmModal
      v-model="isDeleteModalOpened"
      title="Do you want to delete this discount"
      :is-loading="store.isDiscountDeleteInProgress"
      @confirm="store.deleteDiscount"
    />
    <DiscountFormModal
      v-model="isEditModalOpened"
      title="Edit discount"
      :is-loading="store.isEditDiscountInProgress"
      :initial-values="discountInitialEditData"
      @submit="editDiscount"
    />
  </div>
</template>