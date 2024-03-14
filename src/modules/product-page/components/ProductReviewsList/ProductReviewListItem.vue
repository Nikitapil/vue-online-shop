<script setup lang="ts">
import IconButton from '../../../../components/ui/IconButton.vue';
import type { ProductReviewReturnDto } from '@/api/swagger/data-contracts';
import StarIcon from '@/components/ui/icons/StarIcon.vue';
import { computed } from 'vue';

const props = defineProps<{
  review: ProductReviewReturnDto;
  isDeleteReviewInProgress: boolean;
}>();

defineEmits<{
  delete: [];
}>();

const date = computed(() => new Date(props.review.createdAt).toLocaleDateString());
</script>

<template>
  <div class="border-b">
    <div class="flex justify-between items-center">
      <h2 class="font-bold">
        <span class="font-normal italic">{{ date }}</span> {{ props.review.authorName }}:
      </h2>
      <IconButton
        v-if="props.review.canDelete"
        icon="charm:cross"
        @click="$emit('delete')"
      />
    </div>
    <div class="flex items-center pl-2">
      <p>{{ review.rating }}</p>
      <StarIcon />
    </div>
    <p class="pl-2">{{ props.review.text }}</p>
  </div>
</template>
