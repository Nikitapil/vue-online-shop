import { useApiMethod } from '@/api/useApiMethod';

import { api } from '@/api/apiInstance';

import type { CreateProductBody } from '@/api/swagger/data-contracts';

export const useCreateProduct = () => {
  const { call: createProductApi, isLoading } = useApiMethod(api.createProduct);

  const createProduct = async (data: CreateProductBody) => {
    const product = await createProductApi(data);
    return product;
  };

  return {
    isLoading,
    createProduct
  };
};
