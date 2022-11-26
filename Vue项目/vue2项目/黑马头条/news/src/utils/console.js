// 1.服务器的根目录下可以新建环境变量配置文件(1).env.development (2).env.production
// 2.在上面两个文件中定义变量名为NODE_ENV(固定)，BASE_URL(固定)，自定义变量名VUE_APP_开头
// 3.yarn serve启动项，env.development内变量会挂载到process.env上
// 4.yarn build打包，env.production内变量会挂载到process.env上
if (process.NODE_ENV === 'production') {
  console.log = function () { }// 覆盖所有打印语句
  console.warning = function () { }// 覆盖所有打印语句
  console.dir = function () { }// 覆盖所有打印语句
  console.error = function () {}// 覆盖所有打印语句
}
