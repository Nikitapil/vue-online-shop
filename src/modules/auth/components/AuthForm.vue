<script setup lang="ts">
import { computed, ref } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useForm } from 'vee-validate';

const props = withDefaults(
  defineProps<{
    initialType?: 'login' | 'register';
  }>(),
  {
    initialType: 'login'
  }
);

const { validate } = useForm();

const type = ref(props.initialType);

const form = ref({
  email: '',
  password: '',
  passwordRepeat: '',
  name: '',
  address: '',
  phone: ''
});

const isRegisterType = computed(() => type.value === 'register');

const title = computed(() => (isRegisterType.value ? 'Sign up' : 'Log in'));

const passwordMatchValidation = () => {
  if (form.value.password !== form.value.passwordRepeat) {
    return 'Passwords should be equal';
  }
  return true;
};

const onSubmit = async () => {
  const validationResult = await validate();
  if (validationResult.valid) {
    // Submit form
  }
};
</script>

<template>
  <form
    class="flex flex-col gap-2 items-center w-full"
    @submit.prevent="onSubmit"
  >
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <AppInput
      id="email"
      v-model="form.email"
      name="email"
      label="Email:"
      placeholder="Your email"
      rules="required|email"
    />
    <AppInput
      id="password"
      v-model="form.password"
      name="password"
      type="password"
      label="Password:"
      placeholder="Your password"
      rules="required|minLength:8"
    />

    <template v-if="isRegisterType">
      <AppInput
        id="password-repeat"
        v-model="form.passwordRepeat"
        name="password-repeat"
        type="password"
        label="Repeat password:"
        placeholder="Your password"
        :rules="passwordMatchValidation"
      />
      <AppInput
        id="name"
        v-model="form.name"
        name="name"
        label="Name:"
        placeholder="Your name"
        rules="required"
      />
      <AppInput
        id="address"
        v-model="form.address"
        name="address"
        label="Address:"
        placeholder="Your address"
      />
      <AppInput
        id="phone"
        v-model="form.phone"
        name="phone"
        label="Phone:"
        placeholder="Your phone"
      />
    </template>
    <AppButton appearance="success">{{ title }}</AppButton>
  </form>
</template>