import EditProductPage from '@/modules/product-form/pages/EditProductPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/modules/home/pages/Home.vue';
import Bookmarks from '@/modules/Bookmarks/pages/Bookmarks.vue';
import CreateProductPage from '@/modules/product-form/pages/CreateProductPage.vue';
import ProductPage from '@/modules/product-page/pages/ProductPage.vue';
import Orders from '@/modules/orders/pages/OrdersPage/Orders.vue';
import SingleOrder from '@/modules/orders/pages/SingleOrderPage/SingleOrder.vue';
import ProfilePage from '@/modules/profile/pages/ProfilePage.vue';
import Admin from '@/modules/admin/pages/Admin.vue';
import FinanceSettings from '@/modules/admin/submodules/finance-settings/pages/FinanceSettings.vue';
import Discounts from '@/modules/discounts/pages/Discounts/Discounts.vue';

export enum ERoutesName {
  HOME = 'home',
  BOOKMARKS = 'bookmarks',
  CREATE_PRODUCT = 'create-product',
  EDIT_PRODUCT = 'edit-product',
  PRODUCT = 'product',
  ORDERS = 'orders',
  SINGLE_ORDER = 'single.order',
  PROFILE = 'profile',
  ADMIN = 'admin',
  FINANCE_SETTINGS = 'finance-settings',
  DISCOUNTS = 'discounts'
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
    },
    {
      path: '/orders/:id',
      component: SingleOrder,
      name: ERoutesName.SINGLE_ORDER
    },
    {
      path: '/profile',
      component: ProfilePage,
      name: ERoutesName.PROFILE
    },
    {
      path: '/discounts',
      component: Discounts,
      name: ERoutesName.DISCOUNTS
    },
    {
      path: '/admin',
      component: Admin,
      name: ERoutesName.ADMIN,
      children: [
        {
          path: '/admin/finance',
          component: FinanceSettings,
          name: ERoutesName.FINANCE_SETTINGS
        }
      ]
    }
  ]
});
