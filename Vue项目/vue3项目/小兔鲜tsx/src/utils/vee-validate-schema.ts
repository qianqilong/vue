export default {
  // 校检用户名
  account (value:any) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
    return true
  },
  // 校检密码
  password (value:any) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    return true
  },
  // 校检手机号
  mobile (value:any) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
    return true
  },
  // 校检验证码
  code (value:any) {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码是6个数字'
    return true
  },
  // 是否勾选
  isAgree (value:any) {
    if (!value) return '请勾选同意用户协议'
    return true
  }
}
