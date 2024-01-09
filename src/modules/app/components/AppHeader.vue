<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import { ref } from 'vue';
import AuthModal from '@/modules/auth/components/AuthModal.vue';
import HorizontalLoader from '@/components/ui/HorizontalLoader.vue';

defineProps<{
  cartPrice: number;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}>();

defineEmits<{
  openCart: [];
}>();

const isAuthModalOpen = ref(false);
const authModalType = ref('login');

const openAuthModal = (type: 'login' | 'register') => {
  authModalType.value = type;
  isAuthModalOpen.value = true;
};
</script>

<template>
  <header class="flex justify-between items-center border-b border-b-slate-300 px-8 py-6">
    <RouterLink
      to="/"
      class="flex items-center gap-4"
    >
      <img
        class="w-10"
        src="/logo.png"
        alt="Logo "
      />

      <div>
        <h2 class="text-xl font-bold uppercase">Shopper</h2>
        <p class="text-slate-500">Best shop app</p>
      </div>
    </RouterLink>

    <div
      v-if="isAuthLoading"
      class="pr-10"
    >
      <HorizontalLoader />
    </div>

    <nav v-else-if="isAuthenticated">
      <ul class="flex gap-8 items-center">
        <!--        Todo refactor общие классы и изменить на кнопку-->
        <li
          class="flex gap-3 items-center text-slate-500 cursor-pointer hover:text-black"
          @click="$emit('openCart')"
        >
          <img
            src="/cart.svg"
            alt="cart"
          />
          <b>{{ cartPrice }}₽</b>
        </li>

        <li>
          <RouterLink
            to="/bookmarks"
            class="flex gap-3 items-center text-slate-500 cursor-pointer hover:text-black"
          >
            <img
              src="/heart.svg"
              alt="cart"
            />
            <span>Bookmarks</span>
          </RouterLink>
        </li>

        <li class="flex gap-3 items-center text-slate-500 cursor-pointer hover:text-black">
          <img
            src="/profile.svg"
            alt="cart"
          />
          <span>Profile</span>
        </li>
      </ul>
    </nav>
    <div
      v-else
      class="flex gap-3"
    >
      <AppButton
        class="bg-gray-400"
        @click="openAuthModal('login')"
      >
        Log in
      </AppButton>
      <AppButton
        class="bg-gray-400"
        appearance="secondary"
        @click="openAuthModal('register')"
      >
        Sign up
      </AppButton>
    </div>
    <AuthModal
      v-if="!isAuthenticated"
      v-model="isAuthModalOpen"
      :initial-type="authModalType"
    />
  </header>
</template>
