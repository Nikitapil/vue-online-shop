<script setup lang="ts">
import IconButton from './IconButton.vue';

const isOpen = defineModel<boolean>();

defineProps<{
  title: string;
}>();

const close = () => (isOpen.value = false);
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50"
    @click="close"
  ></div>
  <Transition
    enter-from-class="translate-x-[150%] opacity-0"
    enter-active-class="transition duration-300"
    leave-to-class="translate-x-[150%] opacity-0"
    leave-active-class="transition duration-300"
  >
    <div
      v-if="isOpen"
      class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col"
    >
      <div class="flex items-center gap-5 mb-5">
        <IconButton
          icon="formkit:arrowleft"
          @click="close"
        />
        <h2 class="text-2xl font-bold">{{ title }}</h2>
      </div>
      <slot />
    </div>
  </Transition>
</template>
