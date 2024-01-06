<script lang="ts" setup>
import IconButton from '@/components/ui/IconButton.vue';

const isOpen = defineModel<boolean>();

const closeModal = () => (isOpen.value = false);
</script>

<template>
  <transition
    enter-from-class="opacity-0"
    enter-active-class="transition duration-300"
    leave-to-class="opacity-0"
    leave-active-class="transition duration-300"
  >
    <div
      v-if="isOpen"
      class="fixed top-0 z-10 w-full h-screen bg-black/80"
      @click="closeModal"
    ></div>
  </transition>
  <transition
    enter-from-class="translate-y-[-100%] opacity-0"
    enter-active-class="transition duration-300"
    leave-to-class="translate-y-[-100%] opacity-0"
    leave-active-class="transition duration-300"
  >
    <div
      v-if="isOpen"
      class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl h-52 max-w-[80%] w-full z-20 overflow-hidden p-7"
      @click.stop
    >
      <div class="absolute right-0 top-0">
        <IconButton
          icon="entypo:cross"
          @click="closeModal"
        />
      </div>
      <slot />
    </div>
  </transition>
</template>
