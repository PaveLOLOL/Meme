import {
  createRouter,
  createWebHistory,
  // NavigationGuardNext,
  // RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'

const App = () => import('@/App.vue');

import {EnumUsersRoles} from '@/types/users';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: App,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'link-active'
});

export default router;
