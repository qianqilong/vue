import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    transition: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('../views/home.vue'),
    meta: {
      title: '首页',
      transition: 'animate__fadeInUp'
    }
  },
  {
    path: '/login',
    component: () => import('../views/login.vue'),
    meta: {
      title: '登录',
      transition: 'animate__bounceIn'
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savePosition) => {
    return savePosition ? savePosition : { top: 0 }
  },
  routes
})


export default router
