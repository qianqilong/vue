import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 存储数据
  state: {
    userPhoto: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.56662o4yV01NUau07Nm5fwAAAA?w=210&h=210&c=7&r=0&o=5&dpr=1.25&pid=1.7'
  },
  // 操作数据
    
  mutations: {
    // 编码风格
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    }
  },
  // 响应组件方法
  actions: {
    setPhoto (context, value) {
      context.commit('SET_USERPHOTO', value)
    }
  },
  modules: {
  },
  // 用于将state里的数据进行加工(像计算属性，公共计算属性)
  getters: {
    
  }
})
