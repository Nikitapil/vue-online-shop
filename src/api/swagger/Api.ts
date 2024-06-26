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

import type {
  AddToCartDto,
  AuthResponseDto,
  CartReturnDto,
  CategoryReturnDto,
  ChangePasswordDto,
  CreateCategoryDto,
  CreateDiscountDto,
  CreateOrderDto,
  CreateOrderReturnDto,
  CreateProductBody,
  CreateReviewDto,
  DiscountReturnDto,
  EditDiscountDto,
  EditProductDiscountDto,
  FinanceSettingsReturnDto,
  GetFavoriteProductsParams,
  GetOrdersParams,
  GetOrdersReturnDto,
  GetProductsParams,
  GetProductsReturnDto,
  GetProductsReviewsReturnDto,
  GetReviewsParams,
  LoginDto,
  OrderReturnDto,
  ProductReturnDto,
  ProductReviewReturnDto,
  RegisterDto,
  RemoveFromCartDto,
  SetAvailableCurrenciesDto,
  SetDeliveryCostDto,
  SetOrderPriceWithFreeDeliveryDto,
  SetTaxDto,
  SuccessMessageDto,
  ToggleFavoriteReturnDto,
  ToggleFavoritesDto,
  UpdateCategoryDto,
  UpdateOrderStatusDto,
  UpdateProductBody,
  UpdateUserDataDto
} from './data-contracts';
import { ContentType, HttpClient, type RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name Register
   * @summary Register user
   * @request POST:/api/auth/register
   */
  register = (data: RegisterDto, params: RequestParams = {}) =>
    this.request<AuthResponseDto, any>({
      path: `/api/auth/register`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name Login
   * @summary Login user
   * @request POST:/api/auth/login
   */
  login = (data: LoginDto, params: RequestParams = {}) =>
    this.request<AuthResponseDto, any>({
      path: `/api/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name RefreshAuth
   * @summary auth refresh data
   * @request GET:/api/auth/refresh
   */
  refreshAuth = (params: RequestParams = {}) =>
    this.request<AuthResponseDto, any>({
      path: `/api/auth/refresh`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name Logout
   * @summary auth logout
   * @request POST:/api/auth/logout
   */
  logout = (params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/auth/logout`,
      method: 'POST',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name UpdateUserData
   * @summary update user data
   * @request PUT:/api/auth
   */
  updateUserData = (data: UpdateUserDataDto, params: RequestParams = {}) =>
    this.request<AuthResponseDto, any>({
      path: `/api/auth`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name ChangePassword
   * @summary change password
   * @request PUT:/api/auth/password
   */
  changePassword = (data: ChangePasswordDto, params: RequestParams = {}) =>
    this.request<AuthResponseDto, any>({
      path: `/api/auth/password`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products
   * @name CreateProduct
   * @summary Create product
   * @request POST:/api/products
   */
  createProduct = (data: CreateProductBody, params: RequestParams = {}) =>
    this.request<ProductReturnDto, any>({
      path: `/api/products`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products
   * @name EditProduct
   * @summary Edit product
   * @request PUT:/api/products
   */
  editProduct = (data: UpdateProductBody, params: RequestParams = {}) =>
    this.request<ProductReturnDto, any>({
      path: `/api/products`,
      method: 'PUT',
      body: data,
      type: ContentType.FormData,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products
   * @name GetProducts
   * @summary get products
   * @request GET:/api/products
   */
  getProducts = (query: GetProductsParams, params: RequestParams = {}) =>
    this.request<GetProductsReturnDto, any>({
      path: `/api/products`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products
   * @name GetFavoriteProducts
   * @summary get favorite products
   * @request GET:/api/products/favorites
   */
  getFavoriteProducts = (query: GetFavoriteProductsParams, params: RequestParams = {}) =>
    this.request<GetProductsReturnDto, any>({
      path: `/api/products/favorites`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products
   * @name ToggleFavorites
   * @summary toggle favorites
   * @request PATCH:/api/products/favorites
   */
  toggleFavorites = (data: ToggleFavoritesDto, params: RequestParams = {}) =>
    this.request<ToggleFavoriteReturnDto, any>({
      path: `/api/products/favorites`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products
   * @name GetProduct
   * @summary Get product
   * @request GET:/api/products/{id}
   */
  getProduct = (id: string, params: RequestParams = {}) =>
    this.request<ProductReturnDto, any>({
      path: `/api/products/${id}`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products
   * @name DeleteProduct
   * @summary delete product
   * @request DELETE:/api/products/{id}
   */
  deleteProduct = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/products/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products
   * @name EditProductDiscount
   * @summary edit product discount
   * @request PUT:/api/products/discount
   */
  editProductDiscount = (data: EditProductDiscountDto, params: RequestParams = {}) =>
    this.request<ProductReturnDto, any>({
      path: `/api/products/discount`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Categories
   * @name CreateCategory
   * @summary Create category
   * @request POST:/api/categories
   */
  createCategory = (data: CreateCategoryDto, params: RequestParams = {}) =>
    this.request<CategoryReturnDto, any>({
      path: `/api/categories`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Categories
   * @name UpdateCategory
   * @summary Update category
   * @request PUT:/api/categories
   */
  updateCategory = (data: UpdateCategoryDto, params: RequestParams = {}) =>
    this.request<CategoryReturnDto, any>({
      path: `/api/categories`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Categories
   * @name GetCategories
   * @summary Get categories
   * @request GET:/api/categories
   */
  getCategories = (params: RequestParams = {}) =>
    this.request<CategoryReturnDto[], any>({
      path: `/api/categories`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Categories
   * @name DeleteCategory
   * @summary Delete category
   * @request DELETE:/api/categories/{id}
   */
  deleteCategory = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/categories/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Cart
   * @name AddToCart
   * @summary Add product to cart
   * @request PUT:/api/cart/add
   */
  addToCart = (data: AddToCartDto, params: RequestParams = {}) =>
    this.request<CartReturnDto, any>({
      path: `/api/cart/add`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Cart
   * @name RemoveFromCart
   * @summary remove product from cart
   * @request PUT:/api/cart/remove
   */
  removeFromCart = (data: RemoveFromCartDto, params: RequestParams = {}) =>
    this.request<CartReturnDto, any>({
      path: `/api/cart/remove`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Cart
   * @name GetCart
   * @summary Get cart
   * @request GET:/api/cart
   */
  getCart = (params: RequestParams = {}) =>
    this.request<CartReturnDto, any>({
      path: `/api/cart`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Cart
   * @name ClearCart
   * @summary Clear cart
   * @request PATCH:/api/cart/clear
   */
  clearCart = (params: RequestParams = {}) =>
    this.request<CartReturnDto, any>({
      path: `/api/cart/clear`,
      method: 'PATCH',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Orders
   * @name CreateOrder
   * @summary Create order
   * @request POST:/api/orders
   */
  createOrder = (data: CreateOrderDto, params: RequestParams = {}) =>
    this.request<CreateOrderReturnDto, any>({
      path: `/api/orders`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Orders
   * @name GetOrders
   * @summary Get orders
   * @request GET:/api/orders
   */
  getOrders = (query: GetOrdersParams, params: RequestParams = {}) =>
    this.request<GetOrdersReturnDto, any>({
      path: `/api/orders`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Orders
   * @name UpdateOrderStatus
   * @summary Update order status
   * @request PUT:/api/orders
   */
  updateOrderStatus = (data: UpdateOrderStatusDto, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/orders`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Orders
   * @name GetOrderById
   * @summary Get order by id
   * @request GET:/api/orders/{id}
   */
  getOrderById = (id: string, params: RequestParams = {}) =>
    this.request<OrderReturnDto, any>({
      path: `/api/orders/${id}`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Product reviews
   * @name CreateReview
   * @summary Create product review
   * @request POST:/api/product-reviews
   */
  createReview = (data: CreateReviewDto, params: RequestParams = {}) =>
    this.request<ProductReviewReturnDto, any>({
      path: `/api/product-reviews`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Product reviews
   * @name GetReviews
   * @summary Get product reviews
   * @request GET:/api/product-reviews
   */
  getReviews = (query: GetReviewsParams, params: RequestParams = {}) =>
    this.request<GetProductsReviewsReturnDto, any>({
      path: `/api/product-reviews`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Product reviews
   * @name DeleteReview
   * @summary Delete product review
   * @request DELETE:/api/product-reviews/{id}
   */
  deleteReview = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/product-reviews/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name GetFinanceSettings
   * @summary Get finance setting
   * @request GET:/api/finance/settings
   */
  getFinanceSettings = (params: RequestParams = {}) =>
    this.request<FinanceSettingsReturnDto, any>({
      path: `/api/finance/settings`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name SetTaxValue
   * @summary Set new tax value
   * @request PUT:/api/finance/settings/tax
   */
  setTaxValue = (data: SetTaxDto, params: RequestParams = {}) =>
    this.request<FinanceSettingsReturnDto, any>({
      path: `/api/finance/settings/tax`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name SetDeliveryCost
   * @summary Set new delivery cost value
   * @request PUT:/api/finance/settings/delivery_cost
   */
  setDeliveryCost = (data: SetDeliveryCostDto, params: RequestParams = {}) =>
    this.request<FinanceSettingsReturnDto, any>({
      path: `/api/finance/settings/delivery_cost`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name SetOrderPriceWithFreeDeliveryCost
   * @summary Set order price with free delivery cost
   * @request PUT:/api/finance/settings/order_free_delivery_cost
   */
  setOrderPriceWithFreeDeliveryCost = (data: SetOrderPriceWithFreeDeliveryDto, params: RequestParams = {}) =>
    this.request<FinanceSettingsReturnDto, any>({
      path: `/api/finance/settings/order_free_delivery_cost`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name SetAvailableCurrencies
   * @summary Set available currencies
   * @request PUT:/api/finance/settings/currencies
   */
  setAvailableCurrencies = (data: SetAvailableCurrenciesDto, params: RequestParams = {}) =>
    this.request<FinanceSettingsReturnDto, any>({
      path: `/api/finance/settings/currencies`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name UpdateExchangeRates
   * @summary Update exchange rates
   * @request PATCH:/api/finance/settings/rates
   */
  updateExchangeRates = (params: RequestParams = {}) =>
    this.request<FinanceSettingsReturnDto, any>({
      path: `/api/finance/settings/rates`,
      method: 'PATCH',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name CreateDiscount
   * @summary Create discount
   * @request POST:/api/discounts
   */
  createDiscount = (data: CreateDiscountDto, params: RequestParams = {}) =>
    this.request<DiscountReturnDto, any>({
      path: `/api/discounts`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name GetDiscounts
   * @summary Get discounts
   * @request GET:/api/discounts
   */
  getDiscounts = (params: RequestParams = {}) =>
    this.request<DiscountReturnDto[], any>({
      path: `/api/discounts`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name EditDiscount
   * @summary Edit discounts
   * @request PUT:/api/discounts
   */
  editDiscount = (data: EditDiscountDto, params: RequestParams = {}) =>
    this.request<DiscountReturnDto, any>({
      path: `/api/discounts`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name GetSingleDiscount
   * @summary Get single discount
   * @request GET:/api/discounts/{id}
   */
  getSingleDiscount = (id: string, params: RequestParams = {}) =>
    this.request<DiscountReturnDto, any>({
      path: `/api/discounts/${id}`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name DeleteDiscount
   * @summary Delete discounts
   * @request DELETE:/api/discounts/{id}
   */
  deleteDiscount = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/discounts/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
}
