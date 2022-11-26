/* 
	该文件是整个项目的入口文件
*/
//引入Vue
// import Vue from 'vue/dist/vue'
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'
/*
const vm = Vue.extend({});//创建一个组件
const vcc = new vm();//实例组件
Vue.prototype.vc = vcc;//加到原型上
因为vue的实例对象的也指向了vue的原型对象，用vm更为合适
*/

Vue.config.productionTip = false



new Vue({
  render(creatElement) {
  return   creatElement(App)
  },
  beforeCreate() {
    Vue.prototype.$bus=this
  }//安装全局事件总线
}).$mount('#app')
