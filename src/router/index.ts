import EditProductPage from '@/modules/product-form/pages/EditProductPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/modules/home/pages/Home.vue';
import Bookmarks from '@/modules/Bookmarks/pages/Bookmarks.vue';
import CreateProductPage from '@/modules/product-form/pages/CreateProductPage.vue';
import ProductPage from '@/modules/product-page/pages/ProductPage.vue';
import Orders from '@/modules/orders/pages/Orders.vue';

export enum ERoutesName {
  HOME = 'home',
  BOOKMARKS = 'bookmarks',
  CREATE_PRODUCT = 'create-product',
  EDIT_PRODUCT = 'edit-product',
  PRODUCT = 'product',
  ORDERS = 'orders'
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: ERoutesName.HOME
    },
    {
      path: '/bookmarks',
      component: Bookmarks,
      name: ERoutesName.BOOKMARKS
    },
    {
      path: '/create-product',
      component: CreateProductPage,
      name: ERoutesName.CREATE_PRODUCT
    },
    {
      path: '/edit-product/:id',
      component: EditProductPage,
      name: ERoutesName.EDIT_PRODUCT
    },
    {
      path: '/product/:id',
      component: ProductPage,
      name: ERoutesName.PRODUCT
    },
    {
      path: '/orders',
      component: Orders,
      name: ERoutesName.ORDERS
    }
  ]
});
