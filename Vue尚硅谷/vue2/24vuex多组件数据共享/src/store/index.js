//该文件是用于创建vuex核心store
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'

Vue.use(Vuex)
//1.准备action---响应组件动作
const actions = {
  //Count组件的方法
  add(context,value) {
    context.commit('ADD', value);//把要处理的数据发送给mutations
  },
  sub(context, value) {
    context.commit('SUB',value)
  },
  addodd(context, value) {//服务员可以有多个，逻辑一般交给服务员处理
    if (context.state.sum % 2) {
      context.commit('ADD', value)
      //如果这里进行数据计算，开发者工具没用
    }
  },
  addwait(context, value) {
    setTimeout(() => {
      context.commit('ADD',value)
    },1000)
  },

// Persons组件的方法
  addPresons(context, value) {
  context.commit('addPresons',value)//发送给下一个
},


  
}
//2.准备mutations---操作数据
const mutations = {
  //Count组件的方法
  ADD(state,value) {
    state.sum += value;
  },
  SUB(state, value) {
    state.sum-=value
  },
  

  //Persons组件的方法
  addPresons(state, value) {
    console.log('添加人员的方法调用了');
   state.personList.push({name:value})
  }
}
//3.准备state---用于存储数据
const state = {
  //Count组件数据
  sum: 0,
  school: '安徽科技学院',
  subject: '前端',
  //Persons组件数据
  personList: [
    {name:'张三'}
  ]
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