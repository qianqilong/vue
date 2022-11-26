import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '../utils/token'
// import Login from '../views/Login'
// import Layout from '../views/Layout'
// import Home from '../views/Layout/Home'
// import User from '../views/Layout/User'
// import Search from '../views/Search'
// import SearchResults from '../views/Search/SearchResults'
// import ArticleDeatil from '../views/ArticleDeatil'
// import UserEdit from '../views/Layout/User/UserEdit.vue'
// import Chat from '../views/Chat'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login'),
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      // 如果已经登陆进入无法进入登陆页面
      if (getToken()?.length > 0) {
      // 1.返回到首页
        next('/layout/home')
      } else {
        next()
      }
    }
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "Layout" */ '../views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Layout/Home'),
        meta: {
          scrollT: 0// 保存首页离开时滚动条的位置
        }
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "User" */ '../views/Layout/User')
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search')
  },
  { // 动态路由传参
    path: '/search_results/:kw',
    component: () => import(/* webpackChunkName: "SearchResults" */ '../views/Search/SearchResults')
  },
  { // 文章详情页面
    path: '/detail',
    component: () => import(/* webpackChunkName: "Deatil" */ '../views/ArticleDeatil')
  },
  { // 用户编辑页面
    path: '/user_edit',
    component: () => import(/* webpackChunkName: "UserEdit" */ '../views/Layout/User/UserEdit.vue')
  }, {
    path: '/chat',
    component: () => import(/* webpackChunkName: "Chat" */ '../views/Chat')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
// 全局前置路由守卫
// router.beforeEach((to, from, next) => {
//   // 如果已经登陆进入无法进入登陆页面
//   if (getToken()?.length > 0 && to.path === '/login') {
//   next(false)
//   } else {
//     next()
// }
// })

export default router
