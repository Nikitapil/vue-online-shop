<script setup lang="ts">
import type { ProductReturnDto } from '@/api/swagger/data-contracts';
import StarIcon from '../ui/icons/StarIcon.vue';
import ProductPrice from '@/components/products/ProductPrice.vue';

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
        <div class="text-rxl">
          <ProductPrice :product="product" />
        </div>
        <div
          v-if="product.rating"
          class="flex items-center"
        >
          Rating: {{ product.rating }}
          <StarIcon />
        </div>
      </div>
    </div>
  </div>
</template>
