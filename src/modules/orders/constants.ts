import { OrderReturnDtoStatusEnum } from '@/api/swagger/data-contracts';
import type { ISelectOptions } from '@/components/ui/AppSelect/types';

export const orderStatusOptionsByStatus = {
  created: {
    name: OrderReturnDtoStatusEnum.CREATED,
    value: OrderReturnDtoStatusEnum.CREATED
  },
  inprogress: {
    name: OrderReturnDtoStatusEnum.INPROGRESS,
    value: OrderReturnDtoStatusEnum.INPROGRESS
  },
  closed: {
    name: OrderReturnDtoStatusEnum.CLOSED,
    value: OrderReturnDtoStatusEnum.CLOSED
  },
  canceled: {
    name: OrderReturnDtoStatusEnum.CANCELED,
    value: OrderReturnDtoStatusEnum.CANCELED
  }
};

export const orderStatusOptions: ISelectOptions<OrderReturnDtoStatusEnum>[] = Object.values(orderStatusOptionsByStatus);
