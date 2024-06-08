<script setup lang="ts">
import { computed, ref } from 'vue';

import type { ProductReviewReturnDto } from '@/api/swagger/data-contracts';

import StarIcon from '@/components/ui/icons/StarIcon.vue';
import IconButton from '../../../../components/ui/IconButton.vue';
import ConfirmModal from '../../../../components/ui/ConfirmModal.vue';

const props = defineProps<{
  review: ProductReviewReturnDto;
  isDeleteReviewInProgress: boolean;
}>();

defineEmits<{
  delete: [];
}>();

const isDeleteModalOpened = ref(false);

const date = computed(() => props.review.createdAt);
</script>

<template>
  <div class="border-b">
    <div class="flex justify-between items-center">
      <h2 class="font-bold">
        <span
          v-date="{ date }"
          class="font-normal italic"
        ></span>

        {{ props.review.authorName }}:
      </h2>

      <IconButton
        v-if="props.review.canDelete"
        v-tooltip="$t('delete')"
        icon="charm:cross"
        :disabled="props.isDeleteReviewInProgress"
        @click="isDeleteModalOpened = true"
      />
    </div>

    <div class="flex items-center pl-2">
      <p>{{ review.rating }}</p>
      <StarIcon />
    </div>

    <p class="pl-2">{{ props.review.text }}</p>

    <ConfirmModal
      v-model="isDeleteModalOpened"
      :title="$t('delete_review_question')"
      @confirm="$emit('delete')"
    />
  </div>
</template>
