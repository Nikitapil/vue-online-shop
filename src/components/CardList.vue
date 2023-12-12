<script setup lang="ts">
import Card from '@/components/Card.vue';

const onClickAdd = () => alert(111);
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1205"
      :is-added="true"
      :is-favorite="true"
      @click-add="onClickAdd"
    />
    <Card
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1205"
      :is-added="true"
      :is-favorite="false"
    />
    <Card
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1205"
      :is-added="false"
      :is-favorite="false"
    />
    <Card
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1205"
      :is-added="false"
      :is-favorite="false"
    />
    <Card
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1205"
      :is-added="false"
      :is-favorite="false"
    />
    <Card
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1205"
      :is-added="false"
      :is-favorite="false"
    />
  </div>
</template>
