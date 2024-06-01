<script setup lang="ts">
import { computed, type MaybeRef, onMounted } from 'vue';

import { useCategoriesStore } from '@/modules/categories/categoriesStore';

import type { RuleExpression } from 'vee-validate';

import AppSelect from '@/components/ui/AppSelect/AppSelect.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const value = defineModel<string>({ default: '' });

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    rules?: MaybeRef<RuleExpression<any>>;
    full?: boolean;
    emptyOptionEnabled?: boolean;
  }>(),
  {
    disabled: false,
    rules: '',
    full: false,
    emptyOptionEnabled: false
  }
);

defineEmits<{
  change: [string];
}>();

const store = useCategoriesStore();

const isDisabled = computed(() => props.disabled || store.isCategoriesLoading);

const options = computed(() => {
  const opts = store.categories.map((category) => ({
    name: category.name,
    value: category.id
  }));

  if (props.emptyOptionEnabled) {
    return [
      {
        name: t('reset'),
        value: ''
      },
      ...opts
    ];
  }

  return opts;
});

onMounted(async () => {
  if (!store.categories.length) {
    await store.getCategories();
  }
});
</script>

<template>
  <AppSelect
    v-model="value"
    :options="options"
    :disabled="isDisabled"
    :rules="rules"
    :full="full"
    :placeholder="$t('category')"
    name="Category"
    @change="$emit('change', value)"
  />
</template>
