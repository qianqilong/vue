
/**
 * 所有API的入口文件
 * 封装接口方法,
 * 每个方法负责请求一个url地址
 * 逻辑页面导入这个接口方法就可以发送请求
 * 请求的url地址可以统一管理
 *  */
import axios from '../utils/request'
export * from './AriicleDetail.js'// 引入并且暴露出去
export * from './User'
// 登陆接口
// axios中会自动携带请求参数(headers)里Content-Type:application/json
export const loginAPI = ({ mobile, code }) =>
  axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })

// 获取所有频道
export const getAllChannelsAPI = () =>
  axios({
    url: '/v1_0/channels',
    method: 'GET'
  })

// 获取用户选择频道，用户没登陆就会返回默认频道
export const getUserChannelsAPI = () =>
  axios({
    url: '/v1_0/user/channels',
    method: 'GET'

  })
// 更新频道--覆盖式
export const updateChannelsAPI = ({ channels }) =>
  axios({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: { channels }
  })
// 删除对应id的频道
export const removeChannelAPI = (id) =>
  axios({
    url: `/v1_0/user/channels/${id}`, // 对于node.js :后的数据是存放在params中的，？后面是放在query
    method: 'DELETE'
  })

// 获取搜索列表接口
export const suggestListAPI = ({ keyword }) =>
  axios({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q: keyword
    }
  })

// 搜索结果列表
export const searchResultAPI = ({ page = 1, per_page = 10, q }) =>
  axios({
    url: '/v1_0/search',
    method: 'GET',
    params: {
      page,
      per_page,
      q
    }
  })
