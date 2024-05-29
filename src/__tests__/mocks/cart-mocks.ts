export const mockCart = {
  id: '94a89b6b-8e6b-4086-8c0f-002a8baf9293',
  productInCart: [
    {
      id: '680fef9c-3942-4b48-a553-3f6636f096e6',
      productId: '59ecbd14-5b42-4a79-ace2-15c904ba7017',
      cartId: '94a89b6b-8e6b-4086-8c0f-002a8baf9293',
      count: 1,
      product: {
        id: '59ecbd14-5b42-4a79-ace2-15c904ba7017',
        name: 'test product',
        description: 'test product description',
        imageUrl: 'asd',
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
  deliveryCost: 10000,
  price: 86000,
  taxSum: 4300
};
