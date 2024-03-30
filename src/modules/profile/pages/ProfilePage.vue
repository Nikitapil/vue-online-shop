<script setup lang="ts">
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import EditableText from '../../../components/ui/EditableText.vue';
import { useAuthStore } from '@/modules/auth/authStore';
import type { UpdateUserDataDto } from '@/api/swagger/data-contracts';
import { computed, ref } from 'vue';

const authStore = useAuthStore();

const isEmailEditMode = ref(false);
const isNameEditMode = ref(false);
const isPhoneEditMode = ref(false);
const isAddressEditMode = ref(false);

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
</script>

<template>
  <AuthProtected>
    <div v-if="user">
      <h2 class="text-xl text-center mb-3">Profile</h2>
      <EditableText
        id="email"
        v-model="isEmailEditMode"
        name="email"
        label="Email:"
        rules="email|required"
        :initial-value="user.email"
        @submit="onUpdateEmail"
      />
      <EditableText
        id="name"
        v-model="isNameEditMode"
        name="name"
        label="Name:"
        rules="required"
        :initial-value="user.name"
        @submit="onUpdateName"
      />
      <EditableText
        id="phone"
        v-model="isPhoneEditMode"
        name="phone"
        label="Phone:"
        :initial-value="userPhone"
        @submit="onUpdatePhone"
      />
      <EditableText
        id="address"
        v-model="isAddressEditMode"
        name="address"
        label="Address:"
        :initial-value="userAddress"
        @submit="onUpdateAdress"
      />
    </div>
  </AuthProtected>
</template>
