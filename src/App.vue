<script setup lang="ts">
import Header from '@/components/Header.vue';
import CardList from '@/components/CardList.vue';
</script>

<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl my-10">
    <Header />

    <div class="px-8 py-5">
      <h2 class="text-3xl font-bold mb-10">All sneakers</h2>
      <CardList />
    </div>
  </div>
</template>
