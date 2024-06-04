<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';

import type { CreateProductBody } from '@/api/swagger/data-contracts';
import type { IProductForm } from '@/modules/product-form/types';
import type { ContentSwitcherOption } from '@/components/ui/ContentSwitcher/types';

import ContentSwitcher from '@/components/ui/ContentSwitcher/ContentSwitcher.vue';
import Uploader from '@/components/ui/Uploader.vue';
import CategoriesSelect from '@/modules/categories/components/CategoriesSelect.vue';
import AppButton from '@/components/ui/AppButton.vue';
import CategoriesModal from '@/modules/categories/components/CategoriesModal.vue';
import AppInput from '@/components/ui/AppInput/AppInput.vue';
import ProductDetails from '@/components/products/ProductDetails.vue';
import AppTextarea from '@/components/ui/AppInput/AppTextarea.vue';

const { t } = useI18n();

const { validate } = useForm();

const props = withDefaults(
  defineProps<{
    isLoading: boolean;
    title: string;
    initialValues?: IProductForm | null;
  }>(),
  {
    initialValues: null
  }
);

const emit = defineEmits<{
  save: [CreateProductBody];
}>();

const isCategoriesModalOpened = ref(false);
const currentView = ref('form');

const product = ref<IProductForm>({
  name: '',
  description: '',
  categoryId: '',
  price: '',
  image: null
});

const switcherOptions = computed<ContentSwitcherOption[]>(() => [
  {
    name: t('product_form'),
    value: 'form'
  },
  {
    name: t('product_preview'),
    value: 'preview'
  }
]);

const productReview = computed(() => ({
  ...product.value,
  price: +product.value.price,
  imageUrl: product.value.image ? URL.createObjectURL(product.value.image) : ''
}));

const submitHandler = async () => {
  const { valid } = await validate();

  if (valid && product.value.image) {
    emit('save', {
      ...product.value,
      price: +product.value.price,
      image: product.value.image
    });
  }
};

onMounted(() => {
  if (props.initialValues) {
    product.value = { ...props.initialValues };
  }
});
</script>

<template>
  <div class="max-w-full overflow-auto">
    <ContentSwitcher
      v-model="currentView"
      class="mb-3"
      :options="switcherOptions"
    />
  </div>

  <ProductDetails
    v-if="currentView === 'preview'"
    :product="productReview"
  />

  <form
    v-else
    class="flex flex-col gap-3"
    @submit.prevent="submitHandler"
  >
    <h1 class="text-2xl font-bold text-center">{{ title }}</h1>

    <AppInput
      id="name"
      v-model="product.name"
      name="name"
      rules="required"
      :placeholder="$t('title')"
      :label="$t('product_title')"
      :disabled="isLoading"
    />

    <AppTextarea
      id="description"
      v-model="product.description"
      name="description"
      rules="required"
      :placeholder="$t('description')"
      :label="$t('product_description')"
      :disabled="isLoading"
    />

    <AppInput
      id="price"
      v-model="product.price"
      name="price"
      rules="required"
      mask="numberMask"
      :placeholder="$t('price')"
      :label="$t('product_price')"
      :disabled="isLoading"
    />

    <div class="flex gap-3">
      <div class="flex-1">
        <CategoriesSelect
          v-model="product.categoryId"
          rules="required"
          :disabled="isLoading"
          :full="true"
        />
      </div>

      <AppButton
        appearance="secondary"
        :disabled="isLoading"
        @click="isCategoriesModalOpened = true"
      >
        {{ $t('manage_categories') }}
      </AppButton>
    </div>

    <Uploader
      id="image"
      v-model="product.image"
      name="image"
      rules="requiredObj"
      :label="$t('upload_product_image')"
      :disabled="isLoading"
    />

    <div class="self-end">
      <AppButton
        appearance="primary"
        type="submit"
        :disabled="isLoading"
      >
        {{ $t('save') }}
      </AppButton>
    </div>
  </form>

  <CategoriesModal v-model="isCategoriesModalOpened" />
</template>
