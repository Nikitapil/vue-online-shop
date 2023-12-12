<script setup lang="ts">
defineProps<{
  imageUrl: string;
  title: string;
  price: number;
  isFavorite: boolean;
  isAdded: boolean;
}>();

defineEmits<{
  clickAdd: [];
  clickFavorite: [];
}>();
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition duration-300"
  >
    <button
      class="absolute top-8 left-8"
      @click.stop="$emit('clickFavorite')"
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

    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b>{{ price }}руб</b>
      </div>

      <button @click.stop="$emit('clickAdd')">
        <img
          :src="isAdded ? '/checked.svg' : '/plus.svg'"
          :alt="isAdded ? 'Checkmark' : 'Plus'"
        />
      </button>
    </div>
  </div>
</template>
