<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput/AppInput.vue';
import { ref, watch } from 'vue';
import { useCategoriesStore } from '@/modules/categories/categoriesStore';
import { useForm } from 'vee-validate';
import CategoriesList from '@/modules/categories/components/CategoriesList.vue';
import type { CategoryReturnDto } from '@/api/swagger/data-contracts';

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
  await store.getCategories();
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
      categoryName.value = '';
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
  }
});
</script>

<template>
  <Modal v-model="isOpen">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Manage categories</h1>
      <AppButton
        :disabled="isLoading"
        @click="openCategoryForm"
      >
        Create new
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
        placeholder="Name:"
        label="Category name:"
        rules="required"
        :disabled="isLoading"
      />
      <div class="flex gap-3">
        <AppButton
          appearance="danger"
          :disabled="isLoading"
          @click="closeCategoryForm"
        >
          Cancel
        </AppButton>
        <AppButton
          appearance="success"
          type="submit"
          :disabled="isLoading"
        >
          Save
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
