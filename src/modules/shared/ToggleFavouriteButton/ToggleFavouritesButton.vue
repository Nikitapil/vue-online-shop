<script setup lang="ts">
import { computed } from 'vue';

import { useToggleFavourite } from './useToggleFavourite';

import type { ProductReturnDto } from '@/api/swagger/data-contracts';

import IconButton from '@/components/ui/IconButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const product = defineModel<ProductReturnDto>({ required: true });

const { isLoading, toggleFavourite } = useToggleFavourite(product);

const icon = computed(() => (product.value.isInFavorites ? 'mdi:heart' : 'mdi:heart-outline'));
const tooltip = computed(() => (product.value.isInFavorites ? t('remove_from_favorites') : t('add_to_favorites')));
</script>

<template>
  <IconButton
    v-tooltip="tooltip"
    color="red"
    :icon="icon"
    :disabled="isLoading"
    @click.stop="toggleFavourite"
  />
</template>
