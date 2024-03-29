<script setup lang="ts">
import AuthProtected from '@/modules/auth/components/AuthProtected.vue';
import EditableText from '../../../components/ui/EditableText.vue';
import { useAuthStore } from '@/modules/auth/authStore';
import { computed, ref } from 'vue';

const authStore = useAuthStore();

const isEmailEditMode = ref(false);

const user = computed(() => authStore.user);
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
      />
    </div>
  </AuthProtected>
</template>
