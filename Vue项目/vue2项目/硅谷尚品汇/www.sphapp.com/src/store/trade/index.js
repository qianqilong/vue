import {  reqaddressAPI,reqOrderAPI} from '@/api'
const state = {
  address: [],
  order:{}
}// 存储数据
const mutations = {
  GETADDRESS(state, address) {
    state.address=address
  },
  GETORDER(state, order) {
    state.order=order
  }
}// 修改state数据的唯一手段
const actions = {
  // 获取用户地址信息
  async getaddress({ commit }) {
    const res = await reqaddressAPI();
    if (res.code == 200) {
      commit('GETADDRESS', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error)
    }
    
  },
  // 获取用户订单信息
  async getOrder({ commit }) {
    const res = await reqOrderAPI()
    if (res.code == 200) {
      commit('GETORDER',res.data)
    } else {
      return Promise.reject(new Error())
    }
    
  }
}// 发送给mutations,处理异步
const getters={}// 相当于计算属性，简化仓库数组
export default {
  state,
  mutations,
  actions,
  getters
}