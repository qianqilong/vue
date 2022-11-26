// 关于品牌管理的接口
import ajax from '@/api/ajax'
// 获取品牌列表的接口GET /admin/product/baseTrademark/{page}/{limit}
export const TradeMarkAPI = ({ page, limit }) => {
  return ajax({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET'
  })
}
// 添加品牌的操作POST /admin/product/baseTrademark/save
export const addTradeAPI = ({ logoUrl, tmName }) => {
  return ajax({
    url: '/admin/product/baseTrademark/save',
    method: 'POST',
    data: {
      logoUrl, tmName
    }
  })
}
// 修改品牌的操作PUT /admin/product/baseTrademark/update
export const updataTradeAPI = ({ id, logoUrl, tmName }) => {
  return ajax({
    url: '/admin/product/baseTrademark/update',
    method: 'PUT',
    data: {
      id, logoUrl, tmName
    }
  })
}
// 删除品牌的操作DELETE /admin/product/baseTrademark/remove/{id}
export const deleteTradeAPI = ({ id }) => {
  return ajax({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'DELETE'
  })
}
