import { OrderStatusEnum } from '@/api/swagger/data-contracts';
import type { ISelectOptions } from '@/components/ui/AppSelect/types';

export const orderStatusOptionsByStatus = {
  created: {
    name: OrderStatusEnum.CREATED,
    value: OrderStatusEnum.CREATED
  },
  inprogress: {
    name: OrderStatusEnum.INPROGRESS,
    value: OrderStatusEnum.INPROGRESS
  },
  closed: {
    name: OrderStatusEnum.CLOSED,
    value: OrderStatusEnum.CLOSED
  },
  canceled: {
    name: OrderStatusEnum.CANCELED,
    value: OrderStatusEnum.CANCELED
  }
};

export const orderStatusOptions: ISelectOptions<OrderStatusEnum>[] = Object.values(orderStatusOptionsByStatus);
