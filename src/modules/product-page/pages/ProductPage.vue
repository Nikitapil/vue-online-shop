<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useProductPageStore } from '@/modules/product-page/useProductPageStore';
import { useProduct } from '@/composables/useProduct';

import { ERoutesName } from '@/router';
import { NO_DISCOUNTS } from '@/domain/discounts';

import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import IconButton from '@/components/ui/IconButton.vue';
import EmptyStateCentered from '@/components/ui/EmptyStateCentered.vue';
import RoundedLoader from '@/components/ui/loaders/RoundedLoader.vue';
import ProductDetails from '@/components/products/ProductDetails.vue';
import ProductNotFound from '@/components/products/ProductNotFound.vue';
import ToggleFavouritesButton from '@/widgets/ToggleFavouriteButton/ToggleFavouritesButton.vue';
import AddToCart from '@/modules/cart/components/AddToCart.vue';
import AppButton from '@/components/ui/AppButton.vue';
import SetupDiscountModal from '@/modules/product-page/components/SetupDiscountModal/SetupDiscountModal.vue';
import ProductReviewsList from '../components/ProductReviewsList/ProductReviewsList.vue';

const router = useRouter();

const store = useProductPageStore();

const { product: productFromStore } = storeToRefs(store);

const product = useProduct(productFromStore);

const isDeleteModalOpened = ref(false);
const isSetupDiscountModalOpened = ref(false);

const currentDiscountId = computed(() => product.value?.discount?.id || NO_DISCOUNTS);

const onDeleteProduct = async () => {
  await store.deleteProduct();
  isDeleteModalOpened.value = false;
};

const onEditProductDiscount = async (discountId: string) => {
  await store.editProductDiscount(discountId);
  isSetupDiscountModalOpened.value = false;
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

    <ProductNotFound v-else-if="!product" />

    <div v-else>
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
            {{ $t('add_to_cart') }} +
          </AppButton>
        </AddToCart>

        <AppButton
          v-if="product.canEditProductDiscount"
          @click="isSetupDiscountModalOpened = true"
        >
          {{ $t('setup_discount') }}
        </AppButton>

        <ToggleFavouritesButton
          v-if="productFromStore?.canAddToFavourites"
          v-model="productFromStore"
        />

        <IconButton
          v-if="product.canEdit"
          :icon="'bx:edit'"
          color="#918aa0"
          @click="router.push({ name: ERoutesName.EDIT_PRODUCT, params: { id: product.id } })"
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
        :title="$t('delete_product_question')"
        :is-loading="store.isDeleteInProgress"
        @confirm="onDeleteProduct"
      />

      <SetupDiscountModal
        v-if="isSetupDiscountModalOpened"
        v-model="isSetupDiscountModalOpened"
        :current-discount-id="currentDiscountId"
        :is-edit-in-progress="store.isEditProductDiscountInProgress"
        @edit="onEditProductDiscount"
      />
    </div>
  </div>
</template>
