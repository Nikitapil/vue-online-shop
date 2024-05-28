import { userMocks } from '@/__tests__/mocks/user-mocks';
import type { AuthResponseDto } from '@/api/swagger/data-contracts';

export const authMock: AuthResponseDto = {
  user: userMocks,
  accessToken: '1234567890'
};
