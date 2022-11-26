// 用于操作token的三个方法
const key = 'geel-itheima'
// 设置token
export const setToken = (token) => {
  localStorage.setItem(key, token)
}
// 获取token
export const getToken = () => localStorage.getItem(key)

// 删除token
export const removeToken = () => {
  localStorage.removeItem(key)
}
