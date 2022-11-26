import { reqCategoryListAPI } from '@/api'
import { reqBannerListAPI } from '@/api'
import {reqFloorAPI} from '@/api'
const state = {
  categoryList: [],
  BannerList: [],
  FloorList:[]
}// 存储数据

const mutations = {
  CATEGORYLIST(state,categoryList) {
    state.categoryList=categoryList
  },
  BANNERLIST(state, BannerList) {
    state.BannerList=BannerList
  },
  FLOORAPI(state, FloorList) {
    state.FloorList=FloorList
  }
}// 修改state数据的唯一手段

const actions = {
  // 通过api接口函数调用---三级联动菜单
 async categoryList({commit}) {
    const { data } = await reqCategoryListAPI()
    commit("CATEGORYLIST",data)
  },
  async BannerList({commit}){
    const {data} =await reqBannerListAPI()
    commit('BANNERLIST',data)
  },
  async FloorList({ commit }) {
    const { data } = await reqFloorAPI()
    commit('FLOORAPI',data)
}
}// 发送给mutations,处理异步

const getters={}// 相当于计算属性，简化仓库数组
export default {
  state,
  mutations,
  actions,
  getters
}