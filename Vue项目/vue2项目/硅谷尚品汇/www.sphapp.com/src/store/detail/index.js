import { reqGoodInfoAPI, reqAddOrUpdateShopCart } from '@/api'
import {getUUid} from '@/utils/UuidToken'
const state = {
  goodInfo: {},
  uuidtoken:getUUid()
}// 存储数据
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo=goodInfo
 }
}// 修改state数据的唯一手段
const actions = {
  // 获取商品的信息
 async getGoodInfo({commit},id) {
    const res = await reqGoodInfoAPI(id)
    commit('GETGOODINFO',res.data)
  },
  // 将商品添加到购物车中
  async addShopCart(_, { skuId, skuNum }) { // _是一个参数占位符
  return await reqAddOrUpdateShopCart({ skuId, skuNum })
  }
}// 发送给mutations,处理异步
const getters = {
  // 导航面包屑
  categoryView(state) {
    return state.goodInfo.categoryView||{}
  },
  // 产品信息
  skuInfo(state) {
    return state.goodInfo.skuInfo||{}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList||[]
  }
}// 相当于计算属性，简化仓库数组
export default {
  state,
  mutations,
  actions,
  getters
}