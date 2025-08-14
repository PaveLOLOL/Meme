import {
  createRouter,
  createWebHistory,
  // NavigationGuardNext,
  // RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'

const HomePage = () => import('@/views/HomePage.vue')
const CardsView = () => import('@/views/CardsView')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/game',
    name: 'game',
    component: CardsView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'link-active'
});

export default router;
