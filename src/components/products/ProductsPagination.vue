<script setup lang="ts">
import { computed } from 'vue';
import AppSelect from '../ui/AppSelect/AppSelect.vue';
import type { ISelectOptions } from '../ui/AppSelect/types';
import Pagination from '../ui/Pagination.vue';
import { EPaginationLimits } from '@/domain/components';

const limitOptions: ISelectOptions<EPaginationLimits>[] = [
  { value: EPaginationLimits.TEN, name: '10' },
  { value: EPaginationLimits.TWENTY, name: '20' },
  { value: EPaginationLimits.FIFTY, name: '50' }
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
      v-if="props.totalCount > 10"
      class="flex items-center gap-2 ml-auto"
    >
      <span class="min-w-fit hidden sm:inline">Products per page</span>
      <AppSelect
        v-model="limitValue"
        :options="limitOptions"
        :disabled="isLoading"
        name="limit"
        @change="onChangeLimit"
      />
    </div>
  </div>
</template>
