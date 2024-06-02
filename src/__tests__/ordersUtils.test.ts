import { getAvailableStatusOptions, getStatusColor } from '../modules/orders/helpers/utils';
import { OrderStatusEnum } from '../api/swagger/data-contracts';
import { mockOrder } from './mocks/order-mocks';
import { orderStatusOptionsByStatus } from '../modules/orders/constants';

describe('orders utils tests', () => {
  test('should return correct colors for statuses', () => {
    const greenStatus = getStatusColor(OrderStatusEnum.CREATED);
    const blueStatus = getStatusColor(OrderStatusEnum.INPROGRESS);
    const darkStatus = getStatusColor(OrderStatusEnum.CLOSED);
    const redStatus = getStatusColor(OrderStatusEnum.CANCELED);
    const defaultStatus = getStatusColor('');

    expect(greenStatus).toBe('#4ade80');
    expect(blueStatus).toBe('#60a5fa');
    expect(darkStatus).toBe('#000');
    expect(redStatus).toBe('#fa3c3c');
    expect(defaultStatus).toBe('#000');
  });

  test('should work getAvailableStatusOptions correctly', () => {
    const order = { ...mockOrder };

    const options = getAvailableStatusOptions(order);

    expect(options).toEqual(Object.values(orderStatusOptionsByStatus));
  });
});
