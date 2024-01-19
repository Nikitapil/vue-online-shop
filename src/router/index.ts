import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/modules/home/pages/Home.vue';
import Bookmarks from '@/pages/Bookmarks.vue';
import CreateProductPage from '@/modules/product-form/pages/CreateProductPage.vue';
import ProductPage from '@/modules/product-page/pages/ProductPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/bookmarks',
      component: Bookmarks,
      name: 'bookmarks'
    },
    {
      path: '/create-product',
      component: CreateProductPage,
      name: 'create-product'
    },
    {
      path: '/product/:id',
      component: ProductPage,
      name: 'product'
    }
  ]
});

export enum ERoutesName {
  HOME = 'home',
  BOOKMARKS = 'bookmarks',
  CREATE_PRODUCT = 'create-product',
  PRODUCT = 'product'
}
