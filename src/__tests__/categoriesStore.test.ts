import { createPinia, setActivePinia } from 'pinia';
import { vi } from 'vitest';
import { useCategoriesStore } from '../modules/categories/categoriesStore';
import { api } from '../api/apiInstance';
import { mockCategory } from './mocks/category-mock';

describe('CategoriesStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Should be an empty array value for categories by default', () => {
    const store = useCategoriesStore();

    expect(store.categories).toEqual([]);
  });

  test('Should work create category correctly', async () => {
    api.createCategory = async () => mockCategory;

    const store = useCategoriesStore();

    const category = await store.createCategory('');

    expect(category).toEqual(mockCategory);
  });

  test('Should work update category correctly', async () => {
    api.updateCategory = async () => mockCategory;

    const store = useCategoriesStore();

    const category = await store.updateCategory({});

    expect(category).toEqual(mockCategory);
  });

  test('Should work getCategories correctly', async () => {
    const categories = [mockCategory];
    api.getCategories = async () => categories;

    const store = useCategoriesStore();

    await store.getCategories();

    expect(store.categories).toEqual(categories);
  });

  test('Should set default categories value as [] if api error', async () => {
    api.getCategories = async () => {
      throw new Error();
    };

    const store = useCategoriesStore();

    await store.getCategories();

    expect(store.categories).toEqual([]);
  });

  test('Should work delete category correctly', async () => {
    const categories = [mockCategory];
    api.deleteCategory = async () => {};

    const spyGetCategories = vi.spyOn(api, 'getCategories').mockImplementation(() => categories);

    const store = useCategoriesStore();

    await store.deleteCategory('');

    expect(store.categories).toEqual(categories);
    expect(spyGetCategories).toHaveBeenCalledTimes(1);
  });
});
