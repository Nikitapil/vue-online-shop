import { useApiMethod } from '@/api/useApiMethod';

import { api } from '@/api/apiInstance';

import type { UpdateProductBody } from '@/api/swagger/data-contracts';

export const useEditProduct = () => {
  const { call: editProductApi, isLoading } = useApiMethod(api.editProduct);

  const editProduct = async (data: UpdateProductBody) => {
    const product = await editProductApi(data);
    return product;
  };

  return {
    isLoading,
    editProduct
  };
};
