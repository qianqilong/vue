/* 
	该文件是整个项目的入口文件
*/
//引入Vue
// import Vue from 'vue/dist/vue'
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'
import VueResource from 'vue-resource'
/*
const vm = Vue.extend({});//创建一个组件
const vcc = new vm();//实例组件
Vue.prototype.vc = vcc;//加到原型上
因为vue的实例对象的也指向了vue的原型对象，用vm更为合适
*/
// main.js中：
import animated from 'animate.css' // npm install animate.css --save安装，在引入

//引入vue-router
import vueRouter from 'vue-router'

//引入路由器
import router from './router'
Vue.use(vueRouter)
Vue.use(animated)
Vue.use(VueResource)//使用这个插件让vc身上有$http

Vue.config.productionTip = false



new Vue({
  render(creatElement) {
  return   creatElement(App)
  },
  router,
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
