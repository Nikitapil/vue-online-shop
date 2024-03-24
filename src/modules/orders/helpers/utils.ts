import type { ISelectOptions } from '@/components/ui/AppSelect/types';
import { OrderReturnDtoStatusEnum, type OrderReturnDto } from '../../../api/swagger/data-contracts';
import { orderStatusOptionsByStatus } from '../constants';
export const getStatusColor = (status: OrderReturnDtoStatusEnum) => {
  switch (status) {
    case OrderReturnDtoStatusEnum.CREATED:
      return '#4ade80';
    case OrderReturnDtoStatusEnum.INPROGRESS:
      return '#60a5fa';
    case OrderReturnDtoStatusEnum.CLOSED:
      return '#000';
    case OrderReturnDtoStatusEnum.CANCELED:
      return '#fa3c3c';
    default:
      return '#000';
  }
};

export const getAvailableStatusOptions = (order: OrderReturnDto) => {
  const options = [
    order.canSetCreated && orderStatusOptionsByStatus.created,
    order.canSetInProgress && orderStatusOptionsByStatus.inprogress,
    order.canSetClosed && orderStatusOptionsByStatus.closed,
    order.canCancel && orderStatusOptionsByStatus.canceled
  ];

  return options.filter(Boolean) as ISelectOptions<OrderReturnDtoStatusEnum>[];
};
