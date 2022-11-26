module.exports = {
  productionSourceMap:false,
  devServer: {
    proxy: {
      '/api': { // 请求相对路径以/api开头的, 才会走这里的配置
        target: 'http://gmall-h5-api.atguigu.cn', // 后台接口域名
        changeOrigin: true, // 改变请求来源
      }
    }
  }
}