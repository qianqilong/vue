module.exports = {
  lintOnSave: false,//关闭语法检查
  // 请求一个
  // devServer: {
  //   proxy: 'http://localhost:5000'//请求服务器的地址，开启代理服务器
  // }
  // 请求多个
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite:{'^/api':''},//去掉代理服务器发送个请求服务器的带了api前缀
        ws: true,
        changeOrigin: true//用于请求头中的host的值
      },
      '/demo': {
        target: 'http://localhost:5001',
        pathRewrite:{'^/demo':''},//去掉代理服务器发送个请求服务器的带了api前缀
        ws: true,
        changeOrigin: true//用于请求头中的host的值
      },
    }
  }
}