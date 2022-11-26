import ajax from '@/api/ajax'
// 获取spu数据GET /admin/product/{page}/{limit}
export const getSpuListAPI = ({ page, limit, category3Id }) => {
  return ajax({
    url: `/admin/product/${page}/${limit}`,
    method: 'GET',
    params: {
      category3Id
    }
  })
}
// 获取品牌数据GET /admin/product/baseTrademark/getTrademarkList
export const getSpubrandAPI = () => {
  return ajax({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'GET'
  })
}
// 获取销售属性GET /admin/product/baseSaleAttrList
export const getSpuSalesAPI = () => {
  return ajax({
    url: '/admin/product/baseSaleAttrList',
    method: 'GET'
  })
}
// 获取某一个spu信息 GET /admin/product/getSpuById/{spuId}
export const getSpuInfoAPI = (spuId) => {
  return ajax({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'GET'
  })
}
// 获取某个spu的图片信息GET /admin/product/spuImageList/{spuId}
export const getSpuPotoAPI = (spuId) => {
  return ajax({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'GET'
  })
}
// 更新spu数据 POST /admin/product/saveSpuInfo
export const updateSpuInfoAPI = (SpuInfo) => {
  return ajax({
    url: '/admin/product/saveSpuInfo',
    method: 'post',
    data: {
      SpuInfo: SpuInfo
    }
  })
}
// 获取图片 get /admin/product/spuImageList/5704
export const getSpuImageAPI = (spuId) => {
  return ajax({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}
// 获取销售属性数据 /admin/product/spuSaleAttrList/5704
export const getSpuSaleAPI = (spuId) => {
  return ajax({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}
// 获取属性信息 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const getarrSpuInfoAPI = (category1Id, category2Id, category3Id) => {
  return ajax({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}
// 添加skuPOST /admin/product/saveSkuInfo
export const addSpuinfo = (skuInfo) => {
  return ajax({
    url: '/admin/product/saveSkuInfo',
    method: 'POST',
    data: {
      skuInfo
    }
  })
}
// 获取sku列表数组 GET /admin/product/findBySpuId/{spuId}
export const getSkulist = (spuId) => {
  return ajax({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'GET'
  })
}

// 删除spu /admin/product/deleteSpu/{spuId}
export const deleteSpu = (spuId) => {
  return ajax({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}
