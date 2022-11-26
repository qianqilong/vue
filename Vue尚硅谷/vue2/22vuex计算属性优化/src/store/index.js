import Vue from 'vue'
import Vuex from 'vuex'
import { countOptions } from './Count'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    countOptions,
  },
})

export default store
