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
  CreateCategoryDto,
  CreateOrderDto,
  CreateOrderReturnDto,
  CreateProductDto,
  CreateReviewDto,
  GetOrdersReturnDto,
  GetProductsReturnDto,
  GetProductsReviewsReturnDto,
  LoginDto,
  OrderReturnDto,
  OrdersControllerGetOrdersParams,
  ProductReturnDto,
  ProductReviewReturnDto,
  ProductReviewsControllerGetReviewsParams,
  ProductsControllerGetFavoriteProductsParams,
  ProductsControllerGetProductsParams,
  RegisterDto,
  RemoveFromCartDto,
  SuccessMessageDto,
  ToggleFavoriteReturnDto,
  ToggleFavoritesDto,
  UpdateCategoryDto,
  UpdateOrderStatusDto,
  UpdateProductDto,
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
   * @name AuthControllerLogin
   * @summary Login user
   * @request POST:/api/auth/login
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
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
   * @name AuthControllerRefresh
   * @summary auth refresh data
   * @request GET:/api/auth/refresh
   */
  authControllerRefresh = (params: RequestParams = {}) =>
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
   * @name AuthControllerLogout
   * @summary auth refresh data
   * @request POST:/api/auth/logout
   */
  authControllerLogout = (params: RequestParams = {}) =>
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
   * @name AuthControllerUpdateUserData
   * @request PUT:/api/auth
   */
  authControllerUpdateUserData = (data: UpdateUserDataDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/auth`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Products
   * @name ProductsControllerCreate
   * @summary Create product
   * @request POST:/api/products
   */
  productsControllerCreate = (data: CreateProductDto, params: RequestParams = {}) =>
    this.request<ProductReturnDto, any>({
      path: `/api/products`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products
   * @name ProductsControllerEdit
   * @summary Edit product
   * @request PUT:/api/products
   */
  productsControllerEdit = (data: UpdateProductDto, params: RequestParams = {}) =>
    this.request<ProductReturnDto, any>({
      path: `/api/products`,
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
   * @name ProductsControllerGetProducts
   * @summary get products
   * @request GET:/api/products
   */
  productsControllerGetProducts = (query: ProductsControllerGetProductsParams, params: RequestParams = {}) =>
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
   * @name ProductsControllerGetFavoriteProducts
   * @summary get favorite products
   * @request GET:/api/products/favorites
   */
  productsControllerGetFavoriteProducts = (
    query: ProductsControllerGetFavoriteProductsParams,
    params: RequestParams = {}
  ) =>
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
   * @name ProductsControllerToggleFavorites
   * @summary toggle favorites
   * @request PATCH:/api/products/favorites
   */
  productsControllerToggleFavorites = (data: ToggleFavoritesDto, params: RequestParams = {}) =>
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
   * @name ProductsControllerGetProduct
   * @summary Get product
   * @request GET:/api/products/{id}
   */
  productsControllerGetProduct = (id: string, params: RequestParams = {}) =>
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
   * @name ProductsControllerDeleteProduct
   * @summary delete product
   * @request DELETE:/api/products/{id}
   */
  productsControllerDeleteProduct = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/products/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Categories
   * @name CategoriesControllerCreateCategory
   * @summary Create category
   * @request POST:/api/categories
   */
  categoriesControllerCreateCategory = (data: CreateCategoryDto, params: RequestParams = {}) =>
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
   * @name CategoriesControllerUpdateCategory
   * @summary Update category
   * @request PUT:/api/categories
   */
  categoriesControllerUpdateCategory = (data: UpdateCategoryDto, params: RequestParams = {}) =>
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
   * @name CategoriesControllerGetCategories
   * @summary Get categories
   * @request GET:/api/categories
   */
  categoriesControllerGetCategories = (params: RequestParams = {}) =>
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
   * @name CategoriesControllerDeleteCategory
   * @summary Delete category
   * @request DELETE:/api/categories/{id}
   */
  categoriesControllerDeleteCategory = (id: string, params: RequestParams = {}) =>
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
   * @name CartControllerAddToCart
   * @summary Add product to cart
   * @request PUT:/api/cart/add
   */
  cartControllerAddToCart = (data: AddToCartDto, params: RequestParams = {}) =>
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
   * @name CartControllerRemoveFromCart
   * @summary remove product from cart
   * @request PUT:/api/cart/remove
   */
  cartControllerRemoveFromCart = (data: RemoveFromCartDto, params: RequestParams = {}) =>
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
   * @name CartControllerGetCart
   * @summary Get cart
   * @request GET:/api/cart
   */
  cartControllerGetCart = (params: RequestParams = {}) =>
    this.request<CartReturnDto, any>({
      path: `/api/cart`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Orders
   * @name OrdersControllerCreateOrder
   * @summary Create order
   * @request POST:/api/orders
   */
  ordersControllerCreateOrder = (data: CreateOrderDto, params: RequestParams = {}) =>
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
   * @name OrdersControllerGetOrders
   * @summary Get orders
   * @request GET:/api/orders
   */
  ordersControllerGetOrders = (query: OrdersControllerGetOrdersParams, params: RequestParams = {}) =>
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
   * @name OrdersControllerUpdateOrderStatus
   * @summary Update order status
   * @request PUT:/api/orders
   */
  ordersControllerUpdateOrderStatus = (data: UpdateOrderStatusDto, params: RequestParams = {}) =>
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
   * @name OrdersControllerGetOrderById
   * @summary Get order by id
   * @request GET:/api/orders/{id}
   */
  ordersControllerGetOrderById = (id: string, params: RequestParams = {}) =>
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
   * @name ProductReviewsControllerCreateReview
   * @summary Create product review
   * @request POST:/api/product-reviews
   */
  productReviewsControllerCreateReview = (data: CreateReviewDto, params: RequestParams = {}) =>
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
   * @name ProductReviewsControllerGetReviews
   * @summary Get product reviews
   * @request GET:/api/product-reviews
   */
  productReviewsControllerGetReviews = (query: ProductReviewsControllerGetReviewsParams, params: RequestParams = {}) =>
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
   * @name ProductReviewsControllerDeleteReview
   * @summary Delete product review
   * @request DELETE:/api/product-reviews/{id}
   */
  productReviewsControllerDeleteReview = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/product-reviews/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
}
