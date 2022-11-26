import { render, type VNode } from 'vue'
import LoadingBar from './index.vue'
import { createVNode } from 'vue'
import router from '@/router'

export default {
  install() {
    // 变成div
    const Vnode: VNode = createVNode(LoadingBar)
    // 挂载
    render(Vnode, document.body)

    // 使用路由的方法进行全局挂载
    router.beforeEach((to, from, next) => {
      Vnode.component?.exposed?.startLoading()
      next()
    })

    router.afterEach(() => {
      Vnode.component?.exposed?.endLoading()
    })
  }
}
