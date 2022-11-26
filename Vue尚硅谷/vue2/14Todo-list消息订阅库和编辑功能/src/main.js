/* 
	该文件是整个项目的入口文件
*/
//引入Vue
// import Vue from 'vue/dist/vue'
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'


Vue.config.productionTip = false


new Vue({
  render(creatElement) {
  return   creatElement(App)
  },
  beforeCreate() {
    Vue.prototype.$bus=this
  }
}).$mount('#app')
