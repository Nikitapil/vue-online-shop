<script setup lang="ts">
import Header from '@/components/Header.vue';
import CardList from '@/components/CardList.vue';
import Drawer from '@/components/Drawer.vue';
</script>

<template>
  <!--  <Drawer />-->
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl my-10">
    <Header />

    <div class="px-8 py-5">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl font-bold">All sneakers</h2>

        <div class="flex gap-4">
          <select class="cursor-pointer border rounded-md focus:border-gray-400 py-2 px-4">
            <option value="">By name</option>
            <option value="">By price(chip)</option>
            <option value="">By price(expensive)</option>
          </select>

          <div class="relative">
            <img
              class="absolute left-3 top-3.5"
              src="/search.svg"
              alt="Search icon"
            />
            <input
              class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      <CardList />
    </div>
  </div>
</template>
