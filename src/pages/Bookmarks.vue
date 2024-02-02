<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import type { IBookmarksResponse, IProduct } from '@/types/sneakers';

const bookmarks = ref<IProduct[]>([]);

const removeFromFavourites = async (item: IProduct) => {
  await axios.delete(`https://497194416390c6fe.mokky.dev/favourites/${item.favouriteId}`);
  bookmarks.value = bookmarks.value.filter((bookmark) => bookmark.id !== item.id);
};

onMounted(async () => {
  try {
    const { data } = await axios.get<IBookmarksResponse[]>(
      'https://497194416390c6fe.mokky.dev/favourites?_relations=items'
    );
    bookmarks.value = data.map((bookmark) => {
      return {
        ...bookmark.item,
        isFavorite: true,
        favouriteId: bookmark.id,
        isAdded: false
      };
    });
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold mb-5">Bookmarks</h2>
  </div>
</template>
