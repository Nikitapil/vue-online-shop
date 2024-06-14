export const product = {
  id: 'product',
  name: 'product-name',
  description: 'product-description',
  imageUrl: '/qwe',
  price: 123,
  priceWithDiscount: 123,
  categoryId: '1234',
  createdAt: '2023-11-29T17:09:20.867Z',
  updatedAt: '2023-11-29T17:09:20.867Z',
  category: {
    id: '5678',
    name: 'category',
    createdAt: '2023-11-29T17:09:20.867Z',
    updatedAt: '2023-11-29T17:09:20.867Z'
  },
  isInFavorites: false,
  rating: null,
  canAddReview: true,
  canEdit: true,
  canDelete: true,
  canAddToFavourites: true,
  canEditProductDiscount: true,
  discount: null
};

export const productsResponseMock = {
  products: [product],
  totalCount: 1
};
