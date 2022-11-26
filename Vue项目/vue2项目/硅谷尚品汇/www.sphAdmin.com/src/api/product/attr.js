// 平台属性管理的api接口
import ajax from '@/api/ajax'
// 一级分类的接口 GET /admin/product/getCategory1
export const getCategory1API = () => {
  return ajax({
    url: `/admin/product/getCategory1`,
   method: 'GET'
  })
}
// 获取二级分类/admin/product/getCategory2/{category1Id}
export const getCategory2API = (id) => {
  return ajax({
    url: `/admin/product/getCategory2/${id}`,
   method: 'GET'
  })
}
// 获取三级分类GET /admin/product/getCategory3/{category2Id}
export const getCategory3API = (id) => {
  return ajax({
    url: `/admin/product/getCategory3/${id}`,
   method: 'GET'
  })
}
// 获取全部商品属性 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const getAttrAllAPI = ({ id1, id2, id3 }) => {
  return ajax({
    url: `/admin/product/attrInfoList/${id1}/${id2}/${id3}`,
    method: 'GET'
  })
}
// 添加属性值 /admin/product/saveAttrInfo
export const SavaAttrInfoAPI = (data) => {
  return ajax({
    url: '/admin/product/saveAttrInfo',
    method: 'POST',
    data
  })
}
// 删除属性 DELETE /admin/product/deleteAttr/{attrId}
export const DeleteAttrInfoAPI = (attrId) => {
  return ajax({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'DELETE'
  })
}
