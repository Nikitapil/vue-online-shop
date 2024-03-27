<script setup lang="ts">
import Cart from '../../cart/components/Cart.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { ref } from 'vue';
import AuthModal from '@/modules/auth/components/AuthModal.vue';
import HorizontalLoader from '@/components/ui/loaders/HorizontalLoader.vue';
import LogoutModal from '@/modules/auth/components/LogoutModal.vue';
import IconButton from '@/components/ui/IconButton.vue';
import { Icon } from '@iconify/vue';
import { ERoutesName } from '@/router';

defineProps<{
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}>();

const isAuthModalOpen = ref(false);
const isLogoutModalOpen = ref(false);
const authModalType = ref<'register' | 'login'>('login');

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
      <ul class="flex gap-3 lg:gap-8 items-center">
        <!--        Todo refactor общие классы и изменить на кнопку-->
        <li>
          <Cart />
        </li>

        <li>
          <RouterLink
            to="/bookmarks"
            class="flex gap-3 items-center text-slate-500 cursor-pointer hover:text-black"
          >
            <Icon
              class="w-6 h-6"
              icon="mdi:heart-outline"
            />
            <span class="text-black hidden lg:block">Bookmarks</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
            :to="{ name: ERoutesName.ORDERS }"
            class="flex gap-1 items-center text-slate-500 cursor-pointer hover:text-black"
          >
            <Icon
              class="w-6 h-6"
              icon="lets-icons:order"
            />
            <span class="hidden lg:block">Orders</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
            :to="{ name: ERoutesName.PROFILE }"
            class="flex gap-1 items-center text-slate-500 cursor-pointer hover:text-black"
          >
            <Icon
              class="w-6 h-6"
              icon="iconamoon:profile-circle"
            />
            <span class="hidden lg:block">Profile</span>
          </RouterLink>
        </li>

        <li class="h-7">
          <IconButton
            icon="ion:log-out-outline"
            color="red"
            @click="isLogoutModalOpen = true"
          />
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
      v-model="isAuthModalOpen"
      :initial-type="authModalType"
    />
    <LogoutModal v-model="isLogoutModalOpen" />
  </header>
</template>
