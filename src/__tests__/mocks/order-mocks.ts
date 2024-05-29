export const mockOrder = {
  id: '765e49e6-f7fc-41da-945e-a19729dc1603',
  userId: '15865078-e4a1-4524-acd8-40b6208d5895',
  address: 'dfsddsfcdfvwegffbkjdfh ghg dogfhdfs ioduf hdugids ii dpgpiuhdwedwed',
  phone: '12345',
  comment: '',
  createdAt: '2024-05-29T18:06:07.578Z',
  updatedAt: '2024-05-29T18:06:07.578Z',
  price: 76000,
  status: 'CREATED',
  cancelReason: null,
  user: {
    id: '15865078-e4a1-4524-acd8-40b6208d5895',
    email: 'test@test.test',
    name: 'Nikita',
    roles: ['ADMIN'],
    cartId: '94a89b6b-8e6b-4086-8c0f-002a8baf9293',
    address: 'dfsddsfcdfvwegffbkjdfh ghg dogfhdfs ioduf hdugids ii dpgpiuhdwedwed',
    phone: '12345'
  },
  productsInOrder: [
    {
      id: 'e1d2acae-6b1c-48a1-ae2a-3de687772359',
      orderId: '765e49e6-f7fc-41da-945e-a19729dc1603',
      productId: '59ecbd14-5b42-4a79-ace2-15c904ba7017',
      count: 1,
      product: {
        id: '59ecbd14-5b42-4a79-ace2-15c904ba7017',
        name: 'dcsdcdfv',
        description: 'dfvdsfv',
        imageUrl: '/products/131b7567-2945-42af-bc25-badf6b4e764a.jpg',
        price: 80000,
        categoryId: '5294e43c-a1e0-479d-b9ea-616da217bf5e',
        createdAt: '2024-02-04T18:32:30.122Z',
        updatedAt: '2024-04-20T17:20:18.465Z',
        category: {
          id: '5294e43c-a1e0-479d-b9ea-616da217bf5e',
          name: 'Test category',
          createdAt: '2024-01-27T22:21:34.468Z',
          updatedAt: '2024-01-27T22:21:34.468Z'
        },
        discount: {
          id: '41872783-39f7-407b-841a-62a129d650b3',
          percentage: 5,
          name: 'five percenter'
        },
        isInFavorites: true,
        priceWithDiscount: 76000,
        canAddReview: false,
        canEdit: false,
        canDelete: false,
        canEditProductDiscount: false,
        canAddToFavourites: false,
        rating: null
      }
    }
  ],
  canCancel: true,
  canSetInProgress: true,
  canSetCreated: true,
  canSetClosed: true
};
