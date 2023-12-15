<script setup lang="ts">
defineEmits<{
  clickAddToCart: [];
  clickFavourite: [];
}>();

defineProps<{
  imageUrl: string;
  title: string;
  price: number;
  isFavorite: boolean;
  isAdded: boolean;
}>();
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition duration-300"
  >
    <!--    TODO loaders on fav btn-->
    <button
      class="absolute top-8 left-8"
      @click.stop="$emit('clickFavourite')"
    >
      <img
        :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
        alt="Like"
      />
    </button>

    <img
      :src="imageUrl"
      alt="Sneaker"
    />

    <p class="mt-2">{{ title }}</p>
    <!--    TODO Add product description-->

    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b>{{ price }}руб</b>
      </div>
      <!--    TODO loaders on add btn-->
      <button @click.stop="$emit('clickAddToCart')">
        <img
          :src="isAdded ? '/checked.svg' : '/plus.svg'"
          :alt="isAdded ? 'Checkmark' : 'Plus'"
        />
      </button>
    </div>
  </div>
</template>
