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
  roles: UserReturnDtoRolesEnum[];
  /** user cartId */
  cartId: string;
  /** user address */
  address?: string | null;
  /** user phone */
  phone?: string | null;
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

export interface ChangePasswordDto {
  /** user old password */
  oldPassword: string;
  /** user new password */
  newPassword: string;
  /** user confirm password */
  confirmPassword: string;
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

export interface ProductDiscountReturnDto {
  /** discount id */
  id: string;
  /** discount name */
  name: string;
  /** discount name */
  percentage: string;
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
  /** product price with discount */
  priceWithDiscount: number;
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
  /** Can add to favourites */
  canAddToFavourites: boolean;
  /** Can add discount */
  canEditProductDiscount: boolean;
  /** Product discount */
  discount: ProductDiscountReturnDto | null;
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

export interface EditProductDiscountDto {
  /** discount id */
  discountId: string | null;
  /** product id */
  productId: string;
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
  /** Delivery cost */
  deliveryCost: number;
}

export interface RemoveFromCartDto {
  /** id of product that will be removed from cart */
  productInCartId: string;
}

export interface CreateOrderDto {
  /** user address */
  address: string;
  /** user phone */
  phone: string;
  /** order comment */
  comment?: string;
}

export enum OrderStatusEnum {
  CREATED = 'CREATED',
  INPROGRESS = 'INPROGRESS',
  CANCELED = 'CANCELED',
  CLOSED = 'CLOSED'
}

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
  status: OrderStatusEnum;
  /** order products */
  productsInOrder: ProductInOrderReturnDto[];
  /** can cancel */
  canCancel: boolean;
  /** can set order status in progress */
  canSetInProgress: boolean;
  /** can set order status to created */
  canSetCreated: boolean;
  /** can set order status to closed */
  canSetClosed: boolean;
  /** order user */
  user: UserReturnDto;
  /** order cancel reason */
  cancelReason: string | null;
}

export interface CreateOrderReturnDto {
  /** Order object */
  order: OrderReturnDto;
  /** updated cart after create order */
  cart: CartReturnDto;
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
  status: OrderStatusEnum;
  /** cancel reason if status is canceled */
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

export interface FinanceSettingsReturnDto {
  /** Tax setting */
  tax: number;
  /** Delivery cost */
  deliveryCost: number;
  /** Order price with free delivery */
  orderPriceWithFreeDelivery: number;
  /** App available currencies */
  availableCurrencies: string[];
  /** exchange rates */
  exchangeRates: Record<string, number>;
  /** All currencies that available to use */
  allCurrencies?: string[];
}

export interface SetTaxDto {
  /** tax value */
  tax: number;
}

export interface SetDeliveryCostDto {
  /** delivery price */
  deliveryCost: number;
}

export interface SetOrderPriceWithFreeDeliveryDto {
  /** delivery price */
  orderPriceWithFreeDelivery: number;
}

export interface SetAvailableCurrenciesDto {
  /** tax value */
  availableCurrencies: string[];
}

export interface CreateDiscountDto {
  /** discount name */
  name: string;
  /** discount name */
  percentage: number;
}

export interface DiscountReturnDto {
  /** discount id */
  id: string;
  /** discount name */
  name: string;
  /** discount percentage */
  percentage: number;
  /** products */
  products: ProductReturnDto[];
  /** products count */
  productsCount: number;
  /** can delete discount */
  canDelete: boolean;
  /** Can edit discount flag */
  canEdit: boolean;
}

export interface EditDiscountDto {
  /** discount id */
  id: string;
  /** discount name */
  name: string;
  /** discount percentage */
  percentage: number;
}

export enum UserReturnDtoRolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface GetProductsParams {
  /** Page number */
  page: number;
  /** Limit number */
  limit: number;
  /** products categoryId */
  categoryId?: string | null;
  /** price sorting direction */
  priceSorting?: PriceSortingEnum;
  /** search query */
  search?: string | null;
}

/** price sorting direction */
export enum PriceSortingEnum {
  Asc = 'asc',
  Desc = 'desc'
}

/** price sorting direction */
export enum GetProductsParams1PriceSortingEnum {
  Asc = 'asc',
  Desc = 'desc'
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
  order?: OrderEnum;
  /** orders status */
  status?: OrderStatusEnum;
}

/** orders by param */
export enum OrderEnum {
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt'
}

/** orders by param */
export enum GetOrdersParams1OrderEnum {
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt'
}

export interface GetReviewsParams {
  /** Page number */
  page: number;
  /** Limit number */
  limit: number;
  /** product id */
  productId: string;
}
