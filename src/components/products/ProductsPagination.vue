<script setup lang="ts">
import { computed } from 'vue';

import type { ISelectOptions } from '../ui/AppSelect/types';
import { EPaginationLimits } from '@/domain/components';

import AppSelect from '../ui/AppSelect/AppSelect.vue';
import Pagination from '../ui/Pagination.vue';

const limitOptions: ISelectOptions<EPaginationLimits>[] = [
  { value: EPaginationLimits.TEN, name: EPaginationLimits.TEN },
  { value: EPaginationLimits.TWENTY, name: EPaginationLimits.TWENTY },
  { value: EPaginationLimits.FIFTY, name: EPaginationLimits.FIFTY }
];

const limitValue = defineModel<EPaginationLimits>('limitValue', { required: true });
const currentPage = defineModel<number>('page', { required: true });

const props = defineProps<{
  totalCount: number;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  paginate: [];
}>();

const limit = computed(() => +limitValue.value);
const isShowLimitSelect = computed(() => props.totalCount > 10);

const onChangePage = (p: number) => {
  currentPage.value = p;
  emit('paginate');
};

const onChangeLimit = () => {
  currentPage.value = 1;
  emit('paginate');
};
</script>

<template>
  <div class="flex justify-between items-center mt-2">
    <Pagination
      :current-page="currentPage"
      :limit="limit"
      :items-count="props.totalCount"
      :disabled="props.isLoading"
      @set-page="onChangePage"
    />

    <div
      v-if="isShowLimitSelect"
      class="flex items-center gap-2 ml-auto"
      data-testid="limitSelect"
    >
      <span class="min-w-fit hidden sm:inline">{{ $t('products_per_page') }}</span>
      <AppSelect
        v-model="limitValue"
        :options="limitOptions"
        :disabled="props.isLoading"
        name="limit"
        @change="onChangeLimit"
      />
    </div>
  </div>
</template>
