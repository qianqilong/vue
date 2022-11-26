import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import '../utils/RewriteJump' //导入重新的push方法
import store from '@/store'
Vue.use(VueRouter)

let each= new VueRouter({
  routes,
  scrollBehavior() {
    return {y:0}
  }
})
each.beforeEach(async (to, from, next) => {
  // to:可获取到你跳转的路由信息
  // from:跳转之前的路由位置
  let token = store.state.user.token
  let name=store.state.user.userInfo.name
  if (token) {
    if (to.path == '/login') {
      next('/home')
    } else {
      // 如果没有用户名就派发
      if (name) {
        next()
      } else {
        try {
          // 每次获取用户信息在头上显示
          await store.dispatch('getUserInfo')
          next()
        } catch (e) {
          // token过期，清除token跳到登陆
          await store.dispatch('getLogout')   
          next('/login')
        }
      }
     
    }
    
  } else {
    // 未登录，不能去交易相关，支付相关，个人订单->登陆页
    let topath = to.path
    if (topath.indexOf('/trade') !=-1 || topath.indexOf('/pay') !=-1 || topath.indexOf('/center') !=-1) {
      next(`/login?redirect=${topath}`)
    } else {
      next() 
    }
   
  }
    
  
})
export default each;