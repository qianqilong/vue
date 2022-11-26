import { ajax } from '@/utils/ajax'
import type {
  category,
  BrandResult,
  BannerResult,
  NewResult,
  HotResult,
  GoodsResult,
  SpecialResult,
  cateResult,
  filterResult,
  subListResult,
  goodDetailResult,
  cityObject,
  commentObject,
  commentListRootObject,
  LoginResult,
  skuResult,
  PayResult,
  orderResult,
} from './types'
import type { listType } from '@/stores/module/cart'

// json->ts Shift + Ctrl + Alt + V
// 头部分类数据默认数据
export const topCategory = ['居家', '美食', '服饰', '母婴', '个护', '严选', '数码', '运动', '杂货']
// 获取首页头部分类数据
export const getAllCategoryAPI = () =>
  ajax.request<category[]>({
    url: '/home/category/head',
    method: 'GET',
  })

// 获取品牌信息
export const getBrandAPI = (limit?: string) =>
  ajax.request<BrandResult[]>({
    url: '/home/brand',
    method: 'GET',
    params: {
      limit,
    },
  })

// 获取轮播图信息
export const getBannerAPI = () =>
  ajax.request<Array<BannerResult>>({
    url: '/home/banner',
    method: 'GET',
  })

// 获取新鲜好物信息
export const getNewAPI = () =>
  ajax.request<Array<NewResult>>({
    url: '/home/new',
    method: 'GET',
  })

//  获取人气爆款
export const getHotAPI = () =>
  ajax.request<Array<HotResult>>({
    url: 'home/hot',
    method: 'GET',
  })

// 获取商品信息
export const getGoodsAPI = () =>
  ajax.request<Array<GoodsResult>>({
    url: 'home/goods',
    method: 'GET',
  })

// 获取最新专题
export const getSpecialAPI = () =>
  ajax.request<Array<SpecialResult>>({
    url: 'home/special',
    method: 'GET',
  })

// 获取顶级分类信息
export const getTopCategoryAPI = (id: number) =>
  ajax.request<cateResult>({
    url: '/category',
    method: 'GET',
    params: {
      id,
    },
  })

//  获取二级分类筛选条件数据
export const getSubCategoryFilter = (id: any) =>
  ajax.request<filterResult>({
    url: '/category/sub/filter',
    method: 'GET',
    params: {
      id,
    },
  })

// 获取数据
export const getSubCategoryGoodsAPI = (data: {
  inventory?: boolean // 是否有库存
  page: number
  pageSize: number
  onlyDiscount?: boolean // 显示特惠
  sortMethod?: string // asc:desc
  sortField?: string
}) =>
  ajax.request<subListResult>({
    url: '/category/goods/temporary',
    method: 'POST',
    data,
  })

// 获取商品详情
export const getGoodsDetailAPI = (id: string) =>
  ajax.request<goodDetailResult>({
    url: '/goods',
    method: 'GET',
    params: {
      id,
    },
  })

// 获取城市信息
export const getCityDataAPI = () =>
  ajax.request<Array<cityObject>>({
    url: 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json',
    method: 'GET',
  })

// 获取推荐信息
export const getRelGoodsAPI = (id: number, limit = 16) =>
  ajax.request<Array<goodDetailResult>>({
    url: '/goods/relevant',
    method: 'GET',
    params: {
      id,
      limit,
    },
  })

// 获取商品热点
export const getHotGoodsAPI = (params: { id: string; type: number; limit: number }) =>
  ajax.request<Array<HotResult>>({
    url: '/goods/hot',
    method: 'GET',
    params,
  })

// 获取文章评论
export const getCommentInfoByGoodsAPI = (id: string) =>
  ajax.request<commentObject>({
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    method: 'GET',
  })

// 获取评论列表
export const getCommentListByGoodsAPI = (id: string, params: any) =>
  ajax.request<commentListRootObject>({
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    method: 'GET',
    params,
  })

// 登录
export const userAccountLoginAPI = (user: { account: string; password: string }) =>
  ajax.request<LoginResult>({
    url: 'login',
    method: 'POST',
    data: user,
  })

// 获取短信验证码
export const userMobileLogincodeAPI = (mobile: string) =>
  ajax.request({
    url: '/login/code',
    method: 'GET',
    params: { mobile },
  })

// 短信验证登录
export const userMobileLoginAPI = (data: { mobile: string; code: string }) =>
  ajax.request<LoginResult>({
    url: '/login/code',
    method: 'POST',
    data,
  })
/**
 * 第三方登录
 * @param {String} unionId - 第三方登录唯一标识
 * @param {Integer} source - 来源 1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq,7为微信
 * @returns Promise
 */
export const userQQLoginAPI = (unionId: string, source = 6) =>
  ajax.request<LoginResult>({
    url: '/login/social',
    method: 'POST',
    data: { unionId, source },
  })
// 获取短信验证码
export const userQQLoginCodeAPI = (mobile: string) =>
  ajax.request({
    url: '/login/social/code',
    method: 'GET',
    params: { mobile },
  })
// 绑定账号
export const userQQLoginBindAPI = (unionId: string, mobile: string, code: string) =>
  ajax.request({
    url: '/login/social/bind',
    method: 'POST',
    data: {
      unionId,
      mobile,
      code,
    },
  })
// 检测账号是否存在
export const userCheckAccountAPI = (account: string) =>
  ajax.request<any>({
    url: '/register/check',
    method: 'GET',
    params: {
      account,
    },
  })

// 注册
export const userregisterAPI = (data: { account: string; password: string; code: string; mobile: string }) =>
  ajax.request<any>({
    url: '/register',
    method: 'POST',
    data,
  })

// 获取短信验证码
export const userregisterCodeAPI = (mobile: string) =>
  ajax.request<any>({
    url: '/register/code',
    method: 'GET',
    params: {
      mobile,
    },
  })
// 获取购物车的商品信息
export const getNewCartGoodsAPI = (skuId: string) =>
  ajax.request({
    url: `/goods/stock/${skuId}`,
    method: 'GET',
  })

/**
 * 获取商品的specs和skus
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getSpecsAndSkusAPI = (skuId: string) =>
  ajax.request<skuResult>({
    url: `/goods/sku/${skuId}`,
    method: 'GET',
  })

/**
 * 合并本地购物车
 * @param {Array<object>} cartList - 本地购物车数组
 * @param {String} item.skuId - 商品SKUID
 * @param {Boolean} item.selected - 是否选中
 * @param {Integer} item.count - 数量
 */
export const mergeCartAPI = (cartList: Array<{ skuId: string; selected: boolean; count: number }>) =>
  ajax.request({
    url: '/member/cart/merge',
    method: 'POST',
    data: cartList,
  })

// 获取线上购物车列表
export const getCartListAPI = () =>
  ajax.request<listType[]>({
    url: '/member/cart',
    method: 'GET',
  })

/**
 * 加入购物车
 * @param {String} skuId - 商品SKUID
 * @param {Integer} count - 商品数量
 * @returns Promise
 */
export const insertCartAPI = (data: { skuId: string; count: number }) =>
  ajax.request<listType>({
    url: '/member/cart',
    method: 'post',
    data,
  })
/**
 * 删除商品（支持批量删除）
 * @param {Array<string>} ids - skuId集合
 * @returns Promise
 */
export const deleteCartAPI = (ids: Array<string>) =>
  ajax.request({
    url: '/member/cart',
    method: 'delete',
    data: {
      ids,
    },
  })

/**
 * 修改购物车商品的状态和数量
 * @param {String} goods.skuId - 商品sku
 * @param {Boolean} goods.selected - 选中状态
 * @param {Integer} goods.count - 商品数量
 * @returns Promise
 */
export const updateCartAPI = (cartList: { skuId: string; selected: boolean; count: number }) =>
  ajax.request({
    url: '/member/cart/' + cartList.skuId,
    method: 'put',
    data: cartList,
  })
/**
 * 全选反选
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} ids - 有效商品skuId集合
 * @returns Promise
 */
export const checkAllCartAPI = (data: { selected: boolean; ids: Array<string> }) =>
  ajax.request({
    url: '/member/cart/selected',
    method: 'put',
    data,
  })
// 添加收货地址
export const addAddressAPI = (address: any) =>
  ajax.request({
    url: '/member/address',
    method: 'POST',
    data: address,
  })
/**
 * 获取结算信息
 */
export const getCheckoutInfoAPI = () =>
  ajax.request<PayResult>({
    url: '/member/order/pre',
    method: 'GET',
  })

/**
 * 提交订单
 * @param {Object} order - 订单信息对象
 */
export const createOrderAPI = (data: {
  addressId: string
  deliveryTimeType: number
  payType: number
  buyerMessage: string
  goods: any[]
}) =>
  ajax.request({
    url: '/member/order',
    method: 'POST',
    data,
  })
/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const getOrderAPI = (id: string) =>
  ajax.request({
    url: '/member/order/' + id,
    method: 'GET',
  })

// mock我的收藏
export const getCollectAPI = ({ page = 1, pageSize = 10, collectType = 1 }) => {
  return ajax.request({
    url: '/user/collect',
    method: 'GET',
    params: { page, pageSize, collectType },
  })
}
export const orderStatus = [
  { name: 'all', label: '全部订单' },
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待发货' },
  { name: 'receive', label: '待收货' },
  { name: 'comment', label: '待评价' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' },
]
/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
export const getOrderListAPI = (params: { orderState: number; page: number; pageSize: number }) =>
  ajax.request<orderResult>({
    url: '/member/order',
    method: 'GET',
    params,
  })
/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const cancelOrderAPI = (orderId: string, cancelReason: string) =>
  ajax.request<orderResult>({
    url: `/member/order/${orderId}/cancel`,
    method: 'PUT',
    data: { cancelReason },
  })
/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
export const delteOrderAPI = (ids: Array<string>) =>
  ajax.request({
    url: '/member/order',
    method: 'delete',
    data: { ids },
  })
/**
 * 查看物流
 * @param {String} id - 订单ID
 * @returns
 */
export const logisticsOrderAPI = (id: string) =>
  ajax.request({
    url: `/member/order/${id}/logistics`,
    method: 'get',
  })
// 确认收货
export const receiptOrderAPI = (id: string) =>
  ajax.request({
    url: `/member/order/${id}/receipt`,
    method: 'PUT',
  })
