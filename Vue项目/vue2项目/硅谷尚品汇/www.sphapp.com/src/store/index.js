import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
// 引入小仓库
import home from './home';
import user from './user';
import search from './search';
import detail from './detail'
import shopcar from './shopcar';
import trade from './trade';
import pay from './pay';
export default new Vuex.Store(
  {
    modules: {
      home,
      user,
      search,
      detail,
      shopcar,trade,pay
   }
  }
)