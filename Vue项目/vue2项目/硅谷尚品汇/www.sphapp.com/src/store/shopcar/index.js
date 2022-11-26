import { reqCarListAPI,reqDeleteCarAPI,reqcheckCartAPI} from "@/api"
const state = {
  carlist:[]
}// 存储数据
const mutations = {
  GETCARLIST(state, carlist) {
    state.carlist=carlist
  }
}// 修改state数据的唯一手段
const actions = {
  // 获取商品列表
async  getCarlist({ commit }) {
    const {data } = await reqCarListAPI()
    commit('GETCARLIST',data)
  },
  // 删除一个商品
  async getDeleteCarAPI(_, skuId) {
    const res = await reqDeleteCarAPI(skuId);
    if (res.code == 200) {
      return 'ok'
    } else {
      return new Promise.reject(new Error)
    }
  },
  // 切换商品的选择状态
  async getcheckCartAPI(_, { skuId,isChecked}) {
    const res = await reqcheckCartAPI({ skuId, isChecked })
    if (res.code == 200) {
       return "ok"
    } else {
      return Promise.reject(new Error)
     }
  },
  //  遍历计算属性中的数组如果是勾选状态就是要删除
  async getDeleteChooseCarAPI({dispatch,getters}) {
    let PromiseAll=[]
    getters.carlist.cartInfoList.forEach(item => {
      if(item.isChecked==1){
        let promise = dispatch('getDeleteCarAPI', item.skuId)
        PromiseAll.push(promise)
      }
      return Promise.all(PromiseAll)
    })
  },
  // 修改全部商品的选中状态
  getchangeAllChoose({ dispatch, state }, isChecked) {
    let PromiseAll=[]
    state.carlist[0].cartInfoList.forEach(item => {
      let promise = dispatch('getcheckCartAPI', { skuId: item.skuId, isChecked })
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }
}// 发送给mutations,处理异步
const getters = {
  carlist(state) {
    return state.carlist[0]||{}
  }
}// 相当于计算属性，简化仓库数组
export default {
  state,
  mutations,
  actions,
  getters
}