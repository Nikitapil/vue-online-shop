<script setup lang="ts">
import { useAppStore } from '@/modules/app/appStore';
import EditableText from '@/components/ui/EditableText.vue';
import { computed, ref } from 'vue';

const appStore = useAppStore();

const isTaxEditMode = ref(false);

const tax = computed(() => appStore.financeSettings?.tax?.toString());

const setTax = async (newTaxValue: string) => {
  await appStore.setTax(+newTaxValue);
  isTaxEditMode.value = false;
};
</script>

<template>
  <div>
    <h2 class="text-center text-xl mb-3">Finance Settings</h2>
    <EditableText
      v-if="tax"
      id="tax"
      v-model="isTaxEditMode"
      name="tax"
      rules="required"
      mask="numberMask"
      label="Tax value"
      :initial-value="tax"
      :is-loading="appStore.isSetTaxInProgress"
      @submit="setTax"
    />
  </div>
</template>
