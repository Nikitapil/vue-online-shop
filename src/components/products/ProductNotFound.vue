<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';

import EmptyStateCentered from '../ui/EmptyStateCentered.vue';
</script>

<template>
  <EmptyStateCentered class="flex-col gap-2">
    <h2 class="text-2xl font-bold">{{ $t('product_not_found') }}</h2>
    <Icon
      icon="nonicons:not-found-16"
      color="gray"
      width="100"
      height="100"
    />
  </EmptyStateCentered>
</template>
