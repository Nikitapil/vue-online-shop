<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md';
  }>(),
  {
    size: 'md'
  }
);
</script>

<template>
  <div
    class="loader"
    :class="[size]"
    data-testid="rounded-loader"
  ></div>
</template>

<style scoped>
.loader {
  width: 58px;
  height: 58px;
  border: 5px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader.sm {
  width: 25px;
  height: 25px;
  border-width: 3px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
