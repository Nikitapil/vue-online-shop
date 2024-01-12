<script setup lang="ts">
import AppInput from '@/components/ui/AppInput.vue';
import { ref } from 'vue';
import CategoriesModal from '@/modules/categories/components/CategoriesModal.vue';
import AppButton from '@/components/ui/AppButton.vue';

const isCategoriesModalOpened = ref(false);
</script>

<template>
  <form>
    <AppInput
      id="name"
      name="name"
      placeholder="Title"
      label="Product title"
      rules="required"
    />
    <AppInput
      id="description"
      name="description"
      placeholder="Description"
      label="Product description"
      rules="required"
    />
    <AppButton
      appearance="secondary"
      @click="isCategoriesModalOpened = true"
      >Manage categories</AppButton
    >
  </form>
  <CategoriesModal v-model="isCategoriesModalOpened" />
</template>
