<script setup lang="ts">
import type { ProductInCartReturnDto } from '@/api/swagger/data-contracts';
import IconButton from '@/components/ui/IconButton.vue';
import { useProduct } from '@/composables/useProduct';
import { toRef } from 'vue';

const props = defineProps<{
  product: ProductInCartReturnDto;
}>();

defineEmits<{
  removeFromCart: [];
}>();

const product = useProduct(toRef(props.product.product));
</script>

<template>
  <div
    v-if="product"
    class="flex items-center gap-3 w-full border border-slate-200 p-4 rounded-xl"
  >
    <img
      class="w-16 h-16"
      :src="product.imageUrl"
      alt="product img"
    />

    <div class="flex flex-col gap-2">
      <p>{{ product.name }}</p>
      <!--      TODO buttons for increase count and decrease count-->
      <div class="flex justify-between">
        <b>{{ product.price }}₽</b>
      </div>
    </div>

    <div class="ml-auto flex gap-4">
      <IconButton
        class="border"
        icon="mynaui:plus"
      />
      <p>{{ props.product.count }}</p>
      <IconButton
        class="border"
        icon="mynaui:minus"
      />
    </div>
  </div>
</template>
