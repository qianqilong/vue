import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      { path: '/', component: () => import('@/views/home') },
      { path: '/category/:id', component: () => import('@/views/category/index') },
      { path: '/category/sub/:id', component: () => import('@/views/category/sub') },
      { path: '/product/:id', component: () => import('@/views/goods/index') },
      { path: '/cart', component: () => import('@/views/cart/index') }
    ]
  },
  { path: '/login', component: () => import('@/views/login') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由都会置顶
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
