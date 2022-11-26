// 定制主题
const path = require('path')
module.exports = {
  devServer: {
    proxy: {
      // http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html
      '/api': { // 请求相对路径以/api开头的, 才会走这里的配置
        target: 'http://c.m.163.com', // 后台接口域名
        changeOrigin: true, // 改变请求来源(欺骗后台你的请求是从http://c.m.163.com)
        pathRewrite: {
          '^/api': '' // 因为真实路径中并没有/api这段, 所以要去掉这段才能拼接正确地址转发请求
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          // 直接覆盖变量
          // 'nav-bar-background-color': '#007bff',
          // 'nav-bar-title-text-color': '#fff'
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.join(__dirname, '/src/styles/cover.less')}";`
        }
      }
    }
  },
  publicPath: './'// 告诉webpacka服务器不要以/开头，要以./开头
}
