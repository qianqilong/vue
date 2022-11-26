import { reqgetverificationCodeAPI, reqRegisterAPI, reqLoginAPI, reqUserIInfoAPI,reqLogoutAPI } from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
const state = {
  verify: '',
  token: getToken(),
  userInfo:''
}// 存储数据
const mutations = {
  GETVERIFICATIONCODE(state, verify) {
    state.verify=verify
  },
  GETLOGIN(state, token) {
    state.token=token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo=userInfo
  },
  GETLOGOUT(state) {
    state.userInfo = ''
    state.token=''
  }
}// 修改state数据的唯一手段
const actions = {
  // 获取验证码
  async getverificationCode({commit},phone) {
    const res = await reqgetverificationCodeAPI(phone)
    if (res.code==200) {
      commit('GETVERIFICATIONCODE', res.data)
      return 'OK'
    } else {
      return new Promise.reject(new Error)
   }
  },
  // 注册业务
  async getRegister(_, user) {
    const res = await reqRegisterAPI(user)
    if (res.code == 200) {
      return "OK"
    } else {
      return new Promise.reject(new Error)
    }
 
  },
  // 登录业务
  async getLogin({commit}, user) {
    const res = await reqLoginAPI(user)
    if (res.code == 200) {
      // 持久化存储
      setToken(res.data.token)
    commit('GETLOGIN',res.data.token)
      return "ok"
    } else {
      return Promise.reject(new Error())
   }
  },
  // 校检用户的token信息
  async getUserInfo({commit}) {
    const res = await reqUserIInfoAPI()
    if (res.code == 200) {
      commit('GETUSERINFO', res.data)
      return "ok"
    } else {
      return Promise.reject(new Error())
    }
    
  },
  // 退出登陆
  async getLogout({commit}) {
    const res = await reqLogoutAPI()
    if (res.code == 200) {
      // 清除token,清除vuex中的数据
      removeToken()
      commit('GETLOGOUT')
      return"ok"
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