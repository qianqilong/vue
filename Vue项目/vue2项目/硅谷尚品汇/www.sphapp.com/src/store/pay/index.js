import { submitOrderAPI,reqorderpay } from '@/api'
const state = {
  orderId: '',
  orderPayinfo:{}
}// 存储数据

const mutations = {
  GETSUBMITORDER(state, orderId) {
    state.orderId=orderId
  },
  GETPAY(state, orderPayinfo) {
   state.orderPayinfo=orderPayinfo
  }
}// 修改state数据的唯一手段

const actions = {
  async getsubmitOrder({commit},data) {
    const res = await submitOrderAPI(data)
   
    if (res.codr == 200) {
      commit('GETSUBMITORDER', res.data);
      return 'ok'
    } else {
      return Promise.reject(new Error(''))
   }
  },
  async getPay({ commit },orderId) {
    const res = await reqorderpay(orderId)
    if (res.code == 200) {
      commit('GETPAY',res.data)
      return "ok"
    } else {
      return  Promise.reject(new Error())
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