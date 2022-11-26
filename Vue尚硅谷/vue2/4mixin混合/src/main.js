/* 
	该文件是整个项目的入口文件
*/
//引入Vue
// import Vue from 'vue/dist/vue'
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'

import {mixin} from './mixin'
Vue.config.productionTip = false
Vue.mixin(mixin);//全局混合

new Vue({
  // render: h => h(App),
  // template:' <App></App>',
  // components:{App}
  render(creatElement) {
  return   creatElement(App)
  }
}).$mount('#app')
