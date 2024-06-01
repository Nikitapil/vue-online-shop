import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useApiMethod } from '@/api/useApiMethod';

import type { CategoryReturnDto, UpdateCategoryDto } from '@/api/swagger/data-contracts';

import { api } from '@/api/apiInstance';

export const useCategoriesStore = defineStore('cotegories', () => {
  const categories = ref<CategoryReturnDto[]>([]);

  const { call: getCategoriesApi, isLoading: isCategoriesLoading } = useApiMethod(api.getCategories);
  const { call: createCategoryApi } = useApiMethod(api.createCategory);
  const { call: updateCategoryApi } = useApiMethod(api.updateCategory);
  const { call: deleteCategoryApi } = useApiMethod(api.deleteCategory);

  const createCategory = async (name: string) => {
    const category = await createCategoryApi({ name });
    return category;
  };

  const updateCategory = async (data: UpdateCategoryDto) => {
    const category = await updateCategoryApi(data);
    return category;
  };

  const getCategories = async () => {
    const response = await getCategoriesApi();
    categories.value = response || [];
  };

  const deleteCategory = async (id: string) => {
    await deleteCategoryApi(id);
    await getCategories();
  };

  return { categories, isCategoriesLoading, createCategory, updateCategory, deleteCategory, getCategories };
});
