// 接口统一管理
import ajax from './ajax.js'
import mockajax from './mockajax.js'
// 首页-三级联动菜单的获取GET
export const reqCategoryListAPI = () =>
  ajax({
    url: '/product/getBaseCategoryList'
  })

//获取首页轮播图
export const reqBannerListAPI = () =>
  mockajax({
    url: '/banner'
  })
// 楼层页面数据
export const reqFloorAPI = () =>
  mockajax({
    url: '/floor'
  })
// 获取搜索模块数据
export const reqSearchList = (data) => {
  return ajax({
    url: '/list',
    method: 'POST',
    data
  })
}
// 获取商品详情信息接口
export const reqGoodInfoAPI = (id) => {
  return ajax({
    url: `/item/${id}`,
    method: 'GET'
  })
}
// 添加到购物车(对已有物品进行数量改动)
export const reqAddOrUpdateShopCart = ({ skuId, skuNum }) => {
  return ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })
}
// 获取购物车列表
export const reqCarListAPI = () => {
  return ajax({
    url: '/cart/cartList',
    method: 'get'
  })
}
// 删除购物车产品
export const reqDeleteCarAPI = (skuId) => {
  return ajax({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}
// 修改商品选中状态
export const reqcheckCartAPI = ({ skuId, isChecked }) => {
  return ajax({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
  })
}
// 获取验证码
export const reqgetverificationCodeAPI = (phone) => {
  return ajax({
    url: `/user/passport/sendCode/${phone}`
  })
}
// 注册的接口
export const reqRegisterAPI = ({ phone, password, code, }) => {
  return ajax({
    url: '/user/passport/register',
    method: 'POST',
    data: {
      phone,
      password,
      code
    }
  })
}
// 用户登录的接口
export const reqLoginAPI = ({ phone, password }) => {
  return ajax({
    url: '/user/passport/login',
    method: "POST",
    data: {
      phone, password
    }
  })
}

// 获取用户信息用token
export const reqUserIInfoAPI = () => {
  return ajax({
    url: '/user/passport/auth/getUserInfo',
    method: 'GET'
  })
}

// 退出登陆清除token时间
export const reqLogoutAPI = () => {
  return ajax({
    url: '/user/passport/logout',
    method: 'GET'
  })
}

// 获取用户地址信息
export const reqaddressAPI = () => {
  return ajax({
    url: '/user/userAddress/auth/findUserAddressList'
  })
}

// 获取订单交易信息
export const reqOrderAPI = () => {
  return ajax({
    url: '/order/auth/trade'
  })
}

// 提交订单
export const submitOrderAPI = (
  {
    traderNo,
    consignee,
    consigneeTel,
    deliveryAddress,
    paymentWay,
    orderComment,
    orderDetailList
  }
) => {
  return ajax({
    url: `/order/auth/submitOrder?tradeNo=${traderNo}`,
    method: 'POST',
    data: {
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay,
      orderComment,
      orderDetailList
    }
  })
}
// 获取订单支付信息
export const reqorderpay = (orderId) => {
  return ajax({
    url: `/payment/weixin/createNative/${orderId}`
  })
}

// 获取订单支付状态
export const reqpaystate = (orderId) => {
  return ajax({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    
  })
}

// 获取我的订单
export const reqMyorderAPI = ({ page, limit })=>{
  return ajax({
    url:`/order/auth/${page}/${limit}`
  })
}