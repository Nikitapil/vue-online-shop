<script setup lang="ts">
import AppInput from '@/components/ui/AppInput/AppInput.vue';
import { ref } from 'vue';
import CategoriesModal from '@/modules/categories/components/CategoriesModal.vue';
import AppButton from '@/components/ui/AppButton.vue';
import CategoriesSelect from '@/modules/categories/components/CategoriesSelect.vue';
import { useForm } from 'vee-validate';

const { validate } = useForm();

const isCategoriesModalOpened = ref(false);
const product = ref({
  name: '',
  description: '',
  categoryId: '',
  price: ''
});

const submitHandler = async () => {
  const { valid } = await validate();
  console.log(valid);
};
</script>

<template>
  <form
    class="flex flex-col gap-3"
    @submit.prevent="submitHandler"
  >
    <AppInput
      id="name"
      v-model="product.name"
      name="name"
      placeholder="Title"
      label="Product title"
      rules="required"
    />
    <AppInput
      id="description"
      v-model="product.description"
      name="description"
      placeholder="Description"
      label="Product description"
      rules="required"
    />
    <AppInput
      id="price"
      v-model="product.price"
      name="price"
      placeholder="Price"
      label="Product price"
      rules="required"
      mask="numberMask"
    />
    <div class="flex gap-3">
      <div class="flex-1">
        <CategoriesSelect
          v-model="product.categoryId"
          rules="required"
        />
      </div>
      <AppButton
        appearance="secondary"
        @click="isCategoriesModalOpened = true"
      >
        Manage categories
      </AppButton>
    </div>
    <div class="self-end">
      <AppButton
        appearance="primary"
        type="submit"
      >
        Create
      </AppButton>
    </div>
  </form>
  <CategoriesModal v-model="isCategoriesModalOpened" />
</template>
