<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    initialType?: 'login' | 'register';
  }>(),
  {
    initialType: 'login'
  }
);

const type = ref(props.initialType);

const isRegisterType = computed(() => type.value === 'register');

const title = computed(() => (isRegisterType.value ? 'Sign up' : 'Log in'));
</script>

<template>
  <form>
    <h1>{{ title }}</h1>
  </form>
</template>
