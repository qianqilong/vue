import { render, type App, type VNode, createVNode } from 'vue'
import Message from './components/Message.vue'
import Confirm from './components/Confirm.vue'

const MessageFn = (message: { type: string; text: string }) => {
  // 变成div
  const Vnode: VNode = createVNode(Message, message)
  // 挂载
  render(Vnode, document.body)
  // 获取组件中的显示函数
  const show = Vnode.component?.exposed?.show
  // 获取显示函数
  const hide = Vnode.component?.exposed?.hide
  // 显示
  show()
  // 3秒后隐藏
  setTimeout(() => {
    hide()
  }, 3000)
}

const ConfirmFn = (confirm: { title: string; text: string; cancel: Function; confirm: Function }) => {
  // 变成div
  const Vnode: VNode = createVNode(Confirm, confirm)
  // 挂载
  render(Vnode, document.body)
  // 获取组件中的显示函数
  const show = Vnode.component?.exposed?.show
  // 执行时
  show()
}
export default {
  install(app: App) {
    app.config.globalProperties.$Message = MessageFn
    app.config.globalProperties.$Confirm = ConfirmFn
  },
}
