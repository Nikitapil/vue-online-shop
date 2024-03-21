import { OrderReturnDtoStatusEnum } from '../../../api/swagger/data-contracts';
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
