<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

import { useCartStore } from '../cartStore';
import { useAuthStore } from '@/modules/auth/authStore';

import AuthModal from '../../auth/components/AuthModal.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useCartStore();
const authStore = useAuthStore();

const props = withDefaults(
  defineProps<{
    productId: string;
    needToNotify?: boolean;
  }>(),
  {
    needToNotify: false
  }
);

const isShowAuthModal = ref(false);

const addToCart = async () => {
  if (!authStore.isAuthenticated) {
    toast.info(t('need_login'), { position: 'top-center' });
    isShowAuthModal.value = true;
    return;
  }

  const isAdded = await store.addToCart(props.productId);

  if (isAdded && props.needToNotify) {
    toast.success('Added to cart');
  }
};
</script>

<template>
  <slot
    :clickHandler="addToCart"
    :isLoading="store.isCartLoading || store.isChangeInCartCountInProgress"
  />

  <Teleport to="body">
    <AuthModal v-model="isShowAuthModal" />
  </Teleport>
</template>
