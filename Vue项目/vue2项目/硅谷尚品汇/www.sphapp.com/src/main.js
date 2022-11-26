import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav' //注册三级联动菜单组件
import Pagination from './components/Pagination' //注册分页组件
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import * as api from '@/api'
import { MessageBox ,Button} from 'element-ui';
import '@/utils/validate'

Vue.component(TypeNav.name, TypeNav) //第一个参数:全局组件名字，第二个参数:那一个组件
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  store,// this.$store
  router,// this.$router
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$api = api
  }
}).$mount('#app')
