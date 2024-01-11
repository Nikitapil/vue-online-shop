<script setup lang="ts">
import AppInput from '@/components/ui/AppInput.vue';
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
  </form>
</template>
