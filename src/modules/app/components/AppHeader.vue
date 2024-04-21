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
import LinkWithIcon from '@/components/ui/LinkWithIcon.vue';

const props = defineProps<{
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  isAdmin: boolean;
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
  <header class="flex flex-wrap gap-3 justify-between items-center border-b border-b-slate-300 px-8 py-6">
    <RouterLink
      to="/"
      class="flex items-center gap-4"
    >
      <Icon
        class="w-10 h-10"
        icon="noto-v1:shopping-bags"
      />

      <div>
        <h2 class="text-xl font-bold uppercase">Shopper</h2>
        <p class="text-slate-500">{{ $t('best_shop_app') }}</p>
      </div>
    </RouterLink>

    <div
      v-if="isAuthLoading"
      class="pr-10"
    >
      <HorizontalLoader />
    </div>

    <nav v-else-if="isAuthenticated">
      <ul class="flex gap-3 flex-wrap xl:gap-5 items-center">
        <li v-if="props.isAdmin">
          <LinkWithIcon
            icon="mdi:settings-outline"
            label="Admin"
            :to="{ name: ERoutesName.FINANCE_SETTINGS }"
          />
        </li>

        <li>
          <Cart />
        </li>

        <li>
          <LinkWithIcon
            icon="mdi:heart-outline"
            label="Bookmarks"
            :to="{ name: ERoutesName.BOOKMARKS }"
          />
        </li>

        <li>
          <LinkWithIcon
            icon="lets-icons:order"
            label="Orders"
            :to="{ name: ERoutesName.ORDERS }"
          />
        </li>

        <li>
          <LinkWithIcon
            icon="iconamoon:discount"
            label="Discounts"
            :to="{ name: ERoutesName.DISCOUNTS }"
          />
        </li>

        <li>
          <LinkWithIcon
            icon="iconamoon:profile-circle"
            label="Profile"
            :to="{ name: ERoutesName.PROFILE }"
          />
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
