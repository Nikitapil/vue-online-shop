<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import AppTextarea from '@/components/ui/AppInput/AppTextarea.vue';
import StarRating from '@/components/ui/StarRating.vue';
import { ref } from 'vue';

const props = defineProps<{
  isLoading: boolean;
}>();

const rating = ref(0);
const comment = ref('');
</script>
<template>
  <form
    class="bg-gray-200 p-3 rounded-xl flex flex-col"
    @submit.prevent
  >
    <div class="flex justify-between mb-1">
      <h2 class="mb-2 font-bold">Add product review</h2>
      <StarRating
        v-model="rating"
        name="product-rating"
      />
    </div>
    <AppTextarea
      id="review-input"
      v-model="comment"
      placeholder="Your review..."
    />
    <AppButton
      class="self-end"
      appearance="primary"
    >
      Submit
    </AppButton>
  </form>
</template>
