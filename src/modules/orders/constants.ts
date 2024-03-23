import { OrderReturnDtoStatusEnum } from '@/api/swagger/data-contracts';
import type { ISelectOptions } from '@/components/ui/AppSelect/types';

export const orderStatusOptions: ISelectOptions<OrderReturnDtoStatusEnum>[] = [
  {
    name: OrderReturnDtoStatusEnum.CREATED,
    value: OrderReturnDtoStatusEnum.CREATED
  },
  {
    name: OrderReturnDtoStatusEnum.INPROGRESS,
    value: OrderReturnDtoStatusEnum.INPROGRESS
  },
  {
    name: OrderReturnDtoStatusEnum.CLOSED,
    value: OrderReturnDtoStatusEnum.CLOSED
  },
  {
    name: OrderReturnDtoStatusEnum.CANCELED,
    value: OrderReturnDtoStatusEnum.CANCELED
  }
];
