<script lang="ts" setup>
import IconButton from '@/components/ui/IconButton.vue';

const isOpen = defineModel<boolean>();

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
    preventClose?: boolean;
  }>(),
  {
    size: 'lg',
    preventClose: false
  }
);

const onClose = () => {
  if (!props.preventClose) {
    isOpen.value = false;
  }
};
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
      class="fixed top-0 left-0 z-30 w-full min-h-screen h-full bg-black/80"
      data-testid="modal-overlay"
      @click="onClose"
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
      data-testid="modal-content"
      class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl min-h-[14rem] max-w-[80%] w-full z-40 overflow-hidden p-7"
      :class="size"
      @click.stop
    >
      <div
        v-if="!props.preventClose"
        class="absolute right-0 top-0"
      >
        <IconButton
          icon="entypo:cross"
          @click="onClose"
        />
      </div>

      <slot />
    </div>
  </transition>
</template>

<style scoped>
.lg {
  @apply max-w-[80%];
}

.md {
  --min: min(560px, 80%);
  @apply max-w-[var(--min)];
}

.sm {
  --min: min(320px, 80%);
  @apply max-w-[var(--min)];
}
</style>
