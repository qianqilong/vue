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
// main.js中：
import animated from 'animate.css' // npm install animate.css --save安装，在引入

// 引入ElementUI(完整引入)
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);注册了全部组件

// 引入ElementUI(按需引入)
import { Button, Row,DatePicker} from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(DatePicker.name, DatePicker)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
Vue.use(animated)


Vue.config.productionTip = false



new Vue({
  render(creatElement) {
  return   creatElement(App)
  },
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
