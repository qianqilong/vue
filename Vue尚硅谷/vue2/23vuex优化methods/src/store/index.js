//该文件是用于创建vuex核心store
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'

Vue.use(Vuex)
//1.准备action---响应组件动作
const actions = {
  add(context,value) {
    context.commit('ADD', value);//把要处理的数据发送给mutations
  },
  sub(context, value) {
    context.commit('SUB',value)
  },
  addodd(context, value) {//服务员可以有多个，逻辑一般交给服务员处理
    console.log('我处理不了，交给了demo1');
    context.dispatch('demo1',value)
  },
  addwait(context, value) {
    setTimeout(() => {
      context.commit('ADD',value)
    },1000)
  },





  demo1(context, value) {
    console.log('我处理不了，交给了demo2');
    context.dispatch('demo2',value)
  },
  demo2(context, value) {
    console.log('我解决了，传给了mutations');
    if (context.state.sum % 2) {
      context.commit('ADD', value)
      //如果这里进行数据计算，开发者工具没用
    }
  }
}
//2.准备mutations---操作数据
const mutations={
  ADD(state,value) {
    state.sum += value;
  },
  SUB(state, value) {
    state.sum-=value
  }
}
//3.准备state---用于存储数据
const state = {
  sum: 0,
  school: '安徽科技学院',
  subject:'前端'
}
//4.准备getters---用于将state里的数据进行加工(像计算属性，公共计算属性)
const getters = {
  bigSum(state) {
    return state.sum * 10;
  }
}
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
});

export default store;