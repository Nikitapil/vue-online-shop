<script setup lang="ts">
import { computed, ref } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppButton from '@/components/ui/AppButton.vue';

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
  <form
    class="flex flex-col gap-2 items-center w-full"
    @submit.prevent
  >
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <AppInput
      id="email"
      label="Email:"
      placeholder="Your email"
    />
    <AppInput
      id="password"
      type="password"
      label="Password:"
      placeholder="Your password"
    />

    <template v-if="isRegisterType">
      <AppInput
        id="password-repeat"
        type="password"
        label="Repeat password:"
        placeholder="Your password"
      />
      <AppInput
        id="name"
        label="Name:"
        placeholder="Your name"
      />
      <AppInput
        id="address"
        label="Address:"
        placeholder="Your address"
      />
      <AppInput
        id="phone"
        label="Phone:"
        placeholder="Your phone"
      />
    </template>
    <AppButton appearance="success">{{ title }}</AppButton>
  </form>
</template>
