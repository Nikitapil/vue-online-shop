<script setup lang="ts">
import { ref } from 'vue';

import AppButton from '@/components/ui/AppButton.vue';
import AppTextarea from '@/components/ui/AppInput/AppTextarea.vue';
import StarRating from '@/components/ui/StarRating.vue';

const props = defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  addReview: [{ rating: number; comment: string }];
}>();

const rating = ref(0);
const comment = ref('');
const isEmptyRatingError = ref(false);

const resetRatingError = () => (isEmptyRatingError.value = false);

const submitHandler = () => {
  resetRatingError();

  if (!rating.value) {
    isEmptyRatingError.value = true;
    return;
  }

  emit('addReview', { rating: rating.value, comment: comment.value });
};
</script>
<template>
  <form
    class="bg-gray-200 p-3 rounded-xl flex flex-col"
    @submit.prevent="submitHandler"
  >
    <div class="flex justify-between mb-1">
      <h2 class="mb-2 font-bold">{{ $t('add_product_review') }}</h2>

      <StarRating
        v-model="rating"
        name="product-rating"
        :disabled="props.isLoading"
        @change="resetRatingError"
      />
    </div>

    <p
      v-if="isEmptyRatingError"
      class="text-red-500 font-bold text-right mb-2"
    >
      {{ $t('rating_is_required') }}
    </p>

    <AppTextarea
      id="review-input"
      v-model="comment"
      :placeholder="$t('your_review')"
      name="review-text"
      :disabled="props.isLoading"
    />

    <AppButton
      class="self-end"
      appearance="primary"
      type="submit"
      :disabled="props.isLoading"
    >
      {{ $t('submit') }}
    </AppButton>
  </form>
</template>
