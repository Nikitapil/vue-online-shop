<script setup lang="ts">
import { useCartStore } from '../cartStore';

const store = useCartStore();
</script>

<template>
  <slot />
</template>
