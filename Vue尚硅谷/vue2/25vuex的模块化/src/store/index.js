//该文件是用于创建vuex核心store
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//引入Count的配置项
import countOptions from './Count'
//引入Persons的配置项
import personOptions from './Persons'
Vue.use(Vuex)




const store = new Vuex.Store({
  modules: {
    countOptions,
    personOptions
  }
});

export default store;