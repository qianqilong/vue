// 校检用户名
export const ruleUsername = (value: string) => {
  if (!value) return '请输入用户名'
  // \w 匹配字母或数字或下划线或汉字
  if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
  return true
}
// 校检密码
export const rulePassword = (value: string) => {
  if (!value) return '请输入密码'
  if (!/^\w{4,20}$/.test(value)) return '密码是6-20个字符'
  return true
}
// 校检手机号码
export const ruleMobile = (value: string) => {
  if (!value) return '请输入手机号'
  if (!/^1[2-9]\d{9}$/.test(value)) return '手机号格式不正确'
  return true
}
// 校检验证码
export const ruleCode = (value: string) => {
  if (!value) return '请输入验证码'
  if (!/^\d{6}$/.test(value)) return '验证码规格不正确'
  return true
}
// 是否点击同意
export const ruleIsAgree = (value: boolean) => {
  if (value === false) return '请同意用户协议'
  return true
}
