// 求和的相关配置
const countOptions = {
  namespaced:true,//命名空间以便组件读到里面内容
  actions: {
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
  },
  mutations: {
    ADD(state,value) {
      state.sum += value;
    },
    SUB(state, value) {
      state.sum-=value
    },
  },
  state: {
    sum: 0,
    school: '安徽科技学院',
    subject: '前端',
},
  getters: {
    bigSum(state) {
      return state.sum * 10;
    }
}
}
export default countOptions;