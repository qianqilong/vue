import '@/utils/console.js' // 去掉打印语句
import Vue from 'vue'
import 'amfe-flexible'// 设置根标签字体大小做移动端适配
import App from './App.vue'
import router from './router'
import store from './store'
import { directiveObj } from './utils/directive'
import 'highlight.js/styles/default.css'// 代码高亮的样式
import './vueComponent' // 引入vant组件注册
Vue.config.productionTip = false
console.log(111)
Vue.use(directiveObj)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 * 一.组件使用套路
 * 1.明确目标，找到类似组件
 * 2.引入注册然后复制
 * 3.读和删没有用的
 * 4.修改成我们要的样式
 */
