import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue';
import Bookmarks from '@/pages/Bookmarks.vue'

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
    }
  ]
});
