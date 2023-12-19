<script setup lang="ts">
import CardList from '@/components/CardList.vue';
import { onMounted, ref, watch } from 'vue';
import type { IFavourite, IProduct, TProductFromMainResponse } from '@/types/sneakers';
import axios from 'axios';

const emit = defineEmits<{
  toggleAddedToCart: [IProduct];
}>();

const products = ref<IProduct[]>([]);

const filters = ref({
  sortBy: 'title',
  searchQuery: ''
});

// TODO когда будет бэк корзины переделать и просто вызывать метод добавления в корзину
const toggleAddedToCart = (product: IProduct) => {
  emit('toggleAddedToCart', product);
};

// TODO get favourite flag in each product from backend
const fetchFavourites = async () => {
  try {
    const { data } = await axios.get<IFavourite[]>('https://497194416390c6fe.mokky.dev/favourites');
    products.value = products.value.map((product: IProduct) => {
      const favourite = data.find((fav) => fav.item_id === product.id);
      return {
        ...product,
        isFavorite: !!favourite,
        favouriteId: favourite?.id || null
      };
    });
  } catch (e) {
    // TODO handle error
    console.log(e);
  }
};

const fetchProducts = async () => {
  try {
    const { data } = await axios.get<TProductFromMainResponse[]>('https://497194416390c6fe.mokky.dev/items', {
      params: {
        sortBy: filters.value.sortBy,
        title: `*${filters.value.searchQuery}*`
      }
    });

    products.value = data.map((product) => ({
      ...product,
      isFavorite: false,
      isAdded: false,
      favouriteId: null
    }));
  } catch (e) {
    // TODO handle error
    console.log(e);
  }
};

const toggleFavourite = async (item: IProduct) => {
  try {
    if (!item.isFavorite && !item.favouriteId) {
      const { data } = await axios.post<IFavourite>('https://497194416390c6fe.mokky.dev/favourites', {
        item_id: item.id
      });
      item.isFavorite = true;
      item.favouriteId = data.id;
    } else {
      await axios.delete(`https://497194416390c6fe.mokky.dev/favourites/${item.favouriteId}`);
      item.isFavorite = false;
      item.favouriteId = null;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchProductsWithFavourites = async () => {
  await fetchProducts();
  await fetchFavourites();
};

onMounted(async () => {
  // TODO to composition or pinia

  await fetchProductsWithFavourites();
});

//TODO do it by change and use debounce for input
watch(filters, fetchProductsWithFavourites, { deep: true });
</script>

<template>
  <div class="flex justify-between items-center mb-10">
    <h2 class="text-3xl font-bold">All sneakers</h2>

    <div class="flex gap-4">
      <!--          TODO custom select-->
      <select
        v-model="filters.sortBy"
        class="cursor-pointer border rounded-md focus:border-gray-400 py-2 px-4"
      >
        <option value="title">By name</option>
        <option value="price">By price(chip)</option>
        <option value="-price">By price(expensive)</option>
      </select>

      <div class="relative">
        <img
          class="absolute left-3 top-3.5"
          src="/search.svg"
          alt="Search icon"
        />
        <input
          v-model="filters.searchQuery"
          class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  </div>

  <CardList
    :products="products"
    @click-favourite="toggleFavourite"
    @click-add-to-cart="toggleAddedToCart"
  />
</template>
