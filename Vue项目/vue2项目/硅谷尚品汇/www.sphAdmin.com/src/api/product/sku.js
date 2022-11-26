import ajax from '@/api/ajax'
// 获取sku列表 GET /admin/product/list/{page}/{limit}
export const getSkulistAPI = (page, limit) => {
  return ajax({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'GET'
  })
}
// 上架 GET /admin/product/onSale/{skuId}
export const getSaleAPI = (skuId) => {
  return ajax({
    url: `/admin/product/onSale/${skuId}`,
    method: 'GET'
  })
}
// 下架 GET /admin/product/cancelSale/${skuId}
export const getcancelAPI = (skuId) => {
  return ajax({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'GET'
  })
}
// 获取sku详情的接口GET /admin/product/getSkuById/${skuId}
export const getSkuAPI = (skuId) => {
  return ajax({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'GET'
  })
}
