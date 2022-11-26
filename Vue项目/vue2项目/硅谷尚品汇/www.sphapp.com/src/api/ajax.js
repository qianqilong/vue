// 对axios进行二次封装
import axios from 'axios'
import nprogress from 'nprogress'// start:进度条开始，done进度条结束
import 'nprogress/nprogress.css'
import store from '@/store'
const ajax=axios.create({
  baseURL: '/api',
  timeout:600000  
})
// 请求拦截器
ajax.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start()
  // config配置对象，里面headers请求头,给请求头添加一个字段
  if (store.state.detail.uuidtoken) {
    config.headers.userTempId=store.state.detail.uuidtoken
  }
  if (store.state.user.token) {
    config.headers.token=store.state.user.token
  }
  return config
})
// 响应拦截器
ajax.interceptors.response.use((res) => {
  // 进度条结束
  nprogress.done()
   return res.data
}, (error) => {
  return Promise.reject(error)
})
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) =>
  ajax({
    url,
    method,
    params,
    data,
    headers
  })