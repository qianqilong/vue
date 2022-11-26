// 商品分类的信息
export interface category {
  id: string
  name: string
  picture: string
  children: categorychildren[]
  goods: categorygoods[]
  open?: boolean
  brand?: BrandResult[]
}

interface categorygoods {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum?: any
}

interface categorychildren {
  id: string
  name: string
  picture: string
  children?: any
  goods?: any
}

// 品牌的数据类型
export interface BrandResult {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type?: any
  desc: string
  place: string
}

// 轮播图的信息
export interface BannerResult {
  id: string
  imgUrl: string
  hrefUrl: string
  type: string
}

// 新鲜好物的信息
export interface NewResult {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

// 人气推荐的信息
export interface HotResult {
  id: string
  picture: string
  title: string
  alt: string
}

// 商品信息
export interface GoodsResult {
  id: string
  name: string
  picture: string
  saleInfo: string
  children: Child[]
  goods: Good[]
}

export interface Good {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

interface Child {
  id: string
  name: string
  layer: number
  parent?: any
}

export interface SpecialResult {
  creator: string
  isDelete: number
  createTime: string
  updateTime: string
  id: string
  classificationId: string
  title: string
  summary: string
  lowestPrice: number
  cover: string
  detailsUrl: string
  collectNum: number
  viewNum: number
  replyNum: number
}

// 顶层分类
export interface cateResult {
  id: string
  name: string
  picture?: any
  children: cateChild[]
}

interface cateChild {
  id: string
  name: string
  picture: string
  parentId?: any
  parentName?: any
  goods: cateGood[]
  categories?: any
  brands?: any
  saleProperties?: any
}

export interface cateGood {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

//  筛选区
export interface filterResult {
  id: string
  name: string
  picture?: any
  parentId: string
  parentName: string
  goods: filterGood[]
  categories: filterCategory[]
  brands: filterBrand[]
  saleProperties: filterSaleProperty[]
}

interface filterSaleProperty {
  id: string
  name: string
  properties: filterProperty[]
  selectedProp?: any
}

interface filterProperty {
  id: string
  name: string
}

interface filterBrand {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type?: any
  desc: string
  place: string
}

interface filterCategory {
  id: string
  name: string
  layer: number
  parent?: any
}

interface filterGood {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

// 筛选出的列表
export interface subListResult {
  counts: number
  pageSize: number
  pages: number
  page: number
  items: subListItem[]
}

export interface subListItem {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

// 商品详情接口
export interface goodDetailResult {
  id: string
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  brand: Brand
  salesCount: number
  commentCount: number
  collectCount: number
  mainVideos: any[]
  videoScale: number
  mainPictures: string[]
  specs: Spec[]
  skus: Skus[]
  categories: Category[]
  details: Details
  isPreSale: boolean
  isCollect?: any
  recommends?: any
  userAddresses?: any
  similarProducts: SimilarProduct[]
  hotByDay: SimilarProduct[]
  evaluationInfo?: any
  picture?: string
}

interface SimilarProduct {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

interface Details {
  pictures: string[]
  properties: Property[]
}

interface Property {
  name: string
  value: string
}

interface Category {
  id: string
  name: string
  layer: number
  parent?: Parent
}

interface Parent {
  id: string
  name: string
  layer: number
  parent?: any
}

export interface Skus {
  id: string
  skuCode: string
  price: string
  oldPrice: string
  inventory: number
  specs: Spec2[]
}

interface Spec2 {
  name: string
  valueName: string
}

export interface Spec {
  name: string
  id: string
  values: Value[]
  disabled?: boolean
}

export interface Value {
  name: string
  picture: string
  desc: string
  selected?: boolean
}

interface Brand {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type?: any
  desc?: any
  place?: any
}

// 城市的信息
export interface cityObject {
  code: string
  level: number
  name: string
  areaList: AreaList2[]
}

export interface AreaList2 {
  code: string
  level: number
  name: string
  areaList: AreaList[]
}

export interface AreaList {
  code: string
  level: number
  name: string
  areaList?: []
}

// 热点
export interface HotResult {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount?: any
  orderNum: number
}

// 评论
export interface commentObject {
  msg: string
  result: commentResult
}

export interface commentResult {
  salesCount: number
  praisePercent: string
  evaluateCount: number
  hasPictureCount: number
  tags: commentTag[]
}

interface commentTag {
  type?: string
  title: string
  tagCount: number
}

// 评论列表
export interface commentListRootObject {
  result: commentListResult
}

interface commentListResult {
  counts: number
  page: string
  pageSize: number
  pages: number
  items: commentListItem[]
}

export interface commentListItem {
  id: number
  orderInfo: commentListOrderInfo
  member: commentListMember
  score: number
  tags: string[]
  content: string
  pictures: string[]
  officialReply: string
  praiseCount: number
  createTime: string
}

interface commentListMember {
  id: string
  nickname: string
  avatar: string
}

interface commentListOrderInfo {
  specs: commentListSpec[]
  quantity: number
  createTime: string
}

interface commentListSpec {
  name: string
  nameValue: string
}

// 登录的数据
export interface LoginResult {
  id: string
  account: string
  mobile: string
  token: string
  avatar: string
  nickname: string
  gender: string
  birthday: string
  cityCode: string
  provinceCode: string
  profession: string
}

// goodsku信息
export interface skuResult {
  specs: Spec[]
  skus: Skus[]
}
export type addrType = {
  provinceCode: string
  cityCode: string
  countyCode: string
  Consignee: string
  mobile: string
  Region: string
  address: string
  postalCode: string
  addressLabel: string
}

// 订单信息
export interface PayResult {
  userAddresses: UserAddress[]
  goods: PayGood[]
  summary: PaySummary
}

export interface PaySummary {
  goodsCount: number
  totalPrice: number
  totalPayPrice: number
  postFee: number
  discountPrice: number
}

export interface PayGood {
  id: string
  name: string
  picture: string
  count: number
  skuId: string
  attrsText: string
  price: string
  payPrice: string
  totalPrice: string
  totalPayPrice: string
}

export interface UserAddress {
  id: string
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  address: string
  isDefault: number
  fullLocation: string
  postalCode: string
  addressTags: string
}

// 订单信息
export interface orderResult {
  counts: number
  pageSize: number
  pages: number
  page: number
  items: orderItem[]
}

export interface orderItem {
  id: string
  createTime: string
  payType: number
  orderState: number
  payLatestTime: string
  postFee: number
  payMoney: number
  totalMoney: number
  totalNum: number
  skus: orderSkus[]
  payChannel: number
  countdown: number
}

interface orderSkus {
  id: string
  spuId: string
  name: string
  quantity: number
  image: string
  realPay: number
  curPrice: number
  totalMoney?: any
  properties: orderProperty[]
  attrsText: string
}

interface orderProperty {
  propertyMainName: string
  propertyValueName: string
}
