// 对axios进行二次封装
import axios from 'axios'
import nprogress from 'nprogress'// start:进度条开始，done进度条结束
import 'nprogress/nprogress.css'
const ajax=axios.create({
  baseURL: '/mock',
  timeout:2000  
})
// 请求拦截器
ajax.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start()
  // config配置对象，里面headers请求头
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