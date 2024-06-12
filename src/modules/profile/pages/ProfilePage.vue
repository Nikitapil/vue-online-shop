<script setup lang="ts">
import { computed, ref } from 'vue';

import { useAuthStore } from '@/modules/auth/authStore';

import type { ChangePasswordDto, UpdateUserDataDto } from '@/api/swagger/data-contracts';

import ChangePasswordModal from '../components/ChangePasswordModal.vue';
import AppButton from '../../../components/ui/AppButton.vue';
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import EditableText from '../../../components/ui/EditableText.vue';

const authStore = useAuthStore();

const isEmailEditMode = ref(false);
const isNameEditMode = ref(false);
const isPhoneEditMode = ref(false);
const isAddressEditMode = ref(false);
const isShowChangePasswordModal = ref(false);

const user = computed(() => authStore.user);
const userPhone = computed(() => authStore.user?.phone || 'Not specified');
const userAddress = computed(() => authStore.user?.address || 'Not specified');

const updateUser = async (value: string, key: keyof UpdateUserDataDto) => {
  if (!user.value) {
    return;
  }
  const data: UpdateUserDataDto = {
    email: user.value.email,
    name: user.value.name,
    address: user.value.address || '',
    phone: user.value.phone || '',
    [key]: value
  };

  await authStore.updateUserData(data);
};

const onUpdateEmail = async (value: string) => {
  await updateUser(value, 'email');
  isEmailEditMode.value = false;
};

const onUpdateName = async (value: string) => {
  await updateUser(value, 'name');
  isNameEditMode.value = false;
};

const onUpdatePhone = async (value: string) => {
  await updateUser(value, 'phone');
  isPhoneEditMode.value = false;
};

const onUpdateAdress = async (value: string) => {
  await updateUser(value, 'address');
  isAddressEditMode.value = false;
};

const onChangePassword = (request: ChangePasswordDto) => {
  authStore.changePassword(request);
  isShowChangePasswordModal.value = false;
};
</script>

<template>
  <AuthProtected>
    <div v-if="user">
      <h2 class="text-2xl text-center mb-3">{{ $t('profile') }}</h2>

      <EditableText
        id="email"
        v-model="isEmailEditMode"
        class="mb-2"
        name="email"
        label="Email:"
        rules="email|required"
        :initial-value="user.email"
        @submit="onUpdateEmail"
      />

      <EditableText
        id="name"
        v-model="isNameEditMode"
        class="mb-2"
        name="name"
        rules="required"
        :label="`${$t('name')}:`"
        :initial-value="user.name"
        @submit="onUpdateName"
      />

      <EditableText
        id="phone"
        v-model="isPhoneEditMode"
        class="mb-2"
        name="phone"
        :label="`${$t('phone')}:`"
        :initial-value="userPhone"
        @submit="onUpdatePhone"
      />

      <EditableText
        id="address"
        v-model="isAddressEditMode"
        class="mb-2"
        name="address"
        :label="`${$t('address')}:`"
        :initial-value="userAddress"
        @submit="onUpdateAdress"
      />

      <AppButton
        appearance="secondary"
        @click="isShowChangePasswordModal = true"
      >
        {{ $t('change_password') }}
      </AppButton>

      <ChangePasswordModal
        v-model="isShowChangePasswordModal"
        :is-loading="authStore.isAuthLoading"
        @confirm="onChangePassword"
      />
    </div>
  </AuthProtected>
</template>
