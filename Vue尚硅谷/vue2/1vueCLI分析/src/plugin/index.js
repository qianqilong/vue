import Message from './components/Message.vue'
import Vue from 'vue'
const MessageFn = (message) => {
  // 1.获取构造函数
  const contructor = Vue.extend(Message)
  // 2. 实例化组件对象propsData开发环境
  const instance = new contructor({propsData:message})
  console.log(instance)
  // 3. 创建页面元素
  instance.$mount(document.createElement('div'))
  // 4. 将组件挂载到页面元素上
  document.body.appendChild(instance.$el)
  // 5. 获取组件的显示函数
  const show = instance.show
  // 6. 获取组件的隐藏函数
  const hide = instance.hide
  // 显示
  show()
  // 3秒后隐藏
  setTimeout(() => {
    hide()
  }, 3000)
}

export default {
  install(Vue) {
    Vue.prototype.$Message = MessageFn
  },
}
