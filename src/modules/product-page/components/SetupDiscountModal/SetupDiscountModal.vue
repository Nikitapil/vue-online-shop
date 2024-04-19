<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue';
import { useDiscountOptions } from '@/modules/product-page/components/SetupDiscountModal/useDiscountOptions';
import { computed, onMounted, ref } from 'vue';
import AppSelect from '@/components/ui/AppSelect/AppSelect.vue';
import AppButton from '@/components/ui/AppButton.vue';

const { options, discounts, isLoading, getDiscountOptions } = useDiscountOptions();

const isOpened = defineModel<boolean>();

const props = defineProps<{
  currentDiscountId: string;
  isEditInProgress: boolean;
}>();

const emit = defineEmits<{
  edit: [string];
}>();

const discountId = ref(props.currentDiscountId);

const isFullLoading = computed(() => isLoading.value || props.isEditInProgress);

const choosenDiscount = computed(() => discounts.value.find((discount) => discount.id === discountId.value));

const onEdit = () => emit('edit', discountId.value);

onMounted(() => {
  getDiscountOptions();
});
</script>

<template>
  <Modal
    v-model="isOpened"
    :prevent-close="isFullLoading"
    size="md"
  >
    <h2 class="text-center font-bold mb-2">Setup product discount</h2>
    <AppSelect
      v-model="discountId"
      name="discount_id"
      :options="options"
      :disabled="isFullLoading"
    />
    <div v-if="choosenDiscount">Discount Percent: {{ choosenDiscount.percentage }}%</div>
    <div class="flex gap-2 justify-end mt-16">
      <AppButton
        :disabled="isFullLoading"
        @click="isOpened = false"
      >
        Cancel
      </AppButton>
      <AppButton
        :disabled="isFullLoading"
        appearance="primary"
        @click="onEdit"
      >
        Edit
      </AppButton>
    </div>
  </Modal>
</template>
