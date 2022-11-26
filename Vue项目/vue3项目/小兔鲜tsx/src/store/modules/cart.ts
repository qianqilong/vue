// 购物车模块
export default {
  namespaced: true,
  state () {
    return {
    // 购物车列表
      list: []
    }
  },
  mutations: {
    GETCARTLIST (state:any, list:any) {
      // state.list = []
      if (state.list.length === 0) {
        state.list.push(list)
        return
      }
      // eslint-disable-next-line array-callback-return
      state.list.some((item:any) => {
        // 如果id相同就number加上去
        if (item.id === list.id) {
          item.number += list.number
        } else {
          state.list.push(list)
          return true
        }
      })
    },
    DELETECARTLIST (state:any, list:any) {
      const index = state.list.findIndex((item:any) => item.id === list.id)
      state.list.splice(index, 1)
    },
    SETNUMBER (state:any, number:any) {
      // eslint-disable-next-line array-callback-return
      state.list.some((item:any, index:number) => {
        item.number = number[index]
      })
    }
  },
  actions: {
    // 存入
    getcartList (ctx:any, goodsInfo:any) {
      if (ctx.rootState.user.profile.token !== '') {
        // 登录情况
      } else {
        // 没有登录
        ctx.commit('GETCARTLIST', goodsInfo)
      }
    },
    // 删除
    deletecartList (ctx:any, goodsInfo:any) {
      if (ctx.rootState.user.profile.token !== '') {
        // 登录情况
      } else {
        // 没有登录
        ctx.commit('DELETECARTLIST', goodsInfo)
      }
    },
    // 修改数量
    setNumber (ctx:any, number:any) {
      if (ctx.rootState.user.profile.token !== '') {
        // 登录情况
      } else {
        // 没有登录
        ctx.commit('SETNUMBER', number)
      }
    }
  }
}
