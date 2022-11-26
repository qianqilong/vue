// 封装本地存储的方式
// 使用localStorage sessionStorage还是cookie
export const setStorage = (key, val) => {
  localStorage.setItem(key, val)
}
export const getStorage = (key) =>
  localStorage.getItem(key)
export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
