<script setup lang="ts">
import { ref } from 'vue';

import { ERoutesName } from '@/router';
import { EAuthModalTypes } from '@/domain/components';

import { Icon } from '@iconify/vue';
import IconButton from '@/components/ui/IconButton.vue';
import LogoutModal from '@/modules/auth/components/LogoutModal.vue';
import HorizontalLoader from '@/components/ui/loaders/HorizontalLoader.vue';
import AuthModal from '@/modules/auth/components/AuthModal.vue';
import AppButton from '@/components/ui/AppButton.vue';
import Cart from '@/modules/cart/components/Cart.vue';
import LinkWithIcon from '@/components/ui/LinkWithIcon.vue';

const props = defineProps<{
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  isAdmin: boolean;
}>();

const isAuthModalOpen = ref(false);
const isLogoutModalOpen = ref(false);
const authModalType = ref<EAuthModalTypes>(EAuthModalTypes.LOGIN);

const openAuthModal = (type: EAuthModalTypes) => {
  authModalType.value = type;
  isAuthModalOpen.value = true;
};
</script>

<template>
  <header class="flex flex-wrap gap-3 justify-between items-center border-b border-b-slate-300 px-8 py-6">
    <RouterLink
      :to="{ name: ERoutesName.HOME }"
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
      data-testid="auth-loading"
    >
      <HorizontalLoader />
    </div>

    <nav v-else-if="isAuthenticated">
      <ul class="flex gap-3 flex-wrap xl:gap-5 items-center">
        <li
          v-if="props.isAdmin"
          data-testid="admin-link"
        >
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
            v-tooltip="$t('logout')"
            icon="ion:log-out-outline"
            color="red"
            data-testid="logout-button"
            @click="isLogoutModalOpen = true"
          />
        </li>
      </ul>
    </nav>

    <div
      v-else
      class="flex gap-3"
      data-testid="auth-block"
    >
      <AppButton
        class="bg-gray-400"
        data-testid="login-button"
        @click="openAuthModal(EAuthModalTypes.LOGIN)"
      >
        {{ $t('log_in') }}
      </AppButton>
      <AppButton
        class="bg-gray-400"
        appearance="secondary"
        data-testid="register-button"
        @click="openAuthModal(EAuthModalTypes.REGISTER)"
      >
        {{ $t('sign_up') }}
      </AppButton>
    </div>

    <AuthModal
      v-model="isAuthModalOpen"
      :initial-type="authModalType"
    />
    <LogoutModal v-model="isLogoutModalOpen" />
  </header>
</template>
