<script setup lang="ts">
import ProductReviewsList from '../components/ProductReviewsList/ProductReviewsList.vue';
import { useProductPageStore } from '@/modules/product-page/useProductPageStore';
import { onMounted, ref } from 'vue';
import ProductDetails from '@/components/products/ProductDetails.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import { useProduct } from '@/composables/useProduct';
import { storeToRefs } from 'pinia';
import IconButton from '@/components/ui/IconButton.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import { ERoutesName } from '@/router';
import { useRouter } from 'vue-router';
import ProductNotFound from '@/components/products/ProductNotFound.vue';
import ToggleFavouritesButton from '@/widgets/ToggleFavouriteButton/ToggleFavouritesButton.vue';
import AddToCart from '@/modules/cart/components/AddToCart.vue';
import AppButton from '@/components/ui/AppButton.vue';

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

    <ProductNotFound v-else-if="!store.product" />

    <div v-else-if="product">
      <div class="flex w-full justify-end gap-3">
        <AddToCart
          v-slot="{ clickHandler }"
          :product-id="product.id"
          need-to-notify
        >
          <AppButton
            appearance="secondary"
            @click="clickHandler"
          >
            Add to cart +
          </AppButton>
        </AddToCart>
        <ToggleFavouritesButton
          v-if="productFromStore?.canAddToFavourites"
          v-model="productFromStore"
        />
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
      <ProductDetails
        class="mb-5"
        :product="product"
      />
      <ProductReviewsList
        :product-id="product.id"
        :can-add-review="product.canAddReview"
      />
      <ConfirmModal
        v-model="isDeleteModalOpened"
        title="Do you want to delete this product?"
        :is-loading="store.isDeleteInProgress"
        @confirm="onDeleteProduct"
      />
    </div>
  </div>
</template>
../components/ProductReviewsList/ProductReviewForm.vue
