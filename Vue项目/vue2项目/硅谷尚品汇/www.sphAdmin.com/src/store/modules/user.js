import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes, anyRoutes } from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    buttons: [],
    roles: [],
    reslutsRoutes: [],
    // 展示的路由
    reslutsAllRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
//  存储用户信息
  SET_USERINFO: (state, userinfo) => {
    state.name = userinfo.name
    state.avatar = userinfo.avatar
    // 菜单权限标记
    state.routes = userinfo.routes
    // 
    state.buttons = userinfo.buttons
    // roles角色
    state.roles = userinfo.roles
  },
  // 存放异步路由
  SET_ROUTES: (state, reslutsRoutes) => {
    // 保存了异步路由
    state.reslutsRoutes = reslutsRoutes
    // 计算其他路由
    state.reslutsAllRoutes = constantRoutes.concat(state.reslutsRoutes, anyRoutes)
    router.addRoutes(state.reslutsAllRoutes)
  }
}
const compuends = (Routes, routes) => {
  // 过滤
 return Routes.filter(item => {
    if (routes.indexOf(item.name) !== -1) {
      if (item.children && item.children.length) { 
        item.children = compuends(item.children, routes)
      }
    
      return true
    }
 })
}
const actions = {
  // 登陆
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const res = await login({ username: username.trim(), password: password })
    if (res.code === 20000) {
      commit('SET_TOKEN', res.data.token)
      setToken(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
// data中包含的按键的信息，
        // 路由信息
        commit('SET_USERINFO', data)
        commit('SET_ROUTES', compuends(asyncRoutes, data.routes))
        
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登陆
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

