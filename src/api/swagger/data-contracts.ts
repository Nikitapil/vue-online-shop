/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RegisterDto {
  /** user email */
  email: string;
  /** user password */
  password: string;
  /** user name */
  name: string;
  /** user address */
  address?: string;
  /** user phone */
  phone?: string;
}

export interface UserReturnDto {
  /** user id */
  id: string;
  /** user email */
  email: string;
  /** user name */
  name: string;
  /** user role */
  roles: ('ADMIN' | 'USER')[];
  /** user cartId */
  cartId: string;
}

export interface AuthResponseDto {
  user: UserReturnDto;
  accessToken: string;
}

export interface LoginDto {
  /** user email */
  email: string;
  /** user password */
  password: string;
}

export interface SuccessMessageDto {
  /** message about success response */
  message: string;
}

export interface UpdateUserDataDto {
  /** user email */
  email: string;
  /** user name */
  name: string;
  /** user address */
  address?: string;
  /** user phone */
  phone?: string;
}

export interface CreateProductBody {
  /** Product name */
  name: string;
  /** Product description */
  description: string;
  /** Product category id */
  categoryId: string;
  /** Product price */
  price: number;
  /**
   * product image
   * @format binary
   */
  image: File;
}

export interface CategoryReturnDto {
  /** category id */
  id: string;
  /** category name */
  name: string;
  /**
   * category created at date
   * @format date-time
   */
  createdAt: string;
  /**
   * category updated at date
   * @format date-time
   */
  updatedAt: string;
}

export interface ProductReturnDto {
  /** product id */
  id: string;
  /** product name */
  name: string;
  /** product description */
  description: string;
  /** product imageUrl */
  imageUrl: string;
  /** product price */
  price: number;
  /** product category id */
  categoryId: string;
  /** product created at Date */
  createdAt: string;
  /** product updated at Date */
  updatedAt: string;
  /** product category */
  category: CategoryReturnDto;
  /** in favorites flag */
  isInFavorites: boolean;
  /** Product rating */
  rating: number | null;
  /** Can add review flag */
  canAddReview: boolean;
  /** Can edit product flag */
  canEdit: boolean;
  /** Can delete product flag */
  canDelete: boolean;
}

export interface UpdateProductBody {
  /** Product id */
  id: string;
  /** Product name */
  name: string;
  /** Product description */
  description: string;
  /** Product category id */
  categoryId: string;
  /** Product price */
  price: number;
  /**
   * product image
   * @format binary
   */
  image: File;
}

export interface GetProductsReturnDto {
  /** products list */
  products: ProductReturnDto[];
  /** total count of products with current filter */
  totalCount: number;
}

export interface ToggleFavoritesDto {
  /** product id */
  productId: string;
}

export interface ToggleFavoriteReturnDto {
  /** Favorite product state */
  isInFavorites: boolean;
}

export interface CreateCategoryDto {
  /** Category name */
  name: string;
}

export interface UpdateCategoryDto {
  /** Category name */
  name: string;
  /** Category id */
  id: string;
}

export interface AddToCartDto {
  /** id of product that will be added to cart */
  productId: string;
}

export interface ProductInCartReturnDto {
  /** product in cart id */
  id: string;
  /** product in cart product id */
  productId: string;
  /** product in cart cart id */
  cartId: string;
  /** product in cart count */
  count: number;
  /** product in cart product value */
  product: ProductReturnDto;
}

export interface CartReturnDto {
  /** cart id */
  id: string;
  /** cart price */
  price: number;
  /** products in cart */
  productInCart: ProductInCartReturnDto[];
  /** Sum of tax */
  taxSum: number;
}

export type RemoveFromCartDto = object;

export interface CreateOrderDto {
  /** user address */
  address: string;
  /** user phone */
  phone: string;
  /** order comment */
  comment?: string;
}

export type CreateOrderReturnDto = object;

export interface ProductInOrderReturnDto {
  /** product in order id */
  id: string;
  /** product in order product id */
  productId: string;
  /** product in order order id */
  orderId: string;
  /** product in cart count */
  count: number;
  /** product in cart product value */
  product: ProductReturnDto;
}

export interface OrderReturnDto {
  /** order id */
  id: string;
  /** order user id */
  userId: string;
  /** order address */
  address: string;
  /** order phone */
  phone: string;
  /** order comment */
  comment?: string | null;
  /** order created date */
  createdAt: string;
  /** order updated at date */
  updatedAt: string;
  /** order price */
  price: number;
  /** order status */
  status: 'CREATED' | 'INPROGRESS' | 'CANCELED' | 'CLOSED';
  /** order products */
  productsInOrder: ProductInOrderReturnDto[];
  /** order cancel reason */
  cancelReason: string | null;
}

export interface GetOrdersReturnDto {
  /** Orders list */
  orders: OrderReturnDto[];
  /** total count of orders with current filters */
  totalCount: number;
}

export interface UpdateOrderStatusDto {
  /** Order id */
  id: string;
  /** New order status */
  status: 'CREATED' | 'INPROGRESS' | 'CANCELED' | 'CLOSED';
  /** cance reason if status is canceled */
  cancelReason?: string | null;
}

export interface CreateReviewDto {
  /** product id */
  productId: string;
  /** review text */
  text: string;
  /** review rating */
  rating: number;
}

export interface ProductReviewReturnDto {
  /** review id */
  id: string;
  /** review rating */
  rating: number;
  /** review text */
  text: string;
  /** user id */
  userId: string;
  /** review product id */
  productId: string;
  /** review created date */
  createdAt: string;
  /** review updated date */
  updatedAt: string;
  /** review author name */
  authorName: string;
  /** review can delete flag */
  canDelete: boolean;
}

export interface GetProductsReviewsReturnDto {
  /** Product reviews */
  reviews: ProductReviewReturnDto[];
  /** Total count of product reviews */
  totalCount: number;
}

export interface GetProductsParams {
  /** Page number */
  page: number;
  /** Limit number */
  limit: number;
  /** products categoryId */
  categoryId?: string | null;
  /** price sorting direction */
  priceSorting?: 'asc' | 'desc' | null;
  /** search query */
  search?: string | null;
}

export interface GetFavoriteProductsParams {
  /** Page number */
  page: number;
  /** Limit number */
  limit: number;
}

export interface GetOrdersParams {
  /** Page number */
  page: number;
  /** Limit number */
  limit: number;
  /** orders by param */
  order?: 'updatedAt' | 'createdAt' | null;
  /** orders status */
  status?: 'CREATED' | 'INPROGRESS' | 'CANCELED' | 'CLOSED' | null;
}

export interface GetReviewsParams {
  /** Page number */
  page: number;
  /** Limit number */
  limit: number;
  /** product id */
  productId: string;
}
