import { createPinia, type PiniaPluginContext } from 'pinia'
import { toRaw } from 'vue'

type Options = {
  key?: string
}

const setStoreage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getStoreage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

const piniaPlugin = (options: Options) => {
  return (context: PiniaPluginContext) => {
    const { store } = context
    // 获取本地存储的值
    const data = getStoreage(`${options?.key ?? 'qql'}-${store.$id}`)
    // 存入
    store.$subscribe(() => {
      console.log('监听到了' + store.$id)
      setStoreage(`${options?.key ?? 'qql'}-${store.$id}`, toRaw(store.$state))
    })
    return { ...data }
  }
}

const store = createPinia()

store.use(
  piniaPlugin({
    key: 'pinia',
  }),
)

export default store
