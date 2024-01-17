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
    <div>
      <div class="w-80 bg-gray-100">
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

      <div>
        <p v-if="product.description">{{ product.description }}</p>
        <p v-if="product.price">{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>
