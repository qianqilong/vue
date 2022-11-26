// 封装axios请求
import theaxios from 'axios'
import router from '@/router'
import Dialog from '@/utils/Dialog.js'
import { getToken, removeToken, setToken } from '../utils/token.js'
import { getNewTokenAPI } from '@/api/index.js'
// 新建一个新的axios实例
const axios = theaxios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 20000// 20秒超时时间
})

// 添加请求拦截器，携带身份认证信息
// ?. 可选链操作符，如果前面对象length为0，直接返回undefiend
axios.interceptors.request.use(function (config) {
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器，过期重新登录
axios.interceptors.response.use(function (response) {
  // http请求2xx，3xx进入这里
  // 对响应数据做点什么
  return response
}, async function (error) {
  // http请求4xx，5xx报错进入这里
  // 只有401代表身份过期
  if (error.response.status === 401) { 
    // 方式1, 强制退出
    // // 不能用this.$router.replace('/login),node中this指向
    // router.replace('/login')
 
    // 方式2，刷新token,用户不在登陆状态，就会跳回登陆页
    try {
    const res = await getNewTokenAPI()// 获取到了新的token
    // 1.存入新的token
    setToken(res.data.data.token)
    // 2.更新token在请求头中
    error.config.headers.Authorization = `Bearer ${res.data.data.token}`
    // 3.未完成的请求再次发起
      return axios(error.config)
    } catch (err) {
      router.replace(`/login?path=${router.currentRoute.fullPath}`)// 跳转之前信息
      removeToken()// 清空token，让路由守卫放行
      Dialog.alert({
        message: '身份已过期，请重新登录！'
      })
      // router.currentRoute是拿到当前路由对象的信息
    }
  } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
    // 刷新的refresh_token也过期了
    removeToken()
    router.replace('/login')
  } else { return Promise.reject(error) }
  // 目标: token讲解
// 操作:
// 1. 手动修改localStorage里geek那个token改错(模拟过期)
// 2. 点击反馈/其他需要标明身份的接口(错误token携带给后台请求)
// 3. 反馈不感兴趣, 这次请求返回状态为 401, 进入错误响应拦截器

// 代码解决401问题
// 方式1: 清除token, 强制跳转回登录页面, 有感知重新登录, 拿到新token替换到本地
// 需要重新点击反馈按钮, 再次反馈 -> 感觉特别不好
// 方式2: 刷新token, 使用登录时保存的refresh_token, 调用另外一个接口, 换回来
// 新的token值, 替换到本地, 再次完成本次未完成的请求 -> 用户无感知体验好
// 1. 登录页面, localStorage.setItem('refresh_token', 存入refresh_token)
// 2. 401中, 注释掉跳转login的代码, 引入刷新token的api方法调用
// 3. 替换保存到本地新的token
// 4. error错误对象里headers替换成新的token
// 5. axios再次发起这次未完成请求, 返回Promise对象到最开始发请求的逻辑页面
// 注意: 调用刷新token的接口, 如果没携带refresh_token或者携带错误的都会导致500

// 401+500
// token和refresh_token都过期了 (前提, 是你手动把2个token改成错误的)
// 强制回到登录页

  // 对响应错误做点什么
})

// 基于 axios 封装的请求模块
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) =>
  axios({
    url,
    method,
    params,
    data,
    headers
  })
