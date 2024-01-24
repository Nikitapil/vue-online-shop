<script setup lang="ts">
import AppInput from '@/components/ui/AppInput/AppInput.vue';
import { computed, onMounted, ref } from 'vue';
import CategoriesModal from '@/modules/categories/components/CategoriesModal.vue';
import AppButton from '@/components/ui/AppButton.vue';
import CategoriesSelect from '@/modules/categories/components/CategoriesSelect.vue';
import { useForm } from 'vee-validate';
import Uploader from '@/components/ui/Uploader.vue';
import type { CreateProductBody } from '@/api/swagger/data-contracts';
import type { IProductForm } from '@/modules/product-form/types';
import ContentSwitcher from '@/components/ui/ContentSwitcher/ContentSwitcher.vue';
import type { ContentSwitcherOption } from '@/components/ui/ContentSwitcher/types';
import ProductDetails from '@/components/products/ProductDetails.vue';

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

const switcherOptions: ContentSwitcherOption[] = [
  {
    name: 'Product form',
    value: 'form'
  },
  {
    name: 'Product preview',
    value: 'preview'
  }
];

const isCategoriesModalOpened = ref(false);
const currentView = ref('form');

const product = ref<IProductForm>({
  name: '',
  description: '',
  categoryId: '',
  price: '',
  image: null
});

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
  <ContentSwitcher
    v-model="currentView"
    class="mb-3"
    :options="switcherOptions"
  />
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
      placeholder="Title"
      label="Product title"
      rules="required"
      :disabled="isLoading"
    />
    <AppInput
      id="description"
      v-model="product.description"
      name="description"
      placeholder="Description"
      label="Product description"
      rules="required"
      :disabled="isLoading"
    />
    <AppInput
      id="price"
      v-model="product.price"
      name="price"
      placeholder="Price"
      label="Product price"
      rules="required"
      mask="numberMask"
      :disabled="isLoading"
    />
    <div class="flex gap-3">
      <div class="flex-1">
        <CategoriesSelect
          v-model="product.categoryId"
          rules="required"
          :disabled="isLoading"
        />
      </div>
      <AppButton
        appearance="secondary"
        :disabled="isLoading"
        @click="isCategoriesModalOpened = true"
      >
        Manage categories
      </AppButton>
    </div>
    <Uploader
      id="image"
      v-model="product.image"
      label="Upload product image"
      name="image"
      rules="requiredObj"
      :disabled="isLoading"
    />
    <div class="self-end">
      <AppButton
        appearance="primary"
        type="submit"
        :disabled="isLoading"
      >
        Create
      </AppButton>
    </div>
  </form>
  <CategoriesModal v-model="isCategoriesModalOpened" />
</template>
