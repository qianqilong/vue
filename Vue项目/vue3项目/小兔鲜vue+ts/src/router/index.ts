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

// 1.填写订单只能购物车进入，其他情况无法进入
/**
 *
 * @param to Route 即将要进入的目标 路由对象
 * @param form Route 当前导航正要离开的路由
 * @param next 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)
 */

router.beforeEach((to, from, next) => {
  //前往首页无token跳转
  if (to.path === '/pay' && from.path !== '/cart') {
    next({
      path: '/cart',
    })
  }
  next()
})
// 2.提交订单只能从填写订单进入

router.beforeEach((to, from, next) => {
  //前往首页无token跳转
  if (to.path === '/payjump' && from.path !== '/pay' && from.path !== '/user/order') {
    console.log(from.path)
    next({
      path: '/cart',
    })
  }
  next()
})

// 个人中心只能有token时进入

router.beforeEach((to, from, next) => {
  const { user } = useStore()
  const token = user.user.token
  //前往首页无token跳转
  if (to.path.includes('/user') && token === '') {
    next({
      path: '/login',
    })
  } else {
    next()
  }
})

export default router
