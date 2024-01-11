<script setup lang="ts">
import { computed, ref } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useForm } from 'vee-validate';
import { useAuthStore } from '@/modules/auth/authStore';

const props = withDefaults(
  defineProps<{
    initialType?: 'login' | 'register';
  }>(),
  {
    initialType: 'login'
  }
);

const emit = defineEmits<{
  success: [];
}>();

const { validate } = useForm();

const authStore = useAuthStore();

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

const swapButtonText = computed(() =>
  isRegisterType.value ? 'Already have an account? Log in.' : 'Not registered yet? Sign up.'
);

const passwordMatchValidation = () => {
  if (form.value.password !== form.value.passwordRepeat) {
    return 'Passwords should be equal';
  }
  return true;
};

const register = async () => {
  const { email, password, name, address } = form.value;
  await authStore.register({
    email,
    password,
    name,
    address
  });
};

const login = async () => {
  const { email, password } = form.value;
  await authStore.login({ email, password });
};

const onSubmit = async () => {
  const validationResult = await validate();
  if (validationResult.valid) {
    if (isRegisterType.value) {
      await register();
    } else {
      await login();
    }
  }
  if (authStore.isAuthenticated) {
    emit('success');
  }
};

const swapForm = () => (type.value = isRegisterType.value ? 'login' : 'register');
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
      :disabled="authStore.isAuthLoading"
    />
    <AppInput
      id="password"
      v-model="form.password"
      name="password"
      type="password"
      label="Password:"
      placeholder="Your password"
      rules="required|minLength:8"
      :disabled="authStore.isAuthLoading"
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
        :disabled="authStore.isAuthLoading"
      />
      <AppInput
        id="name"
        v-model="form.name"
        name="name"
        label="Name:"
        placeholder="Your name"
        rules="required"
        :disabled="authStore.isAuthLoading"
      />
      <AppInput
        id="address"
        v-model="form.address"
        name="address"
        label="Address:"
        placeholder="Your address"
        :disabled="authStore.isAuthLoading"
      />
      <AppInput
        id="phone"
        v-model="form.phone"
        name="phone"
        label="Phone:"
        placeholder="Your phone"
        :disabled="authStore.isAuthLoading"
      />
    </template>
    <div class="self-end">
      <AppButton
        appearance="transparent"
        :disabled="authStore.isAuthLoading"
        @click="swapForm"
      >
        {{ swapButtonText }}
      </AppButton>
    </div>
    <AppButton
      appearance="success"
      type="submit"
      :disabled="authStore.isAuthLoading"
    >
      {{ title }}
    </AppButton>
  </form>
</template>
