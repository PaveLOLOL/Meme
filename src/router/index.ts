import {
  createRouter,
  createWebHistory,
  // NavigationGuardNext,
  // RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue');

import {EnumUsersRoles} from '@/types/users';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'link-active'
});

export default router;
