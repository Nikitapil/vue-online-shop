<script setup lang="ts">
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import IconButton from '@/components/ui/IconButton.vue';
import { computed } from 'vue';
import { useToggleFavourite } from './useToggleFavourite';

const product = defineModel<ProductReturnDto>({ required: true });

const { isLoading, toggleFavourite } = useToggleFavourite(product);

const icon = computed(() => (product.value.isInFavorites ? 'mdi:heart' : 'mdi:heart-outline'));
</script>

<template>
  <IconButton
    :icon="icon"
    color="red"
    :disabled="isLoading"
    @click="toggleFavourite"
  />
</template>
