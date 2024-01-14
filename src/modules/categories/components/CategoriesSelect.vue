<script setup lang="ts">
import { useCategoriesStore } from '@/modules/categories/categoriesStore';
import { computed, type MaybeRef, onMounted, ref } from 'vue';
import AppSelect from '@/components/ui/AppSelect/AppSelect.vue';
import type { RuleExpression } from 'vee-validate';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    rules?: MaybeRef<RuleExpression<any>>;
  }>(),
  {
    disabled: false,
    rules: ''
  }
);

const store = useCategoriesStore();

const isLoading = ref(false);

const isDisabled = computed(() => props.disabled || isLoading.value);

const options = computed(() =>
  store.categories.map((category) => ({
    name: category.name,
    value: category.id
  }))
);

onMounted(async () => {
  if (!store.categories.length) {
    isLoading.value = true;
    await store.getCategories();
    isLoading.value = false;
  }
});
</script>

<template>
  <AppSelect
    :options="options"
    :disabled="isDisabled"
    :rules="rules"
    placeholder="Category"
    name="Category"
  />
</template>
