import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import useStore from '@/stores'
import axios from 'axios'
import router from '@/router'

// const { user } = useStore() 不能放在外面
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
class ajaxService {
  private ajax!: AxiosInstance
  constructor() {
    this.ajax = axios.create({
      baseURL,
      timeout: 5000,
    })
    this.addInterceptors(this.ajax)
  }
  // 请求函数
  async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<Response<T>, any> | Awaited<T>> {
    const data = await this.ajax.request<Response<T>>(config)
    if (data.msg === '操作成功') {
      return data.result
    }
    return data
  }
  // 拦截器
  private addInterceptors(ajax: AxiosInstance) {
    // 请求拦截器
    ajax.interceptors.request.use((config) => {
      const { user } = useStore()
      // 添加token
      const token = user.user.token
      if (token) {
        // vue3 typescript 封装axios ,实例拦截时报错(property) AxiosRequestConfig<any>.headers?: AxiosRequestHeaders ...
        // 对headers进行判断如果没有就什么都不干
        config.headers ? (config.headers.Authorization = `Bearer ${token}`) : ''
      }
      return config
    })

    // 响应拦截器
    ajax.interceptors.response.use(
      (res) => res.data,
      (err) => {
        if (err.response && err.response.status === 401) {
          const { user } = useStore()
          // 清空token
          user.user.token = ''
          // 获取跳转登录页面前的路由xingx
          const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
          router.push('/login?redirectUrl=' + fullPath)
        }
        return Promise.reject(err)
      },
    )
  }
}

export const ajax = new ajaxService()
// 在使用ajax时传入一个泛型进行来对应返回值data的类型
