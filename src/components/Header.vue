<script setup lang="ts">
defineEmits<{
  openCart: [];
}>();
</script>

<template>
  <header class="flex justify-between border-b border-b-slate-300 px-8 py-6">
    <div class="flex items-center gap-4">
      <img
        class="w-10"
        src="/logo.png"
        alt="Logo "
      />

      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-500">Best sneakers shop</p>
      </div>
    </div>

    <ul class="flex gap-8 items-center">
      <li
        class="flex gap-3 items-center text-slate-500 cursor-pointer hover:text-black"
        @click="$emit('openCart')"
      >
        <img
          src="/cart.svg"
          alt="cart"
        />
        <b>1205руб</b>
      </li>

      <li class="flex gap-3 items-center text-slate-500 cursor-pointer hover:text-black">
        <img
          src="/heart.svg"
          alt="cart"
        />
        <span>Bookmarks</span>
      </li>

      <li class="flex gap-3 items-center text-slate-500 cursor-pointer hover:text-black">
        <img
          src="/profile.svg"
          alt="cart"
        />
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>
