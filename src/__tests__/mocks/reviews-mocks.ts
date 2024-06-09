export const reviewMock1 = {
  id: '7dd44bad-cd68-41dd-a55b-ffe39aa7277d',
  rating: 3,
  text: 'very good product',
  userId: 'ccd60ad5-9a05-4960-aec3-b7f5e1b33782',
  productId: '59ecbd14-5b42-4a79-ace2-15c904ba7017',
  createdAt: '2024-05-06T17:46:58.547Z',
  updatedAt: '2024-05-06T17:46:58.547Z',
  authorName: 'Nikita',
  canDelete: true
};

export const reviewMock2 = {
  id: '4af804b6-b176-49db-9b01-b7beb164d5b3',
  rating: 5,
  text: 'best phone',
  userId: '0fdea4ea-0e5a-4a83-8515-dc89d9188b0d',
  productId: '59ecbd14-5b42-4a79-ace2-15c904ba7017',
  createdAt: '2024-03-10T14:21:32.052Z',
  updatedAt: '2024-03-10T14:21:32.052Z',
  authorName: 'Nikita2',
  canDelete: true
};

export const getReviewsMock = {
  reviews: [reviewMock1, reviewMock2],
  totalCount: 2
};
