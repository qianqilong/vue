/**
 * 用户相关操作的API
 */
import axios from '../utils/request'
import { getStorage } from '../utils/storage'
 // 用户---关注用户
 export const focusOnUsersAPI = ({ id }) =>
 axios({
   url: '/v1_0/user/followings',
   method: 'POST',
   data: {
     target: id
   }
   })

   // 用户---取消关注用户
export const blurOnUsersAPI = ({ id }) =>
 axios({
   url: `/v1_0/user/followings/${id}`,
   method: 'DELETE'
 })

 // 用户--- 个人资料的获取
export const myUserInfoAPI = () =>
 axios({
   url: '/v1_0/user',
   method: 'GET'
   })

   // 用户---查看用户
   export const userInfoAPI = () =>
 axios({
   url: '/v1_0/user/profile',
   method: 'GET'
 })
   // 用户--- 更新头像
export const updatePhotoAPI = (fd) =>
 axios({
   url: '/v1_0/user/photo',
   method: 'PATCH',
   data: fd// 传过来的表单对象
   // 如果你的请求时一个表单对象，你不用自己添加请求头，浏览器会自己给你加请请求头multipart/form-data
 })
     // 用户---更新基本资料
export const updateBasicInformationAPI = ({
 name,
 birthday
}) =>
 axios({
   url: '/v1_0/user/profile',
   method: 'PATCH',
   data: {
     name,
     birthday
   }
       })
 // 用户--- 获取新的token
export const getNewTokenAPI = () =>
 axios({
   url: '/v1_0/authorizations',
   method: 'PUT',
   headers: {
     Authorization: 'Bearer ' + getStorage('refresh_token')
   }
   })
