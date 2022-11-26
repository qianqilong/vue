import ajax from '@/utils/ajax'
// 获取一级分类列表

export const getAllCategoryAPI = () =>
  ajax({
    url: '/home/category/head',
    method: 'GET'
  })
// 获取品牌信息
export const findBrandAPI = (limit:number) => {
  return ajax(
    {
      url: '/home/brand',
      method: 'GET',
      params: { limit }
    }
  )
}
// 获取轮播图
export const findbBannerAPI = () => {
  return ajax({
    url: '/home/banner',
    method: 'GET'
  })
}
// 获取新鲜好物
export const findNewAPI = () => {
  return ajax({
    url: '/home/new',
    method: 'GET'
  })
}
// 获取人气推荐
export const findHotAPI = () => {
  return ajax({
    url: '/home/hot',
    method: 'GET'
  })
}
// 获取食物
export const findGoodsAPI = () => {
  return ajax({
    url: '/home/goods',
    method: 'GET'
  })
}
// 获取最新专题
export const findSpecialAPI = () => {
  return ajax({
    url: '/home/special',
    method: 'GET'
  })
}
// 获取商品分类
export const findTopCategoryAPI = (id:any) => {
  return ajax({
    url: '/category',
    method: 'GET',
    params: { id }
  })
}
export const findSubCategoryFilter = (id:any) => {
  return ajax({
    url: '/category/sub/filter',
    method: 'GET',
    params: { id }
  })
}
// 获取分类下的商品
export const findSubCategoryGoods = (params:any) => {
  return ajax({
    url: '/category/goods/temporary',
    method: 'post',
    data: params
  })
}
// 获取商品详情
export const findGoodsdetailAPI = (id:string) => {
  return ajax({
    url: '/goods',
    method: 'GET',
    params: { id }
  })
}
// 获取城市信息
export const getCityDataAPI = () => {
  return ajax({
    url: 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json',
    method: 'get'
  })
}
// 获取推荐商品
export const findRelGoodsAPI = (id:any, limit = 16) => {
  return ajax({
    url: '/goods/relevant',
    method: 'GET',
    params: { id, limit }
  })
}
// 获取热点商品
export const findHotGoodsAPI = (id:any, type:any, limit = 3) => {
  return ajax({
    url: '/goods/hot',
    method: 'get',
    params: { id, type, limit }
  })
}
// 获取商品的评价统计信息

export const findCommentInfoByGoodsAPI = (id:any) => {
  return ajax({
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    method: 'GET'
  })
}
// 获取评论列表
export const findCommentInfoByGoodListsAPI = (id:any, page:any, pageSize:any) => {
  return ajax({
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    method: 'GET',
    params: { page, pageSize }
  })
}
// 登录
export const userAccountLoginAPI = (account:any, password:any) => {
  return ajax({
    url: '/login',
    method: 'POST',
    data: { account, password }
  })
}
// 获取验证码
export const userMobileLoginMsgAPI = (mobile:string) => {
  return ajax({
    url: '/login/code',
    method: 'get',
    params: { mobile }
  })
}

// 验证码登录
export const userMobileLoginAPI = (mobile:string, code:string) => {
  return ajax({
    url: '/login/code',
    method: 'post',
    data: { mobile, code }
  })
}
