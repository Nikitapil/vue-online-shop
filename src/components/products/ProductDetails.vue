<script setup lang="ts">
import type { ProductReturnDto } from '@/api/swagger/data-contracts';

defineProps<{
  product: Partial<ProductReturnDto>;
}>();
</script>

<template>
  <div>
    <h2
      v-if="product.name"
      class="text-center font-bold text-3xl"
    >
      {{ product.name }}
    </h2>
    <div class="flex flex-wrap gap-3 items-start mt-3">
      <div class="w-80">
        <img
          v-if="product.imageUrl"
          class="max-w-full"
          :src="product.imageUrl"
          :alt="product.description"
        />
        <p
          v-else
          class="h-20 flex justify-center items-center"
        >
          No Image
        </p>
      </div>

      <div class="lg:flex-1">
        <p
          v-if="product.description"
          class="text-lg font-medium"
        >
          {{ product.description }}
        </p>
        <p
          v-if="product.price"
          v-price="product.price"
          class="text-2xl font-bold"
        ></p>
      </div>
    </div>
  </div>
</template>
