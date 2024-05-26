<script setup lang="ts">
import { computed, ref } from 'vue';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';

import { EAuthModalTypes } from '@/domain/components';

import { useAuthStore } from '@/modules/auth/authStore';

import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput/AppInput.vue';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    initialType?: EAuthModalTypes;
  }>(),
  {
    initialType: EAuthModalTypes.LOGIN
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

const isRegisterType = computed(() => type.value === EAuthModalTypes.REGISTER);

const title = computed(() => (isRegisterType.value ? t('sign_up') : t('log_in')));

const swapButtonText = computed(() => (isRegisterType.value ? t('already_registered_text') : t('not_registered_text')));

const passwordMatchValidation = () => {
  if (form.value.password !== form.value.passwordRepeat) {
    return t('passwords_should_be_equal');
  }

  return true;
};

const register = async () => {
  const { email, password, name, address, phone } = form.value;

  await authStore.register({
    email,
    password,
    name,
    address,
    phone
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

const swapForm = () => (type.value = isRegisterType.value ? EAuthModalTypes.LOGIN : EAuthModalTypes.REGISTER);
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
      rules="required|email"
      :placeholder="t('your_email')"
      :disabled="authStore.isAuthLoading"
    />

    <AppInput
      id="password"
      v-model="form.password"
      name="password"
      type="password"
      rules="required|minLength:8"
      :placeholder="t('your_password')"
      :label="`${t('password')}:`"
      :disabled="authStore.isAuthLoading"
    />

    <template v-if="isRegisterType">
      <AppInput
        id="password-repeat"
        v-model="form.passwordRepeat"
        name="password-repeat"
        type="password"
        :label="`${t('repeat_password')}:`"
        :placeholder="t('your_password')"
        :rules="passwordMatchValidation"
        :disabled="authStore.isAuthLoading"
      />

      <AppInput
        id="name"
        v-model="form.name"
        name="name"
        rules="required"
        :placeholder="t('your_name')"
        :label="`${t('name')}:`"
        :disabled="authStore.isAuthLoading"
      />

      <AppInput
        id="address"
        v-model="form.address"
        name="address"
        :placeholder="t('your_address')"
        :label="`${t('address')}:`"
        :disabled="authStore.isAuthLoading"
      />

      <AppInput
        id="phone"
        v-model="form.phone"
        name="phone"
        :label="`${t('phone')}:`"
        :placeholder="t('your_phone')"
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
