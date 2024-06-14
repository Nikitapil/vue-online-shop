<script setup lang="ts">
import { computed } from 'vue';

import { useToggleFavourite } from './useToggleFavourite';

import type { ProductReturnDto } from '@/api/swagger/data-contracts';

import IconButton from '@/components/ui/IconButton.vue';

const product = defineModel<ProductReturnDto>({ required: true });

const { isLoading, toggleFavourite } = useToggleFavourite(product);

const icon = computed(() => (product.value.isInFavorites ? 'mdi:heart' : 'mdi:heart-outline'));
</script>

<template>
  <IconButton
    :icon="icon"
    color="red"
    :disabled="isLoading"
    @click.stop="toggleFavourite"
  />
</template>
