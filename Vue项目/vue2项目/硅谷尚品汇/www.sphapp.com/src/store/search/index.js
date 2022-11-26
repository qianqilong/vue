import {reqSearchList } from "@/api"
const state = {
  SearchList:{}
}// 存储数据
const mutations = {
  GETSEARCHLIST(state,SearchList) {
    state.SearchList=SearchList
  }
}// 修改state数据的唯一手段
const actions = {
async  getSearchList({commit},values={}) {
    const {data}= await reqSearchList(values);
    commit('GETSEARCHLIST',data)
  }
}// 发送给mutations,处理异步
const getters = {
  goodsList(state) {
    
    return state.SearchList.goodsList||[]
  },
  attrsList(state) {
    return state.SearchList.attrsList||[]
  },
  trademarkList(state) {
    return state.SearchList.trademarkList||[]
  }

}// 相当于计算属性，简化仓库数组
export default {
  state,
  mutations,
  actions,
  getters
}