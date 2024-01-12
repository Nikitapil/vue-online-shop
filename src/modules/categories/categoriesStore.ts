import { defineStore } from 'pinia';
import { api } from '@/api/apiInstance';
import { toast } from 'vue3-toastify';
import type { CategoryReturnDto, UpdateCategoryDto } from '@/api/swagger/data-contracts';
import { ref } from 'vue';

export const useCategoriesStore = defineStore('cotegories', () => {
  const categories = ref<CategoryReturnDto[]>([]);

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
      const response = await api.deleteCategory(id);
      return response;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    }
  };

  const getCategories = async () => {
    try {
      categories.value = await api.getCategories();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
    }
  };

  return { categories, createCategory, updateCategory, deleteCategory, getCategories };
});
