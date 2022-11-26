// 统一暴露模块
import * as tradeMark from './product/tradeMark'
import * as attr from './product/attr'
import * as sku from './product/sku'
import * as spu from './product/spu'
import * as user from './acl/user'
import role from './acl/role'
import permission from './acl/permission'
export default {
  tradeMark,
  attr,
  sku,
  spu,
  user,
  role,
  permission
}
