<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import AppTextarea from '@/components/ui/AppInput/AppTextarea.vue';
import StarRating from '@/components/ui/StarRating.vue';
</script>
<template>
  <form
    class="bg-gray-200 p-3 rounded-xl flex flex-col"
    @submit.prevent
  >
    <h2 class="mb-2 font-bold">Add product review</h2>
    <StarRating name="product-rating" />
    <AppTextarea
      id="review-input"
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
