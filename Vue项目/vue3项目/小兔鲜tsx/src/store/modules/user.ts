// 用户模块
interface stateInterface{
    profile:object
}
export default {
  namespaced: true,
  state () {
    return {
      //  用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    setUser (state:stateInterface, payload:object) {
      state.profile = payload
    }
  }
}
