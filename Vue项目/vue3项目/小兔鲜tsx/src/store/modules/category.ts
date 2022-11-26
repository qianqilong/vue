// 购物车模块
import { getAllCategoryAPI } from '@/api'
const topCategory = [
  '居家',
  '美食',
  '服饰',
  '母婴',
  '个护',
  '严选',
  '数码',
  '运动',
  '杂货'
]

interface resinterface{
  code?:string,
  msg?:string,
  result?:object[]
 }
interface currcateInterface{
  children?: object[],
  goods?: object[],
  id?: string,
  name?:string,
  open?:boolean,
  picture?:string,
}
interface stateInterface{
  list?:Array<currcateInterface>
}
export default {
  namespaced: true,
  state () {
    return {
    //   分类信息
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    GETALLLIST (state:stateInterface, res:resinterface) {
      res.result?.forEach((item:any) => {
        item.open = false
      })
      state.list = res.result
    },
    // 定义控制open的数据
    show (state:stateInterface, id:string) {
      const currcate = state.list?.find((item:any) => item.id === id)
      currcate!.open = true
    },
    hide (state:stateInterface, id:string) {
      const currcate = state.list?.find((item:any) => item.id === id)
      currcate!.open = false
    }
  },

  // 需要向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getAllList (ctx:any) {
      const res = await getAllCategoryAPI()
      ctx.commit('GETALLLIST', res)
    }
  }
}
