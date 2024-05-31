<script setup lang="ts">
import type { CategoryReturnDto } from '@/api/swagger/data-contracts';

import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import IconButton from '@/components/ui/IconButton.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';

const props = defineProps<{
  isLoading: boolean;
  categories: CategoryReturnDto[];
}>();

defineEmits<{
  edit: [CategoryReturnDto];
  delete: [CategoryReturnDto];
}>();
</script>

<template>
  <EmptyStateCentered
    v-if="props.isLoading"
    class="flex justify-center"
  >
    <RoundedLoader />
  </EmptyStateCentered>

  <p
    v-else-if="!props.categories.length"
    class="text-xl text-center"
  >
    {{ $t('no_categories_yet') }}.
  </p>

  <div v-else>
    <div
      v-for="category in props.categories"
      :key="category.id"
      class="border-b flex justify-between"
    >
      <h3 class="font-bold text-lg">{{ category.name }}</h3>

      <div class="flex gap-2">
        <IconButton
          icon="bx:edit"
          color="#80a0c2"
          @click="$emit('edit', category)"
        />

        <IconButton
          icon="bx:trash"
          color="#b7171b"
          @click="$emit('delete', category)"
        />
      </div>
    </div>
  </div>
</template>
