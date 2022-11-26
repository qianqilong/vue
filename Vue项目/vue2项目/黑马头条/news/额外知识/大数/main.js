const jsonBig = require('json-bigint')
// JSON字符串响应的数据
const str = '[{"id": 1302900300041101987}, {"id": 1205340366642205763}, {"id": 7689021398237123422}]'
const arr = jsonBig.parse(str)
// 丢失精度
// 下载包json-bigint
console.log(arr[0])
console.log(Number.MAX_SAFE_INTEGER)// 最大安全数
