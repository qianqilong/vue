// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise
import axios from 'axios'
import store from '@/store'
import router from '@/router'
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'

const ajax = axios.create({
  baseURL,
  timeout: 50000
})
// 请求拦截器
ajax.interceptors.request.use((config) => {
  if (!config) {
    config = {}
  }
  if (!config.headers) {
    config.headers = {}
  }
  // 如果有token进行头部携带
  const profile = store.state.user.profile
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
ajax.interceptors.response.use(res =>
  res.data, err => {
  // 401跳转token过期
  if (err.response && err.response.status === 401) {
    // 清除token
    store.commit('user/setUser', {})
    //    js模块中router.currentRoute.value.fullPath就是当前路由地址
    // 存储跳转之前页面
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // 跳转到登录页
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})
interface ajaxinterface{
  url:string,
  method:string,
  params?:object,
  data?:object
}
// 导出一个函数，调用当前的axsio实例发请求，返回值promise
export default (request:ajaxinterface) => {
  return ajax(request)
}
