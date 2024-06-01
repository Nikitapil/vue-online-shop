<script setup lang="ts">
import { ref, watch } from 'vue';
import { useForm } from 'vee-validate';

import { useCategoriesStore } from '@/modules/categories/categoriesStore';

import type { CategoryReturnDto } from '@/api/swagger/data-contracts';

import Modal from '@/components/ui/Modal.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput/AppInput.vue';
import CategoriesList from '@/modules/categories/components/CategoriesList.vue';

const isOpen = defineModel<boolean>();

const store = useCategoriesStore();

const { validate } = useForm();

const categoryName = ref('');
const isCategoryFormOpened = ref(false);
const isLoading = ref(false);
const chosenCategory = ref<CategoryReturnDto | null>(null);

const openCategoryForm = () => {
  isCategoryFormOpened.value = true;
  categoryName.value = chosenCategory.value?.name || '';
};

const closeCategoryForm = () => {
  isCategoryFormOpened.value = false;
  categoryName.value = '';
  chosenCategory.value = null;
};

const onDeleteCategory = async (category: CategoryReturnDto) => {
  isLoading.value = true;
  await store.deleteCategory(category.id);
  isLoading.value = false;
};

const onSaveCategory = async () => {
  const { valid } = await validate();

  if (valid) {
    isLoading.value = true;

    const category = chosenCategory.value
      ? await store.updateCategory({ id: chosenCategory.value.id, name: categoryName.value })
      : await store.createCategory(categoryName.value);

    if (category) {
      closeCategoryForm();
      await store.getCategories();
    }

    isLoading.value = false;
  }
};

const onClickEdit = (category: CategoryReturnDto) => {
  chosenCategory.value = category;
  openCategoryForm();
};

watch(isOpen, () => {
  if (isOpen.value && !store.categories.length) {
    isLoading.value = true;
    store.getCategories();
    isLoading.value = false;
  } else if (!isOpen.value) {
    closeCategoryForm();
  }
});
</script>

<template>
  <Modal
    v-model="isOpen"
    :prevent-close="isLoading"
  >
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">{{ $t('manage_categories') }}</h1>

      <AppButton
        v-if="!isCategoryFormOpened"
        :disabled="isLoading"
        @click="openCategoryForm"
      >
        {{ $t('create_new') }}
      </AppButton>
    </div>

    <form
      v-if="isCategoryFormOpened"
      class="flex flex-col justify-center items-end gap-3 mt-10"
      @submit.prevent="onSaveCategory"
    >
      <AppInput
        id="category-name"
        v-model="categoryName"
        name="category-name"
        :placeholder="$t('item_name_placeholder')"
        :label="`${$t('category_name')}:`"
        rules="required"
        :disabled="isLoading"
      />

      <div class="flex gap-3">
        <AppButton
          appearance="danger"
          :disabled="isLoading"
          @click="closeCategoryForm"
        >
          {{ $t('cancel') }}
        </AppButton>
        <AppButton
          appearance="success"
          type="submit"
          :disabled="isLoading"
        >
          {{ $t('save') }}
        </AppButton>
      </div>
    </form>

    <div
      v-else
      class="mt-5"
    >
      <CategoriesList
        :is-loading="isLoading"
        :categories="store.categories"
        @edit="onClickEdit"
        @delete="onDeleteCategory"
      />
    </div>
  </Modal>
</template>
