// 生成随机的游客身份
import { v4 as uuidv4 } from 'uuid';
export const getUUid = () => {
  let uuid=localStorage.getItem('uuid')
  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem('uuid',uuid)
  }
  return uuid
}
