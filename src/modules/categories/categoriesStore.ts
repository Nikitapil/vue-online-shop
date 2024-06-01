import { defineStore } from 'pinia';
import { api } from '@/api/apiInstance';
import { toast } from 'vue3-toastify';
import type { CategoryReturnDto, UpdateCategoryDto } from '@/api/swagger/data-contracts';
import { ref } from 'vue';
import { useApiMethod } from '@/api/useApiMethod';

export const useCategoriesStore = defineStore('cotegories', () => {
  const categories = ref<CategoryReturnDto[]>([]);

  const { call: getCategoriesApi, isLoading: isCategoriesLoading } = useApiMethod(api.getCategories);

  const createCategory = async (name: string) => {
    try {
      const category = await api.createCategory({ name });
      return category;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    }
  };

  const updateCategory = async (data: UpdateCategoryDto) => {
    try {
      const category = await api.updateCategory(data);
      return category;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await api.deleteCategory(id);
      await getCategories();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    }
  };

  const getCategories = async () => {
    const response = await getCategoriesApi();
    categories.value = response || [];
  };

  return { categories, isCategoriesLoading, createCategory, updateCategory, deleteCategory, getCategories };
});
