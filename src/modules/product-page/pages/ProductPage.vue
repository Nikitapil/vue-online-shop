<script setup lang="ts">
import { useProductPageStore } from '@/modules/product-page/useProductPageStore';
import { onMounted, ref } from 'vue';
import ProductDetails from '@/components/products/ProductDetails.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import { Icon } from '@iconify/vue';
import { useProduct } from '@/composables/useProduct';
import { storeToRefs } from 'pinia';
import IconButton from '@/components/ui/IconButton.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import { ERoutesName } from '@/router/index';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useProductPageStore();

const { product: productFromStore } = storeToRefs(store);

const product = useProduct(productFromStore);

const isDeleteModalOpened = ref(false);

const onDeleteProduct = async () => {
  await store.deleteProduct();
  isDeleteModalOpened.value = false;
};

onMounted(() => {
  store.init();
});
</script>

<template>
  <div>
    <EmptyStateCentered v-if="store.isProductLoading">
      <RoundedLoader />
    </EmptyStateCentered>

    <EmptyStateCentered
      v-else-if="!store.product"
      class="flex-col gap-2"
    >
      <h2 class="text-2xl font-bold">Product not found</h2>
      <Icon
        icon="nonicons:not-found-16"
        color="gray"
        width="100"
        height="100"
      />
    </EmptyStateCentered>

    <div v-else-if="product">
      <div class="flex w-full justify-end gap-3">
        <IconButton
          v-if="product.canEdit"
          :icon="'bx:edit'"
          color="#918aa0"
          @click="router.push({ name: ERoutesName.EDIT_PRODUCT, params: { id: store.product.id } })"
        />
        <IconButton
          v-if="product.canDelete"
          icon="bi:trash-fill"
          color="red"
          @click="isDeleteModalOpened = true"
        />
      </div>
      <ProductDetails :product="product" />
      <ConfirmModal
        v-model="isDeleteModalOpened"
        title="Do you want to delete this product?"
        :is-loading="store.isDeleteInProgress"
        @confirm="onDeleteProduct"
      />
    </div>
  </div>
</template>

<style></style>
