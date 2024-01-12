<script setup lang="ts">
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import type { CategoryReturnDto } from '@/api/swagger/data-contracts';
import IconButton from '@/components/ui/IconButton.vue';

defineProps<{
  isLoading: boolean;
  categories: CategoryReturnDto[];
}>();

defineEmits<{
  edit: [CategoryReturnDto];
  delete: [CategoryReturnDto];
}>();
</script>

<template>
  <div
    v-if="isLoading"
    class="flex justify-center"
  >
    <RoundedLoader />
  </div>
  <p
    v-else-if="!categories.length"
    class="text-xl text-center"
  >
    No categories yet.
  </p>
  <div v-else>
    <div
      v-for="category in categories"
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
