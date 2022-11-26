/* 
	该文件是整个项目的入口文件
*/
//引入Vue
// import Vue from 'vue/dist/vue'
import Vue from 'vue'

//引入App组件，它是所有组件的父组件
import App from './App.vue'

Vue.config.productionTip = false
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el) {
    // 聚焦元素
    el.focus()
  },
})

import plugin from './plugin'

Vue.use(plugin)
export const vm = new Vue({
  // render: h => h(App),
  // template:' <App></App>',
  // components:{App}
  render(creatElement) {
    return creatElement(App)
  },
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$A = '全局变量'
    Vue.prototype.$func = () => {
      console.log('全局函数')
    }
  }, //安装全局事件总线
}).$mount('#app')
