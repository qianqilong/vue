import useStore from '@/stores'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/Layout/Layout.vue'),
    children: [
      { path: '/', component: () => import('../views/Layout/home/Home.vue') },
      {
        path: '/category/:id',
        component: () => import('../views/Layout/home/category/GoodOne.vue'),
      },
      {
        path: '/category/sub/:id',
        component: () => import('../views/Layout/home/category/GoodSub.vue'),
      },
      {
        path: '/product/:id',
        component: () => import('../views/Layout/home/goodDetail/GoodDetail.vue'),
      },
      {
        path: '/cart',
        component: () => import('../views/Layout/cart/Cart.vue'),
      },
      {
        path: '/pay',
        component: () => import('../views/Layout/Pay/Pay.vue'),
      },
      {
        path: '/payjump',
        component: () => import('../views/Layout/Pay/PayJump.vue'),
      },
      {
        path: '/paysuccess/:id',
        component: () => import('../views/Layout/Pay/PaySuccess.vue'),
      },
      {
        path: '/user',
        component: () => import('../views/Layout/user/UserLayout.vue'),
        children: [
          {
            path: 'home',
            component: () => import('../views/Layout/user/UserHome.vue'),
          },
          {
            path: 'order',
            children: [
              { path: '', component: () => import('../views/Layout/user/order/OrderAll.vue') },
              { path: ':id', component: () => import('../views/Layout/user/order/OrderDetail.vue') },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login/Login.vue'),
  },
  {
    path: '/login/callback',
    component: () => import('../views/Login/LoginCallback.vue'),
  },
]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savePosition) => {
    return savePosition ? savePosition : { top: 0 }
  },
  routes,
})

// 1.????????????????????????????????????????????????????????????
/**
 *
 * @param to Route ???????????????????????? ????????????
 * @param form Route ?????????????????????????????????
 * @param next ????????????????????????????????????????????????????????????????????????????????????????????? confirmed (?????????)
 */

router.beforeEach((to, from, next) => {
  //???????????????token??????
  if (to.path === '/pay' && from.path !== '/cart') {
    next({
      path: '/cart',
    })
  }
  next()
})
// 2.???????????????????????????????????????

router.beforeEach((to, from, next) => {
  //???????????????token??????
  if (to.path === '/payjump' && from.path !== '/pay' && from.path !== '/user/order') {
    console.log(from.path)
    next({
      path: '/cart',
    })
  }
  next()
})

// ?????????????????????token?????????

router.beforeEach((to, from, next) => {
  const { user } = useStore()
  const token = user.user.token
  //???????????????token??????
  if (to.path.includes('/user') && token === '') {
    next({
      path: '/login',
    })
  } else {
    next()
  }
})

export default router
